import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Upload, Truck, Clock, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { toast } from "react-hot-toast";

// Product data - in a real app, this would come from a database
const productData: Record<string, any> = {
  "custom-merchandise-branded-apparel": {
    title: "Custom Branded T-Shirt",
    images: ["/merch1.jpg", "/merch2.jpg"],
    priceRange: "KSh 580 - KSh 1,392",
    basePrice: 580,
    description: "High-quality custom branded t-shirts...",
    options: {
      clothType: ["Round-Neck", "Polo", "V-Neck"],
      size: ["XS", "S", "M", "L", "XL"],
      color: ["Red", "Blue", "Black", "White"],
    },
  },
  "gifts-promotional-items": {
    title: "Custom Mugs & Gift Items",
    images: ["/gifts1.jpg", "/gifts2.jpg"],
    priceRange: "KSh 350 - KSh 1,200",
    basePrice: 350,
    description: "Beautifully designed corporate gifts and promotional items.",
    options: {
      type: ["Mug", "Keychain", "Calendar"],
      printType: ["Logo", "Full Image"],
      color: ["White", "Black", "Custom"],
    },
  },
  // ...add others for each feature
};


const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = productData[productId || "branded-tshirt"];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({
    clothType: "",
    size: "",
    fitting: "",
    artwork: "",
    printPosition: "",
    color: "",
    material: ""
  });

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Button onClick={() => navigate("/shop")}>Back to Shop</Button>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    const missingOptions = Object.entries(selectedOptions).filter(([_, value]) => !value);
    
    if (missingOptions.length > 0) {
      toast.error("Please select all options before adding to cart");
      return;
    }

    addToCart({
      title: `${product.title} - ${selectedOptions.size} ${selectedOptions.color}`,
      price: product.priceRange,
      image: product.images[0]
    });
  };

  const handleOptionChange = (option: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [option]: value }));
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <button onClick={() => navigate("/")} className="hover:text-foreground">Home</button>
          <ChevronRight className="w-4 h-4" />
          <button onClick={() => navigate("/shop")} className="hover:text-foreground">Shop</button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{product.title}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Card className="relative aspect-square overflow-hidden">
              <motion.img
                key={currentImageIndex}
                src={product.images[currentImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </Card>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    idx === currentImageIndex ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img src={img} alt={`${product.title} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Options */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <p className="text-2xl font-semibold text-primary mb-4">
                Price: {product.priceRange}
              </p>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Selection Steps */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">1</div>
                  <span>Select Options</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-semibold">2</div>
                  <span>Add to Cart</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-semibold">3</div>
                  <span>Checkout</span>
                </div>
              </div>
            </Card>

            {/* Options Grid */}
            <div className="grid gap-4">
              {Object.entries(product.options).map(([key, values]) => (
                <div key={key} className="space-y-2">
                  <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                  <Select value={selectedOptions[key as keyof typeof selectedOptions]} onValueChange={(value) => handleOptionChange(key, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {(values as string[]).map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}

              {/* Quantity */}
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-24"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button onClick={handleAddToCart} className="w-full" size="lg">
                Add to Cart
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <Upload className="w-4 h-4 mr-2" />
                Upload Artwork
              </Button>
            </div>

            {/* Delivery Info */}
            <Card className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold">Ready for pickup in 1-2 days</p>
                  <p className="text-sm text-muted-foreground">Fast turnaround time</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold">Rider deliveries within Nairobi</p>
                  <p className="text-sm text-muted-foreground">Same Day delivery available: From Ksh. 150 - 600</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold">Shipping outside Nairobi</p>
                  <p className="text-sm text-muted-foreground">3-4 days; Courier from Ksh. 650</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
