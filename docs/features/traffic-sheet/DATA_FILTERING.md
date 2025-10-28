# Data Filtering in Verification Screen

## Overview

The verification screen now automatically filters the data to show only relevant information, making it cleaner and more focused.

---

## 🔍 Filtering Rules

### 1. Row Filtering: Stop at "Variance"
**Rule**: Display all rows up to and including the "Variance" field

**How it works:**
- Searches through all rows for any cell containing "variance" (case-insensitive)
- Shows all tactics up to and including that variance row
- Removes any summary rows, totals, or notes that come after variance
- If no "variance" field is found, shows all rows (fallback)

**Example:**
```
Row 1: Tactic 1           ← Show
Row 2: Tactic 2           ← Show
Row 3: Tactic 3           ← Show
...
Row 25: Variance: 5%      ← Show (last row)
Row 26: Grand Total       ← HIDE
Row 27: Notes             ← HIDE
```

### 2. Column Filtering: First 18 Columns Only
**Rule**: Display only columns 0-17 (first 18 columns)

**How it works:**
- Shows columns with indices 0 through 17
- Hides column 18 (index 18) and all columns after it
- Typically removes internal tracking columns, formulas, or extra metadata

**Example:**
```
Columns 0-17: Core campaign data     ← Show
Column 18+: Internal tracking        ← HIDE
```

---

## 💡 Why Filter?

### Cleaner View
- **Before**: 50+ rows including totals, notes, calculations
- **After**: Only actual tactics/line items

### Faster Verification
- Focus on campaign data
- No distraction from summary rows
- Easier to scan and verify

### Better Performance
- Less data to render
- Faster table scrolling
- More responsive interface

### Relevant Data Only
- Hides internal columns not needed for verification
- Shows only client-facing information
- Reduces cognitive load

---

## 📊 What Gets Filtered

### Typical Rows Removed:
- ❌ Grand totals
- ❌ Summary rows
- ❌ Footer notes
- ❌ Calculation rows
- ❌ Empty spacer rows after variance

### Typical Columns Removed:
- ❌ Internal IDs
- ❌ Formula columns
- ❌ Version tracking
- ❌ Approval status
- ❌ Extra metadata fields

### What Stays:
- ✅ All tactic/line item rows
- ✅ Variance row (if present)
- ✅ First 18 columns (core data)
- ✅ All relevant campaign information

---

## 🎯 Technical Implementation

### Row Filtering Logic

```typescript
const filteredRows = (() => {
  // Find row containing "variance"
  const varianceRowIndex = data.rows.findIndex(row => {
    return Object.values(row).some(value => 
      String(value).toLowerCase().includes('variance')
    );
  });
  
  // Return rows up to and including variance row
  // If no variance found, return all rows
  return varianceRowIndex >= 0 
    ? data.rows.slice(0, varianceRowIndex + 1) 
    : data.rows;
})();
```

### Column Filtering Logic

```typescript
// Only show first 18 columns (indices 0-17)
const filteredHeaders = data.headers.slice(0, 18);
```

### Display Updates

The info bar and button automatically reflect the filtered counts:
- "X tactics • 18 columns" (shows filtered count)
- "Generate Traffic Sheet (X tactics)" (uses filtered count)

---

## 📝 Examples

### Example 1: Standard Blocking Chart

**Original Data:**
- 30 rows (25 tactics + 1 variance + 4 summary rows)
- 22 columns (18 client-facing + 4 internal)

**Filtered Display:**
- 26 rows (25 tactics + variance row)
- 18 columns (client-facing only)

**Hidden:**
- 4 summary/total rows
- 4 internal tracking columns

### Example 2: Simple Blocking Chart (No Variance)

**Original Data:**
- 15 rows (all tactics, no variance field)
- 25 columns

**Filtered Display:**
- 15 rows (all shown, no variance to filter by)
- 18 columns (first 18 only)

**Hidden:**
- 0 rows (no variance found, shows all)
- 7 extra columns (columns 19-25)

### Example 3: Complex Blocking Chart

**Original Data:**
- 100 rows (80 tactics + variance + 19 calculation rows)
- 30 columns

**Filtered Display:**
- 81 rows (80 tactics + variance)
- 18 columns

**Hidden:**
- 19 calculation/summary rows
- 12 extra columns

---

## 🔧 Customizing Filters

### Change Row Cutoff

To use a different field instead of "variance":

```typescript
// Change 'variance' to your field name
const cutoffRowIndex = data.rows.findIndex(row => {
  return Object.values(row).some(value => 
    String(value).toLowerCase().includes('your-field-name')
  );
});
```

### Change Column Limit

To show more or fewer columns:

```typescript
// Change 18 to your desired number
const filteredHeaders = data.headers.slice(0, 18);  // Change this number
```

### Remove Filtering

To show all data without filtering:

```typescript
// Use original data
const filteredRows = data.rows;          // All rows
const filteredHeaders = data.headers;     // All columns
```

---

## ✅ Benefits Summary

### User Experience
- ✅ Cleaner, more focused view
- ✅ Faster to scan and verify
- ✅ No irrelevant data
- ✅ Professional appearance

### Performance
- ✅ Less data to render
- ✅ Faster page load
- ✅ Smoother scrolling
- ✅ Better responsiveness

### Accuracy
- ✅ Focus on actual tactics
- ✅ No confusion from totals
- ✅ Clear what needs verification
- ✅ Easier to spot issues

---

## 🎨 Display Indicators

The UI automatically updates to show filtered counts:

**File Info Bar:**
```
✅ filename.xlsx • 26 tactics • 18 columns
```
- Shows filtered row count (not total)
- Shows filtered column count (18)
- Clear and accurate

**Generate Button:**
```
✓ Looks Good, Generate Traffic Sheet (26 tactics) →
```
- Uses filtered count
- User knows exactly what they're generating

---

## 🔍 Troubleshooting

### Issue: Too Few Rows Showing

**Possible Causes:**
1. Variance field is appearing early in the data
2. Cell contains "variance" unexpectedly

**Solution:**
- Check your blocking chart
- Ensure "variance" only appears in the intended row
- Or adjust the filtering logic

### Issue: Need to See Removed Rows

**Solution:**
The original data is still sent to the API for generation. The filtering only affects the verification display.

If you need to see all rows:
1. Temporarily remove the filtering
2. Or check the downloaded traffic sheet
3. Or inspect the original blocking chart

### Issue: Column 18 Has Important Data

**Solution:**
Adjust the column limit:
```typescript
const filteredHeaders = data.headers.slice(0, 19);  // Show 19 columns
```

---

## 📚 Related Documentation

- **LAYOUT_IMPROVEMENTS.md** - Full-width display details
- **NEW_FEATURES.md** - Verification workflow
- **QUICKSTART.md** - User guide
- **TESTING_GUIDE.md** - Testing procedures

---

**Smart data filtering makes verification faster and more accurate!** 🎯

*Updated: October 11, 2025*
*Version: 1.3.1 - Smart Data Filtering*

