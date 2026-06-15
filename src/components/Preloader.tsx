import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Keep it short; release as soon as the window has loaded.
    const minDelay = reduce ? 300 : 1900;
    const t = setTimeout(() => setDone(true), minDelay);
    return () => clearTimeout(t);
  }, [reduce]);

  // Lock scroll while the curtain is up.
  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="overflow-hidden text-center">
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-[0.72rem] uppercase tracking-[0.45em] text-gold/80"
            >
              Depuis 1923
            </motion.p>
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 font-display text-5xl text-ivory sm:text-7xl"
            >
              Maison <span className="italic text-gold">Flandrin</span>
            </motion.h1>
            {/* Drawing line */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-5 block h-px w-40 origin-left bg-gold/60"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
