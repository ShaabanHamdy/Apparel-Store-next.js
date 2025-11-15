/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import useTranslation from "../hooks/useTranslation";
import { useAppContext } from "../(pages)/context/Context";

const Page = () => {
  const { t } = useTranslation();
  const { state } = useAppContext();
  const isRTL = state.selectedLang === "ar";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    bDay: "",
    bMonth: "",
    bYear: "",
    gender: "",
    password: "",
    confirmPassword: "",
    nationality: "",
  });

  const nationalities = [
    "registration.egyptian",
    "registration.saudi",
    "registration.emirati",
    "registration.other",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t("registration.register") || "Registered");
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
          {t("registration.register")}
        </h2>

        <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
          <input
            name="firstName"
            placeholder={t("registration.first_name")}
            value={form.firstName}
            onChange={handleChange}
            className={`border rounded px-3 py-2 w-1/2 ${
              isRTL ? "text-right" : ""
            }`}
            required
          />
          <input
            name="lastName"
            placeholder={t("registration.last_name")}
            value={form.lastName}
            onChange={handleChange}
            className={`border rounded px-3 py-2 w-1/2 ${
              isRTL ? "text-right" : ""
            }`}
            required
          />
        </div>

        <input
          name="email"
          type="email"
          placeholder={t("registration.email")}
          value={form.email}
          onChange={handleChange}
          className={`border rounded px-3 py-2 w-full ${
            isRTL ? "text-right" : ""
          }`}
          required
        />

        <input
          name="mobile"
          placeholder={t("registration.mobile")}
          value={form.mobile}
          onChange={handleChange}
          className={`border rounded px-3 py-2 w-full ${
            isRTL ? "text-right" : ""
          }`}
          required
        />

        <div className="flex gap-2">
          <input
            name="bDay"
            type="number"
            min={1}
            max={31}
            placeholder={t("registration.day")}
            value={form.bDay}
            onChange={handleChange}
            className={`border rounded px-3 py-2 w-1/3 ${
              isRTL ? "text-right" : ""
            }`}
            required
          />
          <input
            name="bMonth"
            type="number"
            min={1}
            max={12}
            placeholder={t("registration.month")}
            value={form.bMonth}
            onChange={handleChange}
            className={`border rounded px-3 py-2 w-1/3 ${
              isRTL ? "text-right" : ""
            }`}
            required
          />
          <input
            name="bYear"
            type="number"
            min={1900}
            max={2100}
            placeholder={t("registration.year")}
            value={form.bYear}
            onChange={handleChange}
            className={`border rounded px-3 py-2 w-1/3 ${
              isRTL ? "text-right" : ""
            }`}
            required
          />
        </div>

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className={`border rounded px-3 py-2 w-full ${
            isRTL ? "text-right" : ""
          }`}
          required
        >
          <option value="">{t("registration.select_gender")}</option>
          <option value="male">{t("registration.male")}</option>
          <option value="female">{t("registration.female")}</option>
          <option value="other">{t("registration.other")}</option>
        </select>

        <select
          name="nationality"
          value={form.nationality}
          onChange={handleChange}
          className={`border rounded px-3 py-2 w-full ${
            isRTL ? "text-right" : ""
          }`}
          required
        >
          <option value="">{t("registration.select_nationality")}</option>
          {nationalities.map((key) => (
            <option key={key} value={key}>
              {t(key)}
            </option>
          ))}
        </select>

        <input
          name="password"
          type="password"
          placeholder={t("registration.password") || "Password"}
          value={form.password}
          onChange={handleChange}
          className={`border rounded px-3 py-2 w-full ${
            isRTL ? "text-right" : ""
          }`}
          required
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder={t("registration.confirm_password") || "Confirm Password"}
          value={form.confirmPassword}
          onChange={handleChange}
          className={`border rounded px-3 py-2 w-full ${
            isRTL ? "text-right" : ""
          }`}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {t("registration.register")}
        </button>
      </form>
    </div>
  );
};

export default Page;
