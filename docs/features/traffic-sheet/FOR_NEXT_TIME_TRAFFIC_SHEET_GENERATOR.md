# For Next Time: Traffic Sheet Generator Project Guide

**Reference guide for building similar Excel automation tools with Claude Code**

---

## Quick Start: Initial Prompt Template

When starting a new Traffic Sheet Generator or similar Excel automation project, use this prompt structure:

```
PROJECT: [Excel/Data Processing Tool Name]

CONTEXT:
- We're building a [tool type] that processes [input type] into [output type]
- Users are [target audience] who need to [user goal]
- Current manual process takes [time] and is error-prone

REQUIREMENTS:
1. Input validation with detailed error messages
2. Configurable rules (no hardcoded values)
3. Support multiple template types
4. Preserve formatting from templates
5. Handle edge cases (merged cells, formulas, etc.)

ARCHITECTURE:
- Configuration-driven design (single source of truth)
- Separate I/O from business logic
- Type-safe with TypeScript interfaces
- Testable components

TECH STACK:
- Next.js 15 for API & UI
- ExcelJS for Excel processing
- TypeScript strict mode
- Vercel for deployment

DEVELOPMENT APPROACH:
Phase 1: Define types & interfaces
Phase 2: Build configuration system
Phase 3: Implement core logic with tests
Phase 4: Add Excel I/O
Phase 5: Build API & UI

Let's start with Phase 1: defining the data structures.
```

---

## Phase-by-Phase Prompting Strategy

### Phase 1: Data Model & Types

**Prompt:**
```
Before writing any code, let's define TypeScript interfaces for:

1. Input structure (Blocking chart row)
   - What fields are required?
   - What fields are optional?
   - What are the data types?

2. Output structure (Traffic sheet row)
   - What fields does the traffic sheet need?
   - How do they map to blocking chart fields?

3. Validation error structure
   - How do we track errors by row?
   - What severity levels do we need?

4. Configuration structure
   - What values need to be configurable?
   - How do we organize them?

Create these interfaces in core/excel/types.ts with comprehensive JSDoc comments.
```

**Expected output:**
```typescript
export interface ParsedBlockingChartRow {
  // Required fields
  channel: string;
  tactic: string;
  platform: string;

  // Financial fields
  budget?: number;
  cpm?: number;
  impressions?: number;

  // Date fields (stored as ISO strings to avoid timezone issues)
  startDate?: string; // YYYY-MM-DD format
  endDate?: string;   // YYYY-MM-DD format

  // Metadata
  _mergeSpan?: number; // Tracks merged cells
  [key: string]: string | number | undefined; // Allow dynamic fields
}
```

---

### Phase 2: Configuration System

**Prompt:**
```
Create a configuration system in core/excel/config.ts that centralizes all constants:

1. PARSING_CONFIG
   - Header detection rules
   - Budget column names (exact matches)
   - Validation thresholds

2. TRAFFIC_SHEET_CONFIG
   - Block dimensions (rows per tactic, ad groups, creatives)
   - Row positions (header row, first data row)
   - Column ranges

3. COLUMN_MAPPING_CONFIG
   - Base mappings shared across all tabs
   - Tab-specific mapping overrides

4. CATEGORIZATION_CONFIG
   - Channel keywords for categorization
   - Platform identifiers
   - Exclusion patterns

5. VALIDATION_CONFIG
   - Required fields
   - Numeric fields
   - Date fields

6. STYLE_CONFIG
   - Header labels
   - Template text to clear
   - Mergeable columns

Use TypeScript 'as const' for type safety. Include inline comments explaining each constant.
```

**Why this matters:**
- Changes only require config updates, not code changes
- Self-documenting constants
- Type-safe values
- Easy to extend for new templates

---

### Phase 3: Core Logic (No Excel Yet)

**Prompt:**
```
Implement core business logic using plain TypeScript objects (no ExcelJS yet):

1. Validation module (core/excel/validation.ts)
   - validateBlockingChartRow(): Validate a single row
   - validateBlockingChart(): Validate entire dataset
   - formatValidationErrors(): Human-readable error messages
   - Include row numbers, field names, and severity levels

2. Categorization module (core/excel/categorizer.ts)
   - categorizeRow(): Determine which tab a row belongs to
   - Use CATEGORIZATION_CONFIG for rules
   - Return { tab: string, type: string }

3. Column mapping module (core/excel/mapper.ts)
   - mapDataToTab(): Map blocking chart columns to traffic sheet columns
   - Merge BASE_MAPPINGS + TAB_SPECIFIC_MAPPINGS
   - Handle field name variations

Write unit tests for each function using fixture data (not real Excel files).
```

