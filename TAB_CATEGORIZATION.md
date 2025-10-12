# Tab Categorization & Smart Organization

## Overview

The Traffic Sheet Automation tool now intelligently categorizes your tactics into separate Excel tabs based on channel type and placement details!

---

## 🎯 How It Works

### Automatic Tab Creation

When you generate a traffic sheet, the tool analyzes each tactic and routes it to the appropriate tab:

- **Brand Say Digital** - Digital Video, Digital Display, Digital Audio, Programmatic
- **Brand Say Social** - Paid Social with "Brand Say Video" in placements
- **Other Say Social** - Social platforms (Meta, TikTok, etc.) with Influencer content

### Visual Preview

The verification screen now shows a "Tab Assignment" column so you can see where each tactic will go before generating!

---

## 📋 Categorization Rules

### 1. Brand Say Digital Tab 🔵

**Includes:**
- Digital Video tactics
- Digital Display tactics
- Digital Audio tactics
- Programmatic buying

**Matching Logic:**
- Channel contains: "digital video", "digital display", "digital audio", or "programmatic"

**Examples:**
```
✓ Channel: Digital Video → Brand Say Digital
✓ Channel: Digital Display → Brand Say Digital
✓ Channel: Programmatic Display → Brand Say Digital
✓ Channel: Digital Audio → Brand Say Digital
```

### 2. Brand Say Social Tab 🟣

**Includes:**
- Paid Social tactics where placement mentions "Brand Say Video"
- Standard paid social campaigns

**Matching Logic:**
- Channel contains "paid social" or "social"
- AND Placement contains "brand say video" or "brandsay video"
- OR default for paid social not matching other criteria

**Examples:**
```
✓ Channel: Paid Social
  Placement: Brand Say Video - Meta Feed → Brand Say Social

✓ Channel: Paid Social  
  Placement: BrandSay Video Stories → Brand Say Social

✓ Channel: Paid Social
  Placement: Standard Video → Brand Say Social (default)
```

### 3. Other Say Social Tab 🟢

**Includes:**
- Influencer content on social platforms
- User-generated content campaigns

**Matching Logic:**
- Channel contains "social" or "paid social"
- AND (Placement OR Tactic) contains "influencer"
- AND Platform is one of: Meta, TikTok, Pinterest, Reddit, Snapchat, Facebook, Instagram

**Examples:**
```
✓ Channel: Paid Social
  Placement: TikTok Influencer → Other Say Social

✓ Channel: Social
  Tactic: Meta Influencer Campaign → Other Say Social

✓ Channel: Paid Social
  Placement: Instagram Influencer → Other Say Social
```

### 4. Header Rows (Visual Cues)

**Special Handling:**
- Rows where the Channel is exactly "DIGITAL VIDEO", "DIGITAL DISPLAY", "PAID SOCIAL", etc.
- These are treated as section headers, not tactics
- They're excluded from tabs but recognized as organizational markers
- Highlighted in gray in verification screen

---

## 🎨 Verification Screen Features

### Tab Assignment Column

A new column shows where each tactic will be routed:

**Color Coding:**
- 🔵 **Blue badge** = Brand Say Digital
- 🟣 **Purple badge** = Brand Say Social
- 🟢 **Green badge** = Other Say Social
- ⚪ **Gray badge** = Header Row (not included in output)

### Header Row Detection

Header rows (like "DIGITAL VIDEO", "PAID SOCIAL") are:
- Highlighted with gray background
- Labeled as "Header Row" in tab assignment
- Used as visual cues for grouping
- Not included in the generated traffic sheets

---

## 📊 Generated Excel Structure

### Multiple Tabs Created

Your generated traffic sheet will have separate tabs:

```
Traffic Sheet.xlsx
├── Brand Say Digital (Tab 1)
│   ├── Template headers
│   └── All digital video/display tactics
├── Brand Say Social (Tab 2)
│   ├── Template headers  
│   └── All paid social tactics
└── Other Say Social (Tab 3)
    ├── Template headers
    └── All influencer social tactics
```

### Tab Features

**Each tab includes:**
- ✅ Full template formatting (preserved from original)
- ✅ Merged cells and styling
- ✅ Only tactics for that category
- ✅ Proper column widths
- ✅ All original template structure

**Empty tabs are not created:**
- If you have no "Other Say Social" tactics, that tab won't appear
- Only tabs with data are included in the final file

---

## 🔍 Column Filtering

### Automatic Column Removal

**Column 1 Removal:**
- If column 1 is completely empty across all rows
- It's automatically hidden from verification display
- Still preserved in generated file if needed

**Column Limit:**
- Only first 18 columns shown in verification
- Columns 19+ are filtered out
- Reduces clutter and focuses on essential data

---

## 💡 Use Cases

### Scenario 1: Multi-Channel Campaign

**Your Blocking Chart:**
```
Row 1: DIGITAL VIDEO (header)
Row 2: YouTube Pre-Roll → Brand Say Digital
Row 3: Hulu Video → Brand Say Digital
Row 4: PAID SOCIAL (header)
Row 5: Meta Brand Say Video → Brand Say Social
Row 6: TikTok Influencer → Other Say Social
```

