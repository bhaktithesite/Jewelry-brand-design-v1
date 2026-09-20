import { AnimatePresence, motion } from "framer-motion";
import { Heart, Search, ShoppingBag, X, MessageCircle } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { scrollTo } from "@/lib/scroll";
import { conciergeWhatsApp } from "@/lib/whatsapp";

export const Header = () => {
  const { bagCount, setBagOpen, searchOpen, setSearchOpen, query, setQuery, wishlist, setWishlistOpen } = useStore();

  const onSearch = (v) => {
    setQuery(v);
    if (v.length === 1) scrollTo("#catalog", { offset: -140 });
  };

  return (
    <header data-testid="site-header" className="sticky top-0 z-40 bg-white/90 backdrop-blur-[20px] border-b border-[var(--border-light)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <button
          data-testid="brand-monogram"
          onClick={() => scrollTo(0)}
          className="w-11 h-11 shrink-0 rounded-full border border-gold/70 flex items-center justify-center font-serif text-sm text-ink hover:bg-gold-subtle transition-colors"
          aria-label="Back to top"
        >
          L
        </button>

        <button onClick={() => scrollTo(0)} data-testid="brand-logo" className="min-w-0 flex-1 px-1 md:flex-none text-center leading-none h-11 flex flex-col items-center justify-center">
          <span className="block font-serif text-[20px] sm:text-2xl tracking-[0.08em] sm:tracking-[0.12em] text-ink">LUMIÈRE</span>
          <span className="block font-body text-[9px] sm:text-[10px] tracking-[0.32em] uppercase text-graphite mt-0.5">demi-fine</span>
        </button>

        <div className="flex items-center gap-0 sm:gap-2">
          <nav className="hidden md:flex items-center gap-6 mr-4 font-body text-sm text-graphite">
            <button data-testid="nav-catalog" onClick={() => scrollTo("#catalog", { offset: -110 })} className="hover:text-ink transition-colors">Catalog</button>
            <button data-testid="nav-why" onClick={() => scrollTo("#why")} className="hover:text-ink transition-colors">Why Demi-Fine</button>
            <button data-testid="nav-concierge" onClick={conciergeWhatsApp} className="flex items-center gap-1.5 hover:text-ink transition-colors">
              <MessageCircle size={15} /> Concierge
            </button>
          </nav>
          <button
            data-testid="search-toggle-btn"
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-11 h-11 rounded-full flex items-center justify-center text-ink hover:bg-subtle transition-colors"
            aria-label="Search"
          >
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </button>
          <button
            data-testid="header-wishlist-btn"
            onClick={() => setWishlistOpen(true)}
            className="relative w-11 h-11 rounded-full flex items-center justify-center text-ink hover:bg-subtle transition-colors"
            aria-label="Open wishlist"
          >
            <Heart size={20} className={wishlist.length ? "fill-crimson text-crimson" : ""} />
            <AnimatePresence>
              {wishlist.length > 0 && (
                <motion.span
                  key="wishlist-count"
                  data-testid="header-wishlist-count"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 22 }}
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-ink text-white text-[10px] font-display font-bold flex items-center justify-center tabular"
                >
                  {wishlist.length}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            data-testid="header-bag-btn"
            onClick={() => setBagOpen(true)}
            className="relative w-11 h-11 rounded-full flex items-center justify-center text-ink hover:bg-subtle transition-colors"
            aria-label="Open bag"
          >
            <ShoppingBag size={20} />
            <AnimatePresence>
              {bagCount >= 0 && (
                <motion.span
                  key="bag-count"
                  data-testid="header-bag-count"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 22 }}
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gold text-ink text-[10px] font-display font-bold flex items-center justify-center tabular"
                >
                  {bagCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[var(--border-light)]"
          >
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3">
              <div className="flex items-center gap-2 bg-subtle rounded-full px-4 h-11">
                <Search size={16} className="text-graphite" />
                <input
                  aria-label="Search the jewellery catalog" data-testid="search-input"
                  autoFocus
                  value={query}
                  onChange={(e) => onSearch(e.target.value)}
                  placeholder="Search rings, pearls, hoops…"
                  className="flex-1 bg-transparent outline-none font-body text-base text-ink placeholder:text-graphite"
                />
                {query && (
                  <button data-testid="search-clear-btn" aria-label="Clear search" onClick={() => setQuery("")} className="w-11 h-11 flex items-center justify-center text-graphite hover:text-ink"><X size={16} /></button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
