# Column Mapping Guide

This guide explains how to customize the column mapping between your blocking chart and traffic sheet template.

## 📊 Understanding the Mapping Process

The Traffic Sheet Automation tool reads data from your blocking chart and maps it to the corresponding columns in your traffic sheet template. The mapping logic is located in:

```
/core/excel/generateTrafficSheet.ts
```

## 🔧 How to Customize Mapping

### Step 1: Identify Your Columns

First, identify the exact column names in both your blocking chart and traffic sheet template.

#### Example Blocking Chart Columns:
- Campaign Name
- Channel
- Tactic
- Platform
- Placement Type
- Ad Format
- Ad Size
- Buy Type
- Start Date
- End Date
- Flight Dates
- Impressions
- CPM
- Budget
- Target Audience
- Creative Name
- Landing Page URL
- Tracking Pixel
- Notes

#### Example Traffic Sheet Template Columns:
- Line Item Name
- Channel
- Platform/Publisher
- Tactic
- Placement Type
- Format
- Size
- Campaign Start
- Campaign End
- Total Impressions
- Rate (CPM)
- Total Budget
- Target Demo
- Creative Assets
- Destination URL
- Third Party Tracking
- Comments

### Step 2: Create the Mapping

Edit the `mapBlockingChartToTrafficSheet` function in `/core/excel/generateTrafficSheet.ts`:

```typescript
function mapBlockingChartToTrafficSheet(
  blockingChartData: ParsedBlockingChart
): TrafficSheetRow[] {
  return blockingChartData.rows.map((row) => {
    const trafficSheetRow: TrafficSheetRow = {};

    // Map: Blocking Chart Column -> Traffic Sheet Column
    // Example mappings:
    
    // Direct mappings (same name in both)
    if (row.channel) trafficSheetRow.channel = row.channel;
    if (row.platform) trafficSheetRow.platform = row.platform;
    if (row.tactic) trafficSheetRow.tactic = row.tactic;
    
    // Renamed mappings
    if (row.adFormat) trafficSheetRow.format = row.adFormat;
    if (row.adSize) trafficSheetRow.size = row.adSize;
    if (row.startDate) trafficSheetRow.campaignstart = row.startDate;
    if (row.endDate) trafficSheetRow.campaignend = row.endDate;
    if (row.impressions) trafficSheetRow.totalimpressions = row.impressions;
    if (row.cpm) trafficSheetRow.ratecpm = row.cpm;
    if (row.budget) trafficSheetRow.totalbudget = row.budget;
    if (row.targetAudience) trafficSheetRow.targetdemo = row.targetAudience;
    if (row.creativeName) trafficSheetRow.creativeassets = row.creativeName;
    if (row.landingPage) trafficSheetRow.destinationurl = row.landingPage;
    if (row.trackingPixel) trafficSheetRow.thirdpartytracking = row.trackingPixel;
    if (row.notes) trafficSheetRow.comments = row.notes;
    
    // Concatenated mappings (combining multiple columns)
    if (row.placementType && row.platform) {
      trafficSheetRow.lineitemname = `${row.platform} - ${row.placementType}`;
    }
    
    // Calculated mappings
    if (row.impressions && row.budget) {
      trafficSheetRow.calculatedcpm = (row.budget / row.impressions) * 1000;
    }

    return trafficSheetRow;
  });
}
```

### Step 3: Test Your Mapping

1. Upload your blocking chart
2. Click "Preview Data" to see how the columns are mapped
3. Verify all data appears in the correct columns
4. If something is missing or incorrectly mapped, adjust the mapping function
5. Generate the final traffic sheet

## 📝 Common Mapping Patterns

### Pattern 1: Direct Mapping
When columns have the same name in both files:
```typescript
if (row.channel) trafficSheetRow.channel = row.channel;
```

### Pattern 2: Renamed Mapping
When columns have different names:
```typescript
if (row.adFormat) trafficSheetRow.format = row.adFormat;
```

### Pattern 3: Concatenation
Combining multiple source columns:
```typescript
trafficSheetRow.fullname = `${row.firstName} ${row.lastName}`;
```

### Pattern 4: Calculation
Computing values:
```typescript
if (row.impressions && row.budget) {
  trafficSheetRow.cpm = (row.budget / row.impressions) * 1000;
}
```

### Pattern 5: Conditional Mapping
Different mapping based on conditions:
```typescript
if (row.buyType === "CPM") {
  trafficSheetRow.rate = row.cpm;
} else if (row.buyType === "CPC") {
  trafficSheetRow.rate = row.cpc;
}
```

### Pattern 6: Default Values
Providing defaults when data is missing:
```typescript
trafficSheetRow.status = row.status || "Active";
```

## 🔍 Debugging Tips

### Check Column Names
The parser automatically normalizes column names to camelCase. For example:
- "Start Date" becomes "startDate"
- "Target Audience" becomes "targetAudience"
- "CPM ($)" becomes "cpm"

To see the actual normalized names, use the Preview feature.

### Handle Merged Cells
The parser automatically handles merged cells by taking the value from the top-left cell. No special handling needed.

### Missing Data
If some rows are missing data, the parser will simply skip those fields. Make sure your blocking chart is complete.

## 📄 Template Customization

### Unilever Traffic Sheet Template

The Unilever template has a specific structure:
1. Header rows with campaign information (rows 1-5)
2. Column headers (row 6 or 7)
3. Data rows start after headers

The `findDataStartRow` function automatically detects where data should start based on:
- Looking for common column header keywords
- Detecting bold formatting (headers are usually bold)

If the auto-detection doesn't work, you can hardcode the data start row:

```typescript
function findDataStartRow(worksheet: ExcelJS.Worksheet): number {
  return 8; // Hardcode to row 8 if auto-detection fails
}
```

## 🎯 Best Practices

1. **Always Preview First** - Use the preview feature to verify mapping before generating
2. **Keep Naming Consistent** - Use the same column names across all your blocking charts
3. **Document Custom Mappings** - If you add custom logic, document it in comments
4. **Test with Sample Data** - Start with a small blocking chart to test your mapping
5. **Validate Required Fields** - Make sure critical fields are always mapped

## 🆘 Troubleshooting

### Problem: Columns not mapping correctly
**Solution**: Check the Preview data to see the normalized column names, then update your mapping function to match those exact names.

### Problem: Data appearing in wrong columns
**Solution**: Verify the column headers in your traffic sheet template match the field names you're mapping to.

### Problem: Merged cells causing issues
**Solution**: The parser handles merged cells automatically, but if you see issues, check that merged cells in your template aren't interfering with data insertion.

### Problem: Dates not formatting correctly
**Solution**: Excel dates need special handling. Add date formatting in the mapping:
```typescript
if (row.startDate) {
  trafficSheetRow.campaignstart = new Date(row.startDate);
}
```

## 📞 Need Help?

If you need help with a specific mapping scenario, use the Bug Report feature in the app to describe your situation, and we'll help you create the right mapping logic.

