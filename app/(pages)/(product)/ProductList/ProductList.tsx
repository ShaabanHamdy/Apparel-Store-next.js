"use client";
import { useAppContext } from "../../context/Context";
import ProductCard from "../ProductCard/ProductCard";

const ProductList = () => {
  const { state } = useAppContext();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {state.products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
