import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Ruler, X } from "lucide-react";
import { RING_SIZES } from "@/data/products";
import { useStore } from "@/context/StoreContext";

export const SizeGuide = () => {
  const { sizeGuideOpen, setSizeGuideOpen } = useStore();
  return (
    <Dialog open={sizeGuideOpen} onOpenChange={setSizeGuideOpen}>
    <AnimatePresence>
      {sizeGuideOpen && (
        <DialogPortal forceMount>
        <motion.div className="fixed inset-0 z-[1001] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <DialogOverlay forceMount asChild><div data-testid="size-guide-backdrop" className="absolute inset-0 bg-obsidian/50 backdrop-blur-sm" /></DialogOverlay>
          <DialogPrimitive.Content forceMount asChild aria-describedby={undefined}>
          <motion.div
            data-testid="size-guide-modal"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-[60] max-h-[90dvh] sheet-scroll-body w-full max-w-sm bg-surface rounded-3xl shadow-2xl p-5 sm:p-6"
          >
            <button data-testid="size-guide-close-btn" aria-label="Close size guide" onClick={() => setSizeGuideOpen(false)} className="absolute top-2 right-2 w-11 h-11 rounded-full bg-subtle flex items-center justify-center text-ink"><X size={16} /></button>
            <div className="flex items-center gap-2 text-gold"><Ruler size={18} /><span className="font-body text-[11px] tracking-[0.25em] uppercase text-graphite">Ring Size Guide</span></div>
            <DialogTitle asChild><h3 className="font-display font-bold text-lg text-ink mt-2">Find your perfect fit</h3></DialogTitle>
            <table className="w-full mt-4 text-sm font-body">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-graphite">
                  <th className="text-left py-2 font-medium">Size</th>
                  <th className="text-right py-2 font-medium">Circumference</th>
                  <th className="text-right py-2 font-medium">Diameter</th>
                </tr>
              </thead>
              <tbody>
                {RING_SIZES.map((r) => (
                  <tr data-testid={`size-guide-row-${r.size}`} key={r.size} className="border-t border-[var(--border-light)]">
                    <td className="py-2.5 font-display font-bold text-ink tabular">{r.size}</td>
                    <td className="py-2.5 text-right text-ink tabular">{r.mm.toFixed(1)} mm</td>
                    <td className="py-2.5 text-right text-graphite tabular">{r.dia.toFixed(1)} mm</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 font-body text-xs text-graphite leading-relaxed">Wrap a thin strip of paper around your finger, mark where it overlaps, and measure the length in mm.</p>
          </motion.div>
          </DialogPrimitive.Content>
        </motion.div>
        </DialogPortal>
      )}
    </AnimatePresence>
    </Dialog>
  );
};
