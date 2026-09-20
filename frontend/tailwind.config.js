/** @type {import('tailwindcss').Config} */
module.exports = {
    blocklist: ["overline"],
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        canvas: '#F8FAFD',
        surface: '#FFFFFF',
        subtle: '#EDF3F9',
        brand: { DEFAULT: '#2563EB', hover: '#1D4ED8' },
        gold: { DEFAULT: '#D4AF37', subtle: '#FDF8EA' },
        rosegold: '#E0A99A',
        silver: '#CBD5E1',
        ink: '#111827',
        graphite: '#6B7280',
        emeraldbadge: '#059669',
        crimson: '#EF4444',
        obsidian: '#0D1117',
        champagne: '#F3E5AB',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      boxShadow: {
        card: '0 4px 20px rgba(0,0,0,0.04)',
        'card-hover': '0 14px 34px rgba(17,24,39,0.10)',
        glow: '0 10px 30px rgba(37,99,235,0.35)',
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        ticker: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        pop: { '0%': { transform: 'scale(1)' }, '40%': { transform: 'scale(1.35)' }, '100%': { transform: 'scale(1)' } },
        shimmer: { from: { backgroundPosition: '0% 50%' }, to: { backgroundPosition: '200% 50%' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        ticker: 'ticker 28s linear infinite',
        'ticker-slow': 'ticker 55s linear infinite',
        float: 'float 6s ease-in-out infinite',
        pop: 'pop 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        shimmer: 'shimmer 6s linear infinite',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
