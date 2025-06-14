import { TranslationCache } from './TranslationCache';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class AsyncStorageCache implements TranslationCache {
  private prefix = '__translation__';

  private getFullKey(key: string): string {
    return `${this.prefix}:${key}`;
  }

  async get(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.getFullKey(key));
    } catch {
      return null;
    }
  }

  async set(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(this.getFullKey(key), value);
    } catch {
      // Fail silently
    }
  }
} 