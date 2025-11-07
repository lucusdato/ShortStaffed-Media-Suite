/**
 * Analytics Compilation Script
 *
 * This script processes multiple analytics export ZIP files from different users
 * and compiles them into consolidated CSV files for analysis.
 *
 * Usage:
 *   npm run compile-analytics <input-folder> [output-folder]
 *
 * Example:
 *   npm run compile-analytics ./user-exports ./compiled-data
 */

import fs from 'fs/promises';
import path from 'path';
import { createWriteStream, createReadStream } from 'fs';
import unzipper from 'unzipper';
import { parse } from 'csv-parse/sync';

interface LogEvent {
  timestamp: string;
  user: string;
  tool: string;
  action: string;
  metadata?: Record<string, any>;
}

interface ExportMetadata {
  exportedAt: string;
  appVersion: string;
  platform: string;
  fileCount: number;
  dateRange: {
    earliest: string;
    latest: string;
  };
  user: {
    name: string;
    role: string;
    client: string;
  } | null;
}

interface CompiledEvent extends LogEvent {
  exportUser: string;
  exportRole: string;
  exportClient: string;
  exportDate: string;
}

async function extractZipToTemp(zipPath: string, tempDir: string): Promise<string> {
  const extractPath = path.join(tempDir, path.basename(zipPath, '.zip'));
  await fs.mkdir(extractPath, { recursive: true });

  await createReadStream(zipPath)
    .pipe(unzipper.Extract({ path: extractPath }))
    .promise();

  return extractPath;
}