**Test structure:**
```typescript
// tests/fixtures/blockingChart.fixture.ts
export const VALID_BLOCKING_CHART = {
  headers: ['Channel', 'Tactic', 'Platform', 'Budget'],
  rows: [
    { channel: 'Digital Video', tactic: 'YouTube', platform: 'Google', budget: 10000 },
    { channel: 'Paid Social', tactic: 'Meta Ads', platform: 'Facebook', budget: 5000 }
  ]
};

// tests/validation.test.ts
describe('validateBlockingChart', () => {
  it('should pass valid data', () => {
    const result = validateBlockingChart(VALID_BLOCKING_CHART);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should fail when required field is missing', () => {
    const invalid = { ...VALID_BLOCKING_CHART };
    invalid.rows[0].channel = '';
    const result = validateBlockingChart(invalid);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toMatchObject({
      rowIndex: 1,
      field: 'channel',
      severity: 'error'
    });
  });
});
```

---

### Phase 4: Excel I/O

**Prompt:**
```
Add ExcelJS integration for reading and writing Excel files:

1. Excel reader (core/excel/parseBlockingChart.ts)
   - Detect header row automatically
   - Handle merged cells (ExcelJS provides master cell values)
   - Track merge spans for tactic grouping
   - Normalize date values to ISO format (YYYY-MM-DD) using UTC
   - Extract metadata from top rows
   - Use PARSING_CONFIG for all thresholds

2. Excel writer (core/excel/generateTrafficSheet.ts)
   - Load template file
   - Populate tactic blocks
   - Preserve formatting (fonts, colors, borders)
   - Merge cells for tactic data
   - Apply borders to data area
   - Clear unwanted template text

Key techniques:
- Use getCellValue() helper to handle merged cells, formulas, rich text, and dates
- Always use UTC for dates to avoid timezone shifts
- Capture template structure once, then reuse for all tactics
- Apply borders after all data is populated
```

**Critical: Date Handling**
```typescript
// ALWAYS use UTC to avoid timezone issues
if (cell.value instanceof Date) {
  const date = cell.value as Date;
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; // ISO format
}
```

**Critical: Budget Column Detection**
```typescript
// Use EXACT matching, not partial matching
const budgetColumnIndex = headers.findIndex(h => {
  const trimmed = h.trim();
  return PARSING_CONFIG.BUDGET_COLUMN_NAMES.some(
    budgetName => trimmed === budgetName // Exact match
  );
});
```

---

### Phase 5: API & UI

**Prompt:**
```
Build Next.js API routes and React UI:

1. API Routes
   - /api/traffic-sheet/preview: Parse and validate blocking chart
   - /api/traffic-sheet/generate: Generate traffic sheet with manual overrides
   - Include validation in both endpoints
   - Return detailed error messages

2. React UI (app/apps/traffic-sheet-automation/page.tsx)
   - Step 1: Upload blocking chart
   - Step 2: Verify data (preview, manual tab assignment)
   - Step 3: Generate and download
   - Show progress indicators
   - Display validation errors/warnings
   - Allow manual override of auto-categorization

3. UI Features
   - Preview table with auto-hidden blank columns
   - Tab assignment dropdowns for each row
   - Totals summary bar (gut check for financial data)
   - Visual indicators for merged tactics
   - Error/warning badges
```

---

## File Structure: Best Practices

### Recommended Organization

```
core/excel/
  ├── io/                      # Excel I/O (reading/writing)
  │   ├── reader.ts            # Parse Excel files
  │   ├── writer.ts            # Generate Excel files
  │   └── formatter.ts         # Apply styling, borders, merges
  │
  ├── logic/                   # Business logic
  │   ├── categorizer.ts       # Row categorization
  │   ├── validator.ts         # Validation rules
  │   └── mapper.ts            # Column mapping
  │
  ├── templates/               # Template detection
  │   ├── detector.ts          # Detect template type
  │   └── definitions.ts       # Template definitions
  │
  ├── config.ts                # Configuration constants
  ├── types.ts                 # TypeScript interfaces
  └── README.md                # Architecture documentation

tests/
  ├── fixtures/                # Test data (not real Excel)
  │   ├── blockingChart.fixture.ts
  │   └── trafficSheet.fixture.ts
  │
  └── unit/
      ├── validator.test.ts
      ├── categorizer.test.ts
      └── mapper.test.ts
```

