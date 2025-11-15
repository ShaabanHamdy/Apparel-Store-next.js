/* eslint-disable @next/next/no-img-element */
"use client";
import { useAppContext } from "../../context/Context";
import { Product } from "../../context/ContextType";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
// import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }: { product: Product }) => {
  const { state, dispatch , style_mood } = useAppContext();
  
  const isWishlisted = state.wishlist.some((item: Product) => item._id === product._id);
  const isInCart = state.cart.some(item => item.product._id === product._id);
  const router = useRouter();

  // const handleCardClick = () => {
  //   router.push(`/productCardDetails/${product._id}`);
  // };
  const handleCardClick = () => {
  dispatch({ type: "SET_SELECTED_PRODUCT", payload: product });
  router.push(`/${product._id}`);
};
// console.log("ProductCard clicked for product ID:", product._id);

  return (
    <div
    style={style_mood}
      className="relative group bg-white cursor-pointer rounded-lg shadow hover:shadow-lg transition p-2"
      onClick={handleCardClick}
    >
      <img src={product.mainImage[0]} alt="" />
      {/* <Image
        src={product.mainImage[0]}
        alt={product.title}
        width={300}
        height={300}
        className="rounded-lg object-cover w-full h-48"
      /> */}
      {/* Heart icon appears on hover */}
      <button
      style={style_mood}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition bg-white rounded-full p-2 shadow cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: "TOGGLE_WISHLIST", payload: product });
        }}
      >
        {isWishlisted ? (
          <FaHeart className="text-red-600 text-xl" />
        ) : (
          <FaRegHeart className="text-gray-500 text-xl" />
        )}
      </button>
      {/* Cart icon always visible */}
      <button
      style={style_mood}
        className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: "TOGGLE_CART", payload: product._id });
        }}
      >
        <HiShoppingCart
          className={
            isInCart ? "text-blue-600 text-xl" : "text-gray-500 text-xl"
          }
        />
      </button>
      <div className="mt-3 text-center font-semibold text-lg">
        {product.title}
      </div>
      <div className="text-center text-base ">
        EGP {product.priceAfterDiscount ?? product.price}
      </div>
    </div>
  );
};

export default ProductCard;
