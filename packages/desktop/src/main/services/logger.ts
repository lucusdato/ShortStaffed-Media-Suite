import { app } from 'electron';
import { promises as fs } from 'fs';
import path from 'path';

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
}

export const logger = new Logger();
