import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { DEMI_FINE_PRODUCTS, matchesTab } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { FilterTabs } from "./FilterTabs";
import { ProductCard } from "./ProductCard";
import { Reveal } from "./Reveal";

export const ProductGrid = () => {
  const { category, tab, query, setCategory, setTab, setQuery, searchOpen } = useStore();

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DEMI_FINE_PRODUCTS.filter((p) =>
      (category === "All" || p.category === category) &&
      matchesTab(p, tab) &&
      (!q || `${p.name} ${p.category} ${p.material} ${p.tag}`.toLowerCase().includes(q)),
    );
  }, [category, tab, query]);

  const reset = () => { setCategory("All"); setTab("all"); setQuery(""); };

  return (
    <section id="catalog" data-testid="catalog-section" className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
      <Reveal className="flex items-end justify-between gap-4 mb-5">
        <div>
          <p className="font-body text-[11px] tracking-[0.28em] uppercase text-graphite">The Catalog</p>
          <h2 className="font-display font-bold text-base md:text-lg text-ink mt-1">
            {category === "All" ? "All Pieces" : category}
            <span data-testid="catalog-count" className="ml-2 font-body font-normal text-graphite text-sm tabular">({items.length})</span>
          </h2>
        </div>
        {(category !== "All" || tab !== "all" || query) && (
          <button data-testid="catalog-reset-btn" onClick={reset} className="min-h-11 px-2 font-body text-xs text-brand hover:underline">Clear filters</button>
        )}
      </Reveal>

      <div className={`sticky ${searchOpen ? "top-[124px] sm:top-[132px]" : "top-14 sm:top-16"} z-30 -mx-4 px-4 sm:mx-0 sm:px-0 py-2 bg-canvas/95 backdrop-blur-md`}>
        <FilterTabs />
      </div>

      <motion.div layout data-testid="product-grid" className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        <AnimatePresence mode="popLayout">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </AnimatePresence>
      </motion.div>

      {items.length === 0 && (
        <div data-testid="catalog-empty" className="py-16 text-center">
          <SearchX className="mx-auto text-graphite" size={28} />
          <p className="mt-3 font-display font-semibold text-ink">No pieces match that search.</p>
          <button data-testid="empty-reset-filters-btn" onClick={reset} className="mt-3 min-h-11 px-3 text-sm font-body text-brand hover:underline">Reset filters</button>
        </div>
      )}
    </section>
  );
};
