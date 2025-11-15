import React from "react";

export type Product = {
  _id: string;
  title: string;
  categoryName: string;
  description: string;
  price: number;
  mainImage: string[];
  subImages: string[];
  discount: number;
  priceAfterDiscount: number;
  quantity: number;
  size: string[];
  sold: number;
  ratingAverage: number;
  categoryId: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};

export type State = {
  selectedProduct: Product | null;
  language: string;
  currency: string;
  langOpen: boolean;
  currOpen: boolean;
  selectedLang: string; // e.g. 'en' | 'ar'
  selectedCurr: string; // e.g. 'EGP' | 'USD'
  search: string;
  theme: "light" | "dark";
  wishlist: Product[];
  cart: { product: Product; quantity: number }[];
  products: Product[];
};

export type Action =
  | { type: "SET_SELECTED_PRODUCT"; payload: Product | null }
  | { type: "SET_LANGUAGE"; payload: string }
  | { type: "SET_CURRENCY"; payload: string }
  | { type: "TOGGLE_LANG_OPEN" }
  | { type: "TOGGLE_CURR_OPEN" }
  | { type: "SET_SELECTED_LANG"; payload: string }
  | { type: "SET_SELECTED_CURR"; payload: string }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_THEME"; payload: "light" | "dark" }
  | { type: "TOGGLE_WISHLIST"; payload: Product }
  | { type: "ADD_TO_CART"; payload: { product: Product; quantity: number } }
  | { type: "TOGGLE_CART"; payload: string }
  | { type: "SET_PRODUCTS"; payload: Product[] };

export const initialState: State = {
  selectedProduct: null,
  language: "en",
  currency: "EGP",
  langOpen: false,
  currOpen: false,
  selectedLang: "en",
  selectedCurr: "EGP",
  search: "",
  theme: "light",
  wishlist: [],
  cart: [],
  products: [],
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    case "SET_CURRENCY":
      return { ...state, currency: action.payload };
    case "TOGGLE_LANG_OPEN":
      return { ...state, langOpen: !state.langOpen };
    case "TOGGLE_CURR_OPEN":
      return { ...state, currOpen: !state.currOpen };
    case "SET_SELECTED_LANG":
      return { ...state, selectedLang: action.payload };
    case "SET_SELECTED_CURR":
      return { ...state, selectedCurr: action.payload };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "TOGGLE_WISHLIST": {
      const exists = state.wishlist.some((p) => p._id === action.payload._id);
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((p) => p._id !== action.payload._id)
          : [...state.wishlist, action.payload],
      };
    }
    case "ADD_TO_CART": {
      const { product, quantity } = action.payload;
      const existing = state.cart.find(
        (item) => item.product._id === product._id
      );
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product, quantity }],
      };
    }
    case "TOGGLE_CART": {
      const exists = state.cart.some(
        (item) => item.product._id === action.payload
      );
      return exists
        ? {
            ...state,
            cart: state.cart.filter(
              (item) => item.product._id !== action.payload
            ),
          }
        : state;
    }

    case "SET_PRODUCTS":
      return { ...state, products: action.payload };

    default:
      return state;
  }
}

export type AppContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
  style_mood: React.CSSProperties;
  t: (key: string) => string;
  setLanguage: (lang: string) => void;
};
