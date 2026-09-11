"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  // Raw mouse coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for outer trailing circle
  const springConfig = { damping: 24, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show custom cursor on devices with fine pointer (mouse)
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    setIsFinePointer(hasFinePointer);
    setMounted(true);

    if (!hasFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovered element is clickable / interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest(
            'a, button, input, textarea, select, [role="button"], [role="link"], label, .cursor-pointer, [data-interactive="true"]'
          )
        );
        setIsHovered(interactive);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!mounted || !isFinePointer) return null;

  return (
    <>
      {/* Outer Smooth Trailing Circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] border transition-colors duration-200"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 48 : isClicked ? 26 : 34,
          height: isHovered ? 48 : isClicked ? 26 : 34,
          borderColor: isHovered
            ? "var(--color-primary)"
            : "rgba(99, 102, 241, 0.4)",
          backgroundColor: isHovered
            ? "rgba(99, 102, 241, 0.12)"
            : "rgba(99, 102, 241, 0.04)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { duration: 0.18, ease: "easeOut" },
          height: { duration: 0.18, ease: "easeOut" },
          borderColor: { duration: 0.15 },
          backgroundColor: { duration: 0.15 },
          opacity: { duration: 0.15 },
        }}
      />

      {/* Inner Pin-Point Center Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] bg-[var(--color-primary)] shadow-[0_0_8px_rgba(99,102,241,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 6 : isClicked ? 3 : 5,
          height: isHovered ? 6 : isClicked ? 3 : 5,
          opacity: isVisible ? 1 : 0,
          scale: isClicked ? 0.8 : 1,
        }}
        transition={{
          duration: 0.1,
          ease: "easeOut",
        }}
      />
    </>
  );
}
