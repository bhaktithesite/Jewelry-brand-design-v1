import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Heart, ShoppingBag, X } from "lucide-react";
import { DEMI_FINE_PRODUCTS, inr } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { scrollTo } from "@/lib/scroll";

const EASE = [0.22, 1, 0.36, 1];

const WishItem = ({ product }) => {
  const { addToBag, toggleWishlist, openProduct, setWishlistOpen } = useStore();
  const view = () => { setWishlistOpen(false); setTimeout(() => openProduct(product), 250); };
  return (
    <motion.li
      layout
      data-testid={`wishlist-item-${product.id}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      className="flex gap-3 py-3"
    >
      <button data-testid={`wishlist-image-${product.id}`} onClick={view} className="w-16 h-16 rounded-xl overflow-hidden bg-subtle flex-none hairline">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </button>
      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-sm text-ink leading-snug line-clamp-2">{product.name}</p>
        <p className="font-body text-[11px] text-graphite mt-0.5 truncate">{product.material}</p>
        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="font-display font-bold text-sm text-ink tabular">{inr(product.price)}</span>
          <span className="font-body text-[11px] text-graphite line-through tabular">{inr(product.originalPrice)}</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <button
            data-testid={`wishlist-add-to-bag-${product.id}`}
            onClick={() => addToBag(product, product.metals[0], product.sizes[0])}
            className="h-11 px-3 rounded-full bg-ink text-white font-display text-xs font-bold inline-flex items-center gap-1.5 hover:bg-brand transition-colors"
          >
            <ShoppingBag size={13} /> Add to Bag
          </button>
          <button data-testid={`wishlist-view-${product.id}`} onClick={view} className="h-11 px-3 rounded-full bg-subtle text-ink font-display text-xs font-semibold inline-flex items-center gap-1.5">
            <Eye size={13} /> View
          </button>
        </div>
      </div>
      <button data-testid={`wishlist-remove-${product.id}`} onClick={() => toggleWishlist(product.id)} className="self-start flex-none w-11 h-11 flex items-center justify-center text-crimson hover:scale-110 transition-transform" aria-label="Remove from wishlist">
        <Heart size={16} className="fill-crimson" />
      </button>
    </motion.li>
  );
};

export const WishlistDrawer = () => {
  const { wishlist, wishlistOpen, setWishlistOpen, addToBag } = useStore();
  const isMobile = useIsMobile();
  const items = DEMI_FINE_PRODUCTS.filter((p) => wishlist.includes(p.id));

  const addAll = () => items.forEach((p) => addToBag(p, p.metals[0], p.sizes[0]));

  const panel = isMobile
    ? { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } }
    : { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };

  return (
    <Dialog open={wishlistOpen} onOpenChange={setWishlistOpen}>
    <AnimatePresence>
      {wishlistOpen && (
        <DialogPortal forceMount>
        <motion.div className="fixed inset-0 z-[999] flex items-end sm:items-stretch sm:justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <DialogOverlay forceMount asChild><div data-testid="wishlist-drawer-backdrop" className="absolute inset-0 bg-[var(--bg-modal-overlay)] backdrop-blur-sm" /></DialogOverlay>
          <DialogPrimitive.Content forceMount asChild aria-describedby={undefined}>
          <motion.aside
            data-testid="wishlist-drawer"
            {...panel}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative z-[60] w-full sm:w-[460px] max-h-[92dvh] sm:max-h-none sm:h-full bg-surface rounded-t-[24px] sm:rounded-none flex flex-col shadow-2xl overflow-hidden outline-none"
          >
            <div className="flex flex-none items-center justify-between px-5 sm:px-6 h-16 border-b border-[var(--border-light)]">
              <div>
                <DialogTitle className="font-display text-sm font-bold text-ink">Saved Hearts</DialogTitle>
                <p data-testid="wishlist-count-label" className="font-display font-bold text-ink text-base tabular">{items.length} {items.length === 1 ? "piece" : "pieces"}</p>
              </div>
              <button data-testid="wishlist-close-btn" aria-label="Close wishlist" onClick={() => setWishlistOpen(false)} className="w-11 h-11 rounded-full bg-subtle flex items-center justify-center text-ink"><X size={16} /></button>
            </div>

            {items.length === 0 ? (
              <div data-testid="wishlist-empty" className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-crimson/10 text-crimson flex items-center justify-center"><Heart size={24} /></div>
                <p className="mt-4 font-display font-bold text-ink">No saved hearts yet</p>
                <p className="mt-1 font-body text-sm text-graphite">Tap the heart on any piece to keep it here.</p>
                <button data-testid="wishlist-browse-btn" onClick={() => { setWishlistOpen(false); scrollTo("#catalog", { offset: -110 }); }} className="mt-5 h-11 px-6 rounded-full bg-ink text-white font-display font-bold text-sm">Browse Catalog</button>
              </div>
            ) : (
              <>
                <ul data-testid="wishlist-scroll-body" data-lenis-prevent className="flex-1 sheet-scroll-body px-5 sm:px-6 divide-y divide-[var(--border-light)]">
                  <AnimatePresence initial={false}>
                    {items.map((p) => <WishItem key={p.id} product={p} />)}
                  </AnimatePresence>
                </ul>
                <div className="modal-action-dock">
                  <button
                    data-testid="wishlist-add-all-btn"
                    onClick={addAll}
                    className="w-full min-h-[52px] rounded-full bg-brand hover:bg-brand-hover text-white font-display font-bold text-sm inline-flex items-center justify-center gap-2 shadow-glow transition-colors"
                  >
                    <ShoppingBag size={17} /> Move all {items.length > 1 ? `${items.length} pieces` : "to bag"}
                  </button>
                  {items.length >= 2 && <p className="mt-2 text-center font-body text-[11px] text-graphite">Two or more pieces unlock 10% off with code LUXE10</p>}
                </div>
              </>
            )}
          </motion.aside>
          </DialogPrimitive.Content>
        </motion.div>
        </DialogPortal>
      )}
    </AnimatePresence>
    </Dialog>
  );
};
