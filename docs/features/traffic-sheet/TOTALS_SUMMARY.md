# Campaign Totals Summary - Gut Check Feature

## Overview

The totals row from your blocking chart is now displayed as a prominent summary banner at the top of the verification screen! This provides an instant gut check to verify your data was imported correctly.

---

## 🎯 What It Does

### Extracts Totals Row

**Automatically finds the totals row:**
- Searches from bottom up
- Looks for "Total" or "Grand" in channel column
- Or identifies rows with multiple numeric values
- Extracts key metrics

### Displays at Top

**Prominent green banner shows:**
- 📊 Campaign Totals heading
- Key metrics: Budget, Impressions, Spend, etc.
- Large, bold numbers
- Easy to scan at a glance

### Removes from Table

**The totals row is:**
- ✅ Extracted and shown in summary
- ✅ Removed from the data table
- ✅ Not counted in "tactics" count
- ✅ Available as quick reference

---

## 🎨 Visual Display

### Totals Summary Banner

```
┌─────────────────────────────────────────────────────┐
│ 📊 Campaign Totals (Gut Check)                      │
│    Verify these totals match your blocking chart    │
│                                                      │
│    BUDGET          IMPRESSIONS         SPEND        │
│    $125,000        15,000,000          $120,500     │
└─────────────────────────────────────────────────────┘
```

**Styling:**
- Green gradient background
- Large bold numbers
- Uppercase column labels
- Professional appearance
- Stands out from rest of page

### Location

**Positioned at top of verification screen:**
```
✅ Filename • 25 tactics • 14 columns
├─────────────────────────────────────┤
│ 📊 Campaign Totals (Gut Check)      │ ← Totals banner
│    $125,000 • 15M impressions       │
├─────────────────────────────────────┤
│ Data Table (without totals row)     │
│ Row 1: YouTube Pre-Roll              │
│ Row 2: Hulu Video                    │
│ ...                                  │
```

---

## 📊 What Gets Displayed

### Automatically Shows Relevant Metrics

**Displayed if present:**
- 💰 **Budget** / Total Budget
- 📈 **Impressions** / Total Impressions
- 💵 **Spend** / Total Spend / Total Cost
- 📊 Any column with "Total" in name
- 🔢 Any numeric values in totals row

**Not displayed:**
- Text-only fields
- Empty fields
- Non-numeric metadata

### Smart Column Detection

**Looks for these keywords in headers:**
- "budget"
- "total"
- "impression"
- "spend"
- "cost"

**Plus any numeric values in the totals row**

---

## 💡 Use Cases

### Gut Check #1: Budget Verification

**Quick check:**
```
See: Total Budget = $125,000
Think: "My campaign is $125K, that's correct ✓"
Action: Proceed with confidence
```

**Catch error:**
```
See: Total Budget = $12,500
Think: "Wait, should be $125K, not $12.5K!"
Action: Go back and fix blocking chart
```

### Gut Check #2: Impression Count

**Quick check:**
```
See: Total Impressions = 15,000,000
Think: "15M impressions looks right ✓"
Action: Continue to generate
```

**Catch error:**
```
See: Total Impressions = 150,000
Think: "Only 150K? Should be 15M!"
Action: Check if data imported correctly
```

### Gut Check #3: Campaign Scope

**Quick overview:**
```
Total Budget: $125,000
Total Impressions: 15,000,000
→ Implied CPM: ~$8.33
```

**Immediate sanity check on campaign economics**

---

## 🔍 How Detection Works

### Finding the Totals Row

**Step-by-step:**

1. **Start from bottom** of data (before variance)
2. **Look for "Total" or "Grand"** in channel column
   ```
   Channel: "Total" → Found!
   Channel: "Grand Total" → Found!
   Channel: "TOTAL" → Found!
   ```

3. **Or look for multiple numeric values**
   ```
   If row has 3+ numeric values and is in last 5 rows → Likely totals
   ```

4. **Take the first match** (from bottom up)

### Extracting Values

**For each column:**
1. Check if column name suggests it's a total (budget, impressions, etc.)
2. Or check if value is numeric
3. If yes, include in summary display
4. Format numbers with commas for readability

---

## 📝 Examples

### Example 1: Standard Blocking Chart

**Totals Row:**
```
Channel: Total
Budget: 125000
Impressions: 15000000
Spend: 120500
```