async function parseExportMetadata(extractPath: string): Promise<ExportMetadata | null> {
  try {
    const metadataPath = path.join(extractPath, 'export-info.json');
    const content = await fs.readFile(metadataPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.warn(`⚠️  Could not read export metadata: ${error}`);
    return null;
  }
}

async function parseLogFiles(extractPath: string): Promise<LogEvent[]> {
  const logsDir = path.join(extractPath, 'logs');
  const events: LogEvent[] = [];

  try {
    const files = await fs.readdir(logsDir);
    const logFiles = files.filter(f => f.endsWith('.jsonl'));

    for (const file of logFiles) {
      const filePath = path.join(logsDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim());

      for (const line of lines) {
        try {
          const event = JSON.parse(line);
          events.push(event);
        } catch (error) {
          console.warn(`⚠️  Could not parse log line: ${line}`);
        }
      }
    }
  } catch (error) {
    console.error(`❌ Error reading log files: ${error}`);
  }

  return events;
}

async function processZipFile(zipPath: string, tempDir: string): Promise<CompiledEvent[]> {
  console.log(`📦 Processing: ${path.basename(zipPath)}`);

  // Extract ZIP
  const extractPath = await extractZipToTemp(zipPath, tempDir);

  // Read metadata
  const metadata = await parseExportMetadata(extractPath);

  // Parse log files
  const events = await parseLogFiles(extractPath);

  // Compile events with user metadata
  const compiledEvents: CompiledEvent[] = events.map(event => ({
    ...event,
    exportUser: metadata?.user?.name || 'Unknown',
    exportRole: metadata?.user?.role || 'Unknown',
    exportClient: metadata?.user?.client || 'Unknown',
    exportDate: metadata?.exportedAt || '',
  }));

  console.log(`   ✓ Processed ${events.length} events`);

  // Cleanup
  await fs.rm(extractPath, { recursive: true, force: true });

  return compiledEvents;
}

function escapeCSV(value: string | number | undefined): string {
  const str = String(value || '');
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

async function generateCSV(events: CompiledEvent[], outputPath: string): Promise<void> {
  const lines: string[] = [];

  // Header
  lines.push([
    'Timestamp',
    'User Name (from export)',
    'Role (from export)',
    'Client (from export)',
    'User (from log)',
    'Tool',
    'Action',
    'Metadata',
    'Export Date',
  ].join(','));

  // Sort events by timestamp
  events.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  // Data rows
  for (const event of events) {
    lines.push([
      event.timestamp,
      event.exportUser,
      event.exportRole,
      event.exportClient,
      event.user,
      event.tool,
      event.action,
      JSON.stringify(event.metadata || {}),
      event.exportDate,
    ].map(escapeCSV).join(','));
  }

  await fs.writeFile(outputPath, lines.join('\n'), 'utf-8');
}

async function generateSummaryCSV(events: CompiledEvent[], outputPath: string): Promise<void> {
  // Group by user and tool
  const summary = new Map<string, {
    user: string;
    role: string;
    client: string;
    tool: string;
    totalActions: number;
    firstUse: string;
    lastUse: string;
    actions: Map<string, number>;
  }>();

  for (const event of events) {
    const key = `${event.exportUser}|${event.exportClient}|${event.tool}`;

    if (!summary.has(key)) {
      summary.set(key, {
        user: event.exportUser,
        role: event.exportRole,
        client: event.exportClient,
        tool: event.tool,
        totalActions: 0,
        firstUse: event.timestamp,
        lastUse: event.timestamp,
        actions: new Map(),
      });
    }

    const stats = summary.get(key)!;
    stats.totalActions++;
    stats.firstUse = event.timestamp < stats.firstUse ? event.timestamp : stats.firstUse;
    stats.lastUse = event.timestamp > stats.lastUse ? event.timestamp : stats.lastUse;

    const actionCount = stats.actions.get(event.action) || 0;
    stats.actions.set(event.action, actionCount + 1);
  }

  const lines: string[] = [];

  // Header
  lines.push([
    'User Name',
    'Role',
    'Client',
    'Tool',
    'Total Actions',
    'First Use',
    'Last Use',
    'Action Breakdown',
  ].join(','));

  // Data rows
  for (const stats of summary.values()) {
    const actionBreakdown = Array.from(stats.actions.entries())
      .map(([action, count]) => `${action}: ${count}`)
      .join('; ');

    lines.push([
      stats.user,
      stats.role,
      stats.client,
      stats.tool,
      stats.totalActions,
      stats.firstUse,
      stats.lastUse,
      actionBreakdown,
    ].map(escapeCSV).join(','));
  }

  await fs.writeFile(outputPath, lines.join('\n'), 'utf-8');
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error(`
Usage: npm run compile-analytics <input-folder> [output-folder]

Example:
  npm run compile-analytics ./user-exports ./compiled-data

Arguments:
  input-folder   - Directory containing analytics export ZIP files
  output-folder  - Directory for compiled CSV outputs (default: ./compiled-analytics)
`);
    process.exit(1);
  }

  const inputFolder = path.resolve(args[0]);
  const outputFolder = path.resolve(args[1] || './compiled-analytics');
  const tempDir = path.join(outputFolder, '.temp');

  console.log('📊 Analytics Compilation Tool\n');
  console.log(`Input folder:  ${inputFolder}`);
  console.log(`Output folder: ${outputFolder}\n`);

  // Create output directories
  await fs.mkdir(outputFolder, { recursive: true });
  await fs.mkdir(tempDir, { recursive: true });

  try {
    // Find all ZIP files
    const files = await fs.readdir(inputFolder);
    const zipFiles = files.filter(f => f.endsWith('.zip'));

    if (zipFiles.length === 0) {
      console.error('❌ No ZIP files found in input folder');
      process.exit(1);
    }

    console.log(`Found ${zipFiles.length} ZIP file(s)\n`);

    // Process all ZIPs
    const allEvents: CompiledEvent[] = [];

    for (const zipFile of zipFiles) {
      const zipPath = path.join(inputFolder, zipFile);
      const events = await processZipFile(zipPath, tempDir);
      allEvents.push(...events);
    }

    console.log(`\n✅ Processed ${allEvents.length} total events\n`);

    // Generate outputs
    const timestamp = new Date().toISOString().split('T')[0];

    console.log('📄 Generating CSV files...');

    const detailedCsvPath = path.join(outputFolder, `analytics-detailed-${timestamp}.csv`);
    await generateCSV(allEvents, detailedCsvPath);
    console.log(`   ✓ Detailed CSV: ${detailedCsvPath}`);

    const summaryCsvPath = path.join(outputFolder, `analytics-summary-${timestamp}.csv`);
    await generateSummaryCSV(allEvents, summaryCsvPath);
    console.log(`   ✓ Summary CSV: ${summaryCsvPath}`);

    console.log('\n✅ Compilation complete!');

  } catch (error) {
    console.error('❌ Error during compilation:', error);
    throw error;
  } finally {
    // Cleanup temp directory
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