**Why this structure:**
- Clear separation of concerns
- I/O isolated from business logic
- Easy to test (mock Excel I/O)
- Easy to extend (add new validators, categorizers, etc.)

---

## What Worked Really Well

### ✅ Configuration-Driven Architecture

**Current implementation (excellent):**
```typescript
export const TRAFFIC_SHEET_CONFIG = {
  CREATIVE_LINES_PER_TACTIC: 15,
  AD_GROUPS_PER_TACTIC: 3,
  CREATIVES_PER_AD_GROUP: 5,
  HEADER_LABEL_ROW: 8,
  FIRST_DATA_ROW: 9,
  // ... all constants in one place
} as const;
```

**Benefits:**
- Change block size: edit one number
- Change row positions: edit one number
- Self-documenting code
- Type-safe constants

### ✅ Comprehensive Validation

**Current implementation (excellent):**
```typescript
export interface ValidationError {
  rowIndex: number;
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

// Validates:
- Required fields
- Numeric fields (budget, CPM, impressions)
- Date fields (format and logic)
- Budget calculations (CPM × impressions = budget?)
- Whitespace detection
```

**Why this works:**
- Row-level tracking
- Clear severity levels
- Actionable error messages
- Helps users fix issues quickly

### ✅ Shared Column Mapping

**Current implementation (excellent):**
```typescript
const BASE_MAPPINGS = {
  'platform': ['platform'],
  'startdate': ['startdate', 'start'],
  'enddate': ['enddate', 'end'],
  // ... shared across all tabs
};

const TAB_SPECIFIC_MAPPINGS = {
  'Brand Say Digital': {
    'kpimetric': ['optimizationkpi', 'kpimetric', 'kpi']
  },
  'Brand Say Social': {
    'optimizationevent': ['optimizationkpi', 'kpimetric', 'kpi']
  }
};

// Merge them
const mappings = { ...BASE_MAPPINGS, ...TAB_SPECIFIC_MAPPINGS[tabName] };
```

**Benefits:**
- No duplication
- Easy to add new tabs
- Easy to add new shared mappings
- Tab-specific overrides when needed

### ✅ Excellent Documentation

**Current CLAUDE.md (excellent):**
- Architecture overview
- Configuration-driven design principles
- Common patterns
- Development commands
- File organization
- Testing approach

**Keep doing this!** Documentation is outstanding.

---

## What to Improve Next Time

### 1. Start with Types First

**Prompt for next time:**
```
Step 1: Define all TypeScript interfaces BEFORE writing any implementation code.

For each interface, include:
- JSDoc comments explaining purpose
- Field descriptions
- Examples of valid values
- Edge cases to consider

Interfaces needed:
1. Input data structures
2. Output data structures
3. Validation structures
4. Configuration structures
5. Internal processing structures

Only after types are defined should we write implementation code.
```

**Why:**
- Types guide implementation
- Prevents rework
- Documents expected data structures
- Makes refactoring safer

---

### 2. Test-Driven Development

**Prompt for next time:**
```
Before implementing Excel I/O, write tests using fixture data:

1. Create test fixtures (plain TypeScript objects, not Excel files)
2. Write tests for validation logic
3. Write tests for categorization logic
4. Write tests for column mapping logic
5. THEN implement the logic to pass the tests

Use Jest or Vitest. Keep tests fast (no file I/O).
```

**Example test prompt:**
```
Create test fixtures in tests/fixtures/:

1. VALID_BLOCKING_CHART: Perfect data, should pass validation
2. INVALID_BLOCKING_CHART: Missing required fields
3. DATE_ERROR_BLOCKING_CHART: Start date after end date
4. BUDGET_MISMATCH_BLOCKING_CHART: CPM × impressions ≠ budget

Write tests that verify all validation rules catch these issues.
```

**Benefits:**
- Catches bugs early
- Documents expected behavior
- Makes refactoring safe
- Tests run in milliseconds

---

### 3. Error Recovery Strategies

