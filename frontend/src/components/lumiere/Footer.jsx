import { MessageCircle } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { scrollTo } from "@/lib/scroll";
import { conciergeWhatsApp, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

export const Footer = () => {
  const { setSizeGuideOpen } = useStore();
  return (
    <footer data-testid="site-footer" className="bg-canvas border-t border-[var(--border-light)] pt-14 pb-28 sm:pb-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid sm:grid-cols-12 gap-10">
        <div className="sm:col-span-6">
          <p className="font-serif text-2xl tracking-[0.12em] text-ink">LUMIÈRE</p>
          <p className="font-body text-[10px] tracking-[0.32em] uppercase text-graphite">demi-fine</p>
          <p className="mt-4 font-body text-sm text-graphite max-w-sm leading-relaxed">LUMIÈRE Demi-Fine Jewellery — Accessible Luxury for Every Day.</p>
          <button
            data-testid="footer-whatsapp-link"
            onClick={conciergeWhatsApp}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-emeraldbadge/10 text-emeraldbadge px-4 h-10 font-display text-sm font-bold hover:bg-emeraldbadge hover:text-white transition-colors"
          >
            <MessageCircle size={16} /> WhatsApp {WHATSAPP_DISPLAY}
          </button>
        </div>
        <div className="sm:col-span-3">
          <p className="font-body text-[11px] tracking-[0.25em] uppercase text-graphite mb-3">Help</p>
          <ul className="space-y-2 font-body text-sm text-ink">
            <li><button data-testid="footer-size-guide-link" onClick={() => setSizeGuideOpen(true)} className="hover:text-brand transition-colors">Ring Size Guide</button></li>
            <li><button data-testid="footer-shipping-link" onClick={() => scrollTo("#home")} className="hover:text-brand transition-colors">Shipping & Returns</button></li>
            <li><button data-testid="footer-guarantee-link" onClick={() => scrollTo("#why")} className="hover:text-brand transition-colors">Anti-Tarnish Guarantee</button></li>
          </ul>
        </div>
        <div className="sm:col-span-3">
          <p className="font-body text-[11px] tracking-[0.25em] uppercase text-graphite mb-3">Promise</p>
          <ul className="space-y-2 font-body text-sm text-graphite">
            <li>18K Gold PVD · 925 Silver</li>
            <li>100% Waterproof</li>
            <li>Lifetime Colour Warranty</li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-12 pt-6 border-t border-[var(--border-light)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-body text-xs text-graphite">
        <span>© 2025 LUMIÈRE Jewellery. All rights reserved.</span>
        <span>Made with care in India · Ships worldwide</span>
      </div>
    </footer>
  );
};
