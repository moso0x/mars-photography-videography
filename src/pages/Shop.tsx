import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { FooterNew } from "@/components/FooterNew";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  LayoutGrid,
  List,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";

import totebags from "@/assets/tote-bags-hero.jpg";

const categories = [
  "All Products",
  "Stationery",
  "Apparel",
  "Gift Sets",
  "Accessories",
  "Packaging",
  "Outdoor Branding",
  "Home and Living",
  "Business Services",
  "Mugs",
  "Banners",
  "Stickers",
  "Calendars",
  "Promotional Items",
  "Corporate Gifts",
  "Print Materials",
];

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  category: string;
  images: string[] | null;
  stock: number | null;
  is_active: boolean | null;
}

const Shop = () => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === "All Products" ||
        product.category === selectedCategory;
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name") return a.title.localeCompare(b.title);
      return 0;
    });

  const getProductImage = (product: Product) =>
    product.images?.[0] || totebags;

  const formatPrice = (price: number) =>
    `From Ksh. ${price.toLocaleString()}`;

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Header />

        {/* HERO */}
        <section className="h-20 bg-white flex items-center justify-center">
          <div className="text-center text-black">
            <h1 className="text-3xl font-bold">Shop</h1>
            <p className="text-sm  text-[#468C1E] opacity-90">Home / Shop</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* SIDEBAR */}
            <aside>
              <Card className="p-5">
                <h3 className="text-sm font-bold text-gray-700 mb-3">
                  Product Categories
                </h3>
                <ul className="space-y-1">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-1.5 rounded text-xs transition ${
                          selectedCategory === category
                            ? "bg-[#8C8C8C] text-white"
                            : "hover:bg-[#AAC832] text-gray-700"
                        }`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </Card>
            </aside>

            {/* MAIN */}
            <main className="lg:col-span-3">
              {/* SEARCH + VIEW */}
              <div className="mb-6 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#AAC832]" />
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 text-xs"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant={viewMode === "grid" ? "default" : "outline"}
                      className="text-[#468C1E]"
                      onClick={() => setViewMode("grid")}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant={viewMode === "list" ? "default" : "outline"}
                      className="text-[#468C1E]"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <p className="text-[#AAC832]">
                    Showing {Math.min(visibleCount, filteredProducts.length)} of{" "}
                    {filteredProducts.length}
                  </p>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-56 text-xs">
                      <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="price-low">Price ↑</SelectItem>
                      <SelectItem value="price-high">Price ↓</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* LOADING */}
              {loading && (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-[#AAC832]" />
                </div>
              )}

              {/* PRODUCTS */}
              {!loading && (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
                      : "space-y-4"
                  }
                >
                  {filteredProducts.slice(0, visibleCount).map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card
                        className={`overflow-hidden hover:shadow-md transition ${
                          viewMode === "list" ? "flex" : ""
                        }`}
                      >
                        <div
                          className={`${
                            viewMode === "list"
                              ? "w-32"
                              : "aspect-square"
                          } bg-gray-100`}
                        >
                          <img
                            src={getProductImage(product)}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="p-3 flex-1">
                          <h3 className="font-semibold text-xs mb-1">
                            {product.title}
                          </h3>
                          <p className="text-[#AAC832] text-xs font-medium mb-2">
                            {formatPrice(product.price)}
                          </p>

                          <Button
                            className="w-full bg-[#AAC832] hover:bg-sky-700 text-white text-xs rounded-full"
                            onClick={() =>
                              addToCart({
                                title: product.title,
                                price: formatPrice(product.price),
                                image: getProductImage(product),
                              })
                            }
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Add to Cart
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {!loading && visibleCount < filteredProducts.length && (
                <div className="flex justify-center mt-8">
                  <Button
                    className="bg-[#AAC832] hover:bg-sky-700 text-white text-xs rounded-full px-6"
                    onClick={() => setVisibleCount((p) => p + 10)}
                  >
                    Load More
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>

        <FooterNew />
      </div>
    </PageTransition>
  );
};

export default Shop;
