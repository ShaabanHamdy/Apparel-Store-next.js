import { FaRegHeart } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { useAppContext } from "../context/Context";
import useTranslation from "../../hooks/useTranslation";

const Icons = () => {
  const { state } = useAppContext();
  const { t } = useTranslation(); // added translation hook

  return (
    <div className="flex gap-4 relative">
      {/* Heart */}
      <div className="relative" title={t("icons.wishlist")}>
        <FaRegHeart className="text-xl text-red-600" aria-label={t("icons.wishlist")} />
        {state.wishlist.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
            {state.wishlist.length}
          </span>
        )}
      </div>

      {/* Cart */}
      <div className="relative" title={t("icons.cart")}>
        <HiShoppingCart
          className={`text-2xl ${
            state.theme === "dark" ? "text-white" : "text-gray-800"
          }`}
          aria-label={t("icons.cart")}
        />
        {state.cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-1">
            {state.cart.length}
          </span>
        )}
      </div>
    </div>
  );
};

export default Icons;
