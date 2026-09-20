const CDN = "https://static.prod-images.emergentagent.com/jobs/0deb4a91-c37b-4422-abc4-b1563fdbdaf7/images/";

export const ASSETS = {
  hero: `${CDN}a46c0dd8b35fecc0e944a39f63c134839616b4594d6602b98c3f6d3c2eb1c2a2.jpeg`,
  handRings: `${CDN}2ba1871e608a34c688b11e0c5787136ef2f731ac6f0aaa49c6cfaccaf6b352bb.jpeg`,
  neck: `${CDN}a6e0568c63c58047248376a78d5b0c5141b82b01c63d61f2cf5605f7f37c28f2.jpeg`,
  ear: `${CDN}a22cc6df1c8f4c0eedabe4d8bf932d22451075bcadbdaf9f47e736ee9f308be6.jpeg`,
  wrist: `${CDN}be06b86ffb85a8a541dacb4cf2b11a82b8bf51bed1040698b93554160385c333.jpeg`,
  packaging: `${CDN}68c7d0cb8798efc26cac6cbe402b9655034cfd7ec96429b2efbd96721744efb2.jpeg`,
  catRings: `${CDN}6d27f09cafea164e04d644fd3ff281bb1f0f568108fd13faa8d6e269404a6e62.jpeg`,
  catNecklaces: `${CDN}5d759377a623cee78573e0fc6348f92857ec5a41bf64b7c07db268a024c2f8f6.jpeg`,
  catEarrings: `${CDN}26735e60e97f212ed1fbca15673efdd85d091302499cf990a0b4dabbcf9527f3.jpeg`,
  catBracelets: `${CDN}303871fac8912f1ec6a0fcfcca96ad20da183fc145c0aa8a78d6d02b655850bc.jpeg`,
};

const IMG = {
  floralRing: `${CDN}9ce9e0e26c31dae7c0dba75f1563b9c8beb0fe068ee37ea9ca9b85f72cdb7de2.jpeg`,
  teardrop: `${CDN}7a241b7eaf15aca1d01aaa274b2039bc410d0c895fe24c02808fba61406ce8dc.jpeg`,
  huggies: `${CDN}916908573f61cd2ae3e3495bcc3c0f86094544c577ad0dc79f3168116c3cfb7d.jpeg`,
  tennis: `${CDN}1507bb15e02b85a7742b8ece0d42316cd56b71b7906955b12d65ba74972f4852.jpeg`,
  croissant: `${CDN}4b6ab8e76535c030d4a038fa6e053fad0ad77d965217348b4c42b91e3a6d29f5.jpeg`,
  herringbone: `${CDN}0fd9f6b0bb3ce1e114e17de0dcc0a092c42becf2a552960b8c46b27ad9a597af.jpeg`,
  pearlDrops: `${CDN}3b5553e642f59447cba86c9e16baf020b31f97f8450d3ad319b21783eac87814.jpeg`,
  baguette: `${CDN}2badd4df08528a59cbe430403241152abf7b07a10d8170cd2db894671d83ed8b.jpeg`,
  evilEye: `${CDN}ac0b5dc36a92ee078907df1a2d88853023c7821cf4ba778314afde5735af90d7.jpeg`,
  paperclip: `${CDN}e495ae73179f887300f585ece62124f5b068e62f1d1f768f0660d07b4cc4c7e4.jpeg`,
  chunkyHoops: `${CDN}b6028160f12795d1ba87050899eba12fa79f55ffc6502d3ca8c4ff86b85d6a55.jpeg`,
  signet: `${CDN}c0b1e2dac0e15546db972f1ff25ca9b2ca42d6dc92af63f71d80cc72d9b12224.jpeg`,
  pearlStrand: `${CDN}c9f008ba370080be669c636a6afc54d4f790fbf2c993cd1f32e501da6e84da54.jpeg`,
  cuff: `${CDN}fab55d6362ad1ba8afccd9349877653bd5e5f83bd8937ae3fca449749717e3ec.jpeg`,
  dailySet: `${CDN}8a2aa273e94e6d42fb9cecf736b2a0b10c325b81a10a94bf21591b7b9a0c350a.jpeg`,
  pearlSet: `${CDN}bba9d7c7303b6fbd606f2b775ce5b64716f3f89d7f5bc7c990264929632cb148.jpeg`,
};

export const CATEGORIES = [
  { key: "Rings", label: "Rings", sub: "Solitaires · Bands · Signets", image: ASSETS.catRings },
  { key: "Necklaces", label: "Necklaces", sub: "Chains · Pendants · Layered", image: ASSETS.catNecklaces },
  { key: "Earrings", label: "Earrings", sub: "Hoops · Huggies · Studs", image: ASSETS.catEarrings },
  { key: "Bracelets", label: "Bracelets", sub: "Tennis · Cuffs · Charms", image: ASSETS.catBracelets },
  { key: "Daily Sets", label: "Daily Sets", sub: "Matched Combos", image: IMG.dailySet },
];

