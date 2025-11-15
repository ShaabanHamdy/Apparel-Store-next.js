import React from "react";
// import Link from "next/link";
import Image from "next/image";
import logo from "../../../../97logo.png";



import { useAppContext } from "../context/Context";

const Logo = () => {
   const { style_mood } = useAppContext();
  return (
    <div>
      <div style={style_mood} className="flex-shrink-0 text-2xl font-bold text-blue-600">
        {/* <Link href="/">Apperal Store</Link> */}
        <Image src={logo} alt="Logo" width={100} height={100} />
      </div>
    </div>
  );
};

export default Logo;
