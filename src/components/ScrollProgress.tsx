"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-cyan-400 origin-[0%] z-[9999] pointer-events-none shadow-[0_0_10px_rgba(99,102,241,0.5)]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