export const METALS = ["18K Gold", "White Gold", "Rose Gold"];
export const METAL_SWATCH = { "18K Gold": "#D4AF37", "White Gold": "#CBD5E1", "Rose Gold": "#E0A99A" };
export const METAL_LABEL = { "18K Gold": "18K Yellow Gold", "White Gold": "Platinum / White Gold", "Rose Gold": "18K Rose Gold" };

export const RING_SIZES = [
  { size: 6, mm: 51.8, dia: 16.5 },
  { size: 7, mm: 54.4, dia: 17.3 },
  { size: 8, mm: 57.0, dia: 18.1 },
  { size: 9, mm: 59.5, dia: 18.9 },
  { size: 10, mm: 62.1, dia: 19.8 },
];

const LIFE = {
  Rings: [ASSETS.handRings, ASSETS.packaging],
  Necklaces: [ASSETS.neck, ASSETS.packaging],
  Earrings: [ASSETS.ear, ASSETS.packaging],
  Bracelets: [ASSETS.wrist, ASSETS.packaging],
  "Daily Sets": [ASSETS.neck, ASSETS.handRings, ASSETS.packaging],
};

const make = (p) => ({
  ...p,
  image: p.images[0],
  images: [...p.images, ...LIFE[p.category]],
  material: p.material || "18K Gold PVD • 925 Silver Base",
  metals: p.metals || METALS,
});

