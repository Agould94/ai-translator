import { TranslationCache } from './TranslationCache';

export class LocalStorageCache implements TranslationCache {
  private prefix = '__translation__';

  private getFullKey(key: string): string {
    return `${this.prefix}:${key}`;
  }

  async get(key: string): Promise<string | null> {
    try {
      const value = localStorage.getItem(this.getFullKey(key));
      return value ?? null;
    } catch {
      return null;
    }
  }

  async set(key: string, value: string): Promise<void> {
    try {
      localStorage.setItem(this.getFullKey(key), value);
    } catch {
      // Fail silently
    }
  }
} 