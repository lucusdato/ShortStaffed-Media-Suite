import { app } from 'electron';
import { promises as fs } from 'fs';
import path from 'path';

export interface UserConfig {
  name: string;
  role: string;
  client: string;
  isAdmin: boolean;
}

export interface AppConfig {
  version: string;
  user: UserConfig | null;
  preferences: {
    lastUsedFolder?: string;
    theme?: 'light' | 'dark';
  };
  adminPasswordHash?: string;
}

class ConfigManager {
  private configPath: string;
  private config: AppConfig | null = null;

  constructor() {
    const userDataPath = app.getPath('userData');
    this.configPath = path.join(userDataPath, 'config.json');
  }

  async load(): Promise<AppConfig> {
    try {
      const data = await fs.readFile(this.configPath, 'utf-8');
      this.config = JSON.parse(data);
      return this.config!;
    } catch (error) {
      // Config doesn't exist, create default
      this.config = this.getDefaultConfig();
      await this.save();
      return this.config;
    }
  }

  async save(): Promise<void> {
    if (!this.config) {
      this.config = this.getDefaultConfig();
    }

    const dirPath = path.dirname(this.configPath);
    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(this.configPath, JSON.stringify(this.config, null, 2));
  }

  async get(): Promise<AppConfig> {
    if (!this.config) {
      await this.load();
    }
    return this.config!;
  }

  async set(newConfig: Partial<AppConfig>): Promise<void> {
    if (!this.config) {
      await this.load();
    }
    this.config = { ...this.config!, ...newConfig };
    await this.save();
  }

  async getUser(): Promise<UserConfig | null> {
    const config = await this.get();
    return config.user;
  }

  async setUser(user: UserConfig): Promise<void> {
    if (!this.config) {
      await this.load();
    }
    this.config!.user = user;
    await this.save();
  }

  private getDefaultConfig(): AppConfig {
    return {
      version: '1.0.0',
      user: null,
      preferences: {
        theme: 'light',
      },
    };
  }

  getConfigPath(): string {
    return this.configPath;
  }
}

export const configManager = new ConfigManager();
