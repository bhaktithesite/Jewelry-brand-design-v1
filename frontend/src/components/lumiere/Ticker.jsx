import { Sparkles } from "lucide-react";

const TEXT = "100% WATERPROOF & ANTI-TARNISH • FREE EXPRESS DELIVERY ACROSS INDIA";
export const Ticker = () => (
  <div data-testid="announcement-ticker" className="relative h-8 overflow-hidden bg-gradient-to-r from-[#1E40AF] to-brand text-white">
    <div className="marquee-track animate-ticker h-full items-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} aria-hidden={i > 0} className="inline-flex items-center gap-4 font-display text-[10px] sm:text-[11px] font-semibold tracking-[0.13em] uppercase px-6 whitespace-nowrap">
          <Sparkles size={13} className="text-champagne" />{TEXT}
        </span>
      ))}
    </div>
  </div>
);
