"use client";
import { useAppContext } from "../context/Context";
import React from "react";
import useTranslation from "../../hooks/useTranslation";

const Discount = () => {
  const { t } = useTranslation();
  const { state } = useAppContext();

  return (
    <div
      className={`text-center py-2 text-[13px] md:text-base font-semibold
        ${
          state.theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-white text-black"
        }
      `}
    >
      {t("discount.banner")}
    </div>
  );
};

export default Discount;