**Prompt for next time:**
```
Add auto-fix suggestions to the validation module:

For each validation error, determine if it's auto-fixable:

1. Leading/trailing whitespace → Trim
2. Start date after end date → Swap dates
3. Budget mismatch < 5% → Use calculated value
4. Missing platform but has channel → Infer from channel

Structure:
{
  error: ValidationError,
  autoFix?: {
    field: string,
    currentValue: any,
    suggestedValue: any,
    confidence: 'high' | 'medium' | 'low'
  }
}

Let users approve fixes in the UI before applying.
```

**Benefits:**
- Reduces manual data fixes
- Speeds up workflow
- Maintains data quality
- Users stay in control

---

### 4. Performance Monitoring

**Prompt for next time:**
```
Add performance tracking to all major operations:

Create a utility function:

export function trackPerformance<T>(
  operationName: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = performance.now();
  return fn().then(result => {
    const duration = performance.now() - start;
    console.log(`⏱️ ${operationName}: ${duration.toFixed(2)}ms`);

    // Log slow operations
    if (duration > 1000) {
      console.warn(`⚠️ Slow operation: ${operationName} took ${duration.toFixed(2)}ms`);
    }

    return result;
  });
}

Use it everywhere:
- Parse blocking chart
- Validate data
- Generate traffic sheet
- Each major Excel operation

Track metrics over time to detect performance regressions.
```

---

### 5. Better Naming Conventions

**Prompt for next time:**
```
Use these naming conventions:

Functions:
- Start with verbs: calculateBudget(), validateRow(), mapColumn()
- Be specific: not "process()" but "categorizeRowByChannel()"

Variables:
- Use nouns: tacticData, validationErrors, templateBuffer
- Avoid abbreviations: not "bcData" but "blockingChartData"

Booleans:
- Start with is/has/should: isValid, hasErrors, shouldMerge

Constants:
- Use SCREAMING_SNAKE_CASE: CREATIVE_LINES_PER_TACTIC
- Be descriptive: not "MAX_ROWS" but "MAX_CREATIVE_ROWS_PER_TACTIC"

Types:
- Use PascalCase: ParsedBlockingChartRow, ValidationError
- Suffix with type: RowData, ConfigOptions
```

---

### 6. Separation of Concerns

**Current structure mixes:**
- Excel I/O
- Business logic
- Formatting

**Better structure for next time:**

**Prompt:**
```
Organize code into clear layers:

1. I/O Layer (core/excel/io/)
   - reader.ts: Read Excel files only
   - writer.ts: Write Excel files only
   - formatter.ts: Apply styling only
   - No business logic in this layer

2. Logic Layer (core/excel/logic/)
   - categorizer.ts: Row categorization
   - validator.ts: Validation rules
   - mapper.ts: Column mapping
   - No Excel I/O in this layer

3. Configuration Layer (core/excel/)
   - config.ts: All constants
   - types.ts: All TypeScript interfaces

Each layer should be independently testable.
The logic layer should work with plain objects (no ExcelJS types).
```

**Benefits:**
- Easy to test (mock I/O layer)
- Easy to swap Excel library (only change I/O layer)
- Clear responsibilities
- Reusable business logic

---

## Common Pitfalls & Solutions

### Pitfall 1: Date Handling

**Problem:** Dates shift by one day due to timezone conversions

**Solution:**
```typescript
// ALWAYS use UTC methods
if (cell.value instanceof Date) {
  const date = cell.value as Date;
  const year = date.getUTCFullYear();        // Not getFullYear()
  const month = date.getUTCMonth() + 1;      // Not getMonth()
  const day = date.getUTCDate();             // Not getDate()
  return `${year}-${month}-${day}`;
}
```

### Pitfall 2: Partial String Matching

**Problem:** "Budget Category" matches "Budget" search

**Solution:**
```typescript
// Use exact matching for critical fields
const budgetColumnIndex = headers.findIndex(h => {
  const trimmed = h.trim();
  return BUDGET_COLUMN_NAMES.some(name => trimmed === name); // Exact match
});

// NOT this:
// headers.findIndex(h => h.includes('Budget')) // Too loose!
```

### Pitfall 3: Merged Cell Values

**Problem:** Merged cells return `null` for non-master cells

**Solution:**
```typescript
// ExcelJS automatically provides master cell values
function getCellValue(cell: ExcelJS.Cell): string | number | null {
  if (cell.isMerged) {
    if (cell.master === cell) {
      return cell.value; // Master cell has the value
    }
    return null; // Non-master cells return null
  }
  return cell.value;
}
```

### Pitfall 4: Formula Cells

