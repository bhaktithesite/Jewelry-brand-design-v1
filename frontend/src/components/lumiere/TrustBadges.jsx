import { RefreshCw, ShieldCheck, Truck } from "lucide-react";
import { Reveal } from "./Reveal";

const ITEMS = [
  { icon: Truck, title: "Free Express Shipping", text: "On all prepaid & COD orders across India." },
  { icon: ShieldCheck, title: "Lifetime Color Warranty", text: "100% Anti-Tarnish & Waterproof guarantee." },
  { icon: RefreshCw, title: "Easy 7-Day Returns", text: "Hassle-free return & exchange policy." },
];

export const TrustBadges = () => (
  <section data-testid="trust-badges" className="max-w-[1200px] mx-auto px-4 sm:px-6 -mt-6 sm:-mt-10 relative z-10">
    <div className="flex sm:grid sm:grid-cols-3 gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
      {ITEMS.map((it, i) => (
        <Reveal key={it.title} delay={i * 0.08} className="snap-start min-w-[78%] sm:min-w-0">
          <div data-testid={`trust-badge-${i}`} className="bg-surface hairline rounded-2xl shadow-card p-4 sm:p-5 flex items-start gap-3 h-full">
            <div className="w-10 h-10 rounded-full bg-gold-subtle text-gold flex items-center justify-center flex-none">
              <it.icon size={18} />
            </div>
            <div>
              <p className="font-display font-bold text-sm text-ink">{it.title}</p>
              <p className="font-body text-xs text-graphite mt-0.5 leading-relaxed">{it.text}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);
