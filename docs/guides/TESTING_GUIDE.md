# Testing Guide

This guide helps you test the QuickClick Media Suite to ensure everything works correctly.

## 🧪 Testing the Traffic Sheet Automation Tool

### Prerequisites

You'll need two Excel files:
1. **Blocking Chart** - Your completed media blocking chart
2. **Traffic Sheet Template** - The Unilever traffic sheet template

### Step-by-Step Testing

#### 1. Start the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

#### 2. Verify Home Page

✅ **Expected Results:**
- Home page loads with QuickClick Media Suite header
- 7 tool cards displayed in a grid
- Traffic Sheet Automation is marked as "available"
- Other 6 tools show "Coming Soon" badges
- Bug Report button visible in header
- Responsive design works on mobile/tablet/desktop

**Test Actions:**
- Click the Bug Report button → Modal should open
- Fill out the form → Should show success message
- Hover over available tool card → Should lift up slightly
- Click on "Coming Soon" cards → Should not navigate

#### 3. Access Traffic Sheet Automation

Click on the "Traffic Sheet Automation" card

✅ **Expected Results:**
- Navigates to `/apps/traffic-sheet-automation`
- Back arrow button visible in header
- Two file upload sections displayed
- Instructions panel at the top
- Preview and Generate buttons visible (but disabled)

#### 4. Test File Upload

**Test 4A: Upload Blocking Chart**

1. Click on the "Blocking Chart" upload area
2. Select your blocking chart Excel file
3. **Expected Results:**
   - File name displays
   - File size shows in KB
   - Green checkmark icon appears
   - Preview button becomes enabled

**Test 4B: Upload Traffic Sheet Template**

1. Click on the "Traffic Sheet Template" upload area
2. Select your template Excel file
3. **Expected Results:**
   - File name displays
   - File size shows in KB
   - Green checkmark icon appears
   - Generate button becomes enabled

**Test 4C: Upload Wrong File Type**

1. Try uploading a .pdf or .docx file
2. **Expected Results:**
   - File may be rejected by browser
   - If accepted, should fail during processing with clear error

#### 5. Test Preview Feature

1. With blocking chart uploaded, click "Preview Data"
2. **Expected Results:**
   - Button shows "Processing..." briefly
   - Preview table appears below the upload section
   - Shows first 5 rows of data
   - Column headers visible
   - Data populated in cells
   - Count message shows total rows (e.g., "Showing 5 of 25 rows")

**What to Check in Preview:**
- ✅ All expected columns are present
- ✅ Data appears in correct columns
- ✅ No critical data is missing
- ✅ Dates are formatted correctly
- ✅ Numbers are parsed correctly (not as text)
- ✅ Merged cell data appears in first cell

#### 6. Test Traffic Sheet Generation

1. With both files uploaded, click "Generate Traffic Sheet"
2. **Expected Results:**
   - Button shows "Processing..." with spinner
   - After a few seconds, file downloads automatically
   - Success message appears
   - Downloaded file named like `traffic-sheet-1234567890.xlsx`

#### 7. Verify Generated Traffic Sheet

Open the downloaded Excel file:

✅ **Critical Checks:**
- [ ] File opens without errors
- [ ] Template structure is preserved
- [ ] Headers match template format
- [ ] Merged cells are intact
- [ ] Font formatting preserved (bold, sizes)
- [ ] Colors and backgrounds preserved
- [ ] Cell borders preserved
- [ ] Column widths appropriate
- [ ] All data rows present
- [ ] Data in correct columns
- [ ] No #REF or #VALUE errors
- [ ] Formulas work (if template has formulas)

✅ **Data Accuracy Checks:**
- [ ] Channel mapping correct
- [ ] Platform/tactic correct
- [ ] Budget values accurate
- [ ] Impressions match
- [ ] CPM calculations correct
- [ ] Dates formatted properly
- [ ] Start/end dates in right columns
- [ ] Creative names present
- [ ] URLs included
- [ ] Notes/comments transferred

#### 8. Test Error Handling

**Test 8A: No File Uploaded**
1. Click Generate without uploading files
2. **Expected**: Error message "Please upload both files before generating"

**Test 8B: Corrupted Excel File**
1. Upload a text file renamed as .xlsx
2. Click Generate
3. **Expected**: Clear error message about invalid file format

**Test 8C: Missing Headers**
1. Upload a blocking chart without header row
2. Click Generate
3. **Expected**: Error about "Could not find header row in blocking chart"

**Test 8D: Empty Blocking Chart**
1. Upload an Excel file with headers but no data
2. Click Generate
3. **Expected**: Error about "No data rows found in blocking chart"

#### 9. Test Edge Cases

**Test 9A: Large File**
- Upload blocking chart with 100+ rows
- **Expected**: Should process successfully (may take 10-20 seconds)

**Test 9B: Special Characters**
- Test with campaign names containing: &, %, $, é, ñ, etc.
- **Expected**: Characters should be preserved in output

**Test 9C: Long Text**
- Test with very long notes/comments
- **Expected**: Text should wrap in cells or be truncated gracefully

