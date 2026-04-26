import { Header } from "@/components/Header";
import { FooterNew } from "@/components/FooterNew";
import { ProductGrid } from "@/components/ProductGrid";
import { PageTransition } from "@/components/PageTransition";

const VinylStickers = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-6">Vinyl Stickers</h1>
          <p className="text-muted-foreground mb-8">
            Durable vinyl stickers for branding and decoration.
          </p>
          <ProductGrid />
        </main>
        <FooterNew />
      </div>
    </PageTransition>
  );
};

export default VinylStickers;
