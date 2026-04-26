import { Header } from "@/components/Header";
import { FooterNew } from "@/components/FooterNew";
import { ProductGrid } from "@/components/ProductGrid";
import { PageTransition } from "@/components/PageTransition";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sample images
import apparels1 from "@/assets/apparels.jpg";
import apparels2 from "@/assets/apparels2.jpg";
import apparels3 from "@/assets/apparels3.jpg";

const Mugs = () => {

    const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    adaptiveHeight: true,
  };


  return (
    
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-gray-200">
        <Header />

        {/* Image + Text Section */}
        <section className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-10">
          {/* Carousel */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full max-w-[450px]">
              <Slider {...carouselSettings}>
                {[apparels1, apparels2, apparels3].map((img, i) => (
                  <div key={i} className="flex justify-center">
                    <img
                      src={img}
                      alt={`Apparel ${i + 1}`}
                      className="w-full h-[250px] md:h-[300px] object-contain rounded-lg shadow-md mx-auto"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2">
            <h1 className="text-5xl font-bold mb-6">
            Apparels and Wearables
            </h1>
            <p className="text-muted-foreground mb-8 text-xs">
              Step out in style with our premium branded apparel that speaks your brand’s language.
              From T-shirts and hoodies to caps and uniforms, we design and print wearables that
              blend comfort, creativity, and identity — helping you look as professional as you feel.
            </p>
          </div>
        </section>

        {/* Product Grid */}
        <main className="container mx-auto px-4 pb-12">
          <ProductGrid />
        </main>

        <FooterNew />
      </div>
    </PageTransition>
  );
};

export default Mugs;
