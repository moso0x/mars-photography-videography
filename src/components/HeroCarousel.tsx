import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Camera, Video, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import heroImage1 from "@/assets/image-collage.jpg";
import heroImage2 from "@/assets/image-collage.jpg";
import heroImage3 from "@/assets/image-collage.jpg";

const slides = [
  {
    title: "Creative Photography",
    subtitle: "Portrait • Events • Product Shoots",
    description:
      "Capturing moments with precision, emotion and artistic storytelling.",
    buttonText: "View Photography",
    link: "/photography",
    icon: Camera,
    bg: heroImage1,
  },
  {
    title: "Cinematic Videography",
    subtitle: "Weddings • Commercials • Documentaries",
    description:
      "Premium visual production crafted to bring stories to life.",
    buttonText: "Explore Videography",
    link: "/videography",
    icon: Video,
    bg: heroImage2,
  },
  {
    title: "Visual Storytelling",
    subtitle: "Create. Capture. Inspire.",
    description:
      "High-end photography and film solutions for brands and individuals.",
    buttonText: "Book a Session",
    link: "/contact",
    icon: Play,
    bg: heroImage3,
  },
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index:number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const slideVariants = {
    enter: (dir:number) => ({
      opacity: 0,
      x: dir > 0 ? 120 : -120,
    }),

    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.4,
        ease: "easeInOut",
      },
    },

    exit: (dir:number) => ({
      opacity: 0,
      x: dir > 0 ? -120 : 120,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
      },
    }),
  };

  const ActiveIcon = slides[currentSlide].icon;

  return (
    <section className="relative h-[78vh] md:h-[82vh] w-full overflow-hidden">

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >

          {/* Background */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slides[currentSlide].bg})`,
            }}
            animate={{
              scale: [1, 1.06, 1],
              x: [0, -18, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"/>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/65"/>


          {/* CONTENT */}
          <div className="relative z-20 flex h-full items-center justify-center px-6">
            <div className="max-w-4xl text-center">

              <motion.div
                initial={{opacity:0,y:20}}
                animate={{opacity:1,y:0}}
                transition={{delay:.2}}
                className="mb-6 flex justify-center items-center gap-4"
              >
                <div className="rounded-full bg-white/10 p-4 backdrop-blur-md">
                  <ActiveIcon className="h-6 w-6 text-white"/>
                </div>

                <span className="uppercase tracking-[0.28em] text-xs md:text-sm text-sky-200">
                  Mars Studio Productions
                </span>
              </motion.div>


              <motion.h1
                initial={{opacity:0,y:40}}
                animate={{opacity:1,y:0}}
                transition={{delay:.35}}
                className="
                text-4xl
                md:text-6xl
                lg:text-7xl
                font-bold
                leading-tight
                text-white"
              >
                {slides[currentSlide].title}
              </motion.h1>


              <motion.p
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{delay:.55}}
                className="
                mt-5
                text-lg
                md:text-xl
                text-sky-100"
              >
                {slides[currentSlide].subtitle}
              </motion.p>


              <motion.p
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{delay:.7}}
                className="
                mt-5
                max-w-2xl
                mx-auto
                text-base
                md:text-lg
                text-white/85"
              >
                {slides[currentSlide].description}
              </motion.p>


              <motion.div
                initial={{opacity:0,y:20}}
                animate={{opacity:1,y:0}}
                transition={{delay:.9}}
                className="mt-8 flex flex-wrap justify-center gap-4"
              >
                <Link to={slides[currentSlide].link}>
                  <Button
                    className="
                    rounded-full
                    bg-green-600
                    hover:bg-[#AAC832]
                    px-8
                    py-6
                    text-lg
                    shadow-xl"
                  >
                    {slides[currentSlide].buttonText}
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  className="
                  rounded-full
                  border-white/70
                  text-white
                  bg-transparent
                  px-8
                  py-6"
                >
                  Watch Reel
                </Button>
              </motion.div>

            </div>
          </div>

        </motion.div>
      </AnimatePresence>


      {/* ARROWS */}
      <button
        onClick={prevSlide}
        className="
        absolute
        left-5 md:left-8
        top-1/2
        -translate-y-1/2
        z-30
        rounded-full
        bg-white/10
        p-3
        backdrop-blur-md
        hover:bg-white/20"
      >
        <ChevronLeft className="h-6 w-6 text-white"/>
      </button>

      <button
        onClick={nextSlide}
        className="
        absolute
        right-5 md:right-8
        top-1/2
        -translate-y-1/2
        z-30
        rounded-full
        bg-white/10
        p-3
        backdrop-blur-md
        hover:bg-white/20"
      >
        <ChevronRight className="h-6 w-6 text-white"/>
      </button>


      {/* INDICATORS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_,i)=>(
          <button
            key={i}
            onClick={()=>goToSlide(i)}
            className={`rounded-full transition-all duration-500 ${
              currentSlide === i
                ? "w-12 h-2 bg-white"
                : "w-4 h-2 bg-white/40"
            }`}
          />
        ))}
      </div>

    </section>
  );
};