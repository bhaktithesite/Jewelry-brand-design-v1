# LUMIÈRE Demi-Fine Jewellery — PRD

## Original Problem Statement
Build a hyper-fast, mobile-first one-page catalog website for a premium Demi-Fine Jewellery brand (LUMIÈRE). Visual-first, clutter-free; interactive product pop-up modal (multi-image gallery, metal finish selector, ring size picker + size guide), slide-out bag drawer, and zero-API WhatsApp checkout to `+91 91122 99902` (`wa.me/919112299902`). Design system "Periwinkle Satin & Warm Porcelain" (canvas #F8FAFD, cobalt #2563EB CTAs, champagne gold #D4AF37 accents), fonts Plus Jakarta Sans / Playfair Display / Inter. Award-worthy motion (framer-motion + lenis).

## User Choices
- Static frontend data only (no backend/API for catalog)
- 16 realistic demi-fine items across Rings / Necklaces / Earrings / Bracelets / Daily Sets
- Custom AI-generated product photography (consistent white studio look)
- Bag & wishlist persisted in localStorage

## Architecture
- React 19 (CRA/craco) + Tailwind + framer-motion 11 + lenis 1.3
- No backend calls; FastAPI/Mongo template left untouched
- `src/data/products.js` — 16 products, categories, filter tabs, size chart, helpers
- `src/lib/whatsapp.js` — `buyNowWhatsApp`, `checkoutBagWhatsApp`, `conciergeWhatsApp` (exact message templates from brief)
- `src/lib/scroll.js` — lenis singleton, `scrollTo`, `lockScroll/unlockScroll`
- `src/context/StoreContext.js` — bag, wishlist, filters, modal/drawer state
- `src/components/lumiere/*` — Ticker, Header, Hero, TrustBadges, CategoryPills, FilterTabs, ProductGrid, ProductCard, ProductModal, SizeGuide, BagDrawer, Marquee, Manifesto, Footer, BottomNav, Reveal

## User Personas
- Mobile Instagram/WhatsApp shopper (90%+) browsing 375–430px, wants tap → details → WhatsApp order in seconds
- Gift buyer on desktop comparing pieces, adding multiple to bag

## Core Requirements (static)
1. Announcement ticker, glass header with search + bag badge
2. Kinetic hero with masked line reveal, parallax + 3D tilt pendant
3. Trust badges, circular category pills (filter), quick filter tabs + live search
4. 2/3/4-col product grid, wishlist hearts, quick-add
5. Product modal / bottom-sheet: gallery, metal finish, size + size guide, Add to Bag, Buy via WhatsApp
6. Bag drawer: qty controls, delete, totals, WhatsApp checkout with formatted order slip
7. "Why Demi-Fine?" numbered manifesto, editorial marquee, footer, sticky mobile bottom nav

## Implemented (2026-06)
- All sections above, fully functional; WhatsApp deep-links target `919112299902` with `encodeURIComponent`
- localStorage persistence (`lumiere_bag`, `lumiere_wishlist`)
- Lenis smooth scroll with lock on modal/drawer; `data-lenis-prevent` on scroll regions
- data-testid on every interactive element
- Reels strip ("Shop the Look") above catalog: 6 swipeable 9:16 living-image reels (`src/data/reels.js`, MP4-swappable via `video` field) + full-screen ReelViewer with auto-advance, swipe, keyboard, wishlist and Shop → product modal

## Backlog
- P1: Share sheet fallback UX polish; "Recently viewed" strip
- P2: Wishlist drawer view; coupon LUXE10 auto-calc in bag total; PWA manifest/icons
- P2: Optional backend CMS for products (FastAPI + Mongo) if user wants editable catalog
