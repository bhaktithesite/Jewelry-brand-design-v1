import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, X } from "lucide-react";
import { REELS } from "@/data/reels";
import { DEMI_FINE_PRODUCTS, inr } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { LivingMedia } from "./ReelsStrip";

const DURATION = 6000;
const EASE = [0.22, 1, 0.36, 1];

export const ReelViewer = () => {
  const { activeReel, setActiveReel, openProduct, isWishlisted, toggleWishlist } = useStore();
  const [paused, setPaused] = useState(false);
  const overlayRef = useRef(null);
  const open = activeReel !== null;
  const reel = open ? REELS[activeReel] : null;
  const product = reel ? DEMI_FINE_PRODUCTS.find((p) => p.id === reel.productId) : null;

  const next = () => setActiveReel((a) => (a + 1) % REELS.length);
  const prev = () => setActiveReel((a) => (a - 1 + REELS.length) % REELS.length);
  const close = () => setActiveReel(null);

  useEffect(() => {
    if (!open) return;
    overlayRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") setActiveReel(null);
      if (e.key === "ArrowRight") setActiveReel((a) => (a + 1) % REELS.length);
      if (e.key === "ArrowLeft") setActiveReel((a) => (a - 1 + REELS.length) % REELS.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setActiveReel]);

  const shop = () => { close(); setTimeout(() => openProduct(product), 250); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          tabIndex={-1}
          data-testid="reel-viewer"
          onClick={close}
          className="fixed inset-0 z-[70] bg-obsidian/95 backdrop-blur-md flex items-center justify-center outline-none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <button data-testid="reel-viewer-close" onClick={close} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full glass-dark text-white flex items-center justify-center" aria-label="Close reels"><X size={18} /></button>
          <button data-testid="reel-viewer-prev" onClick={(e) => { e.stopPropagation(); prev(); }} className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-dark text-white items-center justify-center" aria-label="Previous reel"><ChevronLeft size={20} /></button>
          <button data-testid="reel-viewer-next" onClick={(e) => { e.stopPropagation(); next(); }} className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-dark text-white items-center justify-center" aria-label="Next reel"><ChevronRight size={20} /></button>

          <motion.div
            key={reel.id}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: EASE }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => { if (info.offset.x < -70) next(); if (info.offset.x > 70) prev(); }}
            onPointerDown={() => setPaused(true)}
            onPointerUp={() => setPaused(false)}
            onPointerLeave={() => setPaused(false)}
            className="relative h-[100dvh] sm:h-[86vh] w-full sm:w-auto sm:aspect-[9/16] sm:rounded-[32px] overflow-hidden bg-ink select-none touch-pan-y"
          >
            <LivingMedia reel={reel} priority className="pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />

            <div className="absolute top-3 left-3 right-3 flex gap-1.5">
              {REELS.map((r, i) => (
                <span key={r.id} className="h-[3px] flex-1 rounded-full bg-white/25 overflow-hidden">
                  {i < activeReel && <span className="block h-full w-full bg-white" />}
                  {i === activeReel && (
                    <span
                      key={`${reel.id}-${paused}`}
                      data-testid="reel-progress"
                      className="reel-progress-bar block h-full w-full bg-white"
                      style={{ animationDuration: `${DURATION}ms`, animationPlayState: paused ? "paused" : "running" }}
                      onAnimationEnd={next}
                    />
                  )}
                </span>
              ))}
            </div>

            <div className="absolute top-8 left-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full border border-gold flex items-center justify-center font-serif text-xs text-white bg-ink/40">L</span>
              <div className="leading-tight">
                <p className="font-display text-xs font-bold text-white">lumiere.demifine</p>
                <p className="font-body text-[10px] text-white/60">{reel.location}</p>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 pb-safe">
              <p className="font-body text-sm text-white/90 leading-snug mb-3 max-w-[85%]">{reel.caption}</p>
              <div className="flex items-center gap-3 rounded-2xl glass p-2.5">
                <img src={product.image} alt="" className="w-12 h-12 rounded-xl object-cover flex-none" />
                <div className="min-w-0 flex-1">
                  <p data-testid="reel-product-name" className="font-display text-sm font-bold text-ink truncate">{product.name}</p>
                  <p className="font-display text-sm text-ink font-extrabold tabular">{inr(product.price)} <span className="font-body text-xs text-graphite line-through font-normal">{inr(product.originalPrice)}</span></p>
                </div>
                <button
                  data-testid="reel-wishlist-btn"
                  onClick={() => toggleWishlist(product.id)}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-ink flex-none"
                  aria-label="Wishlist"
                >
                  <Heart size={16} className={isWishlisted(product.id) ? "fill-crimson text-crimson" : ""} />
                </button>
                <button
                  data-testid="reel-shop-btn"
                  onClick={shop}
                  className="h-10 px-4 rounded-full bg-brand text-white font-display text-sm font-bold inline-flex items-center gap-1.5 flex-none"
                >
                  <ShoppingBag size={15} /> Shop
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
