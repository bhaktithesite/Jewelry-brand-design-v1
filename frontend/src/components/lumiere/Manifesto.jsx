import { motion } from "framer-motion";
import { ASSETS } from "@/data/products";
import { EASE, Reveal } from "./Reveal";

const CHAPTERS = [
  { n: "01", title: "Won't Tarnish", text: "Unlike cheap brass or copper, our thick 18K PVD coating over 925 silver keeps its colour for years — never black, never green.", image: ASSETS.handRings },
  { n: "02", title: "Shower-Proof", text: "Sweat, sea, shower, gym. Wear it 24/7 without ever taking it off. Truly waterproof demi-fine.", image: ASSETS.wrist },
  { n: "03", title: "10x More Affordable", text: "Indistinguishable from solid gold and mined diamonds — at a tenth of the price. Look like a million, spend ₹999.", image: ASSETS.neck },
  { n: "04", title: "Luxury Gift Ready", text: "Every piece arrives in our signature baby-blue box with a microfiber pouch and lifetime warranty card.", image: ASSETS.packaging },
];

const Chapter = ({ c, i }) => (
  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
    <Reveal className="lg:col-span-7 relative pl-14 sm:pl-20">
      <span className="absolute left-0 top-0 font-serif italic text-4xl sm:text-5xl gold-text leading-none">{c.n}</span>
      <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">{c.title}</h3>
      <p className="mt-3 font-body text-sm sm:text-base text-white/60 leading-relaxed max-w-lg">{c.text}</p>
      <span className="block mt-6 h-px w-24 bg-gold/50" />
    </Reveal>
    <motion.div
      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0 round 24px)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0 round 24px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, ease: EASE }}
      className="lg:col-span-5 relative"
    >
      <div className="aspect-[4/3] lg:aspect-[5/4] rounded-3xl overflow-hidden ring-1 ring-white/10">
        <img src={c.image} alt={c.title} loading="lazy" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 rounded-3xl ring-1 ring-gold/40 translate-x-3 translate-y-3 -z-10 pointer-events-none" />
    </motion.div>
  </div>
);

export const Manifesto = () => (
  <section id="why" data-testid="manifesto-section" className="relative bg-obsidian text-white mt-0 py-20 sm:py-28 overflow-hidden grain">
    <div className="absolute -left-40 top-20 w-[520px] h-[520px] rounded-full bg-brand/20 blur-[140px] pointer-events-none" />
    <div className="absolute -right-40 bottom-0 w-[420px] h-[420px] rounded-full bg-gold/10 blur-[120px] pointer-events-none" />
    <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6">
      <Reveal className="max-w-2xl mb-16 sm:mb-24">
        <p className="font-body text-[11px] tracking-[0.28em] uppercase text-gold">Why Demi-Fine?</p>
        <h2 className="mt-3 font-display font-extrabold tracking-[-0.03em] text-3xl sm:text-4xl lg:text-5xl leading-[1.05]">
          Everything fine jewellery promises. <span className="font-serif italic font-medium text-white/80">None of the price.</span>
        </h2>
      </Reveal>
      <div className="space-y-20 sm:space-y-28">
        {CHAPTERS.map((c, i) => <Chapter key={c.n} c={c} i={i} />)}
      </div>
    </div>
  </section>
);
