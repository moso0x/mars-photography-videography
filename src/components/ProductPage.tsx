import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

// Example product data
const productDetails: Record<string, any> = {
  "custom-merchandise-branded-apparel": {
    title: "Custom Merchandise & Branded Apparel",
    description:
      "Bring your vision to life with custom gear that makes a statement. Choose your preferred clothing type, fabric, and color. Upload your logo or design and we’ll handle the rest!",
    options: {
      clothingType: ["Round Neck", "Polo", "V-Neck"],
      fabric: ["Cotton", "Polyester", "Blend"],
      color: ["White", "Black", "Navy Blue", "Red", "Green"],
      printPosition: ["Front", "Back", "Both"],
    },
    basePrice: 580,
    image: "/placeholder.svg",
  },
  "gifts-promotional-items": {
    title: "Gifts & Promotional Items",
    description:
      "Custom mugs, calendars, and corporate gifts designed to impress. Choose your preferred gift type and packaging, and upload any logo or artwork to personalize your order.",
    options: {
      giftType: ["Mug", "Calendar", "Notebook", "Keyholder"],
      packaging: ["Boxed", "Wrapped", "Custom Label"],
    },
    basePrice: 300,
    image: "/placeholder.svg",
  },
};

export const ProductPage = () => {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const product = productDetails[productSlug || "custom-merchandise-branded-apparel"];

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [file, setFile] = useState<File | null>(null);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
        <Button onClick={() => navigate("/")}>Go Back</Button>
      </div>
    );
  }

  const handleOptionChange = (key: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      toast.success(`${file.name} uploaded successfully`);
    }
  };

  const handleAddToCart = () => {
    const missing = Object.entries(product.options).some(
      ([key]) => !selectedOptions[key]
    );
    if (missing) {
      toast.error("Please select all options before proceeding");
      return;
    }

    toast.success("Product added to cart!");
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-6 hover:text-primary"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        {/* Product Section */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Image */}
          <motion.img
            src={product.image}
            alt={product.title}
            className="rounded-xl shadow-md w-full h-96 object-cover"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          />

          {/* Info */}
          <div>
            <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
            <p className="text-muted-foreground mb-6">{product.description}</p>
            <p className="text-lg font-semibold text-primary mb-6">
              From KSh {product.basePrice}
            </p>

            {/* Options */}
            <Card className="p-6 space-y-4 mb-6">
              {Object.entries(product.options).map(([key, values]) => (
                <div key={key}>
                  <Label className="capitalize mb-1">{key.replace(/([A-Z])/g, " $1")}</Label>
                  <select
                    className="w-full border rounded-md p-2"
                    value={selectedOptions[key] || ""}
                    onChange={(e) => handleOptionChange(key, e.target.value)}
                  >
                    <option value="">Select {key}</option>
                    {(values as string[]).map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              {/* Quantity */}
              <div>
                <Label>Quantity</Label>
                <Input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-24"
                />
              </div>
            </Card>

            {/* Upload */}
            <Card className="p-6 space-y-4">
              <Label>Upload Logo or Design</Label>
              <Input type="file" accept="image/*,.pdf" onChange={handleUpload} />
              {file && (
                <p className="text-sm text-green-600">Selected file: {file.name}</p>
              )}
            </Card>

            {/* Action */}
            <Button onClick={handleAddToCart} className="mt-6 w-full">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
