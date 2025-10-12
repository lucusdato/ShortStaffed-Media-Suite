# Section Headers - Visual Channel Grouping

## Overview

Section headers like "DIGITAL VIDEO", "DIGITAL DISPLAY", and "PAID SOCIAL" now serve as prominent visual dividers that group tactics by channel type in both the verification screen and generated Excel files!

---

## 🎯 What Are Section Headers?

Section headers are special rows in your blocking chart that indicate what channel type the tactics below them belong to. They act as organizational markers that help group and categorize your media tactics.

### Common Section Headers:
- **DIGITAL VIDEO** - Groups all digital video tactics
- **DIGITAL DISPLAY** - Groups all digital display tactics  
- **DIGITAL AUDIO** - Groups all digital audio tactics
- **PAID SOCIAL** - Groups all paid social tactics

---

## 🎨 Visual Appearance

### In Verification Screen

Section headers are **highly visible** with special styling:

**Visual Features:**
- 🎨 **Gradient background** - Indigo gradient from dark to light
- 📐 **Thick borders** - Top and bottom borders for emphasis
- 📂 **Section badge** - "📂 SECTION NAME Section" in bold
- 📺 **Icon + Text** - Channel name with icon in first column
- ▼ **Dropdown arrow** - Instead of row number
- 🔤 **Larger text** - Bold and bigger than regular rows

**Example Display:**
```
┌────┬──────────────────────┬─────────────────────┐
│ ▼  │ 📂 DIGITAL VIDEO     │ 📺 DIGITAL VIDEO   │
│    │    Section           │                     │
├────┼──────────────────────┼─────────────────────┤
│ 5  │ Brand Say Digital    │ YouTube Pre-Roll    │
│ 6  │ Brand Say Digital    │ Hulu Video          │
├────┼──────────────────────┼─────────────────────┤
│ ▼  │ 📂 PAID SOCIAL       │ 📺 PAID SOCIAL     │
│    │    Section           │                     │
├────┼──────────────────────┼─────────────────────┤
│ 8  │ Brand Say Social     │ Meta Feed Video     │
└────┴──────────────────────┴─────────────────────┘
```

### In Generated Excel

Section headers are **included in each tab** they're relevant to:

**Included Where:**
- "DIGITAL VIDEO" header → Included in "Brand Say Digital" tab
- "DIGITAL DISPLAY" header → Included in "Brand Say Digital" tab
- "PAID SOCIAL" header → Included in "Brand Say Social" AND "Other Say Social" tabs

**Purpose:**
- Maintains visual organization from blocking chart
- Makes generated traffic sheet easier to read
- Groups tactics by channel type within each tab

---

## 🔍 How Detection Works

### Automatic Recognition

A row is identified as a section header when:

**Criteria:**
- Channel column contains **ONLY** one of these exact values (case-insensitive):
  - "Digital Video"
  - "Digital Display"
  - "Digital Audio"
  - "Paid Social"
  - "Social"
  - "Video"
  - "Display"
  - "Audio"

**Examples:**

✅ **Recognized as Headers:**
```
Channel: DIGITAL VIDEO           ← Header
Channel: Digital Display         ← Header  
Channel: Paid Social             ← Header
Channel: digital video           ← Header (case-insensitive)
```

❌ **Not Headers (Regular Tactics):**
```
Channel: Digital Video - YouTube      ← Has additional text
Channel: Digital Video Pre-Roll       ← Has additional text
Channel: Paid Social Meta             ← Has additional text
```

---

## 📊 Grouping Logic

### How Tactics Are Grouped

Tactics that appear **after** a section header are considered part of that channel type until the next section header appears.

**Example Blocking Chart:**
```
Row 1: DIGITAL VIDEO           ← Section Header
Row 2: YouTube Pre-Roll        ← Part of Digital Video
Row 3: Hulu Video              ← Part of Digital Video
Row 4: PAID SOCIAL             ← Section Header
Row 5: Meta Feed               ← Part of Paid Social
Row 6: TikTok Video            ← Part of Paid Social
Row 7: DIGITAL DISPLAY         ← Section Header
Row 8: Programmatic Display    ← Part of Digital Display
```

### Tab Assignment with Headers

Headers are intelligently added to the appropriate tabs:

