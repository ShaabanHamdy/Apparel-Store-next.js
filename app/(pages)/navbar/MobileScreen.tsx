/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaBars, FaRegUser, FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import useTranslation from "../../hooks/useTranslation";
import { useAppContext } from "../context/Context";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import LangAndCrr from "./LangAndCrr";
import NavLinks from "./NavLinks";

const MobileScreen = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { state, dispatch } = useAppContext();
  const { t } = useTranslation(); 

  const isRTL = state.selectedLang === "ar";

  const variants = isRTL
    ? {
        initial: { x: "-100%", opacity: 0, scale: 0.98 },
        animate: { x: 0, opacity: 1, scale: 1 },
        exit: { x: "-100%", opacity: 0, scale: 0.98 },
      }
    : {
        initial: { x: "100%", opacity: 0, scale: 0.98 },
        animate: { x: 0, opacity: 1, scale: 1 },
        exit: { x: "100%", opacity: 0, scale: 0.98 },
      };

  const transition: any = {
    x: { type: "tween", duration: 0.28 },
    opacity: { duration: 0.22 },
    scale: { duration: 0.22 },
    ease: [0.2, 0.8, 0.2, 1],
  };

  const positionClass = isRTL ? "left-0" : "right-0";

  return (
    <div className="relative">
      <button
        className="cursor-pointer"
        onClick={() => setMobileOpen((v) => !v)}
        aria-expanded={mobileOpen}
        aria-controls="mobile-menu"
      >
        {mobileOpen ? (
          <IoMdClose className="text-3xl" />
        ) : (
          <FaBars className="text-2xl" />
        )}
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className={`absolute top-12 z-10 w-96 ${positionClass}`}
          >
            <div
              className={`flex flex-col justify-center space-y-2 px-4 py-2 border rounded-md 
              ${state.theme === "dark" ? "bg-gray-900" : "bg-white"}`}
            >
              {/* Navigation Links */}
              <div className="md:hidden flex flex-col">
                <NavLinks />
              </div>

              {/* Language & Currency */}
              <div className="space-y-2">
                <LangAndCrr />
              </div>

              {/* Profile Section */}
              <div
                className={`flex items-center justify-between border rounded px-2 py-1 mt-2 cursor-pointer
                  ${
                    state.theme === "dark"
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "bg-white text-black hover:bg-gray-300"
                  }`}
              >
                <span>{t("navbar.profile")}</span>
                <FaRegUser className="text-xl" />
              </div>

              {/* Theme Toggle */}
              <div>
                <ThemeToggle />
              </div>

              {/* Search Input */}
              <div
                className={`gap-2 flex items-center border rounded px-2 py-1 mb-3 mt-2
                  ${
                    state.theme === "dark"
                      ? "bg-gray-900 hover:bg-gray-800 text-white"
                      : "bg-white text-black hover:bg-gray-300"
                  }`}
              >
                <FaSearch />
                <input
                  type="text"
                  placeholder={t("navbar.searchPlaceholder")}
                  value={state.search}
                  onChange={(e) =>
                    dispatch({ type: "SET_SEARCH", payload: e.target.value })
                  }
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileScreen;
