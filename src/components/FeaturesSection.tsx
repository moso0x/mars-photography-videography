import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Share2 } from "lucide-react";
import toast from "react-hot-toast";

import totebags from "@/assets/tote-bags-hero.jpg";
import calenders from "@/assets/calenders.jpg";
import custom_shirt from "@/assets/custom.jpg";
import flyers from "@/assets/a5flyer.jpg";
import rollup from "@/assets/rollup-banner.jpg";
import caps from "@/assets/caps.jpg";
import hoodie from "@/assets/hoodie.jpg";
import mounted from "@/assets/mounted-photo.jpg";
import corporate from "@/assets/corporate.jpg";
import mug from "@/assets/mugs.jpg";

/* ---------------------------- Motion Helpers ---------------------------- */
const cinematicEase = [0.22, 1, 0.36, 1];

const AnimatedText = ({
  text,
  fromX = 0,
  fromY = 0,
  delay = 0,
}: {
  text: string;
  fromX?: number;
  fromY?: number;
  delay?: number;
}) => (
  <>
    {text.split(" ").map((word, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, x: fromX, y: fromY }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: false }}
        transition={{
          delay: delay + i * 0.05,
          duration: 0.9,
          ease: cinematicEase,
        }}
        className="inline-block mr-1"
      >
        {word}
      </motion.span>
    ))}
  </>
);

/* ---------------------------- Data ---------------------------- */
const features = [
  { title: "Tote Bags Printing", price: "Starting at Ksh. 300", image: totebags },
  { title: "2026 Calendar Printing", price: "From Ksh. 100 per piece", image: calenders },
  { title: "Custom Shirt Printing", price: "From Ksh. 250 per card", image: custom_shirt },
  { title: "A5 Flyers Printing", price: "From Ksh. 150 per flyer", image: flyers },
  { title: "Caps Printing", price: "From Ksh. 200 per piece", image: caps },
  { title: "Roll-up Banner Printing", price: "From Ksh. 2000 per piece", image: rollup },
  { title: "Hoodies Printing", price: "From Ksh. 500 per piece", image: hoodie },
  { title: "Mounted Photos Printing", price: "From Ksh. 700", image: mounted },
  { title: "Custom Mugs Printing", price: "From Ksh. 400 per mug", image: mug },
  { title: "Corporate Gifts", price: "From Ksh. 580", image: corporate },
];

/* ---------------------------- MAIN ---------------------------- */
export const FeaturesSection = () => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const handleWishlistToggle = (title: string) => {
    setWishlist((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );

    toast.success(
      wishlist.includes(title)
        ? "Removed from wishlist"
        : "Added to wishlist ❤️"
    );
  };

  const handleShare = (title: string) => {
    const shareUrl = `${window.location.origin}/product/${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}`;

    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard 📋");
  };

  return (
    <section className="py-16 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4">

        {/* INTRO */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <AnimatedText
              text="Printing & Branding Solutions"
              fromX={-120}
            />
          </h2>

          <p className="text-xs text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            <AnimatedText
              text="At Mars, we provide a full range of branding, design, and printing services — from promotional items to complete brand identity development."
              fromX={120}
              delay={0.2}
            />
          </p>
        </div>

        {/* FEATURE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => {
            const shortDescription =
              feature.price.split(" ").slice(0, 3).join(" ") + "...";

            const slug = feature.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-");

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.9, ease: cinematicEase }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="rounded-xl overflow-hidden bg-white shadow-xl hover:shadow-2xl cursor-pointer relative"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-32 object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-sky-400/10 to-transparent" />

                  {/* ICONS */}
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => handleWishlistToggle(feature.title)}
                      className="p-1.5 rounded-full bg-white/80 shadow-md"
                    >
                      <Heart
                        size={16}
                        className={
                          wishlist.includes(feature.title)
                            ? "text-red-500 fill-red-500"
                            : "text-gray-700"
                        }
                      />
                    </button>

                    <button
                      onClick={() => handleShare(feature.title)}
                      className="p-1.5 rounded-full bg-white/80 shadow-md"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-3 text-center">
                  <h3 className="text-base font-semibold mb-1 text-primary">
                    <AnimatedText text={feature.title} fromY={24} />
                  </h3>

                  <p className="text-xs text-muted-foreground mb-2">
                    <AnimatedText text={shortDescription} fromY={24} delay={0.1} />
                  </p>

                  <Link to={`/product/${slug}`}>
                    <button className="text-xs font-medium text-sky-600 rounded-full px-3 py-1 hover:bg-orange-600 hover:text-white transition">
                      Order now
                    </button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-base font-semibold mb-4">
            <AnimatedText
              text="Mar's Studio got you covered for all your photography, videography, printing and branding needs!"
              fromY={32}
            />
          </p>

          <a
            href="/contact"
            className="inline-block text-xs rounded-full bg-black text-white font-semibold px-6 py-3"
          >
            <AnimatedText text="Reach Us!" />
          </a>
        </div>

      </div>
    </section>
  );
};
