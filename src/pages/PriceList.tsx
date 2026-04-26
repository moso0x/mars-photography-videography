import { Header } from "@/components/Header";
import { FooterNew } from "@/components/FooterNew";
import { PageTransition } from "@/components/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import tag from "@/assets/tag.png";
import { Percent, Timer, ShieldCheck } from "lucide-react";

const PriceList = () => {
  const infoCards = [
    {
      title: "Volume Discounts",
      text: "Order in bulk and save! We offer attractive discounts for large quantity orders.",
      icon: Percent,
      color: "#1b75bc", // Jelimo Blue
      bg: "rgba(27, 117, 188, 0.1)",
    },
    {
      title: "Fast Turnaround",
      text: "Most orders are completed within 3-5 business days. Rush services available.",
      icon: Timer,
      color: "#00a651", // Jelimo Green
      bg: "rgba(0, 166, 81, 0.1)",
    },
    {
      title: "Quality Guarantee",
      text: "100% satisfaction guaranteed. We'll reprint if you're not completely happy.",
      icon: ShieldCheck,
      color: "#f7931e", // Jelimo Orange
      bg: "rgba(247, 147, 30, 0.1)",
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Header />

        <main className="container mx-auto px-4 py-4">
          {/* 🏷️ Swinging Tag Icon */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ rotate: 0 }}
            animate={{
              rotate: [0, 15, -10, 10, -5, 0],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            <img src={tag} alt="Tag Icon" className="w-[200px]" />
          </motion.div>

          {/* 💬 Heading */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1b75bc]">
              Our Price List
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transparent pricing for premium quality printing services. All prices include design support.
            </p>
          </div>

          {/* 💡 Call to Action */}
          <Card className="mt-12 bg-[#f3faff] border-[#1b75bc]/30 animate-fade-in">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-[#00a651]">Need a Custom Quote?</h3>
                <p className="text-muted-foreground">
                  Have a special project in mind? Contact us for a personalized quote tailored to your specific needs.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-[#1b75bc] hover:bg-[#155f9b] text-white"
                    asChild
                  >
                    <Link to="/contact">Get Custom Quote</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 💬 Info Cards with Jelimo Colors */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 animate-fade-in">
            {infoCards.map(({ title, text, icon: Icon, color, bg }) => (
              <Card
                key={title}
                className="hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <CardHeader className="flex flex-col items-center text-center space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 flex items-center justify-center rounded-full"
                    style={{ backgroundColor: bg }}
                  >
                    <Icon size={28} style={{ color }} />
                  </motion.div>
                  <CardTitle className="text-lg font-semibold" style={{ color }}>
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        <FooterNew />
      </div>
    </PageTransition>
  );
};

export default PriceList;
