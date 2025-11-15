/* eslint-disable @typescript-eslint/no-explicit-any */
// context/TranslationContext.tsx
"use client";
import { createContext, useState, useContext, ReactNode } from "react";
import en from "../../../locales/en.json";
import ar from "../../../locales/ar.json";

const TranslationContext = createContext<any>(null);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState("en");
  const translations = locale === "ar" ? ar : en;

  function t(key: string): string {
    const result = key.split(".").reduce((obj: any, k: string) => (obj ? obj[k] : undefined), translations as any);
    return typeof result === "string" ? result : key;
  }

  return (
    <TranslationContext.Provider value={{ t, locale, setLocale }}>
      {children}
    </TranslationContext.Provider>
  );
}

export const useTranslation = () => useContext(TranslationContext);
