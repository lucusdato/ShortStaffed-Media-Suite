# Manual Recategorization Feature

## Overview

Users can now manually override the automatic tab categorization for any tactic in the verification screen! This gives you full control over where each tactic appears in the final traffic sheet.

---

## 🎯 Why Manual Recategorization?

While the tool intelligently categorizes tactics based on channel and placement data, you may sometimes want to:
- Correct misclassified tactics
- Organize tactics differently for specific campaigns
- Move edge cases to the right tab
- Override automatic logic with business rules

---

## 🔧 How to Use

### In the Verification Screen

**Each tactic row has a dropdown in the "Tab Assignment" column:**

1. **Review automatic assignments**
   - Look at the color-coded badges
   - Blue = Brand Say Digital
   - Purple = Brand Say Social
   - Green = Other Say Social

2. **Change if needed**
   - Click the dropdown on any row
   - Select the correct tab
   - Change takes effect immediately

3. **Visual feedback**
   - Badge color changes instantly
   - ✏️ pencil icon appears next to changed rows
   - Override counter shows in file info bar

4. **Generate**
   - Your manual changes are respected in the output
   - Tactics appear in the tabs you selected

### Example

**Automatic categorization:**
```
Row 5: Meta Feed Video → Brand Say Social (auto)
```

**You notice it should be in Other Say Social:**
```
1. Click dropdown on row 5
2. Select "Other Say Social"
3. Badge changes to green
4. ✏️ icon appears
5. Info bar shows "1 manual override"
```

**When you generate:**
```
Row 5 appears in "Other Say Social" tab (your choice, not auto)
```

---

## 🎨 Visual Indicators

### Badges

**Automatic (no changes):**
```
┌────┬──────────────────────┬─────────────┐
│ 5  │ Brand Say Social     │ Meta Feed   │
│    │ (purple badge)       │             │
```

**Manual Override:**
```
┌────┬──────────────────────┬─────────────┐
│ 5  │ Other Say Social ✏️  │ Meta Feed   │
│    │ (green badge + pen)  │             │
```

### Info Bar Counter

**No Overrides:**
```
✅ blocking-chart.xlsx • 25 tactics • 17 columns
```

**With Overrides:**
```
✅ blocking-chart.xlsx • 25 tactics • 17 columns • 3 manual overrides
```
The counter appears in amber/orange to highlight manual changes.

---

## 🔄 Updated Categorization Logic

### Social Platforms Now Default to Brand Say Social

**Before:**
- Meta, TikTok, Pinterest → Other Say Social (unless "Brand Say Video")

**After:**
- Meta, TikTok, Pinterest → **Brand Say Social** (default)
- Only → Other Say Social if explicitly marked "Influencer"

### Updated Rules

**Brand Say Social** (default for social platforms):
```
✓ Paid Social + Meta → Brand Say Social
✓ Paid Social + TikTok → Brand Say Social
✓ Paid Social + Pinterest → Brand Say Social
✓ Paid Social + Reddit → Brand Say Social
✓ Paid Social + Snapchat → Brand Say Social
✓ Paid Social + Instagram → Brand Say Social
✓ Paid Social + Facebook → Brand Say Social
```

**Other Say Social** (only for influencer):
```
✓ Paid Social + Meta + "Influencer" in placement/tactic → Other Say Social
✓ Paid Social + TikTok + "Influencer" → Other Say Social
✓ Paid Social + Instagram + "Influencer" → Other Say Social
```

### Examples

**Scenario 1: Meta Feed Campaign**
```
Channel: Paid Social
Placement: Meta Feed Video
Tactic: Brand Awareness

Auto-categorized: Brand Say Social ✓
```

**Scenario 2: TikTok Influencer**
```
Channel: Paid Social
Placement: TikTok Influencer Partnership
Tactic: Creator Content

Auto-categorized: Other Say Social ✓
```

**Scenario 3: Pinterest Standard**
```
Channel: Paid Social
Placement: Pinterest Promoted Pin
Tactic: Product Discovery

Auto-categorized: Brand Say Social ✓
(Previously would have gone to Other Say Social - now fixed!)
```

---

## 💡 Best Practices

### When to Use Manual Override

**Good reasons to override:**
- ✅ Auto-categorization is clearly wrong
- ✅ Business rule requires specific grouping
- ✅ Client preference for organization
- ✅ Special campaign structure
- ✅ Testing different configurations

**Not recommended:**
- ❌ Changing every row (update the auto-logic instead)
- ❌ Random changes without reason
- ❌ Inconsistent overrides across similar tactics

