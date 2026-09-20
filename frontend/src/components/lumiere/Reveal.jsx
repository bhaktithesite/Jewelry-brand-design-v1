import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 28, className, once = true, ...rest }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, margin: "-8% 0px" }}
    transition={{ duration: 0.8, delay, ease: EASE }}
    className={className}
    {...rest}
  >
    {children}
  </motion.div>
);

export const LineReveal = ({ lines, className = "", lineClassName = "", delay = 0, stagger = 0.12 }) => (
  <span className={className}>
    {lines.map((line, i) => (
      <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
        <motion.span
          className={`block ${lineClassName}`}
          initial={{ y: "115%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: delay + i * stagger, ease: EASE }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </span>
);
