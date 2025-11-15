/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import ar from "../../../locales/ar.json";
import en from "../../../locales/en.json";
import { AppContextType, initialState, reducer } from "./ContextType";

const translations: Record<string, any> = {
  en,
  ar,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

function getNestedTranslation(obj: any, key: string) {
  if (!obj || !key) return key;
  const parts = key.split(".");
  let cur: any = obj;
  for (const p of parts) {
    cur = cur?.[p];
    if (cur === undefined) return key;
  }
  return typeof cur === "string" ? cur : key;
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const style_mood: React.CSSProperties =
    state.theme === "dark"
      ? {
          backgroundColor: "#101828",
          color: "#FDFDFD",
          border: "1px solid #2D3748",
        }
      : { backgroundColor: "#fff", color: "#111" };

  // load persisted theme & lang
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) dispatch({ type: "SET_THEME", payload: savedTheme });
    const savedLang = localStorage.getItem("lang");
    if (savedLang && savedLang !== state.selectedLang) {
      dispatch({ type: "SET_SELECTED_LANG", payload: savedLang });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", state.theme);
      document.body.classList.toggle("dark", state.theme === "dark");
      document.documentElement.classList.toggle("dark", state.theme === "dark");
    }
  }, [state.theme]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const lang = state.selectedLang || "en";
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    if (typeof window !== "undefined") localStorage.setItem("lang", lang);
  }, [state.selectedLang]);

  // fetch products once (optional)
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/product/getAllProducts"
        );
        dispatch({ type: "SET_PRODUCTS", payload: res.data?.data || [] });
      } catch (e) {
        console.error("Failed to fetch products", e);
      }
    };
    getAllProducts();
  }, []);

  const t = (key: string) => {
    const lang = state.selectedLang || "en";
    return getNestedTranslation(translations[lang], key);
  };

  const setLanguage = (lang: string) => {
    dispatch({ type: "SET_SELECTED_LANG", payload: lang });
    // optional extra action kept for compatibility with reducers that expect SET_LANGUAGE
    dispatch({ type: "SET_LANGUAGE", payload: lang } as any);
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
    if (typeof window !== "undefined") localStorage.setItem("lang", lang);
  };

  const value: AppContextType = {
    state,
    dispatch,
    style_mood,
    t,
    setLanguage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};
