import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, MessageCircle, Minus, Plus, ShoppingBag, Sparkles, Tag, Trash2, X } from "lucide-react";
import { inr } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { checkoutBagWhatsApp } from "@/lib/whatsapp";
import { scrollTo } from "@/lib/scroll";

const EASE = [0.22, 1, 0.36, 1];

const BagItem = ({ item }) => {
  const { updateQty, removeFromBag } = useStore();
  return (
    <motion.li
      layout
      data-testid={`bag-item-${item.key}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      className="flex gap-3 py-3"
    >
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-subtle flex-none hairline">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-sm text-ink leading-snug line-clamp-2">{item.name}</p>
        <p className="font-body text-[11px] text-graphite mt-0.5">{item.selectedMetal}{item.selectedSize ? ` · Size ${item.selectedSize}` : ""}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="inline-flex items-center rounded-full bg-subtle h-8">
            <button data-testid={`bag-qty-minus-${item.key}`} onClick={() => updateQty(item.key, -1)} className="w-8 h-8 flex items-center justify-center text-ink" aria-label="Decrease"><Minus size={13} /></button>
            <span data-testid={`bag-qty-${item.key}`} className="w-6 text-center font-display font-bold text-sm tabular">{item.quantity}</span>
            <button data-testid={`bag-qty-plus-${item.key}`} onClick={() => updateQty(item.key, 1)} className="w-8 h-8 flex items-center justify-center text-ink" aria-label="Increase"><Plus size={13} /></button>
          </div>
          <span className="font-display font-bold text-sm text-ink tabular">{inr(item.price * item.quantity)}</span>
        </div>
      </div>
      <button data-testid={`bag-remove-${item.key}`} onClick={() => removeFromBag(item.key)} className="self-start text-graphite hover:text-crimson transition-colors" aria-label="Remove"><Trash2 size={15} /></button>
    </motion.li>
  );
};

export const BagDrawer = () => {
  const { bag, bagOpen, setBagOpen, bagTotal, bagCount, discount, couponApplied } = useStore();
  const isMobile = useIsMobile();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setBagOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setBagOpen]);

  const panel = isMobile
    ? { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } }
    : { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };

  return (
    <AnimatePresence>
      {bagOpen && (
        <motion.div className="fixed inset-0 z-[60] flex items-end sm:items-stretch sm:justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div data-testid="bag-drawer-backdrop" className="absolute inset-0 bg-obsidian/45 backdrop-blur-sm" onClick={() => setBagOpen(false)} />
          <motion.aside
            data-testid="bag-drawer"
            {...panel}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative w-full sm:w-[440px] max-h-[88vh] sm:max-h-none sm:h-full bg-surface rounded-t-[28px] sm:rounded-none flex flex-col shadow-2xl will-change-transform"
          >
            <div className="flex items-center justify-between px-5 sm:px-6 h-16 border-b border-[var(--border-light)]">
              <div>
                <p className="font-body text-[11px] tracking-[0.25em] uppercase text-graphite">Your Bag</p>
                <p className="font-display font-bold text-ink text-base tabular">{bagCount} {bagCount === 1 ? "item" : "items"}</p>
              </div>
              <button data-testid="bag-close-btn" onClick={() => setBagOpen(false)} className="w-9 h-9 rounded-full bg-subtle flex items-center justify-center text-ink"><X size={16} /></button>
            </div>

            {bag.length === 0 ? (
              <div data-testid="bag-empty" className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-gold-subtle text-gold flex items-center justify-center"><ShoppingBag size={24} /></div>
                <p className="mt-4 font-display font-bold text-ink">Your bag is empty</p>
                <p className="mt-1 font-body text-sm text-graphite">Add a few pieces and check out in one tap on WhatsApp.</p>
                <button data-testid="bag-browse-btn" onClick={() => { setBagOpen(false); scrollTo("#catalog", { offset: -110 }); }} className="mt-5 h-11 px-6 rounded-full bg-ink text-white font-display font-bold text-sm">Browse Catalog</button>
              </div>
            ) : (
              <>
                <ul data-lenis-prevent className="flex-1 overflow-y-auto px-5 sm:px-6 divide-y divide-[var(--border-light)]">
                  <AnimatePresence initial={false}>
                    {bag.map((item) => <BagItem key={item.key} item={item} />)}
                  </AnimatePresence>
                </ul>

                <div className="flex-none border-t border-[var(--border-light)] px-5 sm:px-6 pt-4 pb-4 pb-safe space-y-3 bg-surface">
                  <AnimatePresence mode="wait" initial={false}>
                    {couponApplied ? (
                      <motion.div
                        key="applied"
                        data-testid="coupon-applied-banner"
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-2 rounded-2xl bg-emeraldbadge/10 border border-emeraldbadge/20 px-3 py-2"
                      >
                        <Sparkles size={14} className="text-emeraldbadge flex-none" />
                        <p className="font-body text-xs text-ink flex-1">Code <span className="font-display font-bold tracking-wider">LUXE10</span> applied — Buy 2, get 10% off</p>
                        <span className="rounded-full bg-emeraldbadge text-white px-2 py-0.5 font-display text-[10px] font-bold">APPLIED</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="nudge"
                        data-testid="coupon-nudge-banner"
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-2 rounded-2xl bg-gold-subtle border border-gold/30 px-3 py-2"
                      >
                        <Tag size={14} className="text-gold flex-none" />
                        <p className="font-body text-xs text-ink flex-1">Add <span className="font-display font-bold">1 more piece</span> to unlock 10% off with code <span className="font-display font-bold tracking-wider">LUXE10</span></p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-1.5 font-body text-sm">
                    <div className="flex justify-between text-graphite"><span>Subtotal</span><span data-testid="bag-subtotal" className="tabular text-ink">{inr(bagTotal)}</span></div>
                    <AnimatePresence initial={false}>
                      {couponApplied && (
                        <motion.div
                          data-testid="bag-discount-line"
                          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                          className="flex justify-between text-emeraldbadge overflow-hidden"
                        >
                          <span className="inline-flex items-center gap-1.5"><Tag size={12} /> Coupon LUXE10 (10% off)</span>
                          <span data-testid="bag-discount" className="font-semibold tabular">-{inr(discount)}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="flex justify-between text-graphite"><span>Shipping</span><span className="font-semibold text-emeraldbadge">FREE</span></div>
                    <div className="flex justify-between pt-2 border-t border-[var(--border-light)]">
                      <span className="font-display font-bold text-ink">Estimated Total</span>
                      <span className="text-right">
                        {couponApplied && <span className="block font-body text-[11px] text-graphite line-through tabular">{inr(bagTotal)}</span>}
                        <span data-testid="bag-total" className="font-display font-extrabold text-lg text-ink tabular">{inr(bagTotal - discount)}</span>
                      </span>
                    </div>
                  </div>
                  <button
                    data-testid="whatsapp-checkout-btn"
                    onClick={() => checkoutBagWhatsApp(bag, discount)}
                    className="w-full h-13 min-h-[52px] rounded-full bg-brand hover:bg-brand-hover text-white font-display font-bold text-sm inline-flex items-center justify-center gap-2 shadow-glow transition-colors active:scale-[0.99]"
                  >
                    <MessageCircle size={17} /> Proceed to Checkout via WhatsApp
                  </button>
                  <p className="flex items-start gap-2 font-body text-[11px] text-graphite leading-relaxed">
                    <Lock size={12} className="mt-0.5 flex-none text-emeraldbadge" />
                    Zero advance payment required right now. Our WhatsApp team will confirm availability, address, and payment method (UPI / COD).
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
