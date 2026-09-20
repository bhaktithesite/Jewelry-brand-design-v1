import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Sparkle, Star } from "lucide-react";
import { ASSETS } from "@/data/products";
import { scrollTo } from "@/lib/scroll";

export const Hero = () => {
  const reduceMotion = useReducedMotion();
  return (
    <section id="home" data-testid="hero-section" className="hero-banner">
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
        <p className="mb-3 font-display text-[9px] sm:text-[10px] tracking-[.22em] uppercase text-graphite">A little luxury. Every day.</p>
        <h1 data-testid="hero-headline" className="hero-headline font-display font-extrabold text-ink">
          Timeless Beauty,<br /><span className="font-serif italic font-medium">Crafted</span> for You.
        </h1>
        <p data-testid="hero-description" className="hero-description font-body text-graphite">
          18K Gold Plated Demi-Fine Jewellery. 100% Waterproof. Anti-Tarnish. Everyday Luxury starting at just <strong className="text-ink">₹699.</strong>
        </p>
        <motion.button data-testid="hero-explore-btn" whileTap={{ scale: .94 }} onClick={() => scrollTo("#catalog", { offset: -72 })} className="mt-5 h-11 sm:h-12 px-4 sm:px-6 rounded-full bg-brand text-white shadow-card font-display text-xs sm:text-sm font-bold inline-flex items-center gap-2 hover:bg-brand-hover">
          Explore Catalog <ArrowDown size={15} />
        </motion.button>
      </motion.div>
      <div className="hero-art" data-testid="hero-jewel">
        <motion.img src={ASSETS.hero} alt="18K gold teardrop pendant on soft blue satin" loading="eager" fetchPriority="high" animate={reduceMotion ? {} : { y: [0, -6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        <Sparkle aria-hidden="true" size={19} className="hero-sparkle top-[25%] right-[20%]" />
        <Sparkle aria-hidden="true" size={12} className="hero-sparkle bottom-[28%] left-[18%]" style={{ animationDelay: "1.2s" }} />
        <span data-testid="hero-chip-rating" className="hero-rating inline-flex items-center gap-1 rounded-full bg-white/90 border border-white px-2.5 py-2 shadow-card font-display font-semibold text-ink">
          <Star size={11} className="fill-gold text-gold" /> 4.8 · 1.4k reviews
        </span>
      </div>
    </section>
  );
};
