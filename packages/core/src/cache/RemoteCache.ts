import { TranslationCache } from './TranslationCache';

export class RemoteCache implements TranslationCache {
  constructor(private apiKey: string, private endpoint: string) {}

  async get(key: string): Promise<string | null> {
    try {
      const res = await fetch(`${this.endpoint}/translate-cache?key=${encodeURIComponent(key)}`, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      if (!res.ok) return null;
      const json = await res.json();
      return json?.value ?? null;
    } catch {
      return null;
    }
  }

  async set(key: string, value: string): Promise<void> {
    try {
      await fetch(`${this.endpoint}/translate-cache`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ key, value })
      });
    } catch {
      // Fail silently
    }
  }
} 