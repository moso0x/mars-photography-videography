import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Leaf, TreePine, Recycle, Droplets } from "lucide-react";
import { useNavigate } from "react-router-dom";


const brandColors = {
  primary: "#64B5F1", // Jelimo Creatives dark green-teal
  secondary: "#212121", // soft cream
  accent: "#1A3C34", // deep forest tone
};
const causes = [
  {
    icon: TreePine,
    title: "Plant a Tree",
    description:
      "For every 100 prints, we plant a tree in partnership with local conservation groups.",
    amount: "Add Ksh. 50",
  },
  {
    icon: Recycle,
    title: "Recycled Paper",
    description:
      "Choose 100% recycled paper for your prints and reduce environmental impact.",
    amount: "Add Ksh. 30",
  },
  {
    icon: Droplets,
    title: "Water Conservation",
    description:
      "Support water-saving printing technologies and sustainable ink production.",
    amount: "Add Ksh. 40",
  },
];

export const EcoFriendlySection = () => {
  const navigate = useNavigate();

  return (
    <section
      className="py-16 bg-blue-50"
      
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf
              className="w-8 h-8 text-[#1A3C34]"
               
            />
            <h2
              className="text-3xl font-bold text-black"
              
            >
              
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl text-sm mx-auto">
          
            Turn your ideas into impact! Enjoy top-quality printing services while supporting environmental 
            initiatives. Every print you make contributes to a greener, healthier planet. Make your
            prints count—because every choice matters.
            </p>
        </motion.div>

        {/* Compact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {causes.map((cause, index) => {
            const Icon = cause.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className="p-5 h-full border hover:shadow-lg transition-all duration-300 rounded-xl"
                  style={{
                    borderColor: brandColors.primary + "33", // subtle border
                    backgroundColor: "#ffffff",
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className="mb-3 p-3 rounded-full transition-transform duration-300"
                      style={{
                        backgroundColor: brandColors.secondary,
                      }}
                    >
                      <Icon
                        className="w-7 h-7"
                        style={{ color: brandColors.primary }}
                      />
                    </div>
                    <h3
                      className="font-bold text-lg mb-2"
                      style={{ color: brandColors.accent }}
                    >
                      {cause.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 flex-grow">
                      {cause.description}
                    </p>
                    <p
                      className="text-sm font-semibold mb-3"
                      style={{ color: brandColors.primary }}
                    >
                      {cause.amount}
                    </p>
                    <Button
                      className="w-[60%] text-white font-medium py-2 rounded-full transition-colors"
                      style={{
                        backgroundColor: brandColors.primary,
                      }}
                      onClick={() => navigate("/support-cause")}
                    >
                      Support This Cause
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Commitment Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card
            className="p-8 border rounded-xl"
            style={{
              borderColor: brandColors.primary + "40",
              backgroundColor: "#ffffff",
            }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ color: brandColors.accent }}
                >
                  Our Environmental Commitment
                </h3>
                <p className="text-muted-foreground">
                  We are venturing in promoting environmental conservation{" "}
                  <span
                    className="font-bold"
                    style={{ color: brandColors.primary }}
                  >
                    through our eco-friendly initiatives.
                  </span>
                </p>
              </div>
              <Button
                size="lg"
                className="text-white font-medium px-8 rounded-md"
                style={{
                  backgroundColor: brandColors.primary,
                }}
                onClick={() => navigate("/support-cause")}
              >
                Learn More
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
