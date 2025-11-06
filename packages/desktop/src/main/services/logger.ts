import { app } from 'electron';
import { promises as fs } from 'fs';
import path from 'path';
import archiver from 'archiver';
import { createWriteStream } from 'fs';

export interface LogEvent {
  timestamp: string;
  user: string;
  tool: string;
  action: string;
  metadata?: Record<string, any>;
}

class Logger {
  private logsDir: string;

  constructor() {
    const userDataPath = app.getPath('userData');
    this.logsDir = path.join(userDataPath, 'logs');
  }

  async init(): Promise<void> {
    await fs.mkdir(this.logsDir, { recursive: true });
  }

  async track(event: Omit<LogEvent, 'timestamp'>): Promise<void> {
    await this.init();

    const logEvent: LogEvent = {
      ...event,
      timestamp: new Date().toISOString(),
    };

    const today = new Date().toISOString().split('T')[0];
    const logFile = path.join(this.logsDir, `usage-${today}.jsonl`);

    const logLine = JSON.stringify(logEvent) + '\n';
    await fs.appendFile(logFile, logLine, 'utf-8');
  }

  async getLogs(filter?: { startDate?: string; endDate?: string; tool?: string }): Promise<LogEvent[]> {
    await this.init();

    const files = await fs.readdir(this.logsDir);
    const logFiles = files.filter(f => f.startsWith('usage-') && f.endsWith('.jsonl'));

    let allLogs: LogEvent[] = [];

    for (const file of logFiles) {
      const filePath = path.join(this.logsDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim());

      for (const line of lines) {
        try {
          const log = JSON.parse(line);
          allLogs.push(log);
        } catch (error) {
          console.error('Failed to parse log line:', line);
        }
      }
    }

    // Apply filters
    if (filter) {
      if (filter.startDate) {
        allLogs = allLogs.filter(log => log.timestamp >= filter.startDate!);
      }
      if (filter.endDate) {
        allLogs = allLogs.filter(log => log.timestamp <= filter.endDate!);
      }
      if (filter.tool) {
        allLogs = allLogs.filter(log => log.tool === filter.tool);
      }
    }

    // Sort by timestamp descending
    allLogs.sort((a, b) => b.timestamp.localeCompare(a.timestamp));

    return allLogs;
  }

  getLogsPath(): string {
    return this.logsDir;
  }

  async exportLogs(outputPath: string): Promise<{ success: boolean; error?: string; stats?: any }> {
    try {
      await this.init();

      // Get all log files
      const files = await fs.readdir(this.logsDir);
      const logFiles = files.filter(f => f.startsWith('usage-') && f.endsWith('.jsonl'));

      if (logFiles.length === 0) {
        return { success: false, error: 'No log files found to export' };
      }

      // Create archive
      const output = createWriteStream(outputPath);
      const archive = archiver('zip', { zlib: { level: 9 } });

      return new Promise((resolve, reject) => {
        output.on('close', () => {
          resolve({
            success: true,
            stats: {
              totalBytes: archive.pointer(),
              fileCount: logFiles.length,
            },
          });
        });

        archive.on('error', (err) => {
          reject({ success: false, error: err.message });
        });

        archive.pipe(output);

        // Add all log files to archive
        for (const file of logFiles) {
          const filePath = path.join(this.logsDir, file);
          archive.file(filePath, { name: `logs/${file}` });
        }

        // Create and add metadata file
        const metadata = {
          exportedAt: new Date().toISOString(),
          appVersion: app.getVersion(),
          platform: process.platform,
          fileCount: logFiles.length,
          dateRange: {
            earliest: logFiles[0]?.replace('usage-', '').replace('.jsonl', ''),
            latest: logFiles[logFiles.length - 1]?.replace('usage-', '').replace('.jsonl', ''),
          },
        };

        archive.append(JSON.stringify(metadata, null, 2), { name: 'export-info.json' });

        // Finalize the archive
        archive.finalize();
      });
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}

export const logger = new Logger();
