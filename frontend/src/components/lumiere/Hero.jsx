import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Droplets, MessageCircle, Star } from "lucide-react";
import { ASSETS } from "@/data/products";
import { scrollTo } from "@/lib/scroll";
import { conciergeWhatsApp } from "@/lib/whatsapp";
import { EASE, LineReveal } from "./Reveal";

const Chip = ({ className, delay, children, testId }) => (
  <motion.div
    data-testid={testId}
    initial={{ opacity: 0, y: 16, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8, delay, ease: EASE }}
    className={`absolute glass hairline rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-card flex items-center gap-2 font-display text-[11px] sm:text-xs font-bold text-ink animate-float ${className}`}
  >
    {children}
  </motion.div>
);

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 120, damping: 18 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(-py * 10);
    ry.set(px * 12);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <section
      id="home"
      ref={ref}
      data-testid="hero-section"
      className="relative overflow-hidden grain"
      style={{ background: "linear-gradient(160deg, #DDEBFA 0%, #EDF4FC 55%, #F8FAFD 100%)" }}
    >
      <svg className="absolute -top-24 -right-24 w-[520px] h-[520px] opacity-40 pointer-events-none" viewBox="0 0 520 520" fill="none">
        <circle cx="260" cy="260" r="200" stroke="#D4AF37" strokeWidth="1" />
        <circle cx="260" cy="260" r="250" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 8" />
      </svg>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 pb-14 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        <motion.div style={{ y: textY, opacity: fade }} className="lg:col-span-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="h-px w-8 bg-gold" />
            <span className="font-body text-[11px] sm:text-xs tracking-[0.28em] uppercase text-graphite">Demi-Fine Jewellery · Est. 2025</span>
          </motion.div>

          <h1 data-testid="hero-headline" className="font-display font-extrabold tracking-[-0.03em] text-ink text-[38px] leading-[1.02] sm:text-5xl lg:text-6xl">
            <LineReveal
              lines={[
                <>Timeless Beauty,</>,
                <><span className="font-serif italic font-medium gold-text">Crafted</span> for You.</>,
              ]}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
            className="mt-5 font-body text-sm sm:text-base text-graphite max-w-md leading-relaxed"
          >
            18K Gold Plated Demi-Fine Jewelry. Waterproof. Anti-Tarnish. Everyday Luxury starting at just{" "}
            <span className="font-display font-bold text-ink tabular">₹999</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              data-testid="hero-explore-btn"
              onClick={() => scrollTo("#catalog", { offset: -110 })}
              className="group inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-display font-bold text-sm rounded-full pl-6 pr-5 h-12 shadow-glow transition-[background-color,transform] active:scale-[0.98]"
            >
              Explore Catalog
              <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
            </button>
            <button
              data-testid="hero-whatsapp-btn"
              onClick={conciergeWhatsApp}
              className="inline-flex items-center gap-2 bg-white/70 hover:bg-white hairline text-ink font-display font-semibold text-sm rounded-full px-5 h-12 transition-colors"
            >
              <MessageCircle size={16} className="text-emeraldbadge" /> Chat with us
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-10 flex items-center gap-6 sm:gap-8 font-body text-xs text-graphite"
          >
            <div><span className="block font-display font-extrabold text-xl text-ink tabular">16</span>Signature pieces</div>
            <div className="w-px h-8 bg-[var(--border-light)]" />
            <div><span className="block font-display font-extrabold text-xl text-ink tabular">4.8<span className="text-gold">★</span></span>Average rating</div>
            <div className="w-px h-8 bg-[var(--border-light)]" />
            <div><span className="block font-display font-extrabold text-xl text-ink tabular">18K</span>Gold PVD finish</div>
          </motion.div>
        </motion.div>

        <div className="lg:col-span-6 relative" style={{ perspective: 1200 }}>
          <motion.div
            style={{ y: imgY, rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="relative mx-auto w-[78%] max-w-[420px] lg:max-w-[460px]"
          >
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0 round 999px 999px 28px 28px)" }}
              animate={{ clipPath: "inset(0% 0 0 0 round 999px 999px 28px 28px)" }}
              transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
              className="arch overflow-hidden shadow-[0_30px_80px_rgba(37,99,235,0.18)] aspect-[3/4]"
            >
              <motion.img
                src={ASSETS.hero}
                alt="Floating 18K gold teardrop pendant catching light"
                initial={{ scale: 1.25 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, delay: 0.2, ease: EASE }}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </motion.div>
            <div className="absolute inset-0 arch ring-1 ring-inset ring-gold/50 pointer-events-none translate-x-3 translate-y-3 -z-10" />

            <Chip testId="hero-chip-price" delay={1.1} className="-left-4 sm:-left-10 top-[18%]">
              <span className="text-brand">₹999</span> onwards
            </Chip>
            <Chip testId="hero-chip-rating" delay={1.25} className="-right-4 sm:-right-10 top-[42%] [animation-delay:1.2s]">
              <Star size={13} className="fill-gold text-gold" /> 4.8 · 1.4k reviews
            </Chip>
            <Chip testId="hero-chip-waterproof" delay={1.4} className="-left-2 sm:-left-8 bottom-[14%] [animation-delay:2.4s]">
              <Droplets size={13} className="text-brand" /> 100% Waterproof
            </Chip>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
