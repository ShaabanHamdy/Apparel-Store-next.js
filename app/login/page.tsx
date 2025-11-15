/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
import React, { useState } from "react";
import useTranslation from "../hooks/useTranslation";
import { useAppContext } from "../(pages)/context/Context";

const Page = () => {
  const { t } = useTranslation();
  const { state } = useAppContext();
  const isRTL = state.selectedLang === "ar";

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((f) => ({
        ...f,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call login API
    alert(t("login.signIn") + " — " + form.email);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {t("login.title")}
        </h2>
        <p className="text-sm text-gray-600 text-center">
          {t("login.instructions")}
        </p>

        <input
          name="email"
          type="email"
          placeholder={t("login.email")}
          value={form.email}
          onChange={handleChange}
          className={`border rounded px-3 py-2 w-full ${
            isRTL ? "text-right" : ""
          }`}
          required
        />

        <input
          name="password"
          type="password"
          placeholder={t("login.password")}
          value={form.password}
          onChange={handleChange}
          className={`border rounded px-3 py-2 w-full ${
            isRTL ? "text-right" : ""
          }`}
          required
        />

        <div
          className={`flex items-center justify-between ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <label className="flex items-center gap-2">
            <input
              name="remember"
              type="checkbox"
              checked={form.remember}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="text-sm">{t("login.remember")}</span>
          </label>

          <button
            type="button"
            className="text-sm text-blue-600 hover:underline"
          >
            {t("login.forgotPassword")}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {t("login.signIn")}
        </button>

        <p className="text-center text-sm text-gray-600">
          {t("login.noAccount")}{" "}
          <a href="/Register" className="text-blue-600 hover:underline">
            {t("login.register")}
          </a>
        </p>
      </form>
    </div>
  );
};

export default Page;
