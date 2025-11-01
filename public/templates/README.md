# Templates Directory

This directory contains the built-in templates used by the QuickClick Media Suite tools.

## Unilever Traffic Sheet Template

### Setup Instructions

1. **Add Your Template File**
   - Place your `Unilever_Trafficking_Sheet_Template.xlsx` file in this directory
   - The file should be named exactly: `unilever-traffic-sheet-template.xlsx`
   - This is the template that will be used to generate all traffic sheets

2. **Template Requirements**
   - Must be an Excel file (.xlsx format)
   - Should have a clear header row
   - Should contain all the formatting you want preserved
   - Include merged cells, colors, borders, etc. as needed

3. **File Location**
   ```
   public/templates/unilever-traffic-sheet-template.xlsx
   ```

4. **Usage**
   - Once the template is added, users only need to upload their blocking chart
   - The tool will automatically use this template to generate the traffic sheet
   - No need for users to upload the template each time!

## Adding Additional Templates

As you build more tools, you can add more templates here:

```
public/templates/
├── unilever-traffic-sheet-template.xlsx    ← Traffic Sheet Automation
├── rfp-form-template.xlsx                  ← RFP/DAB Form Importer
├── blocking-chart-template.xlsx            ← Blocking Chart Builder
└── ...
```

## Security Note

Templates in the `public/` directory are accessible via URL:
- `http://localhost:3000/templates/unilever-traffic-sheet-template.xlsx`

This is intentional - it allows:
1. The API to read the template
2. Users to download the template if needed
3. Easy updates without code changes

If you need to keep templates private, move them to a `templates/` directory in the root (not in `public/`) and update the API routes accordingly.

