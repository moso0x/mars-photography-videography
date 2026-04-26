import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import FooterNew from "@/components/FooterNew";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, MessageSquare, Globe } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import toast from "react-hot-toast";
import contact from "@/assets/contact-icon.png";
import { motion } from "framer-motion";

const Contact = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully 📩");
  };

  return (
    <PageTransition>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#AAC832] rounded-full animate-spin" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-[#fafaf7]"
        >
          <Header />

          {/* HERO SECTION */}
          <section className="relative py-20 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">

              {/* LEFT TEXT */}
              <div>
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-5xl md:text-6xl font-bold leading-tight"
                >
                  Let’s Create Something
                  <span className="block text-[#AAC832]">Remarkable</span>
                </motion.h1>

                <p className="mt-6 text-gray-600 text-lg">
                  We respond fast. Whether it’s photography, videography or a creative project,
                  we’re ready to bring your vision to life.
                </p>

                {/* QUICK ACTIONS */}
                <div className="flex flex-wrap gap-3 mt-8">
                  <a href="tel:+254717037785">
                    <Button className="rounded-full bg-black text-white">
                      Call Now
                    </Button>
                  </a>

                  <a href="mailto:marsprinters@gmail.com">
                    <Button className="rounded-full bg-[#AAC832] text-black">
                      Email Us
                    </Button>
                  </a>

                  <a href="#">
                    <Button variant="outline" className="rounded-full">
                      WhatsApp Chat
                    </Button>
                  </a>
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative"
              >
                <img
                  src={contact}
                  className="rounded-3xl shadow-2xl w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent rounded-3xl" />
              </motion.div>
            </div>
          </section>

          {/* CONTACT GRID */}
          <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">

            {/* FORM */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-semibold mb-6">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">

                <div>
                  <Label>Name</Label>
                  <Input placeholder="Your name" />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input placeholder="you@email.com" />
                </div>

                <div>
                  <Label>Phone</Label>
                  <Input placeholder="+254..." />
                </div>

                <div>
                  <Label>Message</Label>
                  <Textarea rows={5} placeholder="Tell us about your project..." />
                </div>

                <Button className="w-full bg-[#AAC832] text-black rounded-full">
                  Send Message
                </Button>

              </form>
            </motion.div>

            {/* INFO + MAP */}
            <div className="space-y-6">

              {/* INFO CARD */}
              <div className="bg-white rounded-3xl shadow-xl p-8 space-y-5">

                <h2 className="text-2xl font-semibold">Contact Info</h2>

                <div className="space-y-4 text-gray-700">

                  <div className="flex gap-3">
                    <Mail className="text-[#AAC832]" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p>marsprinters@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Phone className="text-[#AAC832]" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p>+254 717 037785</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <MapPin className="text-[#AAC832]" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p>Kimilili, Kenya</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* MAP SECTION (FIXED) */}
              <div className="rounded-3xl overflow-hidden shadow-xl h-[280px] relative group">

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/20 z-10 pointer-events-none" />

                <iframe
                  className="w-full h-full"
                  loading="lazy"
                  src="https://www.google.com/maps?q=Kimilili+Kenya&output=embed"
                />

                {/* label */}
                <div className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-md">
                  <p className="font-semibold text-sm text-black">Kimilili, Kenya</p>
                  <p className="text-xs text-gray-600">Photography Studio Location</p>
                </div>

              </div>

              {/* SOCIAL STRIP */}
              <div className="bg-black text-white rounded-3xl p-6 flex justify-between items-center">

                <div>
                  <h3 className="font-semibold">Follow Our Work</h3>
                  <p className="text-white/60 text-sm">Instagram • YouTube • TikTok</p>
                </div>

                <Globe />
              </div>

            </div>

          </section>
        
        

          <FooterNew />
        </motion.div>
      )}
    </PageTransition>
  );
};

export default Contact;