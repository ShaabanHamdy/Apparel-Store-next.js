"use client";
import React from "react";
import ProductCard from "../(product)/ProductCard/ProductCard";
import { useAppContext } from "../context/Context";
import useTranslation from "../../hooks/useTranslation"; // ✅ Import translation hook

const MenProducts = () => {
  const { state, style_mood } = useAppContext();
  const { t } = useTranslation(); // ✅ Use translation function

  // Filter products for men's category (adjust categoryName as needed)
  const menProducts = state.products.filter((product) =>
    product.categoryName?.toLowerCase().includes("men")
  );

  return (
    <div style={style_mood} className="container mx-auto py-8">
      <h2
        className={`text-2xl font-bold mb-6 text-center ${
          state.theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        {t("menProducts.title")}
      </h2>

      <div
        style={style_mood}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {menProducts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            {t("menProducts.noProducts")}
          </div>
        ) : (
          menProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default MenProducts;
