import Preloader from "./components/Preloader";
import ScrollProgress from "./components/ScrollProgress";
import Cursor from "./components/Cursor";
import BackToTop from "./components/BackToTop";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import CheckoutToast from "./components/CheckoutToast";
import Navbar from "./components/Navbar";
import ScrollHero from "./components/ScrollHero";
import Marquee from "./components/Marquee";
import Story from "./components/Story";
import HorizontalShowcase from "./components/HorizontalShowcase";
import Products from "./components/Products";
import Signature from "./components/Signature";
import Testimonials from "./components/Testimonials";
import FindUs from "./components/FindUs";
import SocialLoop from "./components/SocialLoop";
import Footer from "./components/Footer";

export default function App() {
  return (
    <CartProvider>
    <div id="top" className="min-h-dvh bg-page">
      <Preloader />
      <ScrollProgress />
      <Cursor />
      <BackToTop />
      <CartDrawer />
      <CheckoutToast />
      <Navbar />
      <main>
        <ScrollHero />
        <Marquee />
        <Story />
        <HorizontalShowcase />
        <Products />
        <Signature />
        <Testimonials />
        <FindUs />
        <SocialLoop />
      </main>
      <Footer />
    </div>
    </CartProvider>
  );
}
