// Accordion.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
interface AccordionItem {
  question: string;
  answer: string | JSX.Element;
}
const qnaItems = [
  {
    question: "What types of custom printing do you offer?",
    answer: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Business cards, flyers, and brochures</li>
        <li>Custom apparel and merchandise</li>
        <li>Labels, packaging, and stickers</li>
        <li>Large format printing for banners & posters</li>
      </ul>
    ),
  },
  {
    question: "Can you help with brand identity design?",
    answer: "Absolutely! We provide complete branding solutions including logo design, typography, color schemes, and brand guidelines to make your business stand out.",
  },
  {
    question: "Do you offer sustainable printing options?",
    answer: "Yes! We use eco-friendly inks and recyclable materials whenever possible to minimize environmental impact.",
  },
  {
    question: "How do I place a custom order?",
    answer: "You can contact us via email at hello@jelimocreatives.com or call +254 700 000000. Our team will guide you through the design, proofing, and printing process.",
  },
];
interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="border-b border-gray-200 last:border-b-0">
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex justify-between items-center py-4 px-6 text-left font-semibold text-gray-800 hover:text-indigo-600 transition-colors"
            >
              <span>{item.question}</span>
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-indigo-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden px-6 pb-4 text-gray-700"
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
