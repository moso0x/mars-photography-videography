import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import FooterNew from "@/components/FooterNew";
import aboutImage from "@/assets/portfolio/about-img.jpg";
import aboutImage_1 from "@/assets/portfolio/event5.jpg";
import aboutImage_2 from "@/assets/portfolio/event6.jpg";
import { Camera, Video, Clock } from "lucide-react";
import { motion, useAnimation } from "framer-motion";

const statsData = [
  { label: "Shoots Completed", value: 500 },
  { label: "Happy Clients", value: 300 },
  { label: "Years Experience", value: 5 },
  { label: "Cinematic Projects", value: 200 },
];

function useCountUp(target: number, duration = 2) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration * 60); // 60fps approx

    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(counter);
      }
      setCount(Math.floor(start));
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [target, duration]);

  return count;
}

export default function About() {
  return (
    <>
      <Header />

      <div className="bg-[#fafaf7] text-sm">

        {/* HERO */}
        <section className="relative min-h-[85vh] flex items-center px-6">

          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${aboutImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center text-white">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                We Capture Moments
                <span className="block text-[#AAC832]">
                  That Last Forever
                </span>
              </h1>

              <p className="text-white/80 text-lg leading-relaxed">
                Mars Creative Studio is a dedicated photography and videography studio
                focused on turning real moments into cinematic visual stories.
              </p>
            </motion.div>

          </div>
        </section>


        {/* PHILOSOPHY */}
        <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">

          <div>
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>

            <p className="text-gray-700 mb-4 leading-relaxed">
              We believe photography and videography are not just services —
              they are emotional preservation tools.
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              Every frame we capture is intentional: light, emotion, composition,
              and story all working together to create something timeless.
            </p>

            <p className="text-gray-700">
              Our focus is simple — deliver cinematic visuals that feel alive today and years later.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="h-64 rounded-3xl overflow-hidden shadow-lg">
              <img src={aboutImage_1} className="w-full h-full object-cover" />
            </div>

            <div className="h-80 rounded-3xl overflow-hidden shadow-lg mt-10">
              <img src={aboutImage_2} className="w-full h-full object-cover" />
            </div>

          </div>

        </section>


        {/* STATS (DYNAMIC) */}
        <section className="bg-black text-white py-20">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-center">

            {statsData.map((item, i) => {
              const count = useCountUp(item.value, 2 + i * 0.3);

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <h3 className="text-4xl font-bold text-[#AAC832]">
                    {item.value >= 100 ? `${count}+` : `${count}+`}
                  </h3>

                  <p className="text-white/70 mt-2">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}

          </div>
        </section>


        {/* WHY CHOOSE US */}
        <section className="max-w-6xl mx-auto px-6 py-24">

          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Studio?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <motion.div whileHover={{ y: -8 }} className="bg-white p-8 rounded-3xl shadow-xl text-center">
              <Camera className="w-14 h-14 mx-auto mb-4 text-[#468C1E]" />
              <h3 className="font-semibold text-2xl text-[#AAC832] mb-2">
                Photography Excellence
              </h3>
              <p className="text-gray-600">
                Sharp, emotional, and professionally composed imagery.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -8 }} className="bg-white p-8 rounded-3xl shadow-xl text-center">
              <Video className="w-14 h-14 mx-auto mb-4 text-[#468C1E]" />
              <h3 className="font-semibold text-2xl text-[#AAC832] mb-2">
                Cinematic Videography
              </h3>
              <p className="text-gray-600">
                Story-driven films with emotional depth and clarity.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -8 }} className="bg-white p-8 rounded-3xl shadow-xl text-center">
              <Clock className="w-14 h-14 mx-auto mb-4 text-[#468C1E]" />
              <h3 className="font-semibold text-2xl text-[#AAC832] mb-2">
                Reliable Delivery
              </h3>
              <p className="text-gray-600">
                Structured workflow with timely and consistent output.
              </p>
            </motion.div>

          </div>
        </section>


        {/* CLOSING SECTION */}
        <section className="relative py-28">

          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${aboutImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="absolute inset-0 bg-black/70" />

          <div className="relative max-w-4xl mx-auto text-center text-white px-6">

            <h2 className="text-4xl font-bold mb-6">
              Every Frame Matters
            </h2>

            <p className="text-white/80 mb-8">
              We don’t just take photos or shoot videos — we preserve emotions in motion and stillness.
            </p>

            <a
              href="/contact"
              className="inline-block bg-[#AAC832] text-black px-8 py-4 rounded-full font-semibold"
            >
              Book a Session
            </a>

          </div>

        </section>

      </div>

      <FooterNew />
    </>
  );
}