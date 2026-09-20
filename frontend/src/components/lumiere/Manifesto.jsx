import { Droplets, Gift, Gem, ShieldCheck } from "lucide-react";
import { Reveal } from "./Reveal";

const PILLARS = [
  { icon: Droplets, title: "100% Shower-Proof", text: "Gym, shower, pool, repeat. Waterproof pieces made to stay with you, 24/7." },
  { icon: ShieldCheck, title: "Triple PVD Plating", text: "A triple-thick 18K layer. Lasting colour, no green skin. Nickel-free and sensitive-skin safe." },
  { icon: Gem, title: "Smart Luxury", text: "Sterling silver and surgical-grade steel foundations. The 18K gold look, without the solid-gold price." },
  { icon: Gift, title: "Gift-Box Ready", text: "Our signature periwinkle box, a velvet pouch and a lifetime colour warranty card. A little joy, wrapped." },
];

export const Manifesto = () => (
  <section id="why" data-testid="manifesto-section" className="bg-white mt-10 sm:mt-16 py-9 sm:py-12 border-y border-[var(--border-light)]">
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
      <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="font-display text-[10px] tracking-[.2em] uppercase text-graphite">Good things. No compromises.</p>
          <h2 className="font-display font-bold text-base md:text-lg mt-2 text-ink">Why Demi-Fine?</h2>
        </div>
        <span className="font-serif italic text-lg text-graphite">Made for the everyday, and the extraordinary.</span>
      </Reveal>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} delay={i * .06}>
            <div data-testid={`value-pillar-${i}`} className="h-full rounded-2xl border border-[var(--border-light)] bg-canvas p-4 sm:p-5">
              <p.icon size={23} strokeWidth={1.5} className="text-brand mb-4" />
              <h3 className="font-display text-sm font-bold text-ink">{p.title}</h3>
              <p className="mt-2 font-body text-xs leading-relaxed text-graphite">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
