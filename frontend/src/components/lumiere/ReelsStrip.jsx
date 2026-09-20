import { motion } from "framer-motion";
import { Heart, Instagram, Play, Volume2 } from "lucide-react";
import { REELS } from "@/data/reels";
import { DEMI_FINE_PRODUCTS, inr } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { Reveal } from "./Reveal";

export const LivingMedia = ({ reel, className = "", priority = false }) =>
  reel.video ? (
    <video src={reel.video} poster={reel.poster} autoPlay muted loop playsInline className={`w-full h-full object-cover ${className}`} />
  ) : (
    <img
      src={reel.poster}
      alt={reel.caption}
      loading={priority ? "eager" : "lazy"}
      className={`living-img w-full h-full object-cover ${className}`}
      style={{ animationName: reel.motion }}
    />
  );

const ReelCard = ({ reel, index }) => {
  const { setActiveReel, isWishlisted, toggleWishlist } = useStore();
  const product = DEMI_FINE_PRODUCTS.find((p) => p.id === reel.productId);
  const liked = isWishlisted(product.id);

  return (
    <motion.button
      data-testid={`reel-card-${reel.id}`}
      onClick={() => setActiveReel(index)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.97 }}
      className="group relative snap-start flex-none w-[156px] sm:w-[200px] aspect-[9/16] rounded-[22px] overflow-hidden bg-ink text-left shadow-card hover:shadow-card-hover transition-shadow"
      aria-label={`Play reel: ${reel.caption}`}
    >
      <LivingMedia reel={reel} priority={index < 2} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/70" />

      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 rounded-full glass-dark px-2 py-1 text-[10px] font-display font-bold text-white tracking-wider uppercase">
          <Play size={10} className="fill-white" /> Reel
        </span>
        <span className="w-7 h-7 rounded-full glass-dark flex items-center justify-center text-white"><Volume2 size={12} /></span>
      </div>

      <div className="absolute bottom-3 left-3 right-3">
        <p className="font-body text-[11px] text-white/85 leading-snug line-clamp-2 mb-2">{reel.caption}</p>
        <div className="flex items-center gap-2 rounded-2xl glass px-2 py-1.5">
          <img src={product.image} alt="" className="w-8 h-8 rounded-lg object-cover flex-none" />
          <div className="min-w-0 flex-1">
            <p className="font-display text-[11px] font-bold text-ink truncate">{product.name}</p>
            <p className="font-display text-[11px] text-brand font-extrabold tabular">{inr(product.price)}</p>
          </div>
          <span
            role="button"
            data-testid={`reel-wishlist-${reel.id}`}
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
            className="w-7 h-7 rounded-full flex items-center justify-center text-ink"
          >
            <Heart size={13} className={liked ? "fill-crimson text-crimson" : ""} />
          </span>
        </div>
      </div>
    </motion.button>
  );
};

export const ReelsStrip = () => (
  <section id="reels" data-testid="reels-section" className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16">
    <Reveal className="flex items-end justify-between mb-5">
      <div>
        <p className="font-body text-[11px] tracking-[0.28em] uppercase text-graphite">As Worn</p>
        <h2 className="font-display font-bold text-base md:text-lg text-ink mt-1">Shop the Look</h2>
      </div>
      <a
        data-testid="reels-instagram-handle"
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-body text-xs text-graphite hover:text-ink transition-colors"
      >
        <Instagram size={14} /> @lumiere.demifine
      </a>
    </Reveal>

    <div data-testid="reels-track" className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-2">
      {REELS.map((r, i) => <ReelCard key={r.id} reel={r} index={i} />)}
    </div>
  </section>
);
