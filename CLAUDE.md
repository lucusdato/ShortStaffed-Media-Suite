# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ShortStaffed Media Suite is a Next.js 15 application that provides automated tools for media planning and execution. The primary tool is Traffic Sheet Automation, which converts blocking charts into client-ready traffic sheets with built-in validation and format preservation.

**Tech Stack:** Next.js 15, TypeScript, React, Tailwind CSS, ExcelJS, Vercel deployment

## Development Commands

### Essential Commands
```bash
npm run dev      # Start development server on http://localhost:3000
npm run build    # Production build (runs TypeScript compilation)
npm start        # Start production server
npm run lint     # ESLint validation
npx tsc --noEmit # Type-check without emitting files
```

### Testing Type Changes
When modifying TypeScript files in `core/excel/`, always run type checking:
```bash
npx tsc --noEmit
```

## Architecture

### Configuration-Driven Design

**Core Principle:** The system is configuration-driven, not hardcoded. All business logic, dimensions, column mappings, and validation rules live in `core/excel/config.ts`.

**Key Configuration Sections:**
- `TRAFFIC_SHEET_CONFIG` - Block dimensions, row positions, column ranges, borders
- `PARSING_CONFIG` - Header detection, budget column names, validation thresholds
- `TEMPLATE_CONFIG` - Template detection priorities
- `COLUMN_MAPPING_CONFIG` - Base mappings + tab-specific overrides
- `CATEGORIZATION_CONFIG` - Channel keywords, social platforms
- `STYLE_CONFIG` - Header labels, mergeable columns
- `VALIDATION_CONFIG` - Required/numeric/date field definitions
- `DATE_CONFIG` - Month name formatting

**When making changes:** Always check if the change should be a configuration update rather than a code change. Modifying `config.ts` is preferred over adding conditional logic.

### Excel Processing Pipeline

```
Blocking Chart Upload
  ↓
parseBlockingChart (core/excel/parseBlockingChart.ts)
  - Detects template type via blockingChartTemplates.ts
  - Handles merged cells automatically
  - Uses PARSING_CONFIG for header detection
  - Validates using validation.ts
  ↓
Structured Data (ParsedBlockingChart type)
  ↓
generateTrafficSheet (core/excel/generateTrafficSheet.ts)
  - Uses TRAFFIC_SHEET_CONFIG for dimensions
  - Applies COLUMN_MAPPING_CONFIG for field mapping
  - Uses CATEGORIZATION_CONFIG for row grouping
  - Preserves Excel formatting (fonts, colors, borders)
  ↓
Traffic Sheet Excel File
```

### Important Implementation Details

**Budget Column Detection:**
- Uses **exact matching** against `PARSING_CONFIG.BUDGET_COLUMN_NAMES`
- Never use partial string matching (`.includes()`) for budget columns
- This prevents false positives like "Budget Category" being treated as budgets

**Column Mapping System:**
- `BASE_MAPPINGS`: Shared across all tab types (platform, dates, objective, etc.)
- `TAB_SPECIFIC_MAPPINGS`: Tab-specific overrides (e.g., 'Brand Say Digital' uses 'kpimetric', 'Brand Say Social' uses 'optimizationevent')
- Single function (`mapDataToTab`) handles all tabs by merging base + specific mappings
- When adding new column mappings, prefer adding to `BASE_MAPPINGS` unless tab-specific

**Validation System:**
- All parsing automatically validates via `validation.ts`
- Validation produces errors (must fix) and warnings (should review)
- Error types: required fields, numeric validation, date format/logic, budget calculations, whitespace detection
- Validation errors include row numbers and field names for user clarity
- Access validation results via `validateBlockingChart()` function

**Merged Cell Handling:**
- ExcelJS automatically provides master cell values for merged ranges
- Parser normalizes all merged cell values during extraction
- Never manually handle merged cells - the system does this automatically

### Project Structure

```
app/
  ├── api/
  │   ├── blocking-chart/export/route.ts  # Blocking chart export endpoint
  │   └── traffic-sheet/
  │       ├── generate/route.ts            # Traffic sheet generation
  │       └── preview/route.ts             # Data preview
  ├── apps/
  │   ├── blocking-chart-builder/page.tsx
  │   └── traffic-sheet-automation/page.tsx
  ├── layout.tsx                           # Root layout with metadata
  ├── page.tsx                             # Home page (tool grid)
  └── globals.css

core/
  ├── excel/                               # Excel processing core (configuration-driven)
  │   ├── config.ts                        # ⭐ SINGLE SOURCE OF TRUTH - all constants
  │   ├── types.ts                         # TypeScript interfaces
  │   ├── validation.ts                    # Comprehensive validation engine
  │   ├── parseBlockingChart.ts            # Excel parsing with auto-validation
  │   ├── generateTrafficSheet.ts          # Excel generation with format preservation
  │   ├── generateBlockingChart.ts         # Blocking chart builder
  │   ├── blockingChartTemplates.ts        # Template detection logic
  │   ├── blockingChartTypes.ts            # Type definitions for blocking charts
  │   └── blockingChartRates.ts            # Industry standard rates
  ├── ui/                                  # Shared React components
  │   ├── BugReportModal.tsx               # Bug reporting modal
  │   ├── Button.tsx                       # Reusable button component
  │   └── FileUpload.tsx                   # File upload component
  └── utils/
      └── fileHelpers.ts                   # File handling utilities
```