**"DIGITAL VIDEO" header goes to:**
- ✅ Brand Say Digital tab

**"DIGITAL DISPLAY" header goes to:**
- ✅ Brand Say Digital tab

**"PAID SOCIAL" header goes to:**
- ✅ Brand Say Social tab
- ✅ Other Say Social tab (if it has influencer tactics)

---

## 💡 Best Practices

### Creating Section Headers

**Format:**
```
Channel Column: Exact channel type name
All Other Columns: Can be empty or have descriptive text
```

**Recommended Format:**
| Channel | Placement | Tactic | Budget | ... |
|---------|-----------|--------|--------|-----|
| DIGITAL VIDEO | | | | |
| YouTube Pre-Roll | Brand Say | Video Campaign | $10,000 | |
| Hulu Video | Brand Say | Pre-Roll | $15,000 | |

**Alternative (with description):**
| Channel | Placement | Tactic | Budget | ... |
|---------|-----------|--------|--------|-----|
| DIGITAL VIDEO | Video Channels | Streaming Video | | |
| YouTube Pre-Roll | Brand Say | Video Campaign | $10,000 | |

### Naming Conventions

**Use these exact names for consistency:**
- ✅ "DIGITAL VIDEO" (not "Digital Vid", "DV", "Video")
- ✅ "DIGITAL DISPLAY" (not "Display", "Banner", "DD")
- ✅ "DIGITAL AUDIO" (not "Audio", "Podcast", "DA")
- ✅ "PAID SOCIAL" (not "Social", "PS", "Social Media")

### Placement Tips

**1. Use at Start of Each Channel Section**
```
✅ Good:
DIGITAL VIDEO
- Tactic 1
- Tactic 2
PAID SOCIAL
- Tactic 3
- Tactic 4
```

**2. Don't Mix Channels Without Headers**
```
❌ Avoid:
- YouTube (video)
- Meta (social)
- Hulu (video)
- TikTok (social)

✅ Better:
DIGITAL VIDEO
- YouTube
- Hulu
PAID SOCIAL
- Meta
- TikTok
```

**3. Repeat Headers if Returning to Channel**
```
✅ Good:
DIGITAL VIDEO
- YouTube
PAID SOCIAL
- Meta
DIGITAL VIDEO (repeated)
- Hulu
```

---

## 🎨 Styling Details

### Verification Screen Colors

**Section Headers:**
- Background: Indigo gradient (light to lighter)
- Borders: Thick indigo borders top and bottom
- Text: Dark indigo, bold, larger size
- Badge: Deep indigo background with white text

**Regular Rows:**
- Brand Say Digital: Blue badge
- Brand Say Social: Purple badge
- Other Say Social: Green badge

### Visual Hierarchy

```
┌─────────────────────────────────────┐
│ SECTION HEADER (Prominent)          │ ← Most visible
├─────────────────────────────────────┤
│ Regular tactic (Subtle)              │ ← Normal size
│ Regular tactic (Subtle)              │
│ Regular tactic (Subtle)              │
├─────────────────────────────────────┤
│ SECTION HEADER (Prominent)          │ ← Most visible
├─────────────────────────────────────┤
│ Regular tactic (Subtle)              │
└─────────────────────────────────────┘
```

---

## 📝 Examples

### Example 1: Multi-Channel Campaign

**Blocking Chart:**
```
Row 1: DIGITAL VIDEO
Row 2: YouTube Pre-Roll - Brand Say
Row 3: Hulu Video - Brand Say
Row 4: PAID SOCIAL
Row 5: Meta Feed - Brand Say Video
Row 6: TikTok Influencer
Row 7: DIGITAL DISPLAY
Row 8: Programmatic Display
```

**Verification Screen:**
Shows 3 prominent section headers with grouped tactics below each

**Generated Excel Tabs:**
- **Brand Say Digital:** Includes "DIGITAL VIDEO" header + rows 2-3, "DIGITAL DISPLAY" header + row 8
- **Brand Say Social:** Includes "PAID SOCIAL" header + row 5
- **Other Say Social:** Includes "PAID SOCIAL" header + row 6

### Example 2: Video-Heavy Campaign

