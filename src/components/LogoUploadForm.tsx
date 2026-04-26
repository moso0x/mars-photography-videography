import { useState } from "react"; 
import { motion } from "framer-motion";
import { Upload, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "./Header";

export const LogoUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    apparelType: "",
    position: "",
    quantity: "",
    notes: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (uploaded) {
      setFile(uploaded);
      setPreview(URL.createObjectURL(uploaded));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file before submitting.");
      return;
    }

    console.log({ file, ...formData });
    alert("Upload successful! We’ll contact you soon with a quote.");
    setFile(null);
    setPreview(null);
    setFormData({ apparelType: "", position: "", quantity: "", notes: "" });
  };

  return (
    <motion.div
      className="relative w-72 p-4 text-gray-100 flex flex-col gap-2 font-[EB Garamond] shadow-xl bg-[#212121]/95 overflow-hidden"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Thin moving border */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 border-0">
          <div className="absolute inset-0 animate-border-line"></div>
        </div>
      </div>

      {/* Inner content */}
      <div className="relative flex flex-col gap-2 z-10">
        {/* Header */}
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="text-sm font-bold text-[#ffffff] text-center flex-1">
            Click & Upload your Art
          </h3>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-[#FF5C26]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[#FF5C26]" />
          )}
        </div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="text-sm text-gray-200 text-center mb-2">
            Share your design with Us!
          </p>

          <form onSubmit={handleSubmit} className="space-y-2 text-sm">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#64B5F6] p-2 bg-[#0052CC]/10 hover:bg-[#64B5F6]/10 transition">
              {preview ? (
                <div className="text-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-20 h-20 object-contain mx-auto mb-2 shadow"
                  />
                  <p className="text-gray-200 text-xs truncate w-full">{file?.name}</p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                    className="mt-2 text-xs text-[#FF5C26] border-[#64B5F6] hover:bg-[#FFEB3B]/20"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center text-center">
                  <Upload className="w-8 h-8 text-[#FF5C26] mb-1" />
                  <span>Click or drag file</span>
                  <span className="text-xs text-gray-400 mt-1">
                    PNG, JPG, SVG, PDF
                  </span>
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.svg,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <select
              name="apparelType"
              value={formData.apparelType}
              onChange={handleChange}
              className="w-full border border-[#64B5F6] p-2 text-gray-100 bg-[#212121]/70 focus:ring-1 focus:ring-[#00FF66]"
              required
            >
              <option value="">Apparel Type</option>
              <option value="tshirt">T-Shirt</option>
              <option value="hoodie">Hoodie</option>
              <option value="cap">Cap</option>
              <option value="tote-bag">Tote Bag</option>
              <option value="mug">Mug</option>
              <option value="other">Other</option>
            </select>

            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full border border-[#FF5C26] p-2 text-gray-100 bg-[#212121]/70 focus:ring-1 focus:ring-[#FF5C26]"
              required
            >
              <option value="">Logo Position</option>
              <option value="front-center">Front Center</option>
              <option value="front-left">Front Left</option>
              <option value="back-center">Back Center</option>
              <option value="sleeve">Sleeve</option>
              <option value="other">Other</option>
            </select>

            <input
              type="number"
              name="quantity"
              value={formData.quantity} 
              onChange={handleChange}
              min="1"
              placeholder="Quantity"
              className="w-full border border-[#64B5F6] p-2 text-gray-100 bg-[#212121]/70 focus:ring-1 focus:ring-[#E53935]"
              required
            />

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={2}
              placeholder="Additional notes"
              className="w-full border border-[#64B5F6] p-2 text-gray-100 bg-[#212121]/70 focus:ring-1 focus:ring-[#64B5F6]"
            />

            <Button
              type="submit"
              className="w-full bg-[#00FF66] hover:bg-[#FFEB3B] text-[#212121] font-bold text-sm py-2 shadow-md transition-transform transform hover:scale-105"
            >
              Submit
            </Button>
          </form>

          <div className="flex items-center gap-1 text-xs text-gray-300 justify-center mt-1">
            <FileText className="w-3 h-3 text-[#FF5C26]" />
            <span>We'll review & get back with a quote.</span>
          </div>
        </motion.div>
      </div>

      <style>{`
        .animate-border-line {
          position: absolute;
          inset: 0;
          border: 0;
          background: conic-gradient(
            from 0deg, 
            #0052CC, #00FF66, #FF5C26, #E53935, #64B5F6, #FFEB3B, #0052CC
          );
          mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          padding: 1px; /* thin line thickness */
          animation: border-move 2s linear infinite;
        }

        @keyframes border-move {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </motion.div>
  );
};
