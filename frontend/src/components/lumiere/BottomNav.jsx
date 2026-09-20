import { useEffect, useState } from "react";
import { Gem, Home, MessageCircle, ShoppingBag } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { scrollTo } from "@/lib/scroll";
import { conciergeWhatsApp } from "@/lib/whatsapp";

export const BottomNav = () => {
  const { bagCount, setBagOpen } = useStore();
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      const cat = document.getElementById("catalog");
      setActive(cat && cat.getBoundingClientRect().top < window.innerHeight * 0.5 ? "catalog" : "home");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const Item = ({ id, icon: Icon, label, onClick, badge, testId }) => {
    const isActive = active === id;
    return (
      <button data-testid={testId} onClick={onClick} className="relative flex-1 flex flex-col items-center justify-center gap-0.5 h-full">
        <span className={`relative flex items-center justify-center w-10 h-7 rounded-full transition-colors ${isActive ? "bg-brand/10 text-brand" : "text-graphite"}`}>
          <Icon size={19} />
          {badge > 0 && (
            <span data-testid="bottom-nav-bag-count" className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-brand text-white text-[9px] font-display font-bold flex items-center justify-center tabular">{badge}</span>
          )}
        </span>
        <span className={`font-display text-[10px] font-semibold ${isActive ? "text-brand" : "text-graphite"}`}>{label}</span>
      </button>
    );
  };

  return (
    <nav data-testid="bottom-nav" aria-label="Mobile shopping navigation" className="mobile-dock sm:hidden fixed left-3 right-3 z-50 h-[64px] rounded-full hairline shadow-[0_10px_30px_rgba(17,24,39,0.12)] flex">
      <Item id="home" icon={Home} label="Home" testId="bottom-nav-home" onClick={() => scrollTo(0)} />
      <Item id="catalog" icon={Gem} label="Catalog" testId="bottom-nav-catalog" onClick={() => scrollTo("#catalog", { offset: -110 })} />
      <Item id="bag" icon={ShoppingBag} label="Bag" testId="bottom-nav-bag" badge={bagCount} onClick={() => setBagOpen(true)} />
      <Item id="wa" icon={MessageCircle} label="WhatsApp" testId="bottom-nav-whatsapp" onClick={conciergeWhatsApp} />
    </nav>
  );
};
