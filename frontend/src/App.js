import { useEffect } from "react";
import { Toaster } from "sonner";
import "@/App.css";
import { StoreProvider, useStore } from "@/context/StoreContext";
import { useLenis } from "@/hooks/useLenis";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { Ticker } from "@/components/lumiere/Ticker";
import { Header } from "@/components/lumiere/Header";
import { Hero } from "@/components/lumiere/Hero";
import { TrustBadges } from "@/components/lumiere/TrustBadges";
import { CategoryPills } from "@/components/lumiere/CategoryPills";
import { ProductGrid } from "@/components/lumiere/ProductGrid";
import { Marquee } from "@/components/lumiere/Marquee";
import { Manifesto } from "@/components/lumiere/Manifesto";
import { Footer } from "@/components/lumiere/Footer";
import { BottomNav } from "@/components/lumiere/BottomNav";
import { ProductModal } from "@/components/lumiere/ProductModal";
import { BagDrawer } from "@/components/lumiere/BagDrawer";
import { SizeGuide } from "@/components/lumiere/SizeGuide";

const Page = () => {
  const { activeProduct, bagOpen, sizeGuideOpen } = useStore();
  useLenis();

  useEffect(() => {
    if (activeProduct || bagOpen || sizeGuideOpen) lockScroll();
    else unlockScroll();
  }, [activeProduct, bagOpen, sizeGuideOpen]);

  return (
    <div className="App" data-testid="lumiere-app">
      <Ticker />
      <Header />
      <main>
        <Hero />
        <TrustBadges />
        <CategoryPills />
        <ProductGrid />
        <Marquee />
        <Manifesto />
      </main>
      <Footer />
      <BottomNav />
      <ProductModal />
      <BagDrawer />
      <SizeGuide />
      <Toaster
        position="top-center"
        offset={72}
        toastOptions={{
          style: { background: "#111827", color: "#fff", border: "none", borderRadius: 999, fontFamily: "Inter, sans-serif", fontSize: 13 },
          descriptionClassName: "!text-white/60",
        }}
      />
    </div>
  );
};

function App() {
  return (
    <StoreProvider>
      <Page />
    </StoreProvider>
  );
}

export default App;
