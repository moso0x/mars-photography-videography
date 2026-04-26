import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, ShoppingCart } from "lucide-react";

import totebags from "@/assets/tote-bags-hero.jpg";
import totebag1 from "@/assets/thumbnails/totebag1.jpg";
import totebag2 from "@/assets/thumbnails/totebag2.jpg";
import cap1 from "@/assets/thumbnails/cap1.jpg";
import cap2 from "@/assets/thumbnails/cap2.jpg";
import cap3 from "@/assets/thumbnails/cap3.jpg";
import cap4 from "@/assets/thumbnails/cap4.jpg";
import rollup1 from "@/assets/thumbnails/rollup1.jpg";
import rollup2 from "@/assets/thumbnails/rollup2.jpg"
import rollup3 from "@/assets/thumbnails/rollup3.jpg"
import mug1 from "@/assets/thumbnails/mug1.jpg";
import mug2 from "@/assets/thumbnails/mug2.jpg";
import mug3 from "@/assets/thumbnails/mug3.jpg";
import mug4 from "@/assets/thumbnails/mug4.jpg";
import mounted1 from "@/assets/thumbnails/mounted1.jpg"
import mounted2 from "@/assets/thumbnails/mounted2.jpg"
import hoodie1 from "@/assets/thumbnails/hoodie1.jpg"
import hoodie2 from "@/assets/thumbnails/hoodie2.jpg"
import hoodie3 from "@/assets/thumbnails/hoodie3.jpg"
import hoodie4 from "@/assets/thumbnails/hoodie4.jpg"
import custom_shirt from "@/assets/custom.jpg";
import flyers from "@/assets/a5flyer.jpg";
import flyer1 from "@/assets/thumbnails/flyer1.jpg";
import flyer2 from "@/assets/thumbnails/flyer2.jpg";
import shirt1 from "@/assets/thumbnails/shirt1.jpg";
import shirt2 from "@/assets/thumbnails/shirt2.jpg";
import shirt3 from "@/assets/thumbnails/shirt3.jpg";
import shirt4 from "@/assets/thumbnails/shirt4.jpg";
import rollup from "@/assets/rollup-banner.jpg";
import caps from "@/assets/caps.jpg";
import hoodie from "@/assets/hoodie.jpg";
import mounted from "@/assets/thumbnails/mounted1.jpg";
import corporate1 from "@/assets/thumbnails/corporate1.jpg";
import corporate2 from "@/assets/thumbnails/corporate2.jpg";
import corporate3 from "@/assets/thumbnails/corporate3.jpg";
import corporate4 from "@/assets/thumbnails/corporate4.jpg";
import corporate5 from "@/assets/thumbnails/corporate5.jpg";
import corporate from "@/assets/thumbnails/corporate.jpg";
import mug from "@/assets/mugs.jpg";

import trifold from "@/assets/moreProducts-img/trifold.jpg";
import poppup from "@/assets/moreProducts-img/poupup-banner.jpg";
import reflectors from "@/assets/moreProducts-img/reflectors.jpg";
import reciept from "@/assets/moreProducts-img/receipt.jpg";
import bscards from "@/assets/moreProducts-img/bs-cards.jpg";
import weddingcards from "@/assets/moreProducts-img/weddingcards.jpg";
import babyshower from "@/assets/moreProducts-img/babyshower.jpg";
import adhesive from "@/assets/moreProducts-img/adhesive.jpg";
import teardrop from "@/assets/moreProducts-img/teardrop.jpg";
import umbrella from "@/assets/moreProducts-img/umbrella.jpg";

import { Header } from "@/components/Header";
import FooterNew from "@/components/FooterNew";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

