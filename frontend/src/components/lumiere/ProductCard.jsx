import { motion } from "framer-motion";
import { Heart, Plus, Star } from "lucide-react";
import { discountPct, inr } from "@/data/products";
import { useStore } from "@/context/StoreContext";

export const ProductCard = ({ product, index = 0 }) => {
  const { openProduct, toggleWishlist, isWishlisted, addToBag } = useStore();
  const liked = isWishlisted(product.id);
  const pct = discountPct(product);

  return (
    <motion.article
      layout
      data-testid={`product-card-${product.id}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: Math.min(index, 7) * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      onClick={() => openProduct(product)}
      className="group relative bg-surface rounded-2xl hairline shadow-card hover:shadow-card-hover transition-shadow duration-300 cursor-pointer overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden bg-white">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <span
          data-testid={`product-badge-${product.id}`}
          className={`absolute top-2.5 left-2.5 rounded-full px-2 py-[3px] text-[9px] sm:text-[10px] font-display font-bold tracking-wider uppercase text-white ${product.tag?.includes("OFF") ? "bg-crimson" : product.tag === "WATERPROOF" ? "bg-emeraldbadge" : product.tag === "NEW IN" ? "bg-brand" : "bg-ink"}`}
        >
          {product.tag || `${pct}% OFF`}
        </span>
        <button
          data-testid={`wishlist-btn-${product.id}`}
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={liked}
          className="absolute top-2 right-2 w-8 h-8 rounded-full glass hairline flex items-center justify-center text-ink hover:scale-110 transition-transform"
        >
          <Heart key={String(liked)} size={15} className={liked ? "fill-crimson text-crimson animate-pop" : ""} />
        </button>
      </div>

      <div className="p-3 sm:p-3.5">
        <div className="flex items-center gap-1 text-[11px] font-body text-graphite">
          <Star size={11} className="fill-gold text-gold" />
          <span className="font-semibold text-ink tabular">{product.rating.toFixed(1)}</span>
          <span className="tabular">({product.reviews})</span>
        </div>
        <h3 className="mt-1 font-display font-semibold text-[13px] sm:text-sm text-ink leading-snug line-clamp-2 min-h-[2.6em]">{product.name}</h3>
        <p className="mt-1 font-body text-[10px] sm:text-[11px] text-graphite truncate">{product.material}</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span data-testid={`product-price-${product.id}`} className="font-display font-extrabold text-[15px] sm:text-base text-ink tabular">{inr(product.price)}</span>
            <span className="font-body text-[11px] text-graphite line-through tabular">{inr(product.originalPrice)}</span>
          </div>
          <button
            data-testid={`quick-add-btn-${product.id}`}
            onClick={(e) => { e.stopPropagation(); addToBag(product, product.metals[0], product.sizes[0]); }}
            aria-label="Quick add to bag"
            className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center flex-none hover:bg-brand transition-colors active:scale-95"
          >
            <Plus size={15} />
          </button>
        </div>
      </div>
    </motion.article>
  );
};
