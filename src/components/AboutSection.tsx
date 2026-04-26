import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import banner from "@/assets/advert-banner.png";
import customer_1 from "@/assets/customers/customer1.jpg";
import customer_2 from "@/assets/customers/customer2.jpg";
import customer_7 from "@/assets/customers/customer7.jpg";
import customer_4 from "@/assets/customers/customer4.jpg";
import customer_5 from "@/assets/customers/customer5.jpg";
import customer_9 from "@/assets/customers/customer9.jpg";
import customer_8 from "@/assets/customers/customer8.jpg";

// Customer product images
const productImages = [
  customer_1,
  customer_2,
  customer_7,
  customer_4,
  customer_5,
  customer_9,
  customer_8,
];

export const AboutSection = () => {
  return (
    <section className="py-20 bg-white text-xs">
      <div className="container mx-auto px-4">
        {/* HEADER ROW */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-black">
              Printing & Branding Services in Kenya
            </h1>
            <h3 className="text-xs sm:text-sm text-blue-600 mb-2">
              Custom T-shirts, hoodies, and caps.
            </h3>
            <p className="text-blue-600 font-semibold">
              Place your order — we deliver across Kenya.
            </p>
          </motion.div>
        </div>

        {/* ABOUT CARD / SERVICE DETAILS */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-5xl mx-auto border border-blue-600/20 text-center">
          <h3 className="text-lg sm:text-xl font-bold mb-6 text-blue-700">
            Our Customization Services Include:
          </h3>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start justify-center">
            {/* Column 1 */}
            <ul className="space-y-2 text-blue-600">
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-700 rounded-full"></span>
                100% Cotton
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                Locally Made
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-700 rounded-full"></span>
                Sizes from S to 2XL
              </li>
            </ul>

            {/* Column 2 */}
            <ul className="space-y-2 text-blue-600">
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                T-shirts, hoodies, and caps
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-700 rounded-full"></span>
                Mugs, calendars, stationery, and unique corporate gifts
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                Polo T-shirts
              </li>
            </ul>
          </div>

          {/* Banner Image */}
          <div className="flex justify-center mt-6">
            <img
              src={banner}
              alt="Product Banner"
              className="w-[300px] sm:w-[400px] rounded-lg shadow-md"
            />
          </div>

          {/* Button */}
          <Button className="mt-6 bg-blue-700 text-white font-medium hover:bg-blue-600 transition-all rounded-full px-6 text-xs">
            See Price List
          </Button>
        </div>

        {/* CLIENTS MARQUEE */}
        <div className="text-center font-bold text-xl sm:text-2xl mt-16 mb-6 text-blue-700">
          Happy Clients
        </div>

        <div className="mt-6 space-y-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex"
              animate={{ x: ["0%", "-100%"] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            >
              {productImages.concat(productImages).map((src, idx) => (
                <img
                  key={`row1-${idx}`}
                  src={src}
                  alt={`Product ${idx}`}
                  className="w-36 h-36 sm:w-44 sm:h-44 object-cover mx-2 sm:mx-4 rounded-xl shadow-md border border-blue-600/20"
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
