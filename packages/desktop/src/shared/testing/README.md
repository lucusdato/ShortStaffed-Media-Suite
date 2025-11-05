# Test Data Generation System

Comprehensive test data generation for QuickClick Media Tools, enabling robust testing of validation, parsing, and generation logic.

## Quick Start

### Generate All Test Files
```bash
npx tsx tests/generate-test-data.ts
```

### Generate Specific Scenario
```bash
npx tsx tests/generate-test-data.ts simple-meta
```

### List All Scenarios
```bash
npx tsx tests/generate-test-data.ts --list
```

---

## 🎯 Available Test Scenarios

### Happy Path
- **simple-meta**: Single valid Meta campaign
- **all-platforms**: One campaign per platform (Meta, TikTok, TradeDesk, etc.)
- **multi-row**: Campaigns spanning multiple rows (merged cells)

### Date Format Edge Cases
- **date-formats**: ISO, US format, month names, etc.
- **date-ranges**: Invalid ranges (start after end)

### Platform Name Edge Cases
- **platforms**: Meta, Facebook, FB, Instagram variations

### Numeric Format Edge Cases
- **numeric**: Currency symbols, placeholders (TBD, N/A), negative values
- **budget**: Budget calculation mismatches (11%, 44% difference)

### Validation Edge Cases
- **missing-fields**: Missing required fields (platform, channel, dates)
- **whitespace**: Leading/trailing whitespace in various fields

### Structural Edge Cases
- **summary**: Summary/total rows mixed with campaigns
- **summary-middle**: Summary row appearing between campaigns
- **partial-merge**: Incomplete merge patterns
- **empty-rows**: Empty rows scattered between campaigns

### Performance Tests
- **large**: 100 campaigns (performance test)
- **very-large**: 500 campaigns (stress test)

### Comprehensive
- **kitchen-sink**: Mix of all edge cases in one file

---

## 📦 Using Test Data in Your Tests

### 1. Parse and Validate Test File

```typescript
import { parseBlockingChart } from '../core/excel/parseBlockingChart';
import { validateBlockingChart } from '../core/excel/validation';
import * as path from 'path';

test('should parse simple Meta campaign', async () => {
  const filepath = path.join(__dirname, 'fixtures/simple-meta.xlsx');

  const parsed = await parseBlockingChart(filepath);
  const validation = validateBlockingChart(parsed);

  expect(validation.errors).toHaveLength(0);
  expect(parsed.campaigns).toHaveLength(1);
  expect(parsed.campaigns[0].platform).toBe('Meta');
});
```

### 2. Test Auto-Correction

```typescript
import { correctRow } from '../core/validation/autoCorrection';

test('should normalize platform names', async () => {
  const filepath = path.join(__dirname, 'fixtures/platforms.xlsx');
  const parsed = await parseBlockingChart(filepath);

  // Apply corrections
  const corrections = correctRow(parsed.campaigns[1], 1); // "Facebook" row

  expect(corrections.hasChanges).toBe(true);
  expect(corrections.highConfidenceChanges).toBeGreaterThan(0);
});
```

### 3. Test Traffic Sheet Generation

```typescript
import { generateTrafficSheet } from '../core/excel/generateTrafficSheet';

test('should generate traffic sheet for all platforms', async () => {
  const filepath = path.join(__dirname, 'fixtures/all-platforms.xlsx');
  const parsed = await parseBlockingChart(filepath);

  const output = await generateTrafficSheet(parsed);

  // Verify tabs created
  expect(output.worksheets.length).toBeGreaterThan(0);
  expect(output.getWorksheet('Brand Say Social')).toBeDefined();
  expect(output.getWorksheet('Brand Say Digital')).toBeDefined();
});
```

### 4. Test Edge Case Handling

```typescript
import { formatErrorSummary } from '../core/validation/errorMessages';

test('should detect missing required fields', async () => {
  const filepath = path.join(__dirname, 'fixtures/missing-fields.xlsx');
  const parsed = await parseBlockingChart(filepath);
  const validation = validateBlockingChart(parsed);

  expect(validation.errors.length).toBeGreaterThan(0);

  const summary = formatErrorSummary(validation.errors);
  expect(summary).toContain('Missing required field');
});
```

---

## 🛠️ Creating Custom Test Scenarios

### Programmatically Generate Test Data

```typescript
import { generateCampaignRow, generateTestFile } from '../core/testing/testDataGenerator';
import type { TestScenario } from '../core/testing/testDataGenerator';

const customScenario: TestScenario = {
  name: 'My Custom Test',
  description: 'Testing specific edge case',
  campaigns: [
    generateCampaignRow({
      platform: 'Meta',
      budget: 100000,
      cpmCpp: 50,
    }),
    generateCampaignRow({
      platform: 'TikTok',
      startDate: '3/15/2025', // Will test date conversion
    }),
  ],
  expectedErrors: 0,
  expectedWarnings: 0,
  edgeCases: ['custom'],
};

await generateTestFile(customScenario, './tests/fixtures/my-custom-test.xlsx');
```

### Generate Campaigns with Specific Overrides

```typescript
import { generateCampaigns } from '../core/testing/testDataGenerator';

// Generate 10 Meta campaigns
const metaCampaigns = generateCampaigns(10, {
  platform: 'Meta',
  channel: 'Paid Social',
});

// Generate campaigns with budget range
const highBudgetCampaigns = generateCampaigns(5, {
  budget: 200000,
});
```

---

## 🧪 Test Data Generator Agent

Use the Test Data Generator Agent for interactive test creation:

