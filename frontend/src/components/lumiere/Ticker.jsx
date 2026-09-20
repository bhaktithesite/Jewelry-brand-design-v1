const TEXT = "✨ 100% WATERPROOF & ANTI-TARNISH  •  BUY 2 GET 10% OFF  •  USE CODE: 'LUXE10'  ✨";

export const Ticker = () => (
  <div data-testid="announcement-ticker" className="relative overflow-hidden bg-obsidian text-champagne">
    <div className="marquee-track animate-ticker py-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="font-display text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase px-8 whitespace-nowrap">
          {TEXT}
        </span>
      ))}
    </div>
  </div>
);
