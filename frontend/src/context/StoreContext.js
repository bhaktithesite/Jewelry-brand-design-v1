import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const StoreContext = createContext(null);

const keyOf = (id, metal, size) => `${id}__${metal}__${size ?? "free"}`;

export const StoreProvider = ({ children }) => {
  const [bag, setBag] = useLocalStorage("lumiere_bag", []);
  const [wishlist, setWishlist] = useLocalStorage("lumiere_wishlist", []);
  const [activeProduct, setActiveProduct] = useState(null);
  const [bagOpen, setBagOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [activeReel, setActiveReel] = useState(null);
  const [category, setCategory] = useState("All");
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const addToBag = useCallback((product, metal, size, quantity = 1) => {
    const key = keyOf(product.id, metal, size);
    setBag((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + quantity } : i));
      return [...prev, {
        key, id: product.id, name: product.name, price: product.price, originalPrice: product.originalPrice,
        image: product.image, selectedMetal: metal, selectedSize: size, quantity,
      }];
    });
    toast.success(`${product.name} added to bag`, { description: `${metal}${size ? ` · Size ${size}` : ""}` });
  }, [setBag]);

  const updateQty = useCallback((key, delta) => {
    setBag((prev) => prev
      .map((i) => (i.key === key ? { ...i, quantity: i.quantity + delta } : i))
      .filter((i) => i.quantity > 0));
  }, [setBag]);

  const removeFromBag = useCallback((key) => setBag((prev) => prev.filter((i) => i.key !== key)), [setBag]);

  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, [setWishlist]);

  const bagCount = useMemo(() => bag.reduce((s, i) => s + i.quantity, 0), [bag]);
  const bagTotal = useMemo(() => bag.reduce((s, i) => s + i.price * i.quantity, 0), [bag]);
  const couponApplied = bagCount >= 2;
  const discount = couponApplied ? Math.round(bagTotal * 0.1) : 0;

  const value = {
    bag, bagCount, bagTotal, discount, couponApplied, addToBag, updateQty, removeFromBag,
    wishlist, toggleWishlist, isWishlisted: (id) => wishlist.includes(id), wishlistOpen, setWishlistOpen,
    activeProduct, openProduct: setActiveProduct, closeProduct: () => setActiveProduct(null),
    bagOpen, setBagOpen, sizeGuideOpen, setSizeGuideOpen, activeReel, setActiveReel,
    category, setCategory, tab, setTab, query, setQuery, searchOpen, setSearchOpen,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
