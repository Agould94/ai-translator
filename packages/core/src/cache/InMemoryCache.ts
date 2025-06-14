import { TranslationCache } from './TranslationCache';

export class InMemoryCache implements TranslationCache {
  private store: Record<string, string> = {};

  async get(key: string): Promise<string | null> {
    return this.store[key] ?? null;
  }

  async set(key: string, value: string): Promise<void> {
    this.store[key] = value;
  }
} 