**Blocking Chart:**
```
Row 1: DIGITAL VIDEO
Row 2: YouTube Trueview
Row 3: YouTube Bumper
Row 4: Hulu Pre-Roll
Row 5: Hulu Mid-Roll
Row 6: Connected TV
```

**Verification Screen:**
One large section with "DIGITAL VIDEO" header followed by all 5 tactics

**Generated Excel:**
- **Brand Say Digital:** "DIGITAL VIDEO" header + all 5 tactics in one clean group

### Example 3: Mixed with Breaks

**Blocking Chart:**
```
Row 1: DIGITAL VIDEO
Row 2: YouTube Campaign
Row 3: PAID SOCIAL
Row 4: Meta Brand Say Video
Row 5: DIGITAL VIDEO (repeated)
Row 6: Hulu Campaign
```

**Result:**
- Two "DIGITAL VIDEO" sections in verification (rows 1-2, rows 5-6)
- One "PAID SOCIAL" section (rows 3-4)
- Properly grouped in generated Excel

---

## 🔧 Customization

### Adding New Section Types

To recognize additional section header types, edit the detection pattern:

**File:** `app/apps/traffic-sheet-automation/page.tsx` and `core/excel/generateTrafficSheet.ts`

```typescript
// Add your new type to the regex:
const isHeaderRow = /^(digital video|digital display|digital audio|paid social|social|video|display|audio|your-new-type)$/i.test(channel);
```

### Changing Visual Styling

**Verification Screen Styling:**
Edit in `app/apps/traffic-sheet-automation/page.tsx`:

```typescript
// Change background gradient:
className="bg-gradient-to-r from-indigo-100 to-indigo-50"
// Change to your colors:
className="bg-gradient-to-r from-blue-100 to-blue-50"

// Change badge color:
className="bg-indigo-600 text-white"
// Change to your brand:
className="bg-blue-600 text-white"
```

---

## 🚀 Benefits

### For Users

1. **Visual Clarity**
   - Easy to see where each channel section starts
   - Natural grouping of related tactics
   - Quick scanning and navigation

2. **Better Organization**
   - Blocking chart structure preserved in output
   - Consistent format across all traffic sheets
   - Professional appearance

3. **Easier Verification**
   - Quickly identify which channel each group belongs to
   - Spot misplaced tactics immediately
   - Understand campaign structure at a glance

### For Clients

1. **Readable Traffic Sheets**
   - Clear section breaks
   - Easy to understand structure
   - Professional formatting

2. **Channel Visibility**
   - Each channel type clearly marked
   - Easy to focus on specific media types
   - Better for review and approval

---

## 🔍 Troubleshooting

### Issue: Header Not Recognized

**Symptoms:**
- Row treated as regular tactic instead of section header
- No special formatting applied

**Causes & Solutions:**

1. **Channel name has extra text**
   ```
   ❌ Channel: "DIGITAL VIDEO - Streaming"
   ✅ Channel: "DIGITAL VIDEO"
   ```

2. **Spelling variation**
   ```
   ❌ Channel: "Digital Vid"
   ✅ Channel: "DIGITAL VIDEO"
   ```

3. **Extra spaces**
   ```
   ❌ Channel: "DIGITAL  VIDEO" (two spaces)
   ✅ Channel: "DIGITAL VIDEO" (one space)
   ```

### Issue: Header Appears in Wrong Tab

**Cause:** Header type doesn't match expected patterns

**Solution:** Use standard names:
- "DIGITAL VIDEO" → Brand Say Digital
- "DIGITAL DISPLAY" → Brand Say Digital  
- "PAID SOCIAL" → Brand Say Social / Other Say Social

### Issue: Missing Header in Excel

**Cause:** No tactics followed the header before file ended

**Solution:** Ensure at least one tactic appears after each section header

---

## 📚 Related Features

Section headers work seamlessly with:
- ✅ Tab categorization (Brand Say Digital, Brand Say Social, Other Say Social)
- ✅ Row filtering (stops at variance)
- ✅ Column filtering (first 18 columns)
- ✅ Empty column removal
- ✅ Full-width display

---

**Section headers make your blocking charts and traffic sheets more organized and professional!** 📊

*Updated: October 11, 2025*
*Version: 1.4.1 - Enhanced Section Header Display*

