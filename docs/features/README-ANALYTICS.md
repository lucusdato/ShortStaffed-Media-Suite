# Analytics Compilation Tool

This tool helps you compile analytics exports from multiple users into consolidated CSV files for analysis.

## Overview

The ShortStaffed MediaTools desktop application now includes enhanced analytics export functionality:

1. **User Profile in Export**: When users export their analytics, the ZIP file now includes:
   - User profile information in the filename (e.g., `analytics-JohnDoe-Manager-ClientA-2025-01-07.zip`)
   - User metadata in the `export-info.json` file

2. **Compilation Script**: A Node.js script that processes multiple user exports and generates consolidated CSV files

## Export Format

Each user's export ZIP contains:

```
analytics-[Name]-[Role]-[Client]-[Date].zip
├── logs/
│   ├── usage-2025-01-01.jsonl
│   ├── usage-2025-01-02.jsonl
│   └── ...
└── export-info.json
```

### export-info.json Structure

```json
{
  "exportedAt": "2025-01-07T10:30:00.000Z",
  "appVersion": "1.0.5",
  "platform": "darwin",
  "fileCount": 5,
  "dateRange": {
    "earliest": "2025-01-01",
    "latest": "2025-01-05"
  },
  "user": {
    "name": "John Doe",
    "role": "Media Manager",
    "client": "Acme Corp"
  }
}
```

### Log Event Format (JSONL)

Each line in the `.jsonl` files is a JSON object:

```json
{
  "timestamp": "2025-01-07T14:30:00.000Z",
  "user": "John Doe",
  "tool": "taxonomy-generator",
  "action": "generate",
  "metadata": {
    "platform": "Meta",
    "rowCount": 150
  }
}
```

## Using the Compilation Tool

### Step 1: Collect User Exports

Create a folder and place all user export ZIP files in it:

```
user-exports/
├── analytics-JohnDoe-Manager-ClientA-2025-01-07.zip
├── analytics-JaneSmith-Designer-ClientB-2025-01-07.zip
└── analytics-BobJones-Admin-ClientC-2025-01-07.zip
```

### Step 2: Run the Compilation Script

```bash
npm run compile-analytics <input-folder> [output-folder]
```

**Example:**

```bash
npm run compile-analytics ./user-exports ./compiled-data
```

**Arguments:**
- `<input-folder>`: Directory containing the ZIP files (required)
- `[output-folder]`: Directory for CSV outputs (optional, defaults to `./compiled-analytics`)

### Step 3: View the Output

The script generates two CSV files:

#### 1. Detailed CSV (`analytics-detailed-[date].csv`)

Contains every individual event with full details:

| Timestamp | User Name | Role | Client | User (from log) | Tool | Action | Metadata | Export Date |
|-----------|-----------|------|--------|-----------------|------|--------|----------|-------------|
| 2025-01-07T14:30:00.000Z | John Doe | Manager | ClientA | John Doe | taxonomy-generator | generate | {"platform":"Meta","rowCount":150} | 2025-01-07T10:30:00.000Z |

#### 2. Summary CSV (`analytics-summary-[date].csv`)

Aggregated statistics per user and tool:

| User Name | Role | Client | Tool | Total Actions | First Use | Last Use | Action Breakdown |
|-----------|------|--------|------|---------------|-----------|----------|------------------|
| John Doe | Manager | ClientA | taxonomy-generator | 25 | 2025-01-01T09:00:00.000Z | 2025-01-05T17:30:00.000Z | generate: 20; export: 5 |

## Example Workflow

```bash
# 1. Navigate to project directory
cd "/Users/lucusdato/Documents/Dev/ShortStaffed MediaTools"

# 2. Create a folder for user exports
mkdir user-exports

# 3. Copy all user ZIP files to this folder
# (Users send you their exports via email, Slack, etc.)

# 4. Run the compilation
npm run compile-analytics ./user-exports

# 5. View results in compiled-analytics folder
ls -la compiled-analytics/
# analytics-detailed-2025-01-07.csv
# analytics-summary-2025-01-07.csv
```

## Script Output

When running the script, you'll see progress like this:

```
📊 Analytics Compilation Tool

Input folder:  /Users/you/user-exports
Output folder: /Users/you/compiled-analytics

Found 3 ZIP file(s)

📦 Processing: analytics-JohnDoe-Manager-ClientA-2025-01-07.zip
   ✓ Processed 150 events
📦 Processing: analytics-JaneSmith-Designer-ClientB-2025-01-07.zip
   ✓ Processed 89 events
📦 Processing: analytics-BobJones-Admin-ClientC-2025-01-07.zip
   ✓ Processed 234 events

✅ Processed 473 total events

📄 Generating CSV files...
   ✓ Detailed CSV: compiled-analytics/analytics-detailed-2025-01-07.csv
   ✓ Summary CSV: compiled-analytics/analytics-summary-2025-01-07.csv

✅ Compilation complete!
```

## Analysis Tips

### Using Excel/Google Sheets

1. Open either CSV file in your spreadsheet application
2. Use filters on columns like:
   - **Client**: See activity per client
   - **Tool**: Compare usage across different tools
   - **Action**: Identify common workflows
3. Create pivot tables for deeper insights

### Using Data Analysis Tools

The CSV format is compatible with:
- **Python (pandas)**: `df = pd.read_csv('analytics-detailed-2025-01-07.csv')`
- **R**: `data <- read.csv('analytics-detailed-2025-01-07.csv')`
- **Tableau/Power BI**: Direct CSV import

## Troubleshooting

### "No ZIP files found"

- Ensure ZIP files are directly in the input folder (not in subdirectories)
- Check that files end with `.zip` extension

### "Could not read export metadata"

- Older exports may not have the `export-info.json` file
- The script will process these but user info will show as "Unknown"

### "Could not parse log line"

- Corrupted or invalid JSON lines will be skipped
- A warning will be displayed but processing continues

## Technical Details

**Location**: `scripts/compileAnalytics.ts`

**Dependencies**:
- `unzipper` - Extract ZIP archives
- `csv-parse` - Parse CSV data
- `tsx` - Run TypeScript directly

**What it does**:
1. Scans input folder for ZIP files
2. Extracts each ZIP to a temporary directory
3. Reads `export-info.json` for user metadata
4. Parses all `.jsonl` log files
5. Combines data from all users
6. Generates two CSV files (detailed + summary)
7. Cleans up temporary files

## Support

For issues or questions about the analytics compilation tool:
1. Check this README
2. Review the script output for specific error messages
3. Contact the development team
