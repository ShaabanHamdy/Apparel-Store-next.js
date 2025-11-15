import { useAppContext } from "../context/Context";
import useTranslation from "../../hooks/useTranslation";



// const LINKS = [
//   { label: "Men", href: "#" },
//   { label: "Women", href: "#" },
//   { label: "Kids", href: "#" },
//   { label: "Accessories", href: "#" },
//   { label: "Clearance", href: "#" },
// ];
const LINKS = [
  { key: "nav.men", href: "#" },
  { key: "nav.women", href: "#" },
  { key: "nav.kids", href: "#" },
  { key: "nav.accessories", href: "#" },
  { key: "nav.clearance", href: "#" },
];

const NavLinks = () => {
  const { t } = useTranslation();
  const { state } = useAppContext();

  return (
    <>
      {LINKS.map((link) => (
        <a
          // style={style}
          key={t(link.key)}
          href={link.href}
          className={`px-3 py-1 rounded font-medium transition
    ${
      state.theme === "dark"
        ? "bg-gray-900 text-white  hover:bg-gray-800"
        : "bg-white text-black hover:bg-gray-200 "
    }
  `}
        >
         {t(link.key)}
        </a>
      ))}
    </>
  );
};

export default NavLinks;
