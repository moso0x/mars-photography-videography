import { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Camera,
  Video,
  Plane,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

import logo from "@/assets/logo.png";

const services = [
  { title: "Wedding Films", icon: <Video className="w-4 h-4" />, link: "/services/weddings" },
  { title: "Photography", icon: <Camera className="w-4 h-4" />, link: "/services/photography" },
  { title: "Event Coverage", icon: <Video className="w-4 h-4" />, link: "/services/events" },
  { title: "Corporate Shoots", icon: <Camera className="w-4 h-4" />, link: "/services/corporate" },
  { title: "Drone Cinematography", icon: <Plane className="w-4 h-4" />, link: "/services/drone" },
  { title: "Studio Portraits", icon: <Camera className="w-4 h-4" />, link: "/services/portraits" },
];

export const Header = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });
  }, []);

  return (
    <header className="w-full">

      {/* TOP BAR */}
      <div className="bg-black text-white text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#AAC832]" />
              +254 717 037785
            </span>

            <span className="hidden md:flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#AAC832]" />
              Kimilili | Kenya
            </span>
          </div>

          <div className="hidden md:block text-xs font-extrabold tracking-wide">
            Capturing Stories Through Lens & Motion
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <div className="sticky top-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/">
            <img src={logo} alt="logo" className="w-32 md:w-40 object-contain" />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 font-medium">

            <Link to="/" className="hover:text-[#468C1E]">Home</Link>

            {/* SERVICES DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-[#468C1E]">
                Services <ChevronDown size={16} />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute top-full mt-4 w-[600px] bg-white shadow-2xl rounded-3xl p-6 grid grid-cols-2 gap-4"
                  >
                    {services.map((service) => (
                      <button
                        key={service.title}
                        onClick={() => navigate(service.link)}
                        className="p-4 rounded-2xl border flex gap-3 items-center hover:bg-[#AAC832]/10"
                      >
                        {service.icon}
                        {service.title}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/portfolioFloatingGallery" className="hover:text-[#468C1E]">Portfolio</Link>
            <Link to="/packages" className="hover:text-[#468C1E]">Packages</Link>
            <Link to="/about" className="hover:text-[#468C1E]">About</Link>
            <Link to="/contact" className="hover:text-[#468C1E]">Contact</Link>

          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">

            <Button
              onClick={() => navigate("/BookSession")}
              className="bg-[#468C1E] hover:bg-[#468C1E]/50 rounded-full text-white font-bold px-6 h-12 hover:scale-105 transition"
            >
              Book a Shoot
            </Button>

            <motion.a
              href="tel:+254717037785"
              className="relative flex items-center overflow-hidden rounded-full bg-black text-white shadow-xl h-12 px-4"
            >
              <Phone className="w-5 h-5 text-[#AAC832]" />
            </motion.a>

          </div>

          {/* MOBILE TOGGLE */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X /> : <Menu />}
          </button>

        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t bg-white"
            >
              <div className="p-6 flex flex-col gap-6">

                {/* NAV LINKS COLUMN */}
                <div className="flex flex-col gap-4">
                  <button onClick={() => navigate("/")}>Home</button>
                  <button onClick={() => navigate("/portfolio")}>Portfolio</button>
                  <button onClick={() => navigate("/packages")}>Packages</button>
                  <button onClick={() => navigate("/contact")}>Contact</button>
                </div>

                {/* SERVICES COLLAPSIBLE */}
                <div>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="flex justify-between w-full font-semibold"
                  >
                    Services
                    <ChevronDown className={`${servicesOpen ? "rotate-180" : ""} transition`} />
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 flex flex-col gap-3"
                      >
                        {services.map((service) => (
                          <button
                            key={service.title}
                            onClick={() => {
                              navigate(service.link);
                              setMenuOpen(false);
                            }}
                            className="text-left p-3 rounded-xl border"
                          >
                            {service.title}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* CTA */}
                <Button
                  onClick={() => navigate("/BookSession")}
                  className="w-full bg-[#468C1E]"
                >
                  Book a Shoot
                </Button>

                <a
                  href="tel:+254717037785"
                  className="flex justify-center items-center gap-2 rounded-full border py-3"
                >
                  <Phone className="w-4 h-4" />
                  +254 717 037785
                </a>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </header>
  );
};