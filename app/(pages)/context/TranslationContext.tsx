/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import ar from "../../../locales/ar.json";
import en from "../../../locales/en.json";

const TranslationContext = createContext<any>(null);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState("en");
  const translations = locale === "ar" ? ar : en;

  function t(key: string): string {
    const result = key
      .split(".")
      .reduce(
        (obj: any, k: string) => (obj ? obj[k] : undefined),
        translations as any
      );
    return typeof result === "string" ? result : key;
  }

  return (
    <TranslationContext.Provider value={{ t, locale, setLocale }}>
      {children}
    </TranslationContext.Provider>
  );
}

export const useTranslation = () => useContext(TranslationContext);
