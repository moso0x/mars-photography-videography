import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const RouteChangeLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 dark:bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Spinner */}
          <div className="loader" />

          <motion.p
            className="mt-6 text-xs font-medium text-[#AAC832] dark:text-sky-300 tracking-wide"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Please wait, Loading...
          </motion.p>

          {/* Loader CSS */}
          <style>{`
            .loader {
              width: 48px;
              height: 48px;
              border-radius: 50%;
              position: relative;
              animation: rotate 1s linear infinite;
            }

            .loader::before,
            .loader::after {
              content: "";
              box-sizing: border-box;
              position: absolute;
              inset: 0;
              border-radius: 50%;
              border: 5px solid rgba(255,255,255,0.6);
              animation: prixClipFix 2s linear infinite;
            }

            .loader::after {
              inset: 6px;
              border-color: #AAC832; /* Tailwind sky-500 */
              animation:
                prixClipFix 2s linear infinite,
                rotate 0.5s linear infinite reverse;
            }

            @keyframes rotate {
              0%   { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }

            @keyframes prixClipFix {
              0%   { clip-path: polygon(50% 50%,0 0,0 0,0 0,0 0,0 0); }
              25%  { clip-path: polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0); }
              50%  { clip-path: polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%); }
              75%  { clip-path: polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%); }
              100% { clip-path: polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RouteChangeLoader;
