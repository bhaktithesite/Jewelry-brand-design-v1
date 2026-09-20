import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Droplets, Heart, Leaf, MessageCircle, Share2, ShieldCheck, ShoppingBag, Star, X } from "lucide-react";
import { toast } from "sonner";
import { METAL_LABEL, METAL_SWATCH, discountPct, inr } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { buyNowWhatsApp } from "@/lib/whatsapp";

const EASE = [0.22, 1, 0.36, 1];

const Gallery = ({ product, idx, setIdx }) => (
  <div className="relative flex-none sm:w-1/2 bg-[#FBFCFE]">
    <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={product.images[idx]}
          src={product.images[idx]}
          alt={`${product.name} view ${idx + 1}`}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50) setIdx((idx + 1) % product.images.length);
            if (info.offset.x > 50) setIdx((idx - 1 + product.images.length) % product.images.length);
          }}
          className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
          data-testid="modal-main-image"
        />
      </AnimatePresence>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {product.images.map((src, i) => (
          <button
            key={src}
            data-testid={`modal-thumb-${i}`}
            onClick={() => setIdx(i)}
            className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 transition-[border-color,transform] ${i === idx ? "border-brand scale-105" : "border-white/80 opacity-80 hover:opacity-100"}`}
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {product.images.map((_, i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-5 bg-ink" : "w-1.5 bg-ink/25"}`} />
        ))}
      </div>
    </div>
  </div>
);

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
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (product) { setMetal(product.metals[0]); setSize(product.sizes[0]); setIdx(0); }
  }, [product]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeProduct();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeProduct]);

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
    <AnimatePresence>
      {product && (
        <motion.div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div data-testid="product-modal-backdrop" className="absolute inset-0 bg-obsidian/45 backdrop-blur-sm" onClick={closeProduct} />
          <motion.div
            data-testid="product-modal"
            role="dialog"
            aria-modal="true"
            {...panel}
            transition={{ duration: 0.5, ease: EASE }}
            drag={isMobile ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => { if (info.offset.y > 120) closeProduct(); }}
            className="relative w-full sm:max-w-4xl max-h-[92vh] sm:max-h-[88vh] bg-surface rounded-t-[28px] sm:rounded-[28px] shadow-2xl overflow-hidden flex flex-col sm:flex-row will-change-transform"
          >
            <div className="sm:hidden absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-ink/20 z-20" />

            <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
              <button data-testid="modal-share-btn" onClick={share} className="w-9 h-9 rounded-full glass hairline flex items-center justify-center text-ink"><Share2 size={16} /></button>
              <button data-testid="modal-wishlist-btn" onClick={() => toggleWishlist(product.id)} className="w-9 h-9 rounded-full glass hairline flex items-center justify-center text-ink">
                <Heart size={16} className={isWishlisted(product.id) ? "fill-crimson text-crimson" : ""} />
              </button>
              <button data-testid="modal-close-btn" onClick={closeProduct} className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center"><X size={16} /></button>
            </div>

            <Gallery product={product} idx={idx} setIdx={setIdx} />

            <div className="flex-1 min-h-0 flex flex-col sm:w-1/2">
              <div data-lenis-prevent className="flex-1 overflow-y-auto px-5 pt-5 sm:px-7 sm:pt-8 pb-4 space-y-5">
                <div>
                  <p className="font-body text-[11px] tracking-[0.25em] uppercase text-graphite">{product.category} · {product.id}</p>
                  <h2 data-testid="modal-title" className="font-display font-bold text-xl sm:text-2xl text-ink mt-1 leading-tight">{product.name}</h2>
                  <div className="mt-2 flex items-center gap-1.5 text-sm font-body">
                    <span className="flex text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className={i < Math.round(product.rating) ? "fill-gold" : ""} />)}</span>
                    <span className="font-semibold text-ink tabular">{product.rating.toFixed(1)}</span>
                    <span className="text-graphite tabular">({product.reviews} reviews)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <span data-testid="modal-price" className="font-display font-extrabold text-2xl sm:text-3xl text-ink tabular">{inr(product.price)}</span>
                  <span className="font-body text-sm text-graphite line-through tabular">{inr(product.originalPrice)}</span>
                  <span className="rounded-full bg-emeraldbadge/10 text-emeraldbadge px-2.5 py-1 font-display text-xs font-bold tabular">
                    Save {inr(product.originalPrice - product.price)} ({discountPct(product)}% OFF)
                  </span>
                </div>

                <p className="font-body text-sm text-graphite leading-relaxed">{product.description}</p>

                <div className="flex flex-wrap gap-2">
                  <Pill icon={Droplets} label="100% Waterproof" color="text-brand" />
                  <Pill icon={ShieldCheck} label="Anti-Tarnish" color="text-gold" />
                  <Pill icon={Leaf} label="Hypoallergenic" color="text-emeraldbadge" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-display text-sm font-bold text-ink">Metal Finish</p>
                    <span data-testid="modal-selected-metal" className="font-body text-xs text-graphite">{METAL_LABEL[metal]}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.metals.map((m) => (
                      <button
                        key={m}
                        data-testid={`metal-option-${m.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={() => setMetal(m)}
                        aria-pressed={metal === m}
                        className={`inline-flex items-center gap-2 rounded-full border px-3.5 h-10 font-body text-xs font-medium transition-[border-color,background-color] ${metal === m ? "border-ink bg-ink text-white" : "border-[var(--border-light)] text-ink hover:border-ink/40"}`}
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
                      <button data-testid="size-guide-btn" onClick={() => setSizeGuideOpen(true)} className="font-body text-xs text-brand hover:underline">Size Guide</button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        data-testid={`size-option-${String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        onClick={() => setSize(s)}
                        aria-pressed={size === s}
                        className={`rounded-full border px-4 h-10 min-w-[44px] font-display text-sm font-semibold tabular transition-[border-color,background-color] ${size === s ? "border-brand bg-brand text-white" : "border-[var(--border-light)] text-ink hover:border-brand/50"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-none border-t border-[var(--border-light)] bg-surface px-5 sm:px-7 py-3.5 sm:py-4 pb-safe grid grid-cols-2 gap-3">
                <button
                  data-testid="modal-add-to-bag-btn"
                  onClick={() => addToBag(product, metal, size)}
                  className="h-12 rounded-full border-2 border-ink text-ink font-display font-bold text-sm inline-flex items-center justify-center gap-2 hover:bg-ink hover:text-white transition-colors active:scale-[0.98]"
                >
                  <ShoppingBag size={16} /> Add to Bag
                </button>
                <button
                  data-testid="modal-buy-now-btn"
                  onClick={() => buyNowWhatsApp(product, METAL_LABEL[metal], size)}
                  className="h-12 rounded-full bg-brand hover:bg-brand-hover text-white font-display font-bold text-sm inline-flex items-center justify-center gap-2 shadow-glow transition-colors active:scale-[0.98]"
                >
                  <MessageCircle size={16} /> Buy via WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