```
@test-data-generator-agent Create a test file with 3 Meta campaigns,
one with an invalid date format and one with a budget mismatch
```

### Common Agent Tasks

**Generate Edge Case:**
```
@test-data-generator-agent Generate a test file that has campaigns with
whitespace in platform names and trailing spaces in tactics
```

**Create Regression Test:**
```
@test-data-generator-agent Create a test file that reproduces the bug
where summary rows were incorrectly detected as campaign lines
```

**Performance Test:**
```
@test-data-generator-agent Generate a large test file with 200 campaigns
to test parsing performance
```

---

## 📊 Expected Validation Results

Each scenario includes expected error/warning counts:

| Scenario | Expected Errors | Expected Warnings | Purpose |
|----------|----------------|-------------------|---------|
| simple-meta | 0 | 0 | Happy path validation |
| date-formats | 1 | 0 | Auto-correction testing |
| platforms | 0 | 1 | Platform normalization |
| numeric | 0 | 2 | Number extraction |
| budget | 0 | 3 | Budget calculation |
| missing-fields | 5 | 0 | Required field validation |
| whitespace | 0 | 4 | Whitespace detection |
| kitchen-sink | 2 | 5 | Comprehensive testing |

---

## 🔍 Test File Structure

Generated test files follow the Unified Unilever Template:

```
┌─────────────────────────────────────────────────────────────┐
│ Row 1: Headers                                              │
│   Channel | Platform | Media Type | ... | Budget | Impr... │
├─────────────────────────────────────────────────────────────┤
│ Row 2+: Campaign Data                                       │
│   Paid Social | Meta | Video | ... | 50000 | 1000000      │
│   [Merged cells in Budget, Impressions, Placements cols]    │
├─────────────────────────────────────────────────────────────┤
│ Row N: Summary Rows (if applicable)                        │
│   TOTAL |  |  | ... | 150000 | 3000000                     │
└─────────────────────────────────────────────────────────────┘
```

### Key Features

- ✅ Proper header row with template-compliant column names
- ✅ Campaign lines with merged Budget, Impressions, Placements cells
- ✅ Summary rows with "TOTAL" or "Grand Total" in Channel field
- ✅ Realistic data values (CPM $5-$100, budgets $10k-$500k)
- ✅ Valid date ranges (2025 campaigns)

---

## 🎨 Customization

### Modify Data Pools

Edit [testDataGenerator.ts](testDataGenerator.ts) to customize:

```typescript
const CHANNELS = [
  'Paid Social',
  'Programmatic Display',
  'Your Custom Channel', // Add custom values
];

const TACTICS = [
  'Q1 Brand Awareness Campaign',
  'Your Custom Tactic', // Add custom values
];
```

### Create New Scenarios

Edit [edgeCases.ts](edgeCases.ts):

```typescript
export const SCENARIO_MY_CUSTOM: TestScenario = {
  name: 'My Custom Scenario',
  description: 'Testing specific behavior',
  campaigns: [
    generateCampaignRow({ /* overrides */ }),
  ],
  expectedErrors: 0,
  expectedWarnings: 0,
  edgeCases: ['myFeature'],
};

// Add to registry
export const ALL_SCENARIOS: Record<string, TestScenario> = {
  // ... existing scenarios
  'my-custom': SCENARIO_MY_CUSTOM,
};
```

---

## 🚀 Integration with CI/CD

### Run Tests in GitHub Actions

```yaml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npx tsx tests/generate-test-data.ts
      - run: npm test
```

### Regenerate Fixtures on Demand

```bash
# In package.json scripts:
{
  "scripts": {
    "test:fixtures": "npx tsx tests/generate-test-data.ts",
    "test:all": "npm run test:fixtures && npm test"
  }
}
```

---

## 📁 Output Directory

Test files are generated in: `tests/fixtures/`

```
tests/
├── fixtures/
│   ├── simple-meta.xlsx
│   ├── all-platforms.xlsx
│   ├── date-formats.xlsx
│   ├── platforms.xlsx
│   ├── numeric.xlsx
│   ├── budget.xlsx
│   ├── missing-fields.xlsx
│   ├── whitespace.xlsx
│   ├── summary.xlsx
│   ├── large.xlsx
│   └── kitchen-sink.xlsx
└── generate-test-data.ts
```

---

## 🤝 Contributing

When adding new features to QuickClick:

1. **Create test scenario** for the new feature
2. **Generate test file** with edge cases
3. **Write tests** that use the fixture
4. **Verify** tests pass before merging

---

## 🐛 Debugging

### View Generated File Structure

```bash
# Install Excel viewer (optional)
npm install -g xlsx-cli

# View file contents
xlsx tests/fixtures/simple-meta.xlsx
```

### Inspect Merge Patterns

```typescript
import ExcelJS from 'exceljs';

const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile('./tests/fixtures/multi-row.xlsx');
const worksheet = workbook.getWorksheet(1);

// Check merged cells
console.log(worksheet.model.merges);
// Output: { 'E2:E3': true, 'F2:F3': true, ... }
```

---

## 📚 Additional Resources

- [Data Validation Agent](../../.claude/agents/data-validation-agent.md)
- [Test Data Generator Agent](../../.claude/agents/test-data-generator-agent.md)
- [Validation Utilities](../validation/README.md)
- [Excel Parsing Logic](../excel/parseBlockingChart.ts)

---

## Success Metrics

- ✅ 100% of edge cases covered
- ✅ All validation paths tested
- ✅ Regression tests prevent bugs
- ✅ Performance validated with large datasets
- ✅ New features include test fixtures

Generate test data and make QuickClick bulletproof! 🛡️
