import { motion } from "framer-motion";
import { CATEGORIES, DEMI_FINE_PRODUCTS } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { scrollTo } from "@/lib/scroll";
import { Reveal } from "./Reveal";

export const CategoryPills = () => {
  const { category, setCategory } = useStore();

  const pick = (key) => {
    setCategory(category === key ? "All" : key);
    scrollTo("#catalog", { offset: -110 });
  };

  return (
    <section id="categories" data-testid="category-section" className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
      <Reveal className="flex items-center justify-between mb-3">
        <h2 className="font-display font-bold text-base md:text-lg text-ink">Shop by Category</h2>
        <span className="font-body text-xs text-graphite sm:hidden">Swipe →</span>
      </Reveal>

      <div className="flex gap-4 sm:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-start pb-2">
        {CATEGORIES.map((c, i) => {
          const active = category === c.key;
          const count = DEMI_FINE_PRODUCTS.filter((p) => p.category === c.key).length;
          return (
            <motion.button
              key={c.key}
              data-testid={`category-pill-${c.key.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => pick(c.key)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileTap={{ scale: 0.95 }}
              className="snap-start flex flex-col items-center gap-2 flex-none w-[76px] sm:w-[104px] group"
              aria-pressed={active}
            >
              <span className={`relative rounded-full p-[3px] transition-[border-color,transform] duration-300 border-2 ${active ? "border-brand scale-105" : "border-gold/80 group-hover:border-gold"}`}>
                <span className="block w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] rounded-full overflow-hidden bg-subtle">
                  <img src={c.image} alt={c.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                </span>
                <span className="absolute -bottom-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-ink text-white text-[10px] font-display font-bold flex items-center justify-center tabular">{count}</span>
              </span>
              <span className={`font-display text-xs sm:text-sm font-semibold transition-colors ${active ? "text-brand" : "text-ink"}`}>{c.label}</span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};
