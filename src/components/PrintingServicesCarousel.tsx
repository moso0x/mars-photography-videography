import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

import { ArrowLeft, ArrowRight } from "lucide-react";
import promotion1 from "@/assets/moreProducts-img/cap.jpg";
import promotion2 from "@/assets/moreProducts-img/tableBanner.jpg";
import promotion3 from "@/assets/moreProducts-img/teardrop.jpg";
import promotion4 from "@/assets/moreProducts-img/tshirt.jpg";
import promotion5 from "@/assets/moreProducts-img/umbrella.jpg";
import promotion6 from "@/assets/moreProducts-img/adhesive.jpg";
import promotion7 from "@/assets/moreProducts-img/poupup-banner.jpg";
import promotion8 from "@/assets/moreProducts-img/custom-gifts.jpg";
import promotion9 from "@/assets/moreProducts-img/corporate1.jpg";
import { useInView } from "react-intersection-observer";
import service1 from "@/assets/moreProducts-img/Diaries.jpg";
import service2 from "@/assets/moreProducts-img/corporate2.jpg";
import promotion10 from "@/assets/moreProducts-img/branding.jpg";
import hoodie from "@/assets/moreProducts-img/service1.jpg";
import calendar from "@/assets/moreProducts-img/calenders.jpg";
import service3 from "@/assets/moreProducts-img/reflectors.jpg";
import service4 from "@/assets/moreProducts-img/hoodie.jpg";
import service5 from "@/assets/moreProducts-img/caps12.jpg";
import service7 from "@/assets/moreProducts-img/caps.jpg";
import trifold from "@/assets/moreProducts-img/trifold.jpg";
import pens from "@/assets/moreProducts-img/pens.jpg";
import bcards from "@/assets/moreProducts-img/bss-cards.jpg";
import babyshower from "@/assets/moreProducts-img/babyshower.jpg";
import reciept from "@/assets/moreProducts-img/receipt.jpg";
import { Link } from "react-router-dom";
// import { Points, PointMaterial } from "@react-three/drei";

const printingData = [
  {
    title: "Branded Promotional Items",
    images: [
      promotion2,
      promotion3,
      promotion4,
      promotion5,
      promotion6,
      promotion9,
      promotion7,
      promotion8,
      promotion10,
      service2,
    ],
    description:
      "Boost your brand visibility with high-quality promotional merchandise tailored for campaigns, marketing events, and corporate identity.",
    labels: [
      "Table Banner",
      "Teardrop Banner",
      "T-Shirt Print",
      "Branded Umbrella",
      "Adhesive Stickers",
    ],
    points: [
      "Wide range of brandable merchandise",
      "Election & campaign promotional materials",
      "High-quality hats, caps, flags & banners",
      "Fast production & reliable delivery",
      "Affordable rates for bulk orders",
    ],
  },
  {
    title: "Apparel: T-shirts, Hoodies & Caps",
    images: [promotion1, service3, service4, service5, service7, hoodie],
    description:
      "Premium apparel printing for businesses, events, staff uniforms, and promotional activities.",
    labels: [
      "Custom Cap",
      "Corporate Uniform",
      "Reflective Jacket",
      "Hoodie Print",
      "Branded Caps Set",
    ],
    points: [
      "High-quality screen & DTG printing",
      "Bulk printing for corporate & events",
      "Reflectors, hoodies, caps & uniforms",
      "Durable prints that last long",
      "Custom designs for all occasions",
    ],
  },
  {
    title: "Stationery Printing",
    images: [babyshower, bcards, pens, trifold, service1, reciept, calendar],
    description:
      "Professional stationery printing for business branding, events, and personal projects.",
    labels: [
      "Baby Shower Cards",
      "Business Cards",
      "Custom Pens",
      "Tri-Fold Brochure",
      "Corporate Diaries",
    ],
    points: [
      "Business cards, pens & notebooks",
      "Brochures, catalogs & corporate diaries",
      "Baby shower & birthday cards",
      "Gift bags, envelopes & custom invitations",
      "High-quality finishes & paper types",
    ],
  },
];

export default function PrintingServicesCarousel() {
  return (
    
    <div className="w-full py-16 px-4 space-y-16">
  
      {/* HEADER */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-4xl font-semibold tracking-wide">
          <span className="text-black">Printing</span> |{" "}
          <span className="text-black">Branding</span> |{" "}
          <span className="text-[#AAC832]">Services </span> 
          
        </h2>

        <p className="mt-4 text-xs text-gray-500 max-w-2xl mx-auto">
          Explore our wide range of printing, branding, and design services to
          give your business a professional and creative edge.
        </p>

        <div className="mt-4 flex justify-center">
          <div className="w-32 h-[4px] bg-orange-600 rounded-full"></div>
        </div>
      </motion.div>

      {printingData.map((service, index) => (
        <ServiceRow key={index} service={service} />
      ))}
    </div>
  );
}

function ServiceRow({ service }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });

  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const el = scrollRef.current;
      el.scrollLeft + el.offsetWidth >= el.scrollWidth
        ? el.scrollTo({ left: 0, behavior: "smooth" })
        : el.scrollBy({ left: 300, behavior: "smooth" });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="bg-white shadow-lg rounded-2xl p-6 max-w-6xl mx-auto"
    >
      {/* TITLE */}
      <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>

      <p className="text-xs text-gray-600 mb-6">{service.description}</p>

      {/* CAROUSEL */}
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#AAC832] text-white p-2 rounded-full"
        >
          <ArrowLeft size={20} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth py-2"
        >
          {service.images.map((img, i) => (
           <div key={i} className="flex-shrink-0 w-48">
  <div className="relative rounded-xl overflow-hidden shadow-lg">
    <img
      src={img}
      className="w-full max-h-40 object-contain"
      alt={service.labels[i]}
    />

    {/* 🌤 Subtle Sky Overlay */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "linear-gradient(to top, rgba(56,189,248,0.15) 0%, rgba(56,189,248,0.05) 40%, rgba(56,189,248,0) 100%)",
      }}
    />
  </div>

  <p className="text-xs text-center mt-2 font-semibold">
    {service.labels[i]}
  </p>
</div>

          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#AAC832] text-white p-2 rounded-full"
        >
          <ArrowRight size={20} />
        </button>
      </div>

      {/* POINTS */}
      <ul className="grid md:grid-cols-3 gap-2 mt-8 text-xs font-semibold">
        {service.points.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-green-500">✔</span>
            {item}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="flex justify-center mt-6">
        <Link
          to="/shop"
          className="px-6 py-2 text-xs font-semibold text-white bg-black rounded-full hover:bg-[#AAC832] transition flex items-center gap-2"
        >
          Explore & Shop <ArrowRight size={18} />
        </Link>
      </div>
    </motion.div>
  );
}
