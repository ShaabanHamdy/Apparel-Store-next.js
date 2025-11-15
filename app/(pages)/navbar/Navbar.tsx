"use client";
import { useAppContext } from "../context/Context";
import Icons from "./Icons";
import Logo from "./Logo";
import MobileScreen from "./MobileScreen";
import NavLinks from "./NavLinks";

export default function Navbar() {
  const { style_mood } = useAppContext();
  return (
    <div style={style_mood} className="p-1">
      <nav style={style_mood} className="w-[95vw] m-auto shadow-md rounded-lg">
        <div className="max-w-screen-xl  mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between p-3 items-center">
            {/* Left: Logo */}
            <div className="">
              <Logo />
            </div>

            {/* Center: Links */}
            <div className="hidden md:flex space-x-6">
              <NavLinks />
            </div>
            {/* Search */}
            <div className="flex items-center space-x-3">
              <Icons />
            </div>
            {/* Mobile Menu */}
            <MobileScreen />
          </div>
        </div>
      </nav>
    </div>
  );
}