**Generated Tabs:**
- Brand Say Digital: Rows 2-3
- Brand Say Social: Row 5
- Other Say Social: Row 6

### Scenario 2: Digital-Only Campaign

**Your Blocking Chart:**
```
Row 1: Digital Display
Row 2: Digital Video
Row 3: Programmatic Display
```

**Generated Tabs:**
- Brand Say Digital: All 3 rows
- (No other tabs created)

### Scenario 3: Social-Heavy Campaign

**Your Blocking Chart:**
```
Row 1: Paid Social - Brand Say Video Meta
Row 2: Paid Social - Brand Say Video TikTok
Row 3: Paid Social - Instagram Influencer
Row 4: Paid Social - TikTok Influencer
```

**Generated Tabs:**
- Brand Say Social: Rows 1-2
- Other Say Social: Rows 3-4

---

## 🔧 Customization

### Adding New Categories

To add a new tab category, edit `core/excel/generateTrafficSheet.ts`:

```typescript
// Add to rowsByTab initialization:
const rowsByTab: { [key: string]: any[] } = {
  'Brand Say Digital': [],
  'Brand Say Social': [],
  'Other Say Social': [],
  'Your New Category': [],  // Add here
};

// Add logic to categorizeRow function:
if (yourCondition) {
  return { tab: 'Your New Category', type: 'media' };
}
```

### Modifying Rules

To change categorization logic, edit the `categorizeRow` function:

```typescript
// Example: Add new social platform
const socialPlatforms = [
  'meta', 'tiktok', 'pinterest', 'reddit', 'snapchat',
  'facebook', 'instagram',
  'your-platform'  // Add here
];

// Example: Change Brand Say Social criteria
if (placement.includes('your-custom-keyword')) {
  return { tab: 'Brand Say Social', type: 'media' };
}
```

---

## 📝 Best Practices

### Naming Conventions

**For accurate categorization, use consistent naming:**

**Channels:**
- ✅ "Digital Video" (not "Video" or "DV")
- ✅ "Digital Display" (not "Display" or "Banner")
- ✅ "Paid Social" (not "Social" alone for paid)

**Placements:**
- ✅ "Brand Say Video - Meta Feed"
- ✅ "TikTok Influencer Campaign"
- ✅ "Instagram Influencer Partnership"

**Tactics:**
- ✅ Include platform name (Meta, TikTok, etc.)
- ✅ Include type (Influencer, Brand Say, etc.)

### Verification Workflow

1. **Upload blocking chart**
2. **Review Tab Assignment column**
   - Check that tactics are categorized correctly
   - Look for any miscategorized items
3. **Check header rows**
   - Ensure they're marked as "Header Row"
   - Verify they're just organizational markers
4. **Generate with confidence**
   - All tabs will be created correctly
   - Data properly organized

---

## 🎯 Benefits

### For Media Planners

- ✅ **Organized output** - Each channel type in its own tab
- ✅ **Easy client sharing** - Clear separation by media type
- ✅ **Consistent structure** - Same format every time
- ✅ **Less manual work** - No need to split tactics manually

### For Clients

- ✅ **Clear visibility** - Easy to see each channel separately
- ✅ **Better review** - Can focus on one media type at a time
- ✅ **Professional format** - Clean, organized deliverable

### For Teams

- ✅ **Standardization** - Everyone uses same categorization
- ✅ **Collaboration** - Different specialists can focus on their tabs
- ✅ **Tracking** - Easier to manage different channel types

---

## 🔍 Troubleshooting

### Issue: Tactic in Wrong Tab

**Cause**: Channel or placement name doesn't match expected patterns

**Solution:**
1. Check the channel name in your blocking chart
2. Ensure it matches one of the expected patterns
3. Update blocking chart or adjust categorization rules

### Issue: Header Rows in Output

**Cause**: Channel name doesn't exactly match header patterns

**Solution:**
Header rows must have Channel = exactly "DIGITAL VIDEO", "DIGITAL DISPLAY", or "PAID SOCIAL" (case-insensitive)

### Issue: Empty Tab Created

**Cause**: No tactics matched that category

**Solution:**
This is normal! Only tabs with data are created. If you see an empty tab, check the categorization logic.

### Issue: All Tactics in One Tab

**Cause**: Categorization isn't finding the right keywords

**Solution:**
1. Review your channel naming
2. Check placement details
3. Verify tactic descriptions
4. Adjust rules if needed

---

## 📚 Related Features

**This works with:**
- ✅ Row filtering (stops at Variance)
- ✅ Column filtering (first 18 columns)
- ✅ Empty column removal (column 1)
- ✅ Full-width verification display
- ✅ Template formatting preservation

**All features work together seamlessly!**

---

## 🚀 Future Enhancements

Potential additions:
- [ ] Custom tab naming
- [ ] Manual tab assignment override
- [ ] Additional category presets
- [ ] Tab ordering customization
- [ ] Merged view option
- [ ] Category-specific templates

---

**Smart tab categorization makes your traffic sheets more organized and professional!** 🎯

*Updated: October 11, 2025*
*Version: 1.4.0 - Intelligent Tab Categorization*

