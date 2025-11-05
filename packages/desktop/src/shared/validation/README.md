# Data Validation System

This directory contains enhanced validation utilities for QuickClick Media Tools, including intelligent auto-correction capabilities and user-friendly error messaging.

## Components

### 1. Auto-Correction Utilities ([autoCorrection.ts](autoCorrection.ts))

Provides smart auto-correction for common data quality issues:

#### Platform Name Normalization
```typescript
import { normalizePlatformName } from './autoCorrection';

const result = normalizePlatformName('Facebook');
// Returns: { original: 'Facebook', corrected: 'Meta', confidence: 'high', changed: true }

const result2 = normalizePlatformName('TTD');
// Returns: { original: 'TTD', corrected: 'TradeDesk', confidence: 'high', changed: true }
```

#### Date Format Normalization
```typescript
import { normalizeDateFormat } from './autoCorrection';

const result = normalizeDateFormat('3/15/2025');
// Returns: { original: '3/15/2025', corrected: '2025-03-15', confidence: 'medium', changed: true }

const result2 = normalizeDateFormat('Mar 15, 2025');
// Returns: { original: 'Mar 15, 2025', corrected: '2025-03-15', confidence: 'high', changed: true }
```

#### Numeric Value Extraction
```typescript
import { extractNumericValue } from './autoCorrection';

const result = extractNumericValue('$45,000');
// Returns: { original: '$45,000', corrected: 45000, confidence: 'high', changed: true }

const result2 = extractNumericValue('TBD');
// Returns: { original: 'TBD', corrected: null, confidence: 'high', changed: true }
```

#### Batch Row Correction
```typescript
import { correctRow, applyCorrections } from './autoCorrection';

const row = {
  platform: ' Facebook ',
  startDate: '3/15/2025',
  budget: '$50,000',
  cpmCpp: '15.50'
};

const corrections = correctRow(row, 0, {
  trimWhitespace: true,
  normalizeDates: true,
  normalizeNumbers: true,
  normalizePlatforms: true
});

// Apply high-confidence corrections
const correctedRow = applyCorrections(row, corrections.corrections);
// Results in:
// {
//   platform: 'Meta',
//   startDate: '2025-03-15',
//   budget: 50000,
//   cpmCpp: 15.5
// }
```

### 2. Error Message Catalog ([errorMessages.ts](errorMessages.ts))

Provides user-friendly error messages and grouping:

#### Error Grouping
```typescript
import { groupValidationErrors, formatErrorSummary } from './errorMessages';

const errors = [
  { rowIndex: 5, field: 'cpmCpp', message: 'Invalid number', severity: 'error' },
  { rowIndex: 8, field: 'cpmCpp', message: 'Invalid number', severity: 'error' },
  { rowIndex: 12, field: 'cpmCpp', message: 'Invalid number', severity: 'error' },
];

const summary = formatErrorSummary(errors);
// Returns grouped, formatted error message:
// "❌ 3 rows have issues with CPM/CPP (rows: 5, 8, 12)"
```

#### Budget Calculation Explanation
```typescript
import { explainBudgetCalculation } from './errorMessages';

const breakdown = {
  impressions: 1000000,
  cpm: 45,
  baseMediaCost: 45000,
  adServingFee: 500,
  dvCost: 2000,
  totalExpected: 47500,
  actualBudget: 50000,
  difference: 2500,
  percentDiff: 5.26
};

const explanation = explainBudgetCalculation(breakdown);
// Returns detailed breakdown with formula and suggestions
```

## Using the Data Validation Agent

The Data Validation Agent is available at [.claude/agents/data-validation-agent.md](../../.claude/agents/data-validation-agent.md).

### Invoking the Agent

In Claude Code, you can invoke the agent using:

```
@data-validation-agent
```

### Example Use Cases

#### 1. Analyze Validation Errors
```
@data-validation-agent I'm getting validation errors when uploading my blocking chart.
Here are the errors: [paste errors]
Can you help me understand what's wrong and suggest fixes?
```

#### 2. Enhance Validation Logic
```
@data-validation-agent Can you add auto-correction for date formats in the validation system?
Users are uploading dates as "M/D/YYYY" but we need "YYYY-MM-DD"
```

#### 3. Debug Budget Calculation Warnings
```
@data-validation-agent Why am I getting budget mismatch warnings?
My CPM is $45, impressions are 1M, and budget is $50,000
```

#### 4. Create User-Friendly Error Messages
```
@data-validation-agent The current error message "Field 'cpmCpp' must be a valid number"
is confusing users. Can you make it more helpful?
```

## Confidence Levels

Auto-correction functions return confidence scores:

- **High** (`high`): Safe to apply automatically without user review
  - Example: Trimming whitespace, normalizing known platform names

- **Medium** (`medium`): Should show to user for confirmation
  - Example: Date format conversion with potential ambiguity (M/D vs D/M)

- **Low** (`low`): Requires user review and decision
  - Example: Unrecognized values, significant data transformations

## Integration with Existing Validation

The utilities in this directory can be integrated into the existing validation flow:

```typescript
// In core/excel/validation.ts or parseBlockingChart.ts
import { correctRow, applyCorrections } from './validation/autoCorrection';
import { enhanceValidationError, formatErrorSummary } from './validation/errorMessages';

// During parsing
const corrections = correctRow(row, rowIndex);
if (corrections.highConfidenceChanges > 0) {
  row = applyCorrections(row, corrections.corrections);
}

// During error reporting
const enhancedErrors = errors.map(enhanceValidationError);
const summary = formatErrorSummary(enhancedErrors);
```

## Testing

Create test files to verify auto-correction behavior:

```typescript
// tests/validation/autoCorrection.test.ts
import { normalizePlatformName, normalizeDateFormat } from '../core/validation/autoCorrection';

describe('Platform Normalization', () => {
  it('should normalize Facebook to Meta', () => {
    const result = normalizePlatformName('Facebook');
    expect(result.corrected).toBe('Meta');
    expect(result.confidence).toBe('high');
  });
});

describe('Date Normalization', () => {
  it('should convert M/D/YYYY to ISO format', () => {
    const result = normalizeDateFormat('3/15/2025');
    expect(result.corrected).toBe('2025-03-15');
  });
});
```

## Roadmap

Potential enhancements:

- [ ] Machine learning-based value inference
- [ ] Historical correction learning (learn from user fixes)
- [ ] Client-specific validation rules
- [ ] Inline editing UI for fixing errors
- [ ] Validation rule configuration interface
- [ ] Analytics on common error patterns

## Support

For issues or questions about the validation system, invoke the data validation agent:

```
@data-validation-agent [your question]
```
