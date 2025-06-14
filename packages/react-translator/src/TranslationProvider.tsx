import React, { createContext, useContext, useState, useMemo } from "react";
import { createTranslator, InMemoryCache, LocalStorageCache, AsyncStorageCache, RemoteCache, TranslationCache } from "core";
import { Platform } from "react-native";

interface TranslationContextType {
  t: (text: string) => Promise<string>;
  lang: string;
  setLang: (lang: string) => void;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

interface TranslationProviderProps {
  children: React.ReactNode;
  defaultLang?: string;
  apiKey?: string;
  remoteEndpoint?: string;
}

export const TranslationProvider = ({ 
  children, 
  defaultLang = "en",
  apiKey,
  remoteEndpoint 
}: TranslationProviderProps) => {
  const [lang, setLang] = useState(defaultLang);

  const translator = useMemo(() => {
    const caches: TranslationCache[] = [
      new InMemoryCache(),
      Platform.OS === 'web' ? new LocalStorageCache() : new AsyncStorageCache(),
    ];

    if (apiKey && remoteEndpoint) {
      caches.push(new RemoteCache(apiKey, remoteEndpoint));
    }

    return createTranslator({
      sourceLang: "en",
      targetLang: lang,
      cache: caches
    });
  }, [lang, apiKey, remoteEndpoint]);

  const t = async (text: string): Promise<string> => {
    return translator(text);
  };

  return (
    <TranslationContext.Provider value={{ t, lang, setLang }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
