import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Soft accent ring that trails the pointer. Uses mix-blend-difference so it
 * reads cleanly over any background while the native cursor stays for usability.
 * Desktop fine-pointer only; disabled for touch and reduced-motion.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduce) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHovering(!!el?.closest("a, button, input, textarea, [role='button']"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] rounded-full border border-gold mix-blend-difference"
      style={{ x: sx, y: sy }}
      animate={{
        width: hovering ? 56 : 26,
        height: hovering ? 56 : 26,
        marginLeft: hovering ? -28 : -13,
        marginTop: hovering ? -28 : -13,
        backgroundColor: hovering ? "rgba(216,166,91,0.18)" : "rgba(216,166,91,0)",
      }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    />
  );
}