**Test 9D: Empty Cells**
- Test with some empty cells in blocking chart
- **Expected**: Should handle gracefully, leaving those cells empty in output

**Test 9E: Numeric Formats**
- Test with various number formats (currency, percentages, decimals)
- **Expected**: Formatting should be preserved

#### 10. Test Browser Compatibility

Test in multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)

All functionality should work identically.

#### 11. Test Responsive Design

Test at different screen sizes:
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

**Expected**: Layout should adapt gracefully, cards stack on mobile.

## 🔍 Known Limitations & Expected Behavior

### File Size
- Maximum file size depends on browser and available memory
- Files over 50MB may be slow to process
- Files over 100MB may fail

### Processing Time
- Small files (< 10 rows): < 1 second
- Medium files (10-100 rows): 1-5 seconds
- Large files (100-1000 rows): 5-30 seconds
- Very large files (1000+ rows): 30+ seconds

### Excel Features
- **Supported**: Merged cells, fonts, colors, borders, basic formulas
- **May have issues**: Complex formulas, pivot tables, charts, macros, VBA
- **Not supported**: Password-protected files, .xls (old format)

## 🐛 Common Issues & Solutions

### Issue: "Could not find header row"
**Cause**: Header row not detected automatically
**Solution**: 
- Ensure header row has clear column names
- Headers should be bold (helps detection)
- Headers should be in first 20 rows

### Issue: Data in wrong columns
**Cause**: Column name mismatch
**Solution**: 
- Check Preview to see normalized column names
- Update mapping in `/core/excel/generateTrafficSheet.ts`
- See COLUMN_MAPPING_GUIDE.md

### Issue: Merged cells not preserving
**Cause**: Template merges not detected
**Solution**: 
- Check that template has proper merged cell structure
- Verify merged cells aren't interfering with data area

### Issue: Dates showing as numbers
**Cause**: Excel date serialization
**Solution**: 
- Dates may need custom formatting in mapping function
- Check date handling in parseBlockingChart.ts

### Issue: Downloaded file corrupt
**Cause**: Buffer conversion issue
**Solution**: 
- Try different browser
- Check browser console for errors
- Ensure file isn't blocked by antivirus

## ✅ Test Checklist Summary

Run through this checklist before considering the app production-ready:

### Functionality
- [ ] Home page loads correctly
- [ ] All tool cards display
- [ ] Navigation works
- [ ] Bug report modal opens and submits
- [ ] Traffic Sheet tool loads
- [ ] File upload works for both files
- [ ] Preview generates correctly
- [ ] Generate creates valid Excel file
- [ ] Downloaded file matches template format
- [ ] All data maps correctly
- [ ] Error messages display appropriately

### Visual Design
- [ ] Layout is clean and professional
- [ ] Buttons and cards are styled consistently
- [ ] Hover effects work
- [ ] Loading states show clearly
- [ ] Dark mode works (if enabled)
- [ ] Responsive on all screen sizes

### Performance
- [ ] Page load is fast (< 3 seconds)
- [ ] File processing is reasonable (< 30 seconds for normal files)
- [ ] No console errors
- [ ] No memory leaks on repeated use

### Error Handling
- [ ] Missing file uploads show error
- [ ] Invalid files show error
- [ ] Network errors handled gracefully
- [ ] User-friendly error messages

## 📊 Testing with Real Data

### Best Practice Testing Flow

1. **Start Small**: Test with a 5-row blocking chart first
2. **Verify Mapping**: Check that all columns map correctly
3. **Test Medium**: Try with 20-30 rows
4. **Test Full**: Use complete blocking chart
5. **Verify Output**: Open generated file and spot-check data
6. **Send to Stakeholder**: Get approval on output format

### Sample Test Scenarios

**Scenario 1: Standard Blocking Chart**
- 20 rows
- All standard columns populated
- No special characters
- **Expected**: Perfect generation

**Scenario 2: Complex Chart**
- 100+ rows
- Merged cells in source
- Special characters in names
- Empty cells in some fields
- **Expected**: Handles gracefully

**Scenario 3: Unilever Real Data**
- Actual Knorr blocking chart
- Actual Unilever template
- Real campaign data
- **Expected**: Production-ready output

## 🎯 Success Criteria

The Traffic Sheet Automation tool is ready for production when:

1. ✅ All test cases pass
2. ✅ Real blocking charts process correctly
3. ✅ Output matches Unilever template exactly
4. ✅ No data loss or corruption
5. ✅ Processing time acceptable
6. ✅ Error handling is robust
7. ✅ Works across browsers
8. ✅ Stakeholder approval received

## 📞 Reporting Issues

If you find bugs during testing:

1. Use the Bug Report button in the app
2. Include:
   - What you were doing
   - What you expected
   - What actually happened
   - Browser and OS
   - Screenshots if applicable
3. Attach sample files (if not confidential)

## 🚀 Ready for Production?

Once all tests pass and stakeholders approve, you're ready to deploy!

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for deployment instructions.

