# Template Setup Guide

## 🎯 Quick Setup

To use the Traffic Sheet Automation tool, you need to add your Unilever template file to the application.

### Step 1: Locate Your Template

Find your Unilever traffic sheet template file:
- **Example name**: `Unilever_Trafficking Sheet - Sopik Template.xlsx`
- This should be your official, formatted template with all styling

### Step 2: Add Template to App

1. **Copy your template file** to this location:
   ```
   public/templates/unilever-traffic-sheet-template.xlsx
   ```

2. **Important**: The file must be named exactly:
   ```
   unilever-traffic-sheet-template.xlsx
   ```

3. **File requirements**:
   - Must be .xlsx format (not .xls)
   - Should include all formatting (fonts, colors, borders, merged cells)
   - Should have a clear header row
   - Should be the final, approved template

### Step 3: Restart Development Server

If the development server is running, restart it:

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 4: Test It

1. Go to http://localhost:3000/apps/traffic-sheet-automation
2. Upload a blocking chart
3. Click "Generate Traffic Sheet"
4. Verify the output matches your template format

---

## 📁 File Location

```
QuickClick MediaTools/
└── public/
    └── templates/
        ├── README.md
        └── unilever-traffic-sheet-template.xlsx  ← Your template goes here
```

---

## ✅ Verification Checklist

After adding your template:

- [ ] File is in `public/templates/` directory
- [ ] File is named `unilever-traffic-sheet-template.xlsx` (exact name)
- [ ] File is .xlsx format
- [ ] File opens correctly in Excel
- [ ] Development server restarted
- [ ] Tool can generate traffic sheets
- [ ] Output formatting matches template

---

## 🔄 Updating the Template

To update the template later:

1. **Replace** the file in `public/templates/`
2. **Keep the same name**: `unilever-traffic-sheet-template.xlsx`
3. **Restart** the development server
4. **Test** with a sample blocking chart

---

## 🔒 Security Note

Files in the `public/` directory are publicly accessible:
- Users can download the template at: `http://localhost:3000/templates/unilever-traffic-sheet-template.xlsx`
- This is useful if users need to see the template structure
- In production, consider if you want the template publicly accessible

### To Make Template Private (Optional)

If you want to keep the template private:

1. **Create a templates directory in the root** (not in `public/`):
   ```bash
   mkdir templates
   ```

2. **Move your template there**:
   ```
   templates/unilever-traffic-sheet-template.xlsx
   ```

3. **Update the API route** (`app/api/traffic-sheet/generate/route.ts`):
   ```typescript
   const templatePath = path.join(
     process.cwd(),
     "templates",  // Changed from "public/templates"
     "unilever-traffic-sheet-template.xlsx"
   );
   ```

4. **Restart the server**

---

## 🐛 Troubleshooting

### Error: "Template file not found"

**Problem**: The app can't find the template file.

**Solutions**:
1. Check the file exists at `public/templates/unilever-traffic-sheet-template.xlsx`
2. Verify the filename is exactly correct (case-sensitive)
3. Make sure it's a .xlsx file, not .xls
4. Restart the development server

### Error: "Could not read template"

**Problem**: The template file is corrupted or in wrong format.

**Solutions**:
1. Open the file in Excel to verify it's valid
2. If it's an .xls file, save it as .xlsx
3. Try re-downloading/re-exporting the template
4. Make sure the file isn't password protected

### Generated file doesn't match template

**Problem**: The output doesn't look like your template.

**Solutions**:
1. Verify you're using the correct template file
2. Check that the template has a clear header row
3. Review column mapping in `core/excel/generateTrafficSheet.ts`
4. See `COLUMN_MAPPING_GUIDE.md` for customization

---

## 💡 Tips

### Multiple Templates

If you work with multiple clients or template versions:

1. **Save multiple templates**:
   ```
   public/templates/
   ├── unilever-traffic-sheet-template.xlsx        ← Active
   ├── unilever-traffic-sheet-template-v1.xlsx     ← Backup
   ├── unilever-traffic-sheet-template-v2.xlsx     ← Backup
   ```

2. **Rename to activate**:
   - Rename the version you want to use to `unilever-traffic-sheet-template.xlsx`

3. **Or create multiple tools**:
   - Duplicate the Traffic Sheet Automation tool
   - Configure each to use a different template
   - Add all to the home page

### Template Versioning

Keep track of template changes:

```
public/templates/
├── unilever-traffic-sheet-template.xlsx           ← Current
├── archive/
│   ├── unilever-traffic-sheet-2024-01.xlsx
│   ├── unilever-traffic-sheet-2024-02.xlsx
│   └── unilever-traffic-sheet-2024-03.xlsx
```

---

## 📞 Need Help?

- **Setup issues**: Check this guide and `public/templates/README.md`
- **Column mapping**: See `COLUMN_MAPPING_GUIDE.md`
- **General questions**: See `QUICKSTART.md` or `README.md`
- **Bug reports**: Use the 🐛 button in the app

---

**Once your template is set up, you'll only need to upload blocking charts - the template is automatic!** 🎉