### File Organization Principles

**When adding new features:**
1. **Shared utilities** → `core/excel/` or `core/utils/`
2. **UI components** → `core/ui/` if reusable, `app/apps/[tool]/` if tool-specific
3. **API routes** → `app/api/[tool-name]/`
4. **New tools** → `app/apps/[tool-name]/page.tsx`
5. **Configuration changes** → `core/excel/config.ts` (preferred over code changes)

**Path aliases:**
- Use `@/` prefix for imports (e.g., `import { Button } from '@/core/ui/Button'`)
- Configured in `tsconfig.json` with `"@/*": ["./*"]`

## Key Constraints

### Excel Processing
- Only `.xlsx` format supported (Office Open XML)
- No support for: `.xls` (old format), password-protected files, macros/VBA, charts/images
- Processing time: <2s for 1-20 rows, 2-10s for 20-100 rows, 10-30s for 100-500 rows
- Client-side processing preferred when possible (no server storage)

### TypeScript Requirements
- Strict mode enabled (`strict: true` in tsconfig.json)
- All new files must use TypeScript
- Use proper types from `core/excel/types.ts`
- Avoid `any` - use proper interfaces or `unknown` with type guards

### Styling
- Tailwind CSS for all styling - never write custom CSS unless absolutely necessary
- Use existing color palette (gray scale for professional look)
- Maintain responsive design (mobile-first approach)
- No emojis in UI unless explicitly requested

## Common Patterns

### Adding a New Traffic Sheet Tab Type

1. Add tab-specific mappings to `core/excel/config.ts`:
```typescript
TAB_SPECIFIC_MAPPINGS: {
  'New Tab Name': {
    'uniquefield': ['sourceColumn1', 'sourceColumn2']
  }
}
```

2. Add border configuration if needed:
```typescript
BORDER_CONFIG: {
  'New Tab Name': {
    start: 2,
    end: 20,
    exclude: []
  }
}
```

3. The existing `mapDataToTab()` function will automatically handle the new tab.

### Modifying Validation Rules

Edit `core/excel/config.ts`:
```typescript
VALIDATION_CONFIG: {
  REQUIRED_FIELDS: ['channel', 'tactic', 'newRequiredField'],
  NUMERIC_FIELDS: ['budget', 'cpm', 'newNumericField'],
  DATE_FIELDS: ['startDate', 'endDate', 'newDateField']
}
```

The validation engine will automatically apply these rules.

### Changing Block Dimensions

Edit `core/excel/config.ts`:
```typescript
TRAFFIC_SHEET_CONFIG: {
  CREATIVE_LINES_PER_TACTIC: 20,  // Changed from 15
  AD_GROUPS_PER_TACTIC: 5,        // Changed from 3
  CREATIVES_PER_AD_GROUP: 10      // Changed from 5
}
```

All dependent code updates automatically.

## Deployment

**Platform:** Vercel (optimized for Next.js)

**Build Configuration:**
- Build command: `npm run build` (automatically configured)
- Node version: 18+ required
- Output directory: `.next` (automatic)
- Environment variables: None currently required

**Pre-deployment checklist:**
1. Run `npm run build` locally to verify
2. Run `npx tsc --noEmit` to check types
3. Test all file upload/download flows
4. Verify Excel generation works correctly

**Important:** The app uses Node.js runtime for API routes (ExcelJS requires Node.js). Ensure Vercel function region is configured appropriately.

## Documentation References

- **Full system architecture**: `core/excel/README.md`
- **Refactoring details**: `SLT_UPDATES.md`
- **Project overview**: `PROJECT_OVERVIEW.md`
- **Deployment guide**: `DEPLOYMENT_GUIDE.md`
- **Column mapping**: `COLUMN_MAPPING_GUIDE.md`

## Git Workflow

**Main branch:** `main` (used for PRs and deployments)

**Commit message style (from git log):**
- Use emoji prefixes when appropriate (🔄, ➕, 🐛, ✨)
- Be descriptive: "Fix TypeScript build errors for Vercel deployment"
- Reference what changed: "Enhance Traffic Sheet Verify Data table with shared financial data"

## Important Notes

### Performance Optimization
- Large Excel files (500+ rows) process on server, not client
- Use streaming for very large files instead of loading entirely into memory
- Cache template structures when possible

### Error Handling
- All API routes must return user-friendly error messages
- Never expose technical stack traces to users
- Validation errors should include row numbers and field names
- Log detailed errors server-side for debugging

### Future Extensibility
- Template detection can be expanded by adding to `TEMPLATE_CONFIG`
- Column mappings can support international formats via config
- Validation rules can be externalized to JSON/YAML if needed
- Consider configuration UI for non-technical users to modify rules

## Testing Approach

Currently manual testing via:
1. Upload blocking chart → verify preview shows correct data
2. Generate traffic sheet → verify downloaded file opens correctly
3. Check validation errors for intentionally malformed files
4. Test responsive design on different screen sizes

**When adding features:** Test with both standard and extended Unilever templates, edge cases with merged cells, and files with validation errors.
