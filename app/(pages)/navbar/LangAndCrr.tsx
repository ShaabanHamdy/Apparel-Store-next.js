"use client";
import Image from "next/image";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  EG_flag,
  EN_flag,
  sar_currency,
  uae_currency,
  us_currency,
} from "../../getImg";

import { useAppContext } from "../context/Context";

const LangAndCrr = () => {
  const { state, dispatch, t, setLanguage } = useAppContext();

  const CURRENCIES = [
    {
      code: "EGP",
      label: t("currency.egp"),
      flag: <Image src={EG_flag} alt="EGP_currency" width={20} height={14} />,
    },
    {
      code: "USD",
      label: t("currency.usd"),
      flag: (
        <Image src={us_currency} alt="USD_currency" width={20} height={14} />
      ),
    },
    {
      code: "SAR",
      label: t("currency.sar"),
      flag: (
        <Image src={sar_currency} alt="SAR_currency" width={20} height={14} />
      ),
    },
    {
      code: "AED",
      label: t("currency.aed"),
      flag: (
        <Image src={uae_currency} alt="AED_currency" width={20} height={14} />
      ),
    },
  ];

  const LANGUAGES = [
    {
      code: "en",
      label: t("language.english"),
      flag: <Image src={EN_flag} alt="English" width={20} height={14} />,
    },
    {
      code: "ar",
      label: t("language.arabic"),
      flag: <Image src={EG_flag} alt="Arabic" width={20} height={14} />,
    },
  ];

  const selectedLang =
    LANGUAGES.find((l) => l.code === state.selectedLang) || LANGUAGES[0];
  const selectedCurr =
    CURRENCIES.find((c) => c.code === state.selectedCurr) || CURRENCIES[0];

  return (
    <>
      {/* Language Button */}
      <button
        className={`flex items-center justify-between border border-gray-200 w-full cursor-pointer px-2 py-1 rounded 
        ${
          state.theme === "dark"
            ? "bg-gray-900 text-white hover:bg-gray-800"
            : "bg-white text-black hover:bg-gray-300"
        }`}
        onClick={() => dispatch({ type: "TOGGLE_LANG_OPEN" })}
      >
        <div className="flex items-center w-full">
          {t("navbar.language")}
          <IoMdArrowDropdown className="ml-1" />
        </div>
        <span className="text-sm mx-1">{selectedLang.flag}</span>
        <span className="text-sm">{selectedLang.label}</span>
      </button>

      {/* Language Dropdown */}
      {state.langOpen && (
        <div
          className={`w-32 border rounded shadow z-20 ${
            state.theme === "dark" ? "bg-gray-900" : "bg-white"
          }`}
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              className={`flex items-center w-full px-3 py-2 gap-2 cursor-pointer 
                ${
                  state.theme === "dark"
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-white text-black hover:bg-gray-300"
                }`}
              onClick={() => {
                setLanguage(lang.code as "en" | "ar");
                dispatch({ type: "TOGGLE_LANG_OPEN" });
              }}
            >
              {lang.flag}
              {lang.label}
            </button>
          ))}
        </div>
      )}

      {/* Currency Button */}
      <button
        className={`flex items-center justify-between border border-gray-200 w-full cursor-pointer px-2 py-1 rounded
        ${
          state.theme === "dark"
            ? "bg-gray-900 text-white hover:bg-gray-800"
            : "bg-white text-black hover:bg-gray-300"
        }`}
        onClick={() => dispatch({ type: "TOGGLE_CURR_OPEN" })}
      >
        <div className="flex items-center w-full">
          {t("navbar.currency")}
          <IoMdArrowDropdown className="ml-1" />
        </div>
        {selectedCurr.flag}
        <span className="text-sm  w-72">{selectedCurr.label}</span>
      </button>

      {/* Currency Dropdown */}
      {state.currOpen && (
        <div
          className={`w-full border rounded shadow z-20 ${
            state.theme === "dark" ? "bg-gray-900" : "bg-white"
          }`}
        >
          {CURRENCIES.map((curr) => (
            <button
              key={curr.code}
              className={`flex items-center w-full gap-2 px-3 py-2 cursor-pointer
                ${
                  state.theme === "dark"
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-white text-black hover:bg-gray-300"
                }`}
              onClick={() => {
                dispatch({ type: "SET_SELECTED_CURR", payload: curr.code });
                dispatch({ type: "TOGGLE_CURR_OPEN" });
                dispatch({ type: "SET_CURRENCY", payload: curr.code });
              }}
            >
              {curr.flag}
              {curr.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default LangAndCrr;
