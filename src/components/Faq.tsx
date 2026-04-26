import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What types of printing services do you offer?",
    answer:
      "We provide custom T-shirts, hoodies, caps, mugs, stationery, banners, and corporate gifts. All items are customizable and high-quality.",
  },
  {
    question: "Do you deliver across Kenya?",
    answer:
      "Yes! We deliver to major cities including Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, and many more.",
  },
  {
    question: "How long does it take to receive my order?",
    answer:
      "Delivery time depends on the product and location. Most orders are completed and delivered within 3-7 business days.",
  },
  {
    question: "Can I place bulk orders for events or campaigns?",
    answer:
      "Absolutely! We specialize in bulk orders for events, corporate branding, and promotional campaigns.",
  },
  {
    question: "Do you offer design support?",
    answer:
      "Yes! We provide full design support. You can submit your own design or our team can create a custom design for your brand or event.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept M-Pesa, bank transfers, and major credit/debit cards for all orders.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes! Once your order is processed, we provide tracking information so you can follow the delivery status.",
  },
  {
    question: "Do you have a refund policy?",
    answer:
      "We offer refunds or replacements for defective or incorrect orders within 7 days of delivery.",
  },
];

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-7xl mx-auto p-6 md:p-12">
      <h2 className="text-4xl font-bold text-center  text-gray-950 mb-12">
        FAQ(s)
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {faqData.map((item, index) => {
          const isOpen = index === openIndex;
          return (
            <div
              key={index}
              className=" rounded-xl overflow-hidden shadow-sm"
            >
              <button
                className="w-full flex justify-between items-center p-4  transition-colors"
                onClick={() => toggleAccordion(index)}
              >
            

                <span className="font-semibold text-xs text-blue-700 ">
                  {item.question}
                </span>
                {isOpen ? (
                  <Minus className="w-5 h-5 text-[#64B5F6]" />
                ) : (
                  <Plus className="w-5 h-5 text-[#FF5C26]" />
                )}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="p-4 bg-white text-sm text-black text-xs"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQAccordion;
