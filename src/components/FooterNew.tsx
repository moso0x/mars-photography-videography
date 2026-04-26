import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  X,
  Camera,
  Video,
} from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const servicesList = [
  "Wedding Photography",
  "Event Coverage",
  "Portrait Sessions",
  "Corporate Shoots",
  "Outdoor Shoots",
  "Studio Photography",
  "Cinematic Videography",
  "Social Media Reels",
  "Documentary Films",
];

export const FooterNew = () => {
  const [showDeveloper, setShowDeveloper] = useState(false);

  return (
    <footer className="bg-black text-white py-14 relative overflow-hidden font-poppins text-xs md:text-sm">
      <div className="container mx-auto px-6 relative z-10">

        {/* TOP GRID */}
        <div className="grid md:grid-cols-4 gap-10 mb-14">

          {/* BRAND */}
          <div className="flex flex-col gap-4">
            <img
              src={logo}
              alt="Mars Studio"
              className="bg-white w-24 h-24 rounded-full object-cover"
            />

            <p className="text-gray-300 leading-relaxed">
              Mars Creative Studio is a premium photography & videography brand
              capturing timeless visual stories with cinematic depth and emotion.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#AAC832] text-black px-4 py-2 rounded-full w-fit font-medium hover:scale-105 transition"
            >
              <Camera size={16} />
              Book Session
            </Link>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-[#AAC832]/40 pb-2">
              Services
            </h4>

            <div className="space-y-2">
              {servicesList.map((service) => (
                <p
                  key={service}
                  className="hover:text-[#AAC832] transition cursor-default"
                >
                  {service}
                </p>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-[#AAC832]/40 pb-2">
              Explore
            </h4>

            <div className="space-y-2">
              {[
                { name: "About", path: "/about" },
                { name: "Portfolio", path: "/portfolio" },
                { name: "Contact", path: "/contact" },
                { name: "Packages", path: "/packages" },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block hover:text-[#AAC832] transition"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-[#AAC832]/40 pb-2">
              Contact
            </h4>

            <div className="space-y-2 text-gray-300">
              <p>+254 717 037785</p>
              <p>marsprinters@gmail.com</p>
              <p>Nairobi, Kenya</p>
            </div>

            {/* SOCIALS */}
            <div className="flex gap-3 mt-5">
              {[
                { Icon: Facebook, link: "#" },
                { Icon: Instagram, link: "#" },
                { Icon: Twitter, link: "#" },
                { Icon: Linkedin, link: "#" },
              ].map(({ Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  className="hover:scale-110 transition"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between gap-4 text-gray-400">

          <p>
            © {new Date().getFullYear()} Mars Creative Studio — All Rights Reserved
          </p>

          <div className="flex gap-3 flex-wrap">
            <Link to="/privacy" className="hover:text-[#AAC832]">
              Privacy
            </Link>
            <span>|</span>
            <button className="hover:text-[#AAC832]">Terms</button>
            <span>|</span>
            <button className="hover:text-[#AAC832]">Cookies</button>
            <span>|</span>

            <button
              onClick={() => setShowDeveloper(true)}
              className="hover:text-[#AAC832] underline"
            >
              Developer
            </button>
          </div>
        </div>
      </div>

      {/* DEVELOPER MODAL */}
      {showDeveloper && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setShowDeveloper(false)}
          />

          <div className="fixed bottom-6 right-6 z-50 w-80 bg-white text-black rounded-2xl shadow-2xl p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-[#AAC832]">
                Developer Contact
              </h3>
              <button onClick={() => setShowDeveloper(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Name:</span> Moses Mulumia
              </p>
              <p>
                <span className="font-medium">Phone:</span> +254 742 606 050
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:mosesmulumia@gmail.com"
                  className="text-sky-600 hover:underline"
                >
                  mosesmulumia@gmail.com
                </a>
              </p>
              <p>
                <span className="font-medium">Location:</span> Nairobi, Kenya
              </p>
            </div>
          </div>
        </>
      )}
    </footer>
  );
};

export default FooterNew;