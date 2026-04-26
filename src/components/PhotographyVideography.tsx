import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Video,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ---------------- Assets ---------------- */
import aboutImage from "@/assets/image-collage.jpg";

import camera from "@/assets/videoPhoto/camera.jpg";
import event from "@/assets/videoPhoto/event.jpg";
import event1 from "@/assets/videoPhoto/event1.jpg";
import event2 from "@/assets/videoPhoto/event2.jpg";
import event3 from "@/assets/videoPhoto/event3.jpg";
import hero_1 from "@/assets/portfolio/hero-1.jpg";

import family from "@/assets/videoPhoto/family.jpg";
import family1 from "@/assets/videoPhoto/family1.jpg";
import family2 from "@/assets/videoPhoto/family2.jpg";
import family3 from "@/assets/videoPhoto/family3.jpg";

import outdoor from "@/assets/videoPhoto/outodoor.jpg";
import outdoor1 from "@/assets/videoPhoto/outdoor1.jpg";
import outdoor2 from "@/assets/videoPhoto/outdoor2.jpg";

import portrait from "@/assets/videoPhoto/portrait.jpg";
import portrait1 from "@/assets/videoPhoto/portrait1.jpg";
import portrait3 from "@/assets/videoPhoto/portrait3.jpg";

import videoService from "@/assets/videoPhoto/video-service.mp4";

/* ---------------- Data ---------------- */

const showcaseServices = [
  {
    title: "Wedding Photography",
    images: [event3, event1, event2],
    category: "Weddings",
  },
  {
    title: "Corporate Events",
    images: [event, camera, outdoor],
    category: "Corporate",
  },
  {
    title: "Family Moments",
    images: [family, family1, family2, family3],
    category: "Family",
  },
  {
    title: "Portrait Sessions",
    images: [portrait, portrait1, portrait3],
    category: "Portraits",
  },
  {
    title: "Outdoor Photography",
    images: [outdoor, outdoor1, outdoor2],
    category: "Outdoor",
  },
  {
    title: "Creative Studio Work",
    images: [camera, portrait, event],
    category: "Studio",
  },
];

const categories = [
  "All",
  "Weddings",
  "Corporate",
  "Family",
  "Portraits",
  "Outdoor",
  "Studio",
];

/* ---------------- Portfolio Slider ---------------- */

type ServiceType = {
  title: string;
  images: string[];
  category: string;
};

const PortfolioCarousel = ({ services }: { services: ServiceType[] }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % services.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [services.length]);

  const nextSlide = () =>
    setActiveSlide((prev) => (prev + 1) % services.length);

  const prevSlide = () =>
    setActiveSlide((prev) =>
      prev - 1 < 0 ? services.length - 1 : prev - 1
    );

  if (!services.length) return null;

  const active = services[activeSlide];

  return (
    <div className="relative">

      <div className="relative h-[460px] md:h-[620px] rounded-[36px] overflow-hidden shadow-2xl bg-black">

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* ✅ FIXED IMAGE FIT */}
            <motion.img
              src={active.images[0]}
              className="absolute top-0 right-0 w-[85%] h-full object-contain bg-black"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />

            <div className="absolute bottom-14 left-8 md:left-16 text-white max-w-2xl">
              <span className="inline-block bg-[#AAC832] px-5 py-2 rounded-full mb-6">
                {active.category}
              </span>

              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                {active.title}
              </h2>

              <p className="text-white/80 text-lg mb-8">
                Premium visual storytelling designed with cinematic depth,
                emotion and refined composition.
              </p>

              <button className="bg-white text-black rounded-full px-8 py-3">
                View Project
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevSlide}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md"
        >
          <ChevronLeft className="text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md"
        >
          <ChevronRight className="text-white" />
        </button>

      </div>

      {/* film strip */}
      <div className="flex gap-4 overflow-x-auto mt-8 pb-2">
        {services.map((service, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`relative min-w-[280px] h-44 rounded-3xl overflow-hidden border-4 transition
            ${
              activeSlide === i
                ? "border-[#AAC832] scale-105"
                : "border-transparent opacity-70"
            }`}
          >
            <img
              src={service.images[0]}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/35" />

            <span className="absolute bottom-4 left-4 text-white font-semibold">
              {service.title}
            </span>
          </button>
        ))}
      </div>

    </div>
  );
};

/* ---------------- Main ---------------- */
const heroImages = [hero_1, event, event1, event2, event3, camera];
const PhotographyVideography = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const filteredServices =
    activeCategory === "All"
      ? showcaseServices
      : showcaseServices.filter((item) => item.category === activeCategory);
  return (
    <div className="bg-[#fafaf7] overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center">

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${hero_1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          <div className="text-white">

            <span className="inline-block bg-[#AAC832] text-black font-bold px-5 py-2 rounded-full mb-8">
              Mars Photography & Videography Services
            </span>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              We Capture Stories
              <span className="block">Beyond Frames</span>
            </h1>

            <p className="text-xl text-white/80 mb-10 max-w-xl">
              Cinematic videography, modern photography
              and visual storytelling crafted to feel timeless.
            </p>

            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black rounded-full px-8 py-4"
            >
              Book a Session
              <ArrowRight />
            </a>

          </div>

          <div className="relative h-[560px]">

                      <div className="absolute top-0 left-0 w-[70%] h-80 rounded-[32px] overflow-hidden shadow-2xl">

              <AnimatePresence mode="wait">
                <motion.img
                  key={heroIndex}
                  src={heroImages[heroIndex]}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

            </div>
             <motion.div
              whileHover={{ y: -8 }}
              className="absolute bottom-0 right-0 w-[75%] h-80 rounded-[32px] overflow-hidden shadow-2xl"
            >
              <video
                src={videoService}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>

          </div>

        </div>

      </section>

      {/* EDITORIAL SPLIT */}
      <section className="max-w-7xl mx-auto px-6 py-28">

        <div className="grid md:grid-cols-12 gap-12 items-center">

          <div className="md:col-span-5">

            <h2 className="text-5xl font-bold mb-8">
              Photography<br />& Videography Services
            </h2>

            <div className="space-y-6">

              {[
                {
                  title: "Photography",
                  text:
                    "Portraits, events, editorial and commercial visuals.",
                  icon: Camera,
                },
                {
                  title: "Videography",
                  text:
                    "Wedding films, social media reels and documentaries.",
                  icon: Video,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 8 }}
                  className="bg-white p-8 rounded-3xl shadow-xl flex gap-5"
                >
                  <div className="h-16 w-16 rounded-2xl bg-[#AAC832]/10 flex items-center justify-center">
                    <item.icon className="text-[#468C1E]" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.text}</p>
                  </div>
                </motion.div>
              ))}

            </div>

          </div>

          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-6">

              <div className="h-[260px] rounded-3xl overflow-hidden">
                <img src={family1} className="w-full h-full object-cover" />
              </div>

              <div className="h-[360px] rounded-3xl overflow-hidden mt-16">
                <img src={outdoor} className="w-full h-full object-cover" />
              </div>

              <div className="h-[360px] rounded-3xl overflow-hidden -mt-12">
                <img src={camera} className="w-full h-full object-cover" />
              </div>

              <div className="h-[260px] rounded-3xl overflow-hidden">
                <img src={event} className="w-full h-full object-cover" />
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* PORTFOLIO */}
      <section className="mb-28 px-6">

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full border transition
              ${
                activeCategory === cat
                  ? "bg-[#AAC832] text-white"
                  : "border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <PortfolioCarousel services={filteredServices} />

      </section>

    </div>
  );
};

export default PhotographyVideography;




