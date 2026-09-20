import { useEffect, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Droplets, Heart, Leaf, MessageCircle, Share2, ShieldCheck, ShoppingBag, Star, X } from "lucide-react";
import { toast } from "sonner";
import { METAL_LABEL, METAL_SWATCH, discountPct, inr } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { buyNowWhatsApp } from "@/lib/whatsapp";

const Gallery = ({ product, idx, setIdx }) => {
  const track = useRef(null);
  return (
    <div className="modal-gallery relative bg-[#FBFCFE]" data-testid="modal-gallery">
      <div ref={track} data-testid="modal-gallery-track" className="flex h-full overflow-x-auto no-scrollbar snap-x snap-mandatory" onScroll={(e) => setIdx(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}>
        {product.images.map((src, i) => (
          <div key={src} className="w-full h-full flex-none snap-center flex justify-center pb-6">
            <img src={src} alt={`${product.name} — ${i === 0 ? "product view" : "styling inspiration"}`} data-testid={i === idx ? "modal-main-image" : `modal-image-${i}`} draggable={false} loading={i === 0 ? "eager" : "lazy"} className="h-full aspect-square max-w-full object-contain" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex" data-testid="modal-gallery-pagination">
        {product.images.map((_, i) => (
          <button key={i} data-testid={`modal-thumb-${i}`} aria-label={`View image ${i + 1}`} aria-pressed={idx === i} onClick={() => track.current?.scrollTo({ left: i * track.current.clientWidth, behavior: "smooth" })} className="w-11 h-11 flex items-center justify-center">
            <span className={`h-1.5 rounded-full transition-[width,background-color] ${i === idx ? "w-5 bg-brand" : "w-1.5 bg-ink/25"}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

const Pill = ({ icon: Icon, label, color }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-subtle px-3 py-1.5 font-body text-xs font-medium text-ink">
    <Icon size={13} className={color} /> {label}
  </span>
);

export const ProductModal = () => {
  const { activeProduct: product, closeProduct, addToBag, toggleWishlist, isWishlisted, setSizeGuideOpen } = useStore();
  const isMobile = useIsMobile();
  const [metal, setMetal] = useState("18K Gold");
  const [size, setSize] = useState(null);
  const closeButton = useRef(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (product) { setMetal(product.metals[0]); setSize(product.sizes[0]); setIdx(0); }
  }, [product]);

  const share = async () => {
    const data = { title: product.name, text: `${product.name} — ${inr(product.price)} at LUMIÈRE`, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(data.url); toast.success("Link copied to clipboard"); }
    } catch {}
  };

  const panel = isMobile
    ? { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } }
    : { initial: { opacity: 0, y: 40, scale: 0.97 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 24, scale: 0.98 } };

  const ringSizes = product?.sizes.every((s) => typeof s === "number");

  return (
    <Dialog open={!!product} onOpenChange={(open) => { if (!open) closeProduct(); }}>
    <AnimatePresence>
      {product && (
        <DialogPortal forceMount>
        <motion.div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <DialogOverlay forceMount asChild><div data-testid="product-modal-backdrop" className="absolute inset-0 bg-[var(--bg-modal-overlay)] backdrop-blur-sm" /></DialogOverlay>
          <DialogPrimitive.Content forceMount asChild aria-describedby={undefined} onOpenAutoFocus={(e) => { e.preventDefault(); closeButton.current?.focus(); }}>
          <motion.div
            data-testid="product-modal"
            role="dialog"
            aria-modal="true"
            {...panel}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="product-sheet relative z-[60] w-full sm:max-w-4xl bg-surface rounded-t-[24px] sm:rounded-[24px] shadow-2xl overflow-hidden flex flex-col outline-none"
          >
            <div className="relative h-[52px] shrink-0 flex items-center justify-between px-3 border-b border-[var(--border-light)]">
              <button ref={closeButton} aria-label="Close product" data-testid="modal-close-btn" onClick={closeProduct} className="w-11 h-11 rounded-full flex items-center justify-center text-ink"><X size={19} /></button>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-9 h-1 rounded-full bg-ink/15 sm:hidden" />
              <span className="font-display text-[10px] text-graphite uppercase tracking-[.2em]">A closer look</span>
              <div className="flex items-center">
                <button aria-label="Share product" data-testid="modal-share-btn" onClick={share} className="w-11 h-11 rounded-full flex items-center justify-center text-ink"><Share2 size={17} /></button>
                <button aria-label="Save product" aria-pressed={isWishlisted(product.id)} data-testid="modal-wishlist-btn" onClick={() => toggleWishlist(product.id)} className="w-11 h-11 rounded-full flex items-center justify-center text-ink">
                  <Heart size={18} className={isWishlisted(product.id) ? "fill-crimson text-crimson" : ""} />
                </button>
              </div>
            </div>
            <div data-testid="modal-scroll-body" data-lenis-prevent className="modal-scroll-body flex-1">
              <div className="sm:grid sm:grid-cols-2 sm:items-start">
                <Gallery key={product.id} product={product} idx={idx} setIdx={setIdx} />
                <div className="px-4 pt-3 sm:px-6 sm:pt-6 pb-6 space-y-4">
                <div>
                  <p className="font-body text-[11px] tracking-[0.25em] uppercase text-graphite">{product.category} · {product.id}</p>
                  <DialogTitle asChild><h2 data-testid="modal-title" className="font-display font-bold text-xl sm:text-2xl text-ink mt-1 leading-tight">{product.name}</h2></DialogTitle>
                  <div data-testid="modal-rating" className="mt-2 flex items-center gap-1.5 text-sm font-body">
                    <span className="flex text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className={i < Math.round(product.rating) ? "fill-gold" : ""} />)}</span>
                    <span className="font-semibold text-ink tabular">{product.rating.toFixed(1)}</span>
                    <span className="text-graphite tabular">({product.reviews} reviews)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <span data-testid="modal-price" className="font-display font-extrabold text-2xl sm:text-3xl text-ink tabular">{inr(product.price)}</span>
                  <span className="font-body text-sm text-graphite line-through tabular">{inr(product.originalPrice)}</span>
                  <span data-testid="modal-savings" className="rounded-full bg-emeraldbadge/10 text-emeraldbadge px-2.5 py-1 font-display text-xs font-bold tabular">
                    Save {inr(product.originalPrice - product.price)} ({discountPct(product)}% OFF)
                  </span>
                </div>

                <p data-testid="modal-description" className="font-body text-sm text-graphite leading-relaxed">{product.description}</p>

                <div data-testid="modal-trust-badges" className="flex flex-wrap gap-2">
                  <Pill icon={Droplets} label="100% Waterproof" color="text-brand" />
                  <Pill icon={ShieldCheck} label="Anti-Tarnish" color="text-gold" />
                  <Pill icon={Leaf} label="Hypoallergenic" color="text-emeraldbadge" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-display text-sm font-bold text-ink">Metal Finish</p>
                    <span data-testid="modal-selected-metal" className="font-body text-xs text-graphite">{METAL_LABEL[metal]}</span>
                  </div>
                  <div data-testid="metal-options" className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {product.metals.map((m) => (
                      <button
                        key={m}
                        data-testid={`metal-option-${m.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={() => setMetal(m)}
                        aria-pressed={metal === m}
                        className={`shrink-0 inline-flex items-center gap-2 rounded-full border-2 px-3 h-11 font-body text-xs font-medium transition-[border-color,background-color] ${metal === m ? "border-brand bg-brand/5 text-ink shadow-sm" : "border-[var(--border-light)] text-ink hover:border-brand/40"}`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full ring-1 ring-white/60" style={{ background: METAL_SWATCH[m] }} />
                        {METAL_LABEL[m]}
                        {metal === m && <Check size={13} />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-display text-sm font-bold text-ink">{ringSizes ? "Ring Size" : "Size"}</p>
                    {ringSizes && (
                      <button data-testid="size-guide-btn" onClick={() => setSizeGuideOpen(true)} className="font-body text-xs text-brand hover:underline min-h-11 px-2">Size Guide</button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        data-testid={`size-option-${String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        onClick={() => setSize(s)}
                        aria-pressed={size === s}
                        className={`rounded-full border px-4 h-11 min-w-[44px] font-display text-sm font-semibold tabular transition-[border-color,background-color] ${size === s ? "border-brand bg-brand text-white" : "border-[var(--border-light)] text-ink hover:border-brand/50"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              </div>
            </div>
              <div data-testid="modal-action-dock" className="modal-action-dock grid grid-cols-[.9fr_1.1fr] sm:grid-cols-2 gap-2 sm:gap-3">
                <button
                  data-testid="modal-add-to-bag-btn"
                  onClick={() => addToBag(product, metal, size)}
                  className="h-12 rounded-full border-2 border-ink text-ink font-display font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 hover:bg-ink hover:text-white transition-colors active:scale-[0.98]"
                >
                  <ShoppingBag size={16} /> Add to Bag
                </button>
                <button
                  data-testid="modal-buy-now-btn"
                  onClick={() => buyNowWhatsApp(product, METAL_LABEL[metal], size)}
                  className="h-12 rounded-full bg-brand hover:bg-brand-hover text-white font-display font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 shadow-glow transition-colors active:scale-[0.98]"
                >
                  <MessageCircle size={16} /> Buy via WhatsApp
                </button>
              </div>
          </motion.div>
          </DialogPrimitive.Content>
        </motion.div>
        </DialogPortal>
      )}
    </AnimatePresence>
    </Dialog>
  );
};