**Problem:** Formula cells return objects, not values

**Solution:**
```typescript
if (typeof cell.value === "object" && "result" in cell.value) {
  return cell.value.result; // Extract formula result
}
```

### Pitfall 5: Rich Text Cells

**Problem:** Rich text cells return objects, not strings

**Solution:**
```typescript
if (typeof cell.value === "object" && "richText" in cell.value) {
  return cell.value.richText.map(rt => rt.text).join("");
}
```

---

## Deployment Checklist

Before deploying to Vercel:

1. **Type Check**
   ```bash
   npx tsc --noEmit
   ```
   Fix all TypeScript errors.

2. **Build Test**
   ```bash
   npm run build
   ```
   Ensure build succeeds locally.

3. **Template Files**
   - Verify template file exists in `public/templates/`
   - Verify file name matches code
   - Test with both standard and extended templates

4. **Environment Variables**
   - None required for this project (all local processing)

5. **File Size Limits**
   - Vercel function max: 50MB
   - Test with large files (500+ row blocking charts)

6. **Node Version**
   - Specify Node 18+ in package.json
   ```json
   "engines": {
     "node": ">=18.0.0"
   }
   ```

---

## Progressive Enhancement Roadmap

### Short-term (Next 2-4 weeks)
1. Add unit tests for validation logic
2. Add performance monitoring
3. Implement error auto-fix suggestions
4. Add audit logging (track what changed)

### Medium-term (Next 1-3 months)
5. Support custom templates via JSON/YAML config
6. Add template builder UI for non-technical users
7. Implement diff detection (compare versions)
8. Add Excel export of validation errors

### Long-term (Next 3-6 months)
9. Support international formats (date/number)
10. Add migration system for template changes
11. Create Excel add-in for live validation
12. Build version history and rollback

---

## Key Lessons from This Project

1. **Configuration beats hardcoding**
   - Changing block size: 1 constant vs 10+ code locations
   - Adding new tab type: config entry vs duplicated logic

2. **Validation is critical**
   - Catches errors before generation
   - Saves users time debugging Excel files
   - Provides clear, actionable error messages

3. **Documentation pays dividends**
   - CLAUDE.md makes onboarding easy
   - Future you will thank present you
   - Helps Claude understand the system

4. **Excel is complex**
   - Merged cells
   - Formula cells
   - Rich text cells
   - Date timezone issues
   - Handle all edge cases upfront

5. **User experience matters**
   - Progress indicators reduce anxiety
   - Preview step catches errors early
   - Manual overrides give users control
   - Clear error messages build trust

---

## Quick Reference: Prompt Checklist

When starting a new project, ask Claude to:

- [ ] Define all TypeScript interfaces first
- [ ] Create configuration system (config.ts)
- [ ] Separate I/O from business logic
- [ ] Write tests using fixture data
- [ ] Implement validation with error recovery
- [ ] Add performance monitoring
- [ ] Handle Excel edge cases (merged cells, dates, formulas)
- [ ] Create comprehensive documentation (CLAUDE.md)
- [ ] Use descriptive naming conventions
- [ ] Build user-friendly preview/validation UI

---

## Final Template: Copy-Paste This

```
PROJECT: Traffic Sheet Generator

I need to build an Excel automation tool that converts blocking charts into traffic sheets.

ARCHITECTURE REQUIREMENTS:
1. Configuration-driven (single source of truth in config.ts)
2. Separate I/O layer from business logic
3. Comprehensive validation with error recovery
4. Type-safe TypeScript throughout
5. Testable components (unit tests for all logic)

DEVELOPMENT PHASES:
Phase 1: Define all TypeScript interfaces
Phase 2: Create configuration system
Phase 3: Implement business logic with tests (no Excel yet)
Phase 4: Add Excel I/O with ExcelJS
Phase 5: Build Next.js API and React UI

KEY TECHNICAL REQUIREMENTS:
- Handle merged cells automatically
- Preserve Excel formatting from template
- Validate data with row-level error tracking
- Support multiple template types
- Use exact matching for critical columns (budget)
- Handle dates in UTC to avoid timezone issues
- Provide auto-fix suggestions for common errors

Let's start with Phase 1: defining all the TypeScript interfaces we'll need.
```

---

**Document Version:** 1.0
**Created:** 2025-01-21
**Project Reference:** ShortStaffed Media Suite - Traffic Sheet Automation