export const DEMI_FINE_PRODUCTS = [
  make({
    id: "LUM-RN-01", name: "Floral Diamond Blossom Ring", category: "Rings",
    price: 1299, originalPrice: 2499, rating: 4.8, reviews: 120,
    images: [IMG.floralRing],
    description: "A stunning floral-inspired ring crafted in 925 sterling silver with thick 18K gold plating, featuring brilliant AAA Austrian zircons that symbolize elegance and timeless beauty.",
    sizes: [6, 7, 8, 9, 10], isBestSeller: true, isEssential: true, tag: "BESTSELLER",
  }),
  make({
    id: "LUM-PD-02", name: "Classic Teardrop Solitaire Pendant", category: "Necklaces",
    price: 699, originalPrice: 1399, rating: 4.9, reviews: 95,
    images: [IMG.teardrop],
    description: "A sparkling pear-cut AAA cubic zirconia suspended in an 18K gold plated bezel setting with an adjustable 16-18 inch shimmer chain. 100% waterproof.",
    sizes: ["16-18 inch adjustable"], isBestSeller: true, tag: "50% OFF",
  }),
  make({
    id: "LUM-ER-03", name: "Diamond Pavé Huggie Hoops", category: "Earrings",
    price: 899, originalPrice: 1799, rating: 4.7, reviews: 84,
    images: [IMG.huggies],
    description: "Effortless everyday huggies with micro-pavé stones and a secure click-lock closure. Hypoallergenic, sensitive-ear friendly, and shower-proof.",
    sizes: ["12mm"], isEssential: true, tag: "WATERPROOF",
  }),
  make({
    id: "LUM-BR-04", name: "Duchess Tennis Sparkle Bracelet", category: "Bracelets",
    price: 1499, originalPrice: 2999, rating: 4.9, reviews: 142,
    images: [IMG.tennis],
    description: "The viral internet-favorite tennis bracelet. Precision prong-set round cut crystals with a double-safety lock clasp in 18K gold vermeil.",
    metals: ["18K Gold", "White Gold"], sizes: ["6.5 inch", "7.0 inch"], isBestSeller: true, tag: "TRENDING",
  }),
  make({
    id: "LUM-RN-05", name: "Croissant Dome Chunky Ring", category: "Rings",
    price: 999, originalPrice: 1899, rating: 4.8, reviews: 67,
    images: [IMG.croissant],
    description: "French Parisian elegance. Smooth fluted ridges with a comfortable hollow inner core. Perfect for stacking or wearing solo.",
    metals: ["18K Gold", "White Gold"], sizes: [6, 7, 8, 9], tag: "PARISIAN",
  }),
  make({
    id: "LUM-NK-06", name: "Herringbone Liquid Snake Chain", category: "Necklaces",
    price: 1199, originalPrice: 2199, rating: 5.0, reviews: 112,
    images: [IMG.herringbone],
    description: "Fluid silky gold chain that lays flat against the collarbone like liquid sunlight. 3mm width, anti-tarnish, zero kink design.",
    metals: ["18K Gold", "White Gold"], sizes: ["16 inch + 2 inch extender"], isBestSeller: true, isEssential: true, tag: "BESTSELLER",
  }),
  make({
    id: "LUM-ER-07", name: "Lune Freshwater Pearl Drops", category: "Earrings",
    price: 1099, originalPrice: 2099, rating: 4.8, reviews: 73,
    images: [IMG.pearlDrops],
    description: "Cultured freshwater pearls suspended from a bezel-set zircon stud. Lightweight, hypoallergenic posts with butterfly backs for all-day wear.",
    material: "18K Gold PVD • Freshwater Pearl",
    sizes: ["Free Size"], isNew: true, tag: "NEW IN",
  }),
  make({
    id: "LUM-RN-08", name: "Baguette Eternity Band", category: "Rings",
    price: 1199, originalPrice: 2299, rating: 4.9, reviews: 88,
    images: [IMG.baguette],
    description: "A slim eternity band lined with channel-set baguette zircons that flash like a runway. Stacks beautifully with the Croissant Dome.",
    sizes: [6, 7, 8, 9, 10], isNew: true, tag: "NEW IN",
  }),
  make({
    id: "LUM-NK-09", name: "Sapphire Evil Eye Pendant", category: "Necklaces",
    price: 899, originalPrice: 1699, rating: 4.7, reviews: 61,
    images: [IMG.evilEye],
    description: "A protective evil eye in deep sapphire enamel, haloed by micro-pavé zircons on a delicate 18K gold cable chain. Your everyday talisman.",
    material: "18K Gold PVD • Sapphire Enamel",
    sizes: ["16-18 inch adjustable"], isNew: true, tag: "NEW IN",
  }),
  make({
    id: "LUM-BR-10", name: "Paperclip Toggle Link Bracelet", category: "Bracelets",
    price: 1099, originalPrice: 2199, rating: 4.8, reviews: 54,
    images: [IMG.paperclip],
    description: "Elongated paperclip links with a polished toggle clasp. Waterproof, sweatproof and built for the gym-to-brunch lifestyle.",
    metals: ["18K Gold", "White Gold"], sizes: ["7.0 inch", "7.5 inch"], isEssential: true, tag: "WATERPROOF",
  }),
  make({
    id: "LUM-ER-11", name: "Bold Puffy Dome Hoops", category: "Earrings",
    price: 1299, originalPrice: 2499, rating: 4.9, reviews: 131,
    images: [IMG.chunkyHoops],
    description: "Statement chunky hoops that weigh almost nothing thanks to a hollow-core construction. Mirror-polished 18K gold PVD finish.",
    sizes: ["25mm", "32mm"], isBestSeller: true, tag: "TRENDING",
  }),
  make({
    id: "LUM-RN-12", name: "Étoile Star Signet Ring", category: "Rings",
    price: 1399, originalPrice: 2699, rating: 4.8, reviews: 46,
    images: [IMG.signet],
    description: "An oval signet with a hand-engraved north star and a single zircon at its heart. Heirloom silhouette, modern price.",
    sizes: [6, 7, 8, 9, 10], isNew: true, tag: "NEW IN",
  }),
  make({
    id: "LUM-NK-13", name: "Trio Pearl Station Necklace", category: "Necklaces",
    price: 1299, originalPrice: 2499, rating: 4.9, reviews: 77,
    images: [IMG.pearlStrand],
    description: "Three lustrous freshwater pearls stationed on a fine 18K gold chain. The quiet-luxury layering piece for every neckline.",
    material: "18K Gold PVD • Freshwater Pearl",
    sizes: ["16-18 inch adjustable"], isEssential: true, tag: "WATERPROOF",
  }),
  make({
    id: "LUM-BR-14", name: "Pavé Orb Open Cuff", category: "Bracelets",
    price: 1599, originalPrice: 3199, rating: 4.8, reviews: 39,
    images: [IMG.cuff],
    description: "A sleek open cuff finished with two pavé-set orbs. Gently flexible for a perfect fit on every wrist.",
    sizes: ["Adjustable"], isNew: true, tag: "NEW IN",
  }),
  make({
    id: "LUM-ST-15", name: "Everyday Solitaire Trio Set", category: "Daily Sets",
    price: 2499, originalPrice: 4999, rating: 4.9, reviews: 158,
    images: [IMG.dailySet],
    description: "Solitaire pendant, matching studs and a slim stacking ring — the complete daily uniform in one signature baby-blue box.",
    sizes: [6, 7, 8, 9, 10], isBestSeller: true, isEssential: true, tag: "BESTSELLER",
  }),
  make({
    id: "LUM-ST-16", name: "Pearl Dream Duo Set", category: "Daily Sets",
    price: 1999, originalPrice: 3999, rating: 4.8, reviews: 92,
    images: [IMG.pearlSet],
    description: "A freshwater pearl pendant with its matching drop earrings. Soft, luminous and impossibly elegant — gift-ready.",
    material: "18K Gold PVD • Freshwater Pearl",
    sizes: ["Free Size"], isEssential: true, tag: "GIFT READY",
  }),
];

export const FILTER_TABS = [
  { key: "all", label: "All" },
  { key: "best", label: "Best Sellers 🔥" },
  { key: "under1499", label: "Under ₹1499" },
  { key: "new", label: "New In" },
  { key: "essentials", label: "Waterproof Essentials" },
];

export const matchesTab = (p, tab) => {
  if (tab === "best") return p.isBestSeller;
  if (tab === "under1499") return p.price <= 1499;
  if (tab === "new") return p.isNew;
  if (tab === "essentials") return p.isEssential;
  return true;
};

export const discountPct = (p) => Math.round((1 - p.price / p.originalPrice) * 100);
export const inr = (n) => `₹${Number(n).toLocaleString("en-IN")}`;
