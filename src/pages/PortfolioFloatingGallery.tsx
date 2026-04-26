
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";

/* ---------------- Images ---------------- */
import img1 from "@/assets/portfolio/event1.jpg";
import img2 from "@/assets/portfolio/event2.jpg";
import img3 from "@/assets/portfolio/event3.jpg";
import img4 from "@/assets/portfolio/event4.jpg";
import img5 from "@/assets/portfolio/event5.jpg";
import img6 from "@/assets/portfolio/event6.jpg";
import { Header } from "@/components/Header";
import { FooterNew } from "@/components/FooterNew";


const images = [img1, img2, img3, img4, img5, img6];

/* ---------------- Positions (UNCHANGED) ---------------- */
const positions = [
  "top-10 left-10 w-[40%] h-[45%]",
  "top-10 right-10 w-[45%] h-[40%]",
  "bottom-10 left-20 w-[50%] h-[45%]",
  "bottom-10 right-16 w-[38%] h-[50%]",
  "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[65%]",
];

const PortfolioFloatingGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  /* Scroll controls image index */
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const newIndex = Math.floor(v * (images.length - 1));
      setIndex(newIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const getImageAt = (i: number) => {
    return images[(index + i) % images.length];
  };

  return (
    <>
    <Header/>
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center"
    >
      {/* soft glow background (UNCHANGED) */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-black" />

      {/* FLOATING IMAGES (UNCHANGED STRUCTURE) */}
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-3xl overflow-hidden shadow-2xl cursor-pointer ${pos}`}
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
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          </AnimatePresence>

          {/* subtle overlay */}
          <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition" />
        </motion.div>
      ))}

      {/* center title (UNCHANGED) */}
      <div className="absolute z-10 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
         Explore Mars Gallery
        </h1>
        <p className="text-white/70 mt-4 text-lg">
          Photography & Videography Portfolio
        </p>

        {/* optional scroll indicator */}
        <p className="text-white/40 mt-2 text-xs">
          Scroll to explore
        </p>
      </div>
    </section>
    <FooterNew/>
    </>
  );
};

export default PortfolioFloatingGallery;