### Workflow

1. **Review auto-categorization first**
   - Most tactics should be correct
   - Only change what's actually wrong

2. **Make targeted changes**
   - Override specific rows that need it
   - Keep most auto-assignments

3. **Be consistent**
   - If you override one Meta tactic, check others
   - Apply same logic to similar tactics

4. **Document your reasons**
   - Know why you made each change
   - Share logic with team for consistency

---

## 🔍 Common Override Scenarios

### Scenario 1: Mixed Campaign Type

**Situation:** Meta campaign that's partly brand, partly influencer

**Auto-categorization:**
```
Row 5: Meta Feed → Brand Say Social
Row 6: Meta Stories → Brand Say Social
Row 7: Meta Influencer → Other Say Social (has "influencer")
```

**If you want all in Brand Say Social:**
```
Change row 7: Other Say Social → Brand Say Social
```

### Scenario 2: Digital Audio Misclassified

**Situation:** Audio campaign not recognized

**Auto-categorization:**
```
Row 3: Spotify Audio → Brand Say Digital (default)
```

**If it should be elsewhere:**
```
Change row 3: Brand Say Digital → Your choice
```

### Scenario 3: Programmatic Social

**Situation:** Programmatic social buy

**Auto-categorization:**
```
Row 8: Programmatic Social → Brand Say Digital (has "programmatic")
```

**If it should be in social:**
```
Change row 8: Brand Say Digital → Brand Say Social
```

---

## 🎯 Dropdown Options

Each tactic can be assigned to:

1. **Brand Say Digital** 🔵
   - Digital Video
   - Digital Display  
   - Digital Audio
   - Programmatic

2. **Brand Say Social** 🟣
   - Paid Social platforms
   - Meta, TikTok, Pinterest
   - Brand-created content

3. **Other Say Social** 🟢
   - Influencer partnerships
   - User-generated content
   - Creator collaborations

Simply click the dropdown and select the appropriate tab!

---

## 📊 Persistence

**Manual overrides are:**
- ✅ Saved while you're on the verification screen
- ✅ Sent to the API when generating
- ✅ Applied to the Excel output
- ✅ Cleared when you upload a new file

**Manual overrides are NOT:**
- ❌ Saved to database (single-session only)
- ❌ Applied to other blocking charts
- ❌ Remembered for next time

This ensures each blocking chart is reviewed independently.

---

## 🔧 Technical Details

### State Management

**Frontend:**
```typescript
const [manualOverrides, setManualOverrides] = useState<{
  [rowIndex: number]: string
}>({});

// Example override structure:
{
  5: "Other Say Social",    // Row 5 overridden
  12: "Brand Say Digital",  // Row 12 overridden
}
```

**API:**
```typescript
// Overrides sent as JSON in FormData
formData.append("manualOverrides", JSON.stringify(manualOverrides));
```

**Excel Generation:**
```typescript
// Applied during categorization
const category = manualOverrides[index] 
  ? { ...autoCategory, tab: manualOverrides[index] }
  : autoCategory;
```

---

## ✅ Benefits

### Flexibility
- ✅ Full control over categorization
- ✅ Easy to correct mistakes
- ✅ Adapt to unique campaign structures
- ✅ Client-specific requirements

### Transparency
- ✅ See automatic categorization
- ✅ Clear visual feedback on changes
- ✅ Know exactly what you're overriding
- ✅ Easy to undo (just select original)

### Efficiency
- ✅ Quick dropdown changes
- ✅ No need to edit blocking chart
- ✅ Instant visual update
- ✅ Saves time vs. manual sorting

---

## 🐛 Troubleshooting

### Issue: Override Not Applied

**Solution:**
- Ensure dropdown changed color
- Check for ✏️ icon
- Verify override counter increased
- Try clicking dropdown again

### Issue: Lost Overrides

**Solution:**
Overrides are cleared when:
- Going back to upload step
- Uploading new file
- Refreshing page

This is by design - each file is reviewed independently.

### Issue: Dropdown Not Changing Color

**Solution:**
The dropdown inherits the selected tab's color. After changing:
- Blue = Brand Say Digital
- Purple = Brand Say Social
- Green = Other Say Social

---

## 📚 Related Documentation

- **TAB_CATEGORIZATION.md** - Automatic categorization logic
- **SECTION_HEADERS.md** - Section header functionality
- **DATA_FILTERING.md** - Row and column filtering

---

**Manual recategorization gives you complete control over your traffic sheet organization!** ✏️

*Updated: October 11, 2025*
*Version: 1.5.0 - Manual Recategorization*

