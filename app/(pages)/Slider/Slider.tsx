"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import one1 from "../../../public/images/slider/20240206012522252244882.webp";
import one4 from "../../../public/images/slider/8325507.jpg";
import one3 from "../../../public/images/slider/9707789.jpg";
import one2 from "../../../public/images/slider/minimalist-mens-fashion-beige-shirt-and-trousers.webp";
import { useAppContext } from "../context/Context";

const images = [one1, one2, one3, one4];

const Slider = () => {
   const {  style_mood } = useAppContext();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  return (
    <div style={style_mood} className="h-[86vh]  bg-gray-900 relative overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          className="absolute top-2 w-full md:h-[83vh] h-[75vh]"
          custom={direction}
          initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <Image
            src={images[current]}
            alt={`slide-${current + 1}`}
            fill
            className="object-full"
            priority
          />
        </motion.div>
      </AnimatePresence>
      {/* Dots navigation */}
      <div className="absolute md:bottom-10 bottom-15 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${
              current === idx ? "bg-white" : "bg-gray-400"
            } border`}
            onClick={() => handleDotClick(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