**Summary Display:**
```
📊 Campaign Totals (Gut Check)

BUDGET          IMPRESSIONS         SPEND
$125,000        15,000,000          $120,500
```

### Example 2: Minimal Totals

**Totals Row:**
```
Channel: Total
Budget: 50000
```

**Summary Display:**
```
📊 Campaign Totals (Gut Check)

BUDGET
$50,000
```

### Example 3: No Totals Row

**If no totals row found:**
- Summary banner doesn't appear
- All rows shown in table
- No error message needed

---

## 🎯 Benefits

### Instant Verification
- ✅ See totals immediately
- ✅ No scrolling to bottom
- ✅ Prominent display
- ✅ Easy to spot issues

### Cleaner Table
- ✅ Totals row removed from table
- ✅ Only individual tactics shown
- ✅ Better focus on line items
- ✅ Less confusion

### Better UX
- ✅ Gut check right at top
- ✅ Confidence before generating
- ✅ Catch import errors early
- ✅ Professional appearance

### Time Savings
- ✅ No need to scroll to find totals
- ✅ Quick glance verification
- ✅ Faster decision making
- ✅ More efficient workflow

---

## 🔧 Customization

### Change Totals Detection

**To look for different keywords:**
```typescript
if (channelValue.includes('total') || 
    channelValue.includes('grand') ||
    channelValue.includes('sum') ||      // Add "sum"
    channelValue.includes('subtotal')) {  // Add "subtotal"
  return { row, index: i };
}
```

### Add More Metric Types

**To display additional columns:**
```typescript
const isTotalColumn = actualHeader.toLowerCase().includes('budget') || 
                     actualHeader.toLowerCase().includes('impression') ||
                     actualHeader.toLowerCase().includes('reach') ||      // Add reach
                     actualHeader.toLowerCase().includes('frequency') ||  // Add frequency
                     actualHeader.toLowerCase().includes('grp');          // Add GRPs
```

### Change Display Format

**To format currency:**
```typescript
{typeof value === 'number' 
  ? `$${value.toLocaleString()}` 
  : String(value)}
```

**To show decimals:**
```typescript
{typeof value === 'number' 
  ? value.toLocaleString(undefined, {minimumFractionDigits: 2}) 
  : String(value)}
```

---

## 🐛 Troubleshooting

### Issue: Totals Not Detected

**Possible causes:**
1. Totals row doesn't have "Total" in channel
2. Totals row is after variance
3. Totals row has fewer than 3 numeric values

**Solutions:**
1. Ensure totals row has "Total" or "Grand Total" in channel column
2. Move totals row before variance row
3. Or manually verify without totals banner

### Issue: Wrong Row Detected as Totals

**Cause:** Another row has "total" in channel or many numbers

**Solution:**
Check your blocking chart:
- Ensure only one row has "Total" in channel
- Or adjust detection logic to be more specific

### Issue: Not All Metrics Showing

**Cause:** Column headers don't match expected keywords

**Solution:**
1. Check column names (Budget vs. Total Budget vs. Campaign Budget)
2. Add keyword variations to detection logic
3. Or accept that only clearly labeled columns show

---

## ✅ Expected Display

### Typical Metrics Shown

**Most common:**
- Total Budget / Campaign Budget
- Total Impressions
- Total Spend
- CPM (if calculated)
- Flight dates (if numeric format)

**May also include:**
- GRPs / Total GRPs
- Reach
- Frequency
- Click totals
- Conversions

### Order

**Metrics appear in the same order as columns in your blocking chart:**
- Left to right
- Only numeric/total columns
- Empty values skipped

---

## 🚀 Workflow Impact

### Before (No Totals Summary)

1. Upload blocking chart
2. Scroll through all tactics
3. Scroll to bottom to see totals
4. Scroll back up to verify tactics
5. Hope you remembered the totals

### After (With Totals Summary)

1. Upload blocking chart
2. **See totals immediately at top** ✨
3. "Yep, $125K looks right!"
4. Verify individual tactics
5. Generate with confidence

**Faster and more confident!**

---

## 📚 Related Features

**Totals summary works with:**
- ✅ Blank column/row filtering
- ✅ Tab categorization
- ✅ Manual recategorization
- ✅ Section headers
- ✅ Full-width display

**All features enhance verification experience!**

---

**The totals summary provides instant validation that your blocking chart imported correctly!** 📊✅

*Updated: October 11, 2025*
*Version: 1.8.0 - Campaign Totals Summary*

