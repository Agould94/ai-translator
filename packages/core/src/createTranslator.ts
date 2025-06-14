import { TranslationCache } from './cache/TranslationCache';
import { InMemoryCache } from './cache/InMemoryCache';
import { translateText } from './translateText';

export type TranslatorOptions = {
  sourceLang: string;
  targetLang: string;
  cache?: TranslationCache[]; // Accept any implementation of TranslationCache
};

export const createTranslator = ({ sourceLang, targetLang, cache = [] }: TranslatorOptions) => {
  const fallback = new InMemoryCache();
  const cacheChain = [...cache, fallback];

  const getKey = (text: string): string => `${sourceLang}:${targetLang}:${text}`;

  return async (text: string): Promise<string> => {
    const key = getKey(text);

    for (const layer of cacheChain) {
      const hit = await layer.get(key);
      if (hit) return hit;
    }

    const translated = await translateText(text, sourceLang, targetLang);

    await Promise.all(cacheChain.map(c => c.set(key, translated)));
    return translated;
  };
}; 