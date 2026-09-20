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
import { ReelsStrip } from "@/components/lumiere/ReelsStrip";
import { ReelViewer } from "@/components/lumiere/ReelViewer";
import { ProductGrid } from "@/components/lumiere/ProductGrid";

import { Manifesto } from "@/components/lumiere/Manifesto";
import { Footer } from "@/components/lumiere/Footer";
import { BottomNav } from "@/components/lumiere/BottomNav";
import { ProductModal } from "@/components/lumiere/ProductModal";
import { BagDrawer } from "@/components/lumiere/BagDrawer";
import { WishlistDrawer } from "@/components/lumiere/WishlistDrawer";
import { SizeGuide } from "@/components/lumiere/SizeGuide";

const Page = () => {
  const { activeProduct, bagOpen, sizeGuideOpen, activeReel, wishlistOpen } = useStore();
  useLenis();

  useEffect(() => {
    if (activeProduct || bagOpen || sizeGuideOpen || wishlistOpen || activeReel !== null) lockScroll();
    else unlockScroll();
  }, [activeProduct, bagOpen, sizeGuideOpen, activeReel, wishlistOpen]);

  return (
    <div className="App" data-testid="lumiere-app">
      <Ticker />
      <Header />
      <main className="page-wrapper" data-testid="page-wrapper">
        <Hero />
        <TrustBadges />
        <CategoryPills />
        <ProductGrid />
        <ReelsStrip />
        <Manifesto />
        <Footer />
      </main>
      <BottomNav />
      <ReelViewer />
      <ProductModal />
      <BagDrawer />
      <WishlistDrawer />
      <SizeGuide />
      <Toaster
        position="top-center"
        offset={96}
        mobileOffset={{ top: 92 }}
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
