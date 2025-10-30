"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { en } from "./locales/en";
import { ru } from "./locales/ru";
import type { Translation } from "./locales/en";

export type Locale = "en" | "ru";

const translations: Record<Locale, Translation> = {
  en,
  ru,
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translation;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("locale");
      return (saved as Locale) || "ru";
    }
    return "ru";
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", newLocale);
    }
  };

  const t = translations[locale];

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}

// Helper function to replace placeholders in translation strings
export function interpolate(str: string, values: Record<string, string>): string {
  return str.replace(/\{(\w+)\}/g, (_, key) => values[key] || `{${key}}`);
}
