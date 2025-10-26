# Brand Name Auto-Detection

This system automatically detects brand names from uploaded filenames and saves them to the analytics database.

## How It Works

### 1. Brand Directory (`core/analytics/brandDirectory.ts`)

A centralized list of Unilever brand names is maintained in `core/analytics/brandDirectory.ts`. The system performs **case-insensitive matching** to detect brands in filenames.

**Currently includes:**
- Food & Beverage: Knorr, Hellmann's, Lipton, Ben & Jerry's, Magnum, etc.
- Personal Care: Dove, Axe, Rexona, Lux, Sunsilk, TRESemmé, Vaseline, etc.
- Home Care: Omo, Persil, Surf, Comfort, Cif, Domestos, etc.

### 2. Auto-Detection Logic

When a file is uploaded to either tool, the system:

1. **Searches the filename** for any brand name from the directory (case-insensitive)
2. **Returns the first match** found (with original casing from the directory)
3. **Logs the detection** to the console for debugging

**Examples:**
```
"Knorr_Campaign_2024.xlsx" → "Knorr" ✅
"dove-blocking-chart.xlsx" → "Dove" ✅
"HELLMANNS_TrafficSheet.xlsx" → "Hellmann's" ✅
"random_file.xlsx" → null (no brand detected)
```

### 3. Where It's Applied

#### Traffic Sheet Automation
- Brand is **automatically detected** when file is uploaded
- Brand name is **saved to database** via file upload tracker
- No manual input required

#### Taxonomy Generator
- Brand is **automatically detected** and **populates the Brand Name field**
- User can still **manually edit** if detection is wrong
- Falls back to **manual entry** if no brand detected
- Brand name is **saved to database** when files are uploaded

## Analytics Export

When you export analytics to CSV, the **Brand Name** column will now be populated with:
- Auto-detected brands from filenames
- Manually entered brands (Taxonomy Generator)
- Empty if no brand was detected or entered

## Adding New Brands

To add new brands to the detection system:

1. Open `core/analytics/brandDirectory.ts`
2. Add the brand name to the `BRANDS` array:
   ```typescript
   export const BRANDS = [
     // Existing brands...
     "New Brand Name", // ← Add here
   ];
   ```
3. Save the file - changes take effect immediately

**Tips:**
- Use the official brand name with correct capitalization (e.g., "TRESemmé", not "tresemme")
- Detection is case-insensitive, so "KNORR", "knorr", and "Knorr" all match "Knorr"
- Order doesn't matter - the first match found is returned

## Testing Brand Detection

### In Browser Console

When you upload a file with a brand name in it, you'll see:
```
🏷️  Brand detected from filename: Knorr
```

If no brand is detected, no message appears (silent failure).

### Manual Testing

You can test the detection function in browser DevTools:

```javascript
import { extractBrandFromFilename } from '@/core/analytics/brandDirectory';

extractBrandFromFilename("Knorr_Campaign.xlsx"); // "Knorr"
extractBrandFromFilename("dove-file.xlsx"); // "Dove"
extractBrandFromFilename("unknown.xlsx"); // null
```

## Database Storage

Brand names are stored in the `file_uploads` table:

| Column | Description |
|--------|-------------|
| `brand_name` | Auto-detected or manually entered brand name |
| `filename` | Original filename (for debugging) |
| `tool_name` | Which tool was used |
| `user_id` | Who uploaded the file |
| `timestamp` | When it was uploaded |

## CSV Export Format

The CSV export now includes brand names:

```csv
Timestamp,Type,User Name,User Role,Client,Tool,Action,Filename,File Size (KB),Brand Name
2024-10-24T10:30:00Z,File Upload,Lucus Dato,Manager,Unilever,Traffic Sheet Automation,file_upload,Knorr_Campaign.xlsx,45.2,Knorr
```

## Troubleshooting

### Brand Not Detected

**Possible reasons:**
1. Brand name not in the directory → Add it to `BRANDS` array
2. Typo in filename → Check spelling
3. Brand name abbreviated → Add the abbreviation as a separate entry

**Solution:** Add the brand (or variation) to `core/analytics/brandDirectory.ts`

### Wrong Brand Detected

**Possible reason:** Filename contains multiple brand names

**Example:**
- Filename: `Dove_Axe_Comparison.xlsx`
- Detected: `Dove` (first match)

**Solution:** Rename file to only include one brand name, or manually override in Taxonomy Generator

### Brand Not Appearing in CSV Export

**Possible reasons:**
1. File was uploaded before brand detection was implemented
2. Brand wasn't detected and no manual entry was made

**Solution:** Re-upload the file to trigger brand detection

## Files Modified

1. **New:** `core/analytics/brandDirectory.ts` - Brand list and detection logic
2. **Modified:** `core/analytics/tracker.ts` - Auto-detect brand in file uploads
3. **Modified:** `app/apps/taxonomy-generator/page.tsx` - Auto-populate brand field
4. **Modified:** `app/api/analytics/export/route.ts` - Include brand in CSV export

## Future Enhancements

Potential improvements to consider:

- **Pattern-based detection**: Extract brand from structured filenames (e.g., "BrandName_Campaign_Date.xlsx")
- **Multiple brand support**: Detect all brands in filename, not just first match
- **Brand aliases**: Support abbreviations (e.g., "UL" → "Unilever")
- **Confidence scoring**: Indicate how confident the detection is
- **UI feedback**: Show detected brand in upload confirmation
