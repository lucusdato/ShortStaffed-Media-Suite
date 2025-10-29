# Quick Start Guide

Get up and running with ShortStaffed Media Suite in 5 minutes!

## 🚀 Installation (2 minutes)

```bash
# Navigate to the project directory
cd "/Users/lucusdato/Documents/Dev/ShortStaffed MediaTools"

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🌐 Access the App

Open your browser and go to:
```
http://localhost:3000
```

## 🎯 Using Traffic Sheet Automation (2 minutes)

### Step 1: Open the Tool
Click on the **"Traffic Sheet Automation"** card on the home page

### Step 2: Upload Your Blocking Chart
1. **Upload Blocking Chart**: Click the upload area and select your Excel file
   - Example: `Knorr Taste Combos H2 Blocking Chart R0 - Sopik Edition Shortstaffed.xlsx`
   - **That's it!** The Unilever template is built-in - no need to upload it!

### Step 3: Preview (Optional)
- Click **"Preview Data"** to verify the data is being read correctly
- Check that columns and data look right

### Step 4: Generate
- Click **"Generate Traffic Sheet"**
- Wait a few seconds for processing
- Your formatted traffic sheet will automatically download!

### Step 5: Verify
- Open the downloaded Excel file
- Verify all formatting and data are correct
- Use it in your workflow!

## 🎨 Features at a Glance

### Home Page
- **Tool Grid**: See all available and upcoming tools
- **Bug Report**: Submit feedback or issues
- **Clean Design**: Professional, modern interface

### Traffic Sheet Automation
- **Dual Upload**: Blocking chart + template
- **Preview**: See parsed data before generating
- **One-Click Generate**: Automated traffic sheet creation
- **Format Preservation**: Keeps all Excel styling
- **Error Handling**: Clear messages if something goes wrong

## 📁 Your File

The tool expects:

### Blocking Chart Format
- Excel file (.xlsx)
- Has a header row with column names like:
  - Channel, Tactic, Platform, Budget, CPM, Impressions, etc.
- Data rows below the header

### Unilever Traffic Sheet Template
- **Built into the app** - no upload needed!
- Located at: `public/templates/unilever-traffic-sheet-template.xlsx`
- To use your own template, replace this file
- See `public/templates/README.md` for instructions

## 🔧 Customization

Need to customize column mapping?

Edit this file:
```
/core/excel/generateTrafficSheet.ts
```

See [COLUMN_MAPPING_GUIDE.md](./COLUMN_MAPPING_GUIDE.md) for detailed instructions.

## 🐛 Something Not Working?

### Common Solutions

**"No worksheet found"**
- Make sure you're uploading .xlsx files (not .xls or .csv)

**"Could not find header row"**
- Ensure your blocking chart has a clear header row with column names

**"Invalid blocking chart format"**
- Check that your file has data rows below the header
- Ensure at least one common column exists (channel, tactic, platform, or budget)

**Downloaded file won't open**
- Try a different browser (Chrome recommended)
- Check your Downloads folder for the file
- Ensure you have Excel or compatible software installed

### Still Stuck?

Click the **"🐛 Report Bug"** button in the app header and describe your issue.

## 📚 Next Steps

### For Daily Use
1. Bookmark `http://localhost:3000` (or your deployed URL)
2. Save your template file in an easy-to-access location
3. Create a consistent naming convention for blocking charts
4. Share the app URL with your team

### For Customization
- Read [COLUMN_MAPPING_GUIDE.md](./COLUMN_MAPPING_GUIDE.md) to customize column mappings
- Read [README.md](./README.md) for full documentation
- Explore the code in `/core/excel/` for advanced modifications

### For Deployment
- Read [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- Deploy to Vercel for production use
- Share with your organization

## 🎯 Success Tips

### Best Practices
1. **Always preview first** - Catch mapping issues early
2. **Test with small files** - Verify your setup with 5-10 rows
3. **Keep templates consistent** - Use the same template each time
4. **Name your files clearly** - Use descriptive names with dates
5. **Save frequently** - Keep copies of your blocking charts

### Workflow Integration
1. Complete your blocking chart as usual
2. Open ShortStaffed Media Suite
3. Upload and generate in under 30 seconds
4. Review the generated traffic sheet
5. Send to client or team
6. Save both files for records

## 🔮 Coming Soon

More tools are being added to the suite:
- RFP/DAB Form Importer
- Projection Calculator
- Adserving Actualization Tool
- Post-Campaign Actualizer
- Taxonomy and Tagging Checker

Each will follow the same easy-to-use pattern!

## ⚡ Pro Tips

### Keyboard Shortcuts
- `Cmd/Ctrl + Click` on file upload area - Opens file picker
- `Esc` - Closes Bug Report modal
- `F5` - Refresh page to reset

### Time Savers
- Keep your template file in a dedicated folder
- Create a template blocking chart with pre-filled formulas
- Use consistent column names across all your blocking charts
- Set up browser bookmarks for quick access

### Quality Checks
- Always open the generated file before sending to client
- Spot-check random rows for accuracy
- Verify total budget calculations
- Check that special characters didn't get corrupted

## 📊 Typical Processing Times

- **Small files** (1-20 rows): < 2 seconds
- **Medium files** (20-100 rows): 2-10 seconds  
- **Large files** (100-500 rows): 10-30 seconds

If processing takes longer, check your file size and complexity.

## 🎉 You're Ready!

You now have everything you need to start automating your traffic sheets. 

**Questions? Issues? Ideas?**
Use the Bug Report feature in the app!

---

**Happy automating! 🚀**

