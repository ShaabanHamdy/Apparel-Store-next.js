/* eslint-disable @next/next/no-img-element */
"use client";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAppContext } from "../../context/Context";
import type { Product } from "../../context/ContextType";

const colors = ["red", "blue", "green"];

export default function Page() {
  const params = usePathname();
  const id = params ? params.split("/").pop() : null;

  const { state, dispatch } = useAppContext();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No product ID found in URL.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:5000/product/getOneProduct/${id}`)
      .then((res) => {
        const product: Product = res.data.product || res.data.data;
        if (product) {
          setProduct(product);
          setMainImage(
            product.mainImage?.[0] || product.subImages?.[0] || null
          );
        } else {
          setError("Product not found.");
        }
      })
      .catch(() => setError("Failed to fetch product."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }
  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }
  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  // Check if product is in wishlist
  const isWishlisted = state.wishlist.some(
    (p: Product) => p._id === product._id
  );

  // Check if product is in cart

  // Add to cart handler
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { product, quantity: Number(quantity) },
    });
  };

  // Wishlist handler
  const handleToggleWishlist = () => {
    dispatch({
      type: "TOGGLE_WISHLIST",
      payload: product,
    });
  };

  const galleryImages = [
    ...(product.mainImage || []),
    ...(product.subImages || []),
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center items-start py-8 bg-gray-100 min-h-screen">
      {/* Left: Images Gallery */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-2">
          {galleryImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${product.title} thumbnail ${idx + 1}`}
              className={`w-16 h-16 object-cover rounded border cursor-pointer transition-all duration-200 ${
                mainImage === img
                  ? "border-blue-600 ring-2 ring-blue-400"
                  : "border-gray-300"
              }`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
        {/* Main Image with Heart Icon */}
        <div className="relative w-[300px] h-[300px] overflow-hidden border border-gray-200 rounded-lg flex items-center justify-center bg-white">
          <img
            src={mainImage || galleryImages[0]}
            alt={product.title}
            className="object-cover w-full h-full transition-all duration-300 hover:scale-110"
          />
          <button
            onClick={handleToggleWishlist}
            className="absolute top-2 right-2 text-2xl bg-white bg-opacity-80 rounded-full p-2 shadow"
            aria-label="Add to wishlist"
          >
            {isWishlisted ? (
              <FaHeart className="text-red-600" />
            ) : (
              <FaRegHeart className="text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {/* Right: Details */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <p className="mb-4 text-gray-700">{product.description}</p>
        <div className="mb-4">
          <span className="font-semibold">Color:</span>
          {colors.map((color) => (
            <label
              key={color}
              className="inline-flex items-center ml-4 cursor-pointer"
            >
              <input
                type="radio"
                name="color"
                value={color}
                checked={selectedColor === color}
                onChange={() => setSelectedColor(color)}
                className="hidden"
              />
              <span
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedColor === color ? "border-black" : "border-gray-300"
                }`}
                style={{ background: color }}
              />
            </label>
          ))}
        </div>
        <div className="mb-4 flex items-center gap-2">
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-16 border border-gray-300 rounded px-2 py-1"
          />
          <span className="text-lg font-semibold text-green-700">
            EGP {product.priceAfterDiscount ?? product.price}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
