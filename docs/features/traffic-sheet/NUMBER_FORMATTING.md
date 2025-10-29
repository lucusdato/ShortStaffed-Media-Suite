# Number Formatting in Totals Summary

## Overview

The Campaign Totals summary now uses intelligent number formatting! Currency values display with dollar signs and decimals, while impressions and GRPs display as whole numbers with commas.

---

## 💰 Formatting Rules

### Currency Format (with $ and decimals)

**Applied to:**
- CPM
- Media Cost
- Ad Serving
- DV Cost
- Media Buffer
- Working Media Cost
- Budget
- Spend
- Any field with "cost", "budget", or "spend" in the name

**Format:** `$1,234.56`

**Examples:**
```
CPM: $12.50
Media Cost: $125,000.00
Ad Serving: $5,000.00
Budget: $250,000.00
DV Cost: $3,500.50
Media Buffer: $10,000.00
Working Media Cost: $115,000.00
```

### Number Format (with commas, no decimals)

**Applied to:**
- Impressions
- GRPs
- Any field with "impression" or "grp" in the name

**Format:** `1,234,567`

**Examples:**
```
Impressions: 15,000,000
Total Impressions: 25,500,000
GRPs: 1,250
Total GRPs: 2,500
```

### Default Format (with commas)

**Applied to:**
- Other numeric fields
- General totals

**Format:** `1,234.56` or `1,234`

---

## 🎨 Visual Display

### Totals Summary Banner

```
┌──────────────────────────────────────────────────────────────┐
│ 📊 Campaign Totals (Gut Check)                               │
│    Verify these totals match your blocking chart             │
│                                                               │
│  IMPRESSIONS      MEDIA COST        CPM        AD SERVING    │
│  15,000,000       $125,000.00       $8.33      $5,000.00     │
└──────────────────────────────────────────────────────────────┘
```

**Features:**
- ✅ Large, bold numbers
- ✅ Proper currency symbols
- ✅ Comma separators for readability
- ✅ Consistent decimal places
- ✅ Professional formatting

---

## 📊 Formatting Examples

### Example 1: Standard Campaign Totals

**Raw Values from Excel:**
```
Total Impressions: 15000000
Media Cost: 125000
CPM: 8.33
Ad Serving: 5000
GRPs: 1250
```

**Formatted Display:**
```
IMPRESSIONS          MEDIA COST         CPM          AD SERVING      GRPS
15,000,000          $125,000.00        $8.33        $5,000.00       1,250
```

### Example 2: Large Budget Campaign

**Raw Values:**
```
Working Media Cost: 2500000
Total Impressions: 125000000
Media Buffer: 250000
DV Cost: 75000
```

**Formatted Display:**
```
WORKING MEDIA COST    IMPRESSIONS         MEDIA BUFFER      DV COST
$2,500,000.00        125,000,000         $250,000.00       $75,000.00
```

### Example 3: Small Campaign

**Raw Values:**
```
Budget: 50000
Impressions: 2500000
CPM: 20
```

**Formatted Display:**
```
BUDGET              IMPRESSIONS         CPM
$50,000.00         2,500,000           $20.00
```

---

## 🔍 Format Detection Logic

### How It Works

**For each metric in the totals row:**

1. **Extract value** from totals row
2. **Check header name** for keywords
3. **Determine format type:**
   ```typescript
   if (header includes 'cpm', 'cost', 'budget', 'spend', etc.)
     → Currency format
   else if (header includes 'impression', 'grp')
     → Number format (no decimals)
   else if (value is numeric)
     → Default number format
   ```
4. **Apply formatting**
5. **Display in summary**

### Keyword Detection

**Currency keywords:**
```javascript
const isCurrency = 
  header.includes('cpm') ||
  header.includes('cost') ||
  header.includes('budget') ||
  header.includes('spend') ||
  header.includes('media cost') ||
  header.includes('ad serving') ||
  header.includes('dv cost') ||
  header.includes('media buffer') ||
  header.includes('working media');
```

**Number keywords:**
```javascript
const isNumberWithCommas = 
  header.includes('impression') ||
  header.includes('grp');
```

---

## 💡 Benefits

### Better Readability

**Currency values:**
- ✅ $ symbol makes it clear it's money
- ✅ Decimals show precise amounts
- ✅ Commas for thousands
- ✅ Professional appearance

