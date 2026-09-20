let lenis = null;

export const setLenis = (instance) => { lenis = instance; };

export const scrollTo = (target, options = {}) => {
  if (lenis) {
    lenis.scrollTo(target, { offset: -72, duration: 1.2, force: true, ...options });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  else document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const lockScroll = () => {
  lenis?.stop();
  document.body.style.overflow = "hidden";
};

export const unlockScroll = () => {
  lenis?.start();
  document.body.style.overflow = "";
};
