import { Header } from "@/components/Header";
import { FooterNew } from "@/components/FooterNew";
import { ProductGrid } from "@/components/ProductGrid";
import { PageTransition } from "@/components/PageTransition";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sample images
import apparels1 from "@/assets/apparels.jpg";
import apparels2 from "@/assets/apparels2.jpg";
import apparels3 from "@/assets/apparels3.jpg";

const services = [
  "T-shirt printing (DTG, screen printing, vinyl, sublimation)",
  "Hoodie branding",
  "Caps and hats printing",
  "Polo shirts embroidery",
  "Uniform branding (corporate, school, security, hospitality)",
  "Reflector jackets printing",
  "Jerseys and sportswear customization",
  "Workwear branding (overalls, aprons, coats)",
];

const Banners = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    adaptiveHeight: true,
  };

  // Animation variants for list tick effect
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />

        {/* Image + Text Section */}
        <section className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-10">
          {/* Carousel */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full max-w-[450px]">
              <Slider {...carouselSettings}>
                {[apparels1, apparels2, apparels3].map((img, i) => (
                  <div key={i} className="flex justify-center">
                    <img
                      src={img}
                      alt={`Apparel ${i + 1}`}
                      className="w-full h-[250px] md:h-[300px] object-contain rounded-lg shadow-md mx-auto"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              Jelimo Creatives Apparels & Wearables
            </h1>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Step out in style with our premium branded apparel that speaks your
              brand’s language.   wearables that blend comfort, creativity, and identity — helping you
              look as professional as you feel.  From;
            </p>

            {/* Animated Tick List */}
            <motion.ul
              className="space-y-3 mb-8"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-2 text-sm md:text-base text-gray-700"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10, delay: index * 0.15 }}
                  >
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-[2px]" size={18} />
                  </motion.span>
                  <span>{service}</span>
                </motion.li>
              ))}
            </motion.ul>

          </div>
        </section>

        {/* Product Grid */}
        <main className="container mx-auto px-4 pb-12">
          <ProductGrid />
        </main>

        <FooterNew />
      </div>
    </PageTransition>
  );
};

export default Banners;
