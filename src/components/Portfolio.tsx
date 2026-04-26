import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------- Images ---------------- */
import img1 from "@/assets/portfolio/event1.jpg";
import img2 from "@/assets/portfolio/event2.jpg";
import img3 from "@/assets/portfolio/event3.jpg";
import img4 from "@/assets/portfolio/event4.jpg";
import img5 from "@/assets/portfolio/event5.jpg";
import img6 from "@/assets/portfolio/event6.jpg";

const images = [img1, img2, img3, img4, img5, img6];

/* ---------------- Positions ---------------- */
const positions = [
  "top-10 left-10 w-[40%] h-[45%]",
  "top-10 right-10 w-[45%] h-[40%]",
  "bottom-10 left-20 w-[50%] h-[45%]",
  "bottom-10 right-16 w-[38%] h-[50%]",
  "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[65%]",
];

const Portfolio = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getImageAt = (i: number) => {
    return images[(index + i) % images.length];
  };

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center">

      {/* soft glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-black" />

      {/* floating images */}
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-3xl overflow-hidden shadow-2xl cursor-pointer ${pos}`}
          onClick={() => setIndex((index + i) % images.length)}
          animate={{
            scale: i === 4 ? 1.05 : 1,
            rotate: i % 2 === 0 ? 1.2 : -1.2,
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={getImageAt(i)}
              src={getImageAt(i)}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>

          {/* subtle overlay */}
          <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition" />
        </motion.div>
      ))}

      {/* center title */}
      <div className="absolute z-10 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Gallery 
        </h1>
        <p className="text-white/70 mt-4 text-lg">
          Photography & Videography Portfolio
        </p>
      </div>

    </section>
  );
};

export default Portfolio;