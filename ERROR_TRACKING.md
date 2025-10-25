# Error Tracking System

The analytics system now tracks errors that users encounter, giving you valuable insights into which employees are having issues and what errors they're experiencing.

## What Gets Tracked

### Automatic Error Tracking

Both tools automatically track errors when:

**Traffic Sheet Automation:**
- File parsing fails (wrong template, corrupted file, unsupported format)
- Template detection fails
- Traffic sheet generation fails
- Download errors occur

**Taxonomy Generator:**
- Metadata validation fails
- File parsing fails (blocking chart or traffic sheet)
- Taxonomy generation fails
- Export errors occur

### Error Information Captured

For each error, the system captures:
- **Error Message**: The actual error message shown to the user
- **Error Type**: Category of error (parse_error, generation_error, etc.)
- **Filename**: The file that caused the error (if applicable)
- **Timestamp**: When the error occurred (Toronto ET)
- **User Info**: Who experienced the error (name, role, client)
- **Tool**: Which tool the error occurred in

## CSV Export Format

The CSV export now includes two new columns:

| Column | Description |
|--------|-------------|
| **Error Occurred** | "Yes" or "No" - Easy filtering |
| **Error Details** | Format: `[error_type] error message` |

### Example CSV Rows

```csv
Timestamp (Toronto ET),Type,User Name,User Role,Client,Tool,Action,Filename,Error Occurred,Error Details
2024-10-24 10:30:00 EDT,File Upload,Lucus Dato,Manager,Unilever,Traffic Sheet Automation,file_upload,Knorr_Campaign.xlsx,No,
2024-10-24 10:30:15 EDT,Event,Lucus Dato,Manager,Unilever,Traffic Sheet Automation,error,wrong_template.xlsx,Yes,"[parse_error] Failed to detect template: No matching template found"
2024-10-24 10:35:00 EDT,Event,Sarah Johnson,Planner,Unilever,Taxonomy Generator,error,corrupted.xlsx,Yes,"[parse_error] Failed to read Excel file: Invalid file format"
```

## How to Use This Data

### 1. Filter by Errors Only

In Excel/Google Sheets:
1. Open the CSV file
2. Filter column "Error Occurred" = "Yes"
3. See all error events

### 2. Identify Users Having Problems

Look for users with multiple errors:
1. Filter by "Error Occurred" = "Yes"
2. Sort by "User Name"
3. Identify users who appear multiple times

### 3. Analyze Error Patterns

**Most common errors:**
- Sort by "Error Details" to see patterns
- Count occurrences of specific error types

**Time-based analysis:**
- Are errors increasing over time?
- Do errors happen at specific times?

**Tool-specific issues:**
- Filter by "Tool" to see which tool has more errors
- Compare error rates between tools

### 4. Follow Up With Users

When you see a user with errors:
1. Note their name and the error they encountered
2. Reach out to them directly
3. Ask for the file they used (filename is in CSV)
4. Help them understand the correct file format
5. Provide guidance or updated templates

## Error Types

The system categorizes errors into types:

| Error Type | Description | Common Causes |
|------------|-------------|---------------|
| `parse_error` | File parsing failed | Wrong template, corrupted file, unsupported format |
| `generation_error` | Output generation failed | Invalid data, system error |
| `validation_error` | Data validation failed | Missing required fields, invalid values |
| `template_detection_error` | Couldn't detect template | Non-standard format, custom template |
| `unknown_error` | Uncategorized error | Unexpected issues |

## Example Use Cases

### Use Case 1: User Keeps Uploading Wrong Template

**CSV shows:**
```
User: John Smith
Errors: 5 instances of "[parse_error] Failed to detect template"
Files: Various filenames
```

**Action:**
- Contact John
- Explain the required template format
- Send him the official template
- Offer training session

### Use Case 2: Multiple Users Have Same Error

**CSV shows:**
```
Error: "[parse_error] Column 'Budget' not found"
Users: 8 different users
```

**Action:**
- Investigate if template changed
- Update template validation rules
- Send announcement about new template format
- Update documentation

### Use Case 3: Spike in Errors on Specific Date

**CSV shows:**
```
Date: 2024-10-15
Errors: 25 errors (normal = 2-3/day)
Type: Various parse_errors
```

**Action:**
- Investigate what changed on that date
- Check if system update caused issues
- Review recent template changes
- Consider rollback if needed

## Technical Details

### Error Tracking Flow

1. **User encounters error** in the app
2. **Error is caught** in try/catch block
3. **Analytics.trafficSheetError()** or **Analytics.taxonomyError()** is called
4. **Error event created** in `tool_usage_events` table with metadata:
   ```json
   {
     "error_message": "Failed to detect template",
     "error_type": "parse_error",
     "filename": "wrong_template.xlsx",
     "timestamp": "2024-10-24T14:30:00.000Z"
   }
   ```
5. **CSV export extracts** error info from metadata
6. **You can analyze** the errors in Excel/Google Sheets

### Browser Console Logs

When an error is tracked, you'll see in the browser console:
```
❌ Error tracked: Failed to detect template: No matching template found
{
  error_message: "Failed to detect template: No matching template found",
  error_type: "parse_error",
  filename: "wrong_template.xlsx",
  timestamp: "2024-10-24T14:30:00.000Z"
}
```

### Database Storage

Errors are stored in the `tool_usage_events` table:

| Field | Value |
|-------|-------|
| `action` | "error" |
| `metadata` | JSON with error details |

The metadata JSONB field allows flexible error information storage without schema changes.

## Benefits

✅ **Identify struggling users** - See who needs help
✅ **Understand error patterns** - Know what issues are most common
✅ **Proactive support** - Reach out before users complain
✅ **Track tool reliability** - Monitor error rates over time
✅ **Improve documentation** - Address common confusion points
✅ **Validate fixes** - Verify error rates decrease after updates

## Files Modified

1. `core/analytics/tracker.ts` - Added `trackError()` function
2. `app/apps/traffic-sheet-automation/page.tsx` - Added error tracking in catch blocks
3. `app/apps/taxonomy-generator/page.tsx` - Added error tracking in catch blocks
4. `app/api/analytics/export/route.ts` - Added error columns to CSV export

## Next Steps

1. **Export your analytics** to CSV
2. **Try uploading a wrong file** to test error tracking
3. **Check the CSV** - you should see the error event
4. **Filter by errors** - see how easy it is to identify issues
5. **Follow up with users** who have errors
