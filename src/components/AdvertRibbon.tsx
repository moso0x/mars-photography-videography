import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

import "@fontsource-variable/nabla";
import "@fontsource/eb-garamond";

interface AdvertProps {
  id: string;
  image: string;
  title: string;
  subtitle: string | null;
  link?: string | null;
  animation?: string | null;
}

/* --------------------------- Animation Variants --------------------------- */
const adVariants: Record<string, any> = {
  slideRight: {
    initial: { x: 100, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 60, damping: 15 },
    },
    exit: { x: -100, opacity: 0, transition: { duration: 0.4 } },
  },
  fadeUp: {
    initial: { y: 40, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
    exit: { y: -40, opacity: 0, transition: { duration: 0.3 } },
  },
};

const AdvertRibbon = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentAd, setCurrentAd] = useState(0);
  const [advertisements, setAdvertisements] = useState<AdvertProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      const { data } = await supabase
        .from("advertisements")
        .select("id, title, subtitle, image, link, animation")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      setAdvertisements(data || []);
      setLoading(false);
    };
    fetchAds();
  }, []);

  useEffect(() => {
    if (!isVisible || advertisements.length === 0) return;
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % advertisements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible, advertisements.length]);

  if (loading || !isVisible || advertisements.length === 0) return null;

  const currentAnimation =
    advertisements[currentAd]?.animation ?? "slideRight";

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -80, opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-white text-black overflow-hidden shadow-sm border-b border-gray-100"
    >
      <div className="relative h-24 sm:h-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAd}
            variants={adVariants[currentAnimation] || adVariants.slideRight}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex items-center gap-4 max-w-6xl mx-auto px-4 w-full">
              {/* Image */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden shadow-md">
                <img
                  src={advertisements[currentAd].image}
                  alt={advertisements[currentAd].title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text */}
              <div className="flex-1 text-center sm:text-left">
                <motion.h3
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="
                    font-[Nabla]
                    text-lg sm:text-2xl
                    tracking-wide
                    text-sky-800
                  "
                >
                  {advertisements[currentAd].title}
                </motion.h3>

                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="
                    font-[EB Garamond]
                    text-xs sm:text-base
                    text-black
                    italic
                  "
                >
                  {advertisements[currentAd].subtitle}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-2 h-6 w-6 p-0 text-black hover:bg-sky-500/10 z-10"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </motion.div>
  );
};

export default AdvertRibbon;