**Impression values:**
- ✅ No decimals (you can't have 0.5 impressions!)
- ✅ Commas make large numbers readable
- ✅ Clear at a glance
- ✅ Industry standard format

### Easier Gut Checks

**Before:**
```
Budget: 125000  ← Hard to read
CPM: 8.333333   ← Too many decimals
Impressions: 15000000  ← No commas
```

**After:**
```
Budget: $125,000.00     ← Clear!
CPM: $8.33              ← Perfect!
Impressions: 15,000,000 ← Easy to read!
```

### Catch Errors Faster

**Spot issues immediately:**
```
See: CPM: $833.00
Think: "Wait, that's way too high!"
→ Catch import error before generating
```

```
See: Impressions: 15,000
Think: "Only 15K? Should be millions!"
→ Fix blocking chart data
```

---

## 🔧 Customization

### Add More Currency Fields

**To format additional fields as currency:**
```typescript
const isCurrency = headerLower.includes('cpm') ||
                  headerLower.includes('cost') ||
                  headerLower.includes('budget') ||
                  headerLower.includes('rate') ||      // Add rate
                  headerLower.includes('fee') ||       // Add fee
                  headerLower.includes('price');       // Add price
```

### Change Currency Symbol

**For different currencies:**
```typescript
// Euro format
formattedValue = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',  // Change to EUR
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(numValue);
```

### Adjust Decimal Places

**For CPM with more precision:**
```typescript
if (headerLower.includes('cpm')) {
  // Show 4 decimal places for CPM
  formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 4,
    maximumFractionDigits: 4
  }).format(numValue);
}
```

### Add GRP Formatting

**To show GRPs with one decimal:**
```typescript
if (headerLower.includes('grp')) {
  formattedValue = numValue.toLocaleString('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });
}
```

---

## 📊 Format Specifications

### Currency Format

**Specification:**
```
Format: $X,XXX.XX
Min decimals: 2
Max decimals: 2
Thousands separator: comma
Currency symbol: $ (USD)
```

**Implementation:**
```typescript
new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(value);
```

**Examples:**
- `1000` → `$1,000.00`
- `1234.5` → `$1,234.50`
- `1234567.89` → `$1,234,567.89`
- `8.333` → `$8.33` (rounded)

### Number Format (Impressions/GRPs)

**Specification:**
```
Format: X,XXX,XXX
Min decimals: 0
Max decimals: 0
Thousands separator: comma
```

**Implementation:**
```typescript
numValue.toLocaleString('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});
```

**Examples:**
- `15000000` → `15,000,000`
- `1250` → `1,250`
- `1234567.89` → `1,234,568` (rounded to whole)
- `2500000.5` → `2,500,001` (rounded up)

---

## 🎯 Field Mapping

### Which Fields Get Which Format

**Currency Format ($X,XXX.XX):**
- CPM
- Media Cost
- Ad Serving
- Ad Serving Cost
- DV Cost
- Data Verification Cost
- Media Buffer
- Working Media Cost
- Total Budget
- Campaign Budget
- Net Media Cost
- Gross Media Cost
- Any field with "cost", "budget", or "spend"

**Number Format (X,XXX,XXX):**
- Impressions
- Total Impressions
- Planned Impressions
- GRPs
- Total GRPs
- Planned GRPs
- Any field with "impression" or "grp"

**Default Format:**
- Other numeric fields
- Percentages
- Ratios
- General numbers

---

## ✅ Expected Display

### Complete Totals Example

```
┌──────────────────────────────────────────────────────────────────────┐
│ 📊 Campaign Totals (Gut Check)                                       │
│                                                                       │
│  IMPRESSIONS    MEDIA COST      CPM      AD SERVING   WORKING MEDIA  │
│  15,000,000     $125,000.00     $8.33    $5,000.00    $120,000.00    │
│                                                                       │
│  DV COST        MEDIA BUFFER    GRPS                                 │
│  $2,500.00      $7,500.00       1,250                                │
└──────────────────────────────────────────────────────────────────────┘
```

**Notice:**
- ✅ Impressions: No decimals, commas
- ✅ All costs: $ symbol, 2 decimals
- ✅ CPM: $ symbol (it's a rate)
- ✅ GRPs: No decimals, commas
- ✅ Consistent, professional formatting

---

## 🧪 Test Cases

### Test Case 1: Large Numbers

**Input:**
```
Total Impressions: 125000000
Working Media Cost: 2500000
```

**Output:**
```
IMPRESSIONS          WORKING MEDIA COST
125,000,000         $2,500,000.00
```

### Test Case 2: Small Decimals

**Input:**
```
CPM: 8.333333
DV Cost: 2500.5
```

**Output:**
```
CPM              DV COST
$8.33           $2,500.50
```

### Test Case 3: Mixed Values

**Input:**
```
Budget: 50000
Impressions: 5000000
CPM: 10
GRPs: 125
Ad Serving: 2500
```

**Output:**
```
BUDGET          IMPRESSIONS      CPM       GRPS        AD SERVING
$50,000.00     5,000,000        $10.00    125         $2,500.00
```

---

## 🎨 Professional Presentation

### Industry Standard

**Media industry expects:**
- Currency values with cents
- Impressions as whole numbers
- CPMs with 2 decimal places
- GRPs as whole or single decimal

**Your output matches industry standards!**

### Client-Ready

**Clients immediately understand:**
- $ = Money (budget, costs, fees)
- No $ = Quantities (impressions, GRPs)
- Commas = Easy to read large numbers
- Consistent formatting = Professional

---

## 🔍 Edge Cases

### Handling Non-Numeric Values

**If value is text:**
```
CPM: "TBD" → Shows as "TBD" (no formatting)
Budget: "Pending" → Shows as "Pending"
```

**If value is already formatted:**
```
Budget: "$125,000" → Parsed and reformatted to $125,000.00
CPM: "8.33" → Parsed and formatted to $8.33
```

### Handling Zero Values

**Zero is formatted the same way:**
```
Budget: 0 → $0.00
Impressions: 0 → 0
```

**Shows you if totals weren't calculated**

### Handling Missing Values

**If column exists but value is empty:**
- Not displayed in totals summary
- Only shows metrics with actual values
- Keeps summary clean

---

## 📚 Related Features

**Number formatting works with:**
- ✅ Totals row extraction
- ✅ Blank column/row filtering
- ✅ Tab categorization
- ✅ All other verification features

**Provides professional, readable summary!**

---

**Smart number formatting makes totals instantly readable and professional!** 💰📊

*Updated: October 11, 2025*
*Version: 1.8.1 - Professional Number Formatting*

