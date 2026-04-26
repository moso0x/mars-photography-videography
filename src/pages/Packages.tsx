import React from "react";
import { motion } from "framer-motion";
import { Camera, Video, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { FooterNew } from "@/components/FooterNew";

const packages = [
  {
    title: "Essential Capture",
    type: "Photography",
    price: "KSh 2,000",
    description: "Simple, clean photography for small moments and portraits.",
    features: [
      "1–2 hour shoot",
      "1 photographer",
      "40–80 edited images",
      "Online gallery delivery",
    ],
    icon: Camera,
    popular: false,
  },
  {
    title: "Signature Moments",
    type: "Photography",
    price: "KSh 5,000",
    description: "Balanced storytelling for events and lifestyle shoots.",
    features: [
      "3–5 hour coverage",
      "150+ edited images",
      "Color grading + retouching",
      "Online gallery",
    ],
    icon: Camera,
    popular: true,
  },
  {
    title: "Luxury Editorial",
    type: "Photography",
    price: "KSh 6,000",
    description: "High-end cinematic photography experience.",
    features: [
      "Full-day coverage",
      "300+ edited images",
      "Creative direction",
      "Priority delivery",
    ],
    icon: Camera,
    popular: false,
  },

  {
    title: "Highlight Reel",
    type: "Videography",
    price: "KSh 3,000",
    description: "Short cinematic video for events and memories.",
    features: [
      "2–4 hour shoot",
      "1–3 min highlight film",
      "Cinematic editing",
      "Music sync",
    ],
    icon: Video,
    popular: false,
  },
  {
    title: "Story Film",
    type: "Videography",
    price: "KSh 10,000",
    description: "Emotional storytelling film with cinematic flow.",
    features: [
      "4–8 hour coverage",
      "3–6 min film",
      "Drone shots (optional)",
      "Color grading",
    ],
    icon: Video,
    popular: true,
  },
  {
    title: "Cinema Experience",
    type: "Videography",
    price: "KSh 1,000",
    description: "Full cinematic production with storytelling depth.",
    features: [
      "Full-day coverage",
      "6–15 min documentary film",
      "Drone + teaser reels",
      "Professional sound design",
    ],
    icon: Video,
    popular: false,
  },
];

export default function Packages() {
  return (
    <>
    <Header/>
    <section className="bg-[#fafaf7] py-24 px-6">

      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold">
          Photography & Videography Packages
        </h2>
        <p className="text-gray-600 mt-4">
          Choose a package that fits your story — from simple sessions to cinematic productions.
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

        {packages.map((pkg, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`relative rounded-3xl p-8 shadow-xl border bg-white overflow-hidden
              ${pkg.popular ? "border-[#AAC832]" : "border-gray-100"}
            `}
          >

            {/* Popular badge */}
            {pkg.popular && (
              <div className="absolute top-4 right-4 bg-[#AAC832] text-black px-3 py-1 rounded-full text-xs flex items-center gap-1">
                <Star size={12} />
                Most Popular
              </div>
            )}

            {/* ICON */}
            <div className="w-14 h-14 rounded-2xl bg-[#AAC832]/10 flex items-center justify-center mb-5">
              <pkg.icon className="text-[#468C1E]" />
            </div>

            {/* TITLE */}
            <h3 className="text-2xl font-semibold mb-1">{pkg.title}</h3>
            <p className="text-xs text-gray-500 mb-2">{pkg.type}</p>

            {/* PRICE */}
            <p className="text-3xl font-bold text-[#AAC832] mb-3">
              {pkg.price}
            </p>

            {/* DESCRIPTION */}
            <p className="text-gray-600 text-sm mb-6">
              {pkg.description}
            </p>

            {/* FEATURES */}
            <ul className="space-y-2 text-sm text-gray-700 mb-8">
              {pkg.features.map((f, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#AAC832]" />
                  {f}
                </li>
              ))}
            </ul>

            {/* BUTTON */}
            <button className="w-full py-3 rounded-full bg-black text-white hover:bg-[#AAC832] transition">
              Book Now
            </button>

          </motion.div>
        ))}

      </div>

      {/* FOOT NOTE */}
      <div className="text-center mt-16 text-gray-500 text-sm">
        Need a custom package? We tailor everything to your vision.
      </div>

    </section>
    <FooterNew/>
    </>
  );
}