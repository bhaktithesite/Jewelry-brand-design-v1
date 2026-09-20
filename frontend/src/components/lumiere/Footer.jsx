import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { conciergeWhatsApp, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

const POLICIES = {
  care: { title: "Care & Cleaning", text: "Gently wipe your jewellery with a soft, damp cloth and dry before storing in its pouch. Avoid abrasive cleaners and polishing compounds. For pearls, use a soft cloth rather than scrubbing. Ask our concierge if you need care advice for your piece." },
  shipping: { title: "Shipping & Returns", text: "Free express delivery across India on all orders, with prepaid and Cash-on-Delivery options. Enjoy our hassle-free 7-day exchange guarantee. Your WhatsApp concierge will confirm availability, delivery estimates and exchange steps before you order." },
  warranty: { title: "Anti-Tarnish Warranty", text: "Our lifetime colour guarantee covers our anti-tarnish, waterproof finish. Our jewellery is nickel-free and lead-free for sensitive skin. Contact our WhatsApp concierge with your order details for warranty assistance." },
};

export const Footer = () => {
  const { setSizeGuideOpen } = useStore();
  const [policy, setPolicy] = useState(null);
  return (
    <footer data-testid="site-footer" className="bg-canvas py-8 sm:py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid sm:grid-cols-2 gap-7">
        <div>
          <p className="font-serif text-2xl tracking-[.12em] text-ink">LUMIÈRE</p>
          <p className="font-body text-[9px] tracking-[.26em] uppercase text-graphite mt-1">Demi-Fine Jewellery</p>
          <p className="mt-3 font-body text-xs text-graphite">Everyday luxury. Always within reach.</p>
          <button data-testid="footer-whatsapp-link" onClick={conciergeWhatsApp} className="mt-4 inline-flex items-center gap-2 rounded-full bg-emeraldbadge/10 text-emeraldbadge px-4 h-11 font-display text-xs font-bold hover:bg-emeraldbadge hover:text-white">
            <MessageCircle size={16} /> {WHATSAPP_DISPLAY}
          </button>
        </div>
        <div>
          <p className="font-display text-[10px] tracking-[.2em] uppercase text-graphite mb-2">Here to help</p>
          <div className="grid grid-cols-2 gap-x-4 font-body text-xs text-ink">
            <button data-testid="footer-size-guide-link" onClick={() => setSizeGuideOpen(true)} className="min-h-11 text-left hover:text-brand">Ring Size Guide</button>
            {Object.entries(POLICIES).map(([key, p]) => (
              <button key={key} data-testid={`footer-${key === "warranty" ? "guarantee" : key}-link`} aria-expanded={policy === key} aria-controls="footer-policy-details" onClick={() => setPolicy(policy === key ? null : key)} className="min-h-11 text-left hover:text-brand">{p.title}</button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {policy && (
              <motion.div key={policy} id="footer-policy-details" data-testid="footer-policy-details" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative bg-white border border-[var(--border-light)] rounded-2xl p-4 mt-3">
                <button aria-label="Close policy details" data-testid="footer-policy-close" onClick={() => setPolicy(null)} className="absolute top-1 right-1 w-11 h-11 flex items-center justify-center"><X size={15} /></button>
                <h3 className="font-display text-sm font-bold pr-8">{POLICIES[policy].title}</h3>
                <p className="mt-2 font-body text-xs leading-relaxed text-graphite">{POLICIES[policy].text}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div data-testid="footer-copyright" className="max-w-[1152px] mx-4 sm:mx-auto mt-7 pt-5 border-t border-[var(--border-light)] flex flex-col sm:flex-row sm:justify-between gap-2 font-body text-[10px] text-graphite">
        <span>© 2025 LUMIÈRE Jewellery. All rights reserved.</span><span>Made with care · Delivered across India</span>
      </div>
    </footer>
  );
};
