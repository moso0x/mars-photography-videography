import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster as HotToaster } from "react-hot-toast";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ApparelWearables from "./pages/ApparelWearables";
import Mugs from "./pages/Mugs";
import Banners from "./pages/Banners";
import VinylStickers from "./pages/VinylStickers";
import LabelStickers from "./pages/LabelStickers";
import Calendars from "./pages/Calendars";
import Letterheads from "./pages/Letterheads";
import PromotionalGifts from "./pages/PromotionalGifts";
import Feedback from "./pages/Feedback";
import Contact from "./pages/Contact";
import Packages from "./pages/Packages";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import PriceList from "./pages/PriceList";
import Shop from "./pages/Shop";
import Breadcrumbs from "@/components/Breadcrumbs"; 
import  PortfolioFloatingGallery  from "./pages/PortfolioFloatingGallery";
import { TicketsGallery } from "./pages/TicketsGallery";
import { PaymentPage } from "./pages/PaymentPage";
import ProductDetails from "./pages/ProductDetails";
import { EventDetails } from "@/pages/EventDetails";
import SupportCause from "./pages/SupportCause";
import RouteChangeLoader from "@/components/RouteChangeLoader";
import PrivacyPolicy from "./components/PrivacyPolicy";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BookSession from "./pages/BookSession";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <div className="overflow-x-hidden">
          <Toaster />
          <Sonner />
         <HotToaster
  position="top-center" // moved from top-center to bottom-center
  toastOptions={{
    duration: 3000,
    style: {
      background: 'hsl(var(--card))',
      color: 'hsl(var(--card-foreground))',
      border: '1px solid hsl(var(--border))',
      fontSize: '0.75rem', // text-xs
      padding: '0.5rem 1rem', // smaller padding
      borderRadius: '0.5rem',
    },
    success: {
      style: {
        color: 'green',
        border: '1px solid darkgreen',
        fontSize: '0.75rem',
      },
      iconTheme: {
        primary: 'white',
        secondary: 'green',
      },
    },
    error: {
      style: {
        background: 'red',
        color: 'white',
        border: '1px solid darkred',
        fontSize: '0.75rem',
      },
      iconTheme: {
        primary: 'white',
        secondary: 'red',
      },
    },
  } as const}
/>

          <BrowserRouter>
            <RouteChangeLoader />
            <Routes>
              <Route path="/" element={<Index />} />   
              <Route path="/PortfolioFloatingGallery" element={<PortfolioFloatingGallery />} />
                <Route path="/ApparelWearables" element={<ApparelWearables />} />
              <Route path="/mugs" element={<Mugs />} />
              <Route path="/banners" element={<Banners />} />
              <Route path="/vinyl-stickers" element={<VinylStickers />} />
              <Route path="/label-stickers" element={<LabelStickers />} />
              <Route path="/calendars" element={<Calendars />} />
              <Route path="/letterheads" element={<Letterheads />} />
              <Route path="/PromotionalGifts" element={<PromotionalGifts />} />
              <Route path="/feedback" element={<Feedback />} />
               <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/BookSession" element={<BookSession />} />
              <Route path="/auth" element={<Auth />} />
              {/* <Route path="/price-list" element={<PriceList />} /> */}
             <Route path="packages" element={<Packages />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              {/* <Route path="/support-cause" element={<SupportCause />} /> */}
              <Route path="ticketsGallery" element={<TicketsGallery />} />
              <Route path="/payment/:id" element={<PaymentPage />} />
              <Route path="/event/:id" element={<EventDetails />} />
              <Route path="/event-details/:id" element={<EventDetails />} />
              <Route path="/product/:slug" element={<ProductDetails />} />
              <Route path="/admin" element={<AdminDashboard />} />
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
