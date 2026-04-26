import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

import trifold from "@/assets/moreProducts-img/trifold.jpg";
import poppup from "@/assets/moreProducts-img/poupup-banner.jpg";
import reflectors from "@/assets/moreProducts-img/reflectors.jpg";
import reciept from "@/assets/moreProducts-img/receipt.jpg";
import bscards from "@/assets/moreProducts-img/bs-cards.jpg";
import caps from "@/assets/moreProducts-img/caps.jpg";
import hoodie from "@/assets/moreProducts-img/hoodie.jpg";
import weddingcards from "@/assets/moreProducts-img/weddingcards.jpg";
import babyshower from "@/assets/moreProducts-img/babyshower.jpg";
import adhesive from "@/assets/moreProducts-img/adhesive.jpg";
import teardrop from "@/assets/moreProducts-img/teardrop.jpg";
import umbrella from "@/assets/moreProducts-img/umbrella.jpg";

const products = [
  { title: "Trifold Flyer Printing both sides", price: "Starting at Ksh. 300", image: trifold },
  { title: "Poppup Banner Printing", price: "From Ksh. 100 per piece", image: poppup },
  { title: "Custom Reflector Printing", price: "From Ksh. 250 per card", image: reflectors },
  { title: "All Sizes receipt Printing", price: "From Ksh. 150 per flyer", image: reciept },
  { title: "Campaign Custom Caps Printing", price: "From Ksh. 200 per piece", image: caps },
  { title: "Custom Business Cards Printing", price: "From Ksh. 2000 per piece", image: bscards },
  { title: "Custom All kinds of Hoodies Printing", price: "From Ksh. 500 per piece", image: hoodie },
  { title: "Custom Corporate Umbrella Printing", price: "From Ksh. 1000", image: umbrella },
  { title: "Wedding & Events Invitation cards ", price: "From Ksh. 150 per piece", image: weddingcards },
  { title: "Baby Shower invitation Cards", price: "From Ksh. 200", image: babyshower },
  { title: "Custom Custom Adhesive Stickers", price: "From Ksh. 400 per mug", image: adhesive },
  { title: "Tear Drop Banners Printing ", price: "From Ksh. 580", image: teardrop },
];

export const ProductGrid = () => {
  const { addToCart } = useCart();

  return (
    <section className="py-16 bg-gradient-to-b from-[#E8F1FF] to-[#F9FAFB]">
      <div className="container mx-auto px-4">
        {/* Section Intro */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">
          Featured Branding & Printing Services 
          </h2>
          <p className="text-gray-600 text-xs mx-auto">
            From custom tote bags to elegant business cards, explore top-quality print
            products crafted to make your brand stand out.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all 
                           bg-gradient-to-br from-[#AAC832]/20 to-[#005DFF]/2 border border-blue-100"
              >
                <div className="overflow-hidden bg-secondary">
                  <motion.img
                    src={product.image}
                    alt={product.title}
                    className="w-[80%] h-36 md:h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-3 text-center">
                  <h3 className="font-small  mb-1 text-black">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-xs mb-3">
                    {product.price}
                  </p>

                  {/* Add to Cart Button */}
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <Button
                      size="sm"
                      onClick={() => addToCart(product)}
                      className="w-full flex items-center flex mx-auto justify-center gap-2 
                                 bg-[#468C1E] text-white font-small text-xs
                                  shadow-[0_4px_12px_rgba(0,212,90,0.4)] 
                                 hover:bg-[#AAC832] transition-all duration-300 rounded-full py-1"
                            
                    >
                      <ShoppingCart className="w-4 h-4 text-xs" />
                     <span className="text-xs">Add to Cart</span> 
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