// PRODUCT DATA
const productData: any = {
   "trifold": {
    title: "Trifold Flyer Printing both sides",
    price: "Starting at Ksh. 300",
    image: trifold,
    thumbs: [trifold],
    description: "High-quality trifold flyers suitable for marketing, events, and promotions.",
    features: ["Ready for pickup in 2-3 days", "Shipping outside Mombasa, 2-days, Wells Fargo from Ksh. 800"]
  },
  "poppup": {
    title: "Poppup Banner Printing",
    price: "From Ksh. 100 per piece",
    image: poppup,
    thumbs: [poppup],
    description: "Custom popup banners for trade shows, exhibitions, and promotional events.",
    features: ["Ready for pickup in 2-3 days", "Shipping outside Mombasa, 2-days, Wells Fargo from Ksh. 800"]
  },
  "reflectors": {
    title: "Custom Reflector Printing",
    price: "From Ksh. 250 per card",
    image: reflectors,
    thumbs: [reflectors],
    description: "Custom reflectors for safety, branding, and promotional purposes.",
    features: ["Ready for pickup in 2-3 days", "Shipping outside Mombasa, 2-days, Wells Fargo from Ksh. 800"]
  },
  "receipt": {
    title: "All Sizes Receipt Printing",
    price: "From Ksh. 150 per flyer",
    image: reciept,
    thumbs: [reciept],
    description: "High-quality receipt printing in various sizes for your business needs.",
    features: ["Ready for pickup in 2-3 days", "Shipping outside Mombasa, 2-days, Wells Fargo from Ksh. 800"]
  },
  "bscards": {
    title: "Custom Business Cards Printing",
    price: "From Ksh. 2000 per piece",
    image: bscards,
    thumbs: [bscards],
    description: "Professional business cards to create a lasting impression.",
    features: ["Ready for pickup in 2-3 days", "Shipping outside Mombasa, 2-days, Wells Fargo from Ksh. 800"]
  },
  "weddingcards": {
    title: "Wedding & Events Invitation Cards",
    price: "From Ksh. 150 per piece",
    image: weddingcards,
    thumbs: [weddingcards],
    description: "Elegant wedding and event invitation cards customized to your theme.",
    features: ["Ready for pickup in 2-3 days", "Shipping outside Mombasa, 2-days, Wells Fargo from Ksh. 800"]
  },
  "babyshower": {
    title: "Baby Shower Invitation Cards",
    price: "From Ksh. 200",
    image: babyshower,
    thumbs: [babyshower],
    description: "Custom baby shower invitations designed for your special occasion.",
    features: ["Ready for pickup in 2-3 days", "Shipping outside Mombasa, 2-days, Wells Fargo from Ksh. 800"]
  },
  "adhesive": {
    title: "Custom Adhesive Stickers",
    price: "From Ksh. 400 per mug",
    image: adhesive,
    thumbs: [adhesive],
    description: "Custom adhesive stickers for packaging, branding, and promotions.",
    features: ["Ready for pickup in 2-3 days", "Shipping outside Mombasa, 2-days, Wells Fargo from Ksh. 800"]
  },
  "teardrop": {
    title: "Tear Drop Banners Printing",
    price: "From Ksh. 580",
    image: teardrop,
    thumbs: [teardrop],
    description: "Eye-catching teardrop banners for events, exhibitions, and promotions.",
    features: ["Ready for pickup in 2-3 days", "Shipping outside Mombasa, 2-days, Wells Fargo from Ksh. 800"]
  },
  "umbrella": {
    title: "Custom Corporate Umbrella Printing",
    price: "From Ksh. 1000",
    image: umbrella,
    thumbs: [umbrella],
    description: "Premium custom umbrellas for corporate gifting and events.",
    features: ["Ready for pickup in 2-3 days", "Shipping outside Mombasa, 2-days, Wells Fargo from Ksh. 800"]
  },
  "tote-bags-printing": {
    title: "Tote Bags Printing",
    price: "Starting at Ksh. 300",
    image: totebags,
    thumbs: [totebags, totebag1, totebag2],
    description:
      "Our custom tote bags are perfect for events, branding campaigns, corporate giveaways, and retail packaging. High-quality printing that lasts long with eco-friendly material options.",
     features: [
    "Ready for pickup in 2-3 days ",
    "Shipping  Outside Mombasa, 2-days, Wells fargo from ksh.800 ",],
  },
  "custom-shirt-printing": {
    title: "Custom Shirt Printing",
    price: "From Ksh. 250",
    image: custom_shirt,
    thumbs: [shirt1,shirt2, shirt3, shirt4, ],
    description: "High-quality T-shirt printing using screen printing, vinyl, and DTG methods. Perfect for events, promotions, and personal use.",
     features: [
    "Ready for pickup in 2-3 days ",
    "Shipping  Outside Mombasa, 2-days, Wells fargo from ksh.800 ",],
  },
  "hoodies-printing": {
    title: "Hoodies Printing",
    price: "From Ksh. 500 per piece",
    image: hoodie,
    thumbs: [ hoodie1, hoodie2, hoodie3,hoodie4],
    description: "Stylish branded hoodies perfect for events, merchandise, and corporate branding.",
      features: [
    "Ready for pickup in 2-3 days ",
    "Shipping  Outside Mombasa, 2-days, Wells fargo from ksh.800 ",],
  },
  "caps-printing": {
    title: "Caps Printing",
    price: "From Ksh. 200 per piece",
    image: caps,
    thumbs: [caps, cap1, cap2, cap3, cap4],
    description: "Custom branded caps perfect for corporate promotions, events, and team branding.",
      features: [
    "Ready for pickup in 2-3 days ",
    "Shipping  Outside Mombasa, 2-days, Wells fargo from ksh.800 ",],
  },
  "a5-flyers-printing": {
    title: "A5 Flyers Printing",
    price: "From Ksh. 100 per flyer",
    image: flyers,
    thumbs: [flyers, flyer1, flyer2],
    description: "A5 flyers are great for marketing campaigns, promotions, and events. High-quality print on premium paper.",
      features: [
    "Ready for pickup in 2-3 days ",
    "Shipping  Outside Mombasa, 2-days, Wells fargo from ksh.800 ",],
  },
  "roll-up-banner-printing": {
    title: "Roll-up Banner Printing",
    price: "From Ksh. 200 per piece",
    image: rollup,
    thumbs: [rollup, rollup1, rollup2, rollup3],
    description: "Premium roll-up banners ideal for exhibitions, conferences, and business advertising.",
      features: [
    "Ready for pickup in 2-3 days ",
    "Shipping  Outside Mombasa, 2-days, Wells fargo from ksh.800 ",],
  },
  "mounted-photos-printing": {
    title: "Mounted Photos Printing",
    price: "From Ksh. 700",
    image: mounted,
    thumbs: [mounted,  mounted1,  mounted2],
     features: [
    "Ready for pickup in 2-3 days ",
    "Shipping  Outside Mombasa, 2-days, Wells fargo from ksh.800",],
  },
  "custom-mugs-printing": {
    title: "Custom Mugs Printing",
    price: "From Ksh. 400 per mug",
    image: mug,
    thumbs: [mug, mug1, mug2, mug3, mug4],
     features: [
    "Ready for pickup in 2-3 days ",
    "Shipping  Outside Mombasa, 2-days, Wells fargo from ksh.800",],
  },
"corporate-gifts": {
  title: "Corporate Gifts Branding",
  price: "From Ksh. 500 per item",
  image: mug, // replace this with your corporate gift default image
  thumbs: [corporate1, corporate2, corporate3, corporate4, corporate5, corporate], // replace with corporate gift images
  description: "Premium branded corporate gifts ideal for events, promotions, awards, and company identity.",
  features: [
    "Ready for pickup in 2-3 days ",
    "Shipping  Outside Mombasa, 2-days, Wells fargo from ksh.800 ",
  ],
},
"2026-calendar-printing": {
  title: "Corporate Gifts Branding",
  price: "From Ksh. 500 per item",
  image: mug, // replace this with your corporate gift default image
  thumbs: [corporate1, corporate2, corporate3, corporate4, corporate5, corporate], // replace with corporate gift images
  description: "Premium branded corporate gifts ideal for events, promotions, awards, and company identity.",
  features: [
    "Ready for pickup in 2-3 days ",
    "Shipping  Outside Mombasa, 2-days, Wells fargo from ksh.800 ",
  ],
},
};

