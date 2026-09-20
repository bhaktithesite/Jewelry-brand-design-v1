import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { DEMI_FINE_PRODUCTS, FILTER_TABS } from "@/data/products";
import { useStore } from "@/context/StoreContext";

export const FilterTabs = () => {
  const { tab, setTab, setCategory, query, setQuery } = useStore();

  const pick = (key) => {
    setTab(key);
    if (key === "all") setCategory("All");
  };

  return (
    <div data-testid="filter-tabs" className="flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 flex-1">
        {FILTER_TABS.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              data-testid={`filter-tab-${t.key}`}
              onClick={() => pick(t.key)}
              className={`relative flex-none rounded-full px-4 h-11 font-display text-xs font-semibold whitespace-nowrap transition-colors ${active ? "text-white" : "bg-subtle text-ink hover:bg-[#E2EAF3]"}`}
              aria-pressed={active}
            >
              {active && (
                <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
              )}
              <span className="relative z-10 tabular">
                {t.label}{t.key === "all" ? ` (${DEMI_FINE_PRODUCTS.length})` : ""}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 bg-surface hairline rounded-full px-4 h-11 w-full sm:w-52">
        <Search size={15} className="text-graphite" />
        <input
          data-testid="catalog-search-input"
          aria-label="Search the catalog"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the catalog…"
          className="flex-1 bg-transparent outline-none font-body text-base sm:text-sm text-ink placeholder:text-graphite"
        />
        {query && <button data-testid="catalog-search-clear" aria-label="Clear catalog search" onClick={() => setQuery("")} className="w-11 h-11 flex items-center justify-center text-graphite hover:text-ink"><X size={14} /></button>}
      </div>
    </div>
  );
};
