import { FaMoon, FaSun } from "react-icons/fa";
import { useAppContext } from "../context/Context";

const ThemeToggle = () => {
  const { t, state, dispatch } = useAppContext();
  const isDark = state.theme === "dark";

  return (
    <button
      className={`flex items-center justify-between border w-full cursor-pointer px-2 py-1 rounded 
        ${
          state.theme === "dark"
            ? "bg-gray-900 text-white hover:bg-gray-800 border-gray-100"
            : "bg-white text-black hover:bg-gray-300"
        }
      `}
      onClick={() =>
        dispatch({ type: "SET_THEME", payload: isDark ? "light" : "dark" })
      }
      aria-label={isDark ? t("theme.switchToLight") : t("theme.switchToDark")} 
    >
      {isDark ? (
        <FaSun className="text-yellow-400" />
      ) : (
        <FaMoon className="text-gray-800" />
      )}
      <span>
        {isDark ? t("theme.lightMode") : t("theme.darkMode")}{" "}
      
      </span>
    </button>
  );
};

export default ThemeToggle;
