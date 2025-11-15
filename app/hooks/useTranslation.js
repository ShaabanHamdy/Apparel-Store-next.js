/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAppContext } from "../(pages)/context/Context";

/**
 * Hook that proxies translation and language switching to your app context.
 * - t(key): uses context t(...) so translations come from Context translations
 * - locale: current selectedLang from context
 * - router, pathname: next/navigation helpers
 * - changeLanguage(lang): uses context.setLanguage(lang) and refreshes router
 */
export default function useTranslation() {
  const router = useRouter();
  const pathname = usePathname();
  const { state, setLanguage, t } = useAppContext();

  const locale = state?.selectedLang || "en";

  function changeLanguage(lang) {
    // update context (persists to localStorage and sets document dir/lang)
    setLanguage(lang);
    // refresh Next.js data/fetches if needed
    try {
      router.refresh();
    } catch (e) {
      // noop if router.refresh isn't available for some reason
    }
  }

  return { t, locale, router, pathname, changeLanguage };
}
