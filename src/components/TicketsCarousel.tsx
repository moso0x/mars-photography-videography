import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { eventsData } from "@/data/eventsData";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const TicketsCarousel = () => {
  const navigate = useNavigate();
  const images = eventsData.map((item) => item.image);

  return (
    <div className="w-full py-16 px-4">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 text-foreground">
        Events
      </h2>
      <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto mb-12">
        In addition to our printing services, we also offer a convenient ticket booking service right on our website—making it easy for you to book events anytime, anywhere.
      </p>



      <div className="mt-12 flex justify-center">
        <Button
          onClick={() => navigate("/TicketsGallery")}
          size="lg"
          className="bg-blue-700 hover:bg-blue-600 text-white font-semibold px-2 text-xs py-1 text-xs rounded-full shadow-lg  transition-all duration-300"
        >
          Go to Ticket Booking Section
        </Button>
      </div>
    </div>
  );
};

function Carousel({ images }: { images: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fade, setFade] = useState(false);

  const scrollByAmount = 260;

  const scrollLeft = () => {
    if (!scrollRef.current) return;
    setFade(true);

    setTimeout(() => {
      scrollRef.current!.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
      setTimeout(() => setFade(false), 400);
    }, 150);
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;
    setFade(true);

    setTimeout(() => {
      scrollRef.current!.scrollBy({ left: scrollByAmount, behavior: "smooth" });
      setTimeout(() => setFade(false), 400);
    }, 150);
  };

  useEffect(() => {
    const autoSlide = setInterval(scrollRight, 4000);
    return () => clearInterval(autoSlide);
  }, []);

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Left Button */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full p-3"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Button */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full p-3"
      >
        <ChevronRight size={24} />
      </button>

      {/* Carousel */}
      <motion.div
        animate={{ opacity: fade ? 0.2 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <div
          ref={scrollRef}
          className="flex gap-6 px-6 overflow-x-hidden scroll-smooth justify-around"
        >
          {images.concat(images).map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt={`Event ${i}`}
              className="w-52 h-48 md:w-60 md:h-52 object-cover rounded-xl shadow-lg flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