export default function ProductDetails() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const product = productData[slug || ""];
  const [mainImage, setMainImage] = useState(product?.image);
  const [preview, setPreview] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const basePrice = parseInt(product?.price.replace(/\D/g, "")) || 0;
  const totalPrice = basePrice * quantity;

  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let scrollAmount = 0;
    const interval = setInterval(() => {
      scrollAmount += 1;
      track.scrollTo({ left: scrollAmount, behavior: "smooth" });
      if (scrollAmount >= track.scrollWidth) scrollAmount = 0;
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const scrollTrack = (dir: "left" | "right") => {
    if (!trackRef.current) return;
    const amount = dir === "left" ? -200 : 200;
    trackRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const handleFileUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const removeArt = () => {
    setPreview(null);
    const input = document.getElementById("artUpload") as HTMLInputElement | null;
    if (input) input.value = "";
  };

  if (!product) return <div className="p-10 text-center text-red-600">Product not found.

  </div>;

  // ====== Product-specific attribute dropdowns ======
  const renderAttributes = () => {
    switch (slug) {
      case "tote-bags-printing":
        return (
          <>
            <AttributeSelect label="Bag Type" options={["Canvas", "Cotton", "Jute", "Nylon", "Eco-friendly Tote"]} />
            <AttributeSelect label="Bag Size" options={["Small", "Medium", "Large", "Custom"]} />
            <AttributeSelect label="Bag Color" options={["Black", "White", "Red", "Blue", "Green", "Custom"]} />
            <AttributeSelect label="Print Type" options={["Screen Print", "DTG", "Heat Transfer", "Embroidery"]} />
            <AttributeSelect label="Print Area / Sides" options={["Front Only", "Back Only", "Both Sides"]} />
          </>
        );
      case "custom-shirt-printing":
      case "hoodies-printing":
        return (
          <>
            <AttributeSelect label="Apparel Type" options={["T-shirt", "Polo", "Hoodie", "Sweatshirt", "Jersey"]} />
            <AttributeSelect label="Fabric & GSM" options={["Cotton 160–300 GSM", "Polyester", "Blend"]} />
            <AttributeSelect label="Size" options={["S", "M", "L", "XL", "XXL"]} />
            <AttributeSelect label="Print Type" options={["Screen Print", "DTG", "Embroidery", "Vinyl"]} />
            <AttributeSelect label="Print Area / Sides" options={["Front", "Back", "Sleeves"]} />
          </>
        );
      case "caps-printing":
        return (
          <>
            <AttributeSelect label="Cap Type" options={["Snapback", "Trucker", "Baseball", "Bucket"]} />
            <AttributeSelect label="Material" options={["Cotton", "Wool", "Polyester", "Mesh"]} />
            <AttributeSelect label="Cap Color" options={["Black", "White", "Red", "Blue", "Green"]} />
            <AttributeSelect label="Logo Method" options={["Embroidery", "Patch", "Vinyl Print"]} />
            <AttributeSelect label="Print / Embroidery Position" options={["Front", "Side", "Back"]} />
          </>
        );
      case "a5-flyers-printing":
        return (
          <>
            <AttributeSelect label="Paper Size" options={["A6", "A5", "A4", "DL", "Custom"]} />
            <AttributeSelect label="Paper Thickness" options={["130gsm", "170gsm", "250gsm"]} />
            <AttributeSelect label="Print Sides" options={["Single-sided", "Double-sided"]} />
            <AttributeSelect label="Finish" options={["Matte", "Gloss", "Silk"]} />
            <AttributeSelect label="Quantity" options={["100", "200", "500", "1000", "Custom"]} />
          </>
        );
      case "roll-up-banner-printing":
        return (
          <>
            <AttributeSelect label="Banner Type" options={["PVC", "Mesh", "Roll-Up", "Fabric"]} />
            <AttributeSelect label="Size" options={["2x3 ft", "3x5 ft", "4x6 ft", "Custom"]} />
            <AttributeSelect label="Finishing" options={["Eyelets", "Hemming", "Pole Pockets", "No Finish"]} />
            <AttributeSelect label="Print Quality" options={["Indoor", "Outdoor"]} />
            <AttributeSelect label="Quantity" options={["1", "5", "10", "Custom"]} />
          </>
        );
      case "mounted-photos-printing":
        return (
          <>
            <AttributeSelect label="Photo Size" options={["A4", "A3", "A2", "12x18", "Custom"]} />
            <AttributeSelect label="Mounting Material" options={["Foamboard", "MDF", "Canvas"]} />
            <AttributeSelect label="Frame Option" options={["Framed", "Frameless"]} />
            <AttributeSelect label="Finish" options={["Matte", "Gloss", "Satin"]} />
            <AttributeSelect label="Orientation" options={["Portrait", "Landscape"]} />
          </>
        );
      case "custom-mugs-printing":
        return (
          <>
            <AttributeSelect label="Mug Type" options={["Ceramic", "Magic Mug", "Colored Rim", "Travel Mug"]} />
            <AttributeSelect label="Mug Color" options={["White", "Black", "Red", "Blue", "Green"]} />
            <AttributeSelect label="Print Type" options={["Sublimation", "Heat Transfer"]} />
            <AttributeSelect label="Print Area" options={["One-side", "Two-side", "Full Wrap"]} />
            <AttributeSelect label="Upload Artwork" options={["Yes", "No"]} />
          </>
        );
  case "corporate-gifts":
  return (
    <>
      <AttributeSelect
        label="Gift Item Type"
        options={[
          "Mugs",
          "Wristbands",
          "Pens",
          "Notebooks/Diaries",
          "Water Bottles",
          "Keyholders",
          "Gift Sets",
          "Calendars",
          "USB Flash Drives",
        ]}
      />

      <AttributeSelect
        label="Material / Build"
        options={[
          "Plastic",
          "Ceramic",
          "Metal",
          "Rubber/Silicone (Wristbands)",
          "Leather (Notebooks/Diaries)",
          "Stainless Steel (Bottles)",
        ]}
      />

      <AttributeSelect
        label="Color Options"
        options={[
          "White",
          "Black",
          "Blue",
          "Red",
          "Green",
          "Yellow",
          "Mixed Colors",
        ]}
      />

      <AttributeSelect
        label="Branding Type"
        options={[
          "Full Color Print",
          "Engraving (Metal Items)",
          "Embossing (Leather Items)",
          "Sublimation (Mugs)",
          "Screen Print",
          "UV Print",
        ]}
      />

      <AttributeSelect
        label="Personalization"
        options={[
          "Logo Only",
          "Name + Logo",
          "Text Message",
          "Event Theme Branding",
        ]}
      />

      <AttributeSelect
        label="Upload Artwork"
        options={["Yes", "No"]}
      />
    </>
  );

      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-6 pb-24">
        <p className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:underline">Home</a> / {product.title}
        </p>

   <div className="flex items-center justify-between mb-10">
  {[
    { text: "Choose Your Print", color: "#64B5F6" },
    { text: "Make Order / Checkout", color: "#FFEB3B" },
    { text: "Track Your Order", color: "#00FF66" },
  ].map((step, i) => (
    <div key={i} className="flex items-center w-full">
      {/* Colored Number */}
      <span
        className="font-bold text-sm mr-2"
        style={{ color: step.color }}
      >
        {i + 1}.
      </span>

      {/* Step Text */}
      <div className="text-center font-semibold text-sm text-gray-800">
        {step.text}
      </div>

      {/* Connector Line */}
      {i < 2 && <div className="flex-1 border-t border-gray-300 mx-2"></div>}
    </div>
  ))}
</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* LEFT IMAGE SECTION */}
          <div>
            <motion.img
              key={mainImage}
              src={mainImage}
              className="w-full h-[420px] object-cover rounded-xl shadow-lg mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="relative flex items-center">
              <button
                onClick={() => scrollTrack("left")}
                className="absolute -left-10 bg-white border shadow-md p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft size={20} />
              </button>

              <div ref={trackRef} className="flex gap-3 overflow-x-scroll py-2 scrollbar-hide">
                {product.thumbs.map((img: string, i: number) => (
                  <img
                    key={i}
                    src={img}
                    onClick={() => setMainImage(img)}
                    className="w-24 h-20 object-cover rounded-lg border cursor-pointer hover:scale-105 transition"
                  />
                ))}
              </div>

              <button
                onClick={() => scrollTrack("right")}
                className="absolute -right-10 bg-white border shadow-md p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* RIGHT PRODUCT DETAILS */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-md text-green-600 font-semibold mb-4">{product.price}</p>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">{product.description}</p>

            {/* Product-specific attributes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              {renderAttributes()}
            </div>

            {/* Quantity & total */}
            <div className="p-4 border rounded-xl bg-gray-50 shadow-sm mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-32 border rounded-lg p-2 text-sm"
              />
              <p className="mt-2 text-sm">Price per item: Ksh. {basePrice.toLocaleString()}</p>
              <p className="mt-1 text-sm font-semibold">Total: Ksh. {totalPrice.toLocaleString()}</p>
            </div>

            <Button
              size="sm"
              onClick={() => addToCart(product)}
              className="w-[40%] flex items-center justify-center gap-2 bg-black text-white font-medium shadow-[0_4px_12px_rgba(0,212,90,0.4)] hover:shadow-[0_6px_20px_rgba(0,212,90,0.5)] transition-all duration-300 rounded-full py-2 mb-4"
            >
              <ShoppingCart className="w-4 h-4 text-[#FFEB3B]" />
              Add to Cart
            </Button>
                        {/* WHATSAPP ORDER BUTTON WITH QUANTITY + TOTAL */}
           {/* Buttons on one line */}
<div className="flex flex-wrap justify-center gap-4 mb-6">
  <a
    href={`https://wa.me/+254704815725?text=${encodeURIComponent(
      `Hello, I want to order ${product.title}.
Quantity: ${quantity}
Price per item: Ksh. ${basePrice}
Total: Ksh. ${totalPrice}
Artwork: ${preview ? "Uploaded ✔️" : "No artwork uploaded"}`
    )}`}
    target="_blank"
    className="flex-1 min-w-[100px] justify-center flex bg-green-600 text-white py-2 rounded-full hover:bg-green-700 text-center"
  >
    Order via WhatsApp
  </a>

  <label
    htmlFor="artUpload"
    className="flex-1 min-w-[200px] justify-center flex rounded-full bg-black text-white py-2 cursor-pointer hover:bg-blue-700 text-center"
  >
    Upload Art
  </label>
</div>

<input
  type="file"
  id="artUpload"
  className="hidden"
  accept="image/*"
  onChange={handleFileUpload}
/>

{preview && (
  <div className="mt-4">
    <motion.img
      src={preview}
      alt="Preview"
      className="w-full h-56 object-cover rounded-lg shadow-md border"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    />
    <button
      onClick={removeArt}
      className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
    >
      Remove Art
    </button>
  </div>
)}



            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {product.features.map((f: string, i: number) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </div>

        <a
          href="https://wa.me/254704815725"
          target="_blank"
          className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg hover:bg-green-600"
        >
          <MessageCircle size={28} color="white" />
        </a>
      </div>
      <FooterNew />
    </>
  );
}

// ====== AttributeSelect component ======
const AttributeSelect = ({ label, options }: { label: string; options: string[] }) => (
  <div>
    <label className="block text-gray-600 text-sm font-medium mb-1">{label}</label>
    <select className="w-full border rounded-lg p-1.5 text-sm">
      {options.map((opt, i) => (
        <option key={i}>{opt}</option>
      ))}
    </select>
  </div>
  );