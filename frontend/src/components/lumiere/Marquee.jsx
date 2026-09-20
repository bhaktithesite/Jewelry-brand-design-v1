const WORDS = ["18K Gold PVD", "925 Sterling Silver", "100% Waterproof", "Anti-Tarnish", "Hypoallergenic", "AAA Swiss Zirconia", "Freshwater Pearls"];

export const Marquee = () => (
  <div data-testid="editorial-marquee" className="relative overflow-hidden border-y border-[var(--border-light)] mt-16 sm:mt-24 py-6 sm:py-8 bg-surface">
    <div className="marquee-track animate-ticker-slow">
      {[0, 1].map((k) => (
        <div key={k} className="flex items-center">
          {WORDS.map((w) => (
            <span key={`${k}-${w}`} className="flex items-center font-serif italic text-2xl sm:text-4xl lg:text-5xl text-ink/85 whitespace-nowrap px-6 sm:px-10">
              {w}
              <span className="ml-6 sm:ml-10 text-gold not-italic text-lg sm:text-2xl">✦</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);
