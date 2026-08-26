"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollWheel() {
  const [rotation, setRotation] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Adjust the multiplier (0.4) to increase or decrease rotation speed
      setRotation(scrollY * 0.4);

      // Show the wheel button after scrolling down 200px
      if (scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 flex items-center justify-center p-0.5 rounded-full border border-[var(--color-card-border)] bg-[var(--color-card)]/80 backdrop-blur-md shadow-2xl transition-all duration-500 group hover:border-[var(--color-primary)]/50 hover:scale-110 active:scale-95 cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <div className="relative w-14 h-14 flex items-center justify-center">
        {/* Outer Rotating Gear (SVG) */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-[var(--color-primary)] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Futuristic Cog Wheel */}
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="4 8" />
          <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="2" />
          
          {/* Teeth */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8;
            return (
              <g key={i} transform={`rotate(${angle} 50 50)`}>
                <rect x="46" y="10" width="8" height="12" rx="2" fill="currentColor" />
              </g>
            );
          })}
        </svg>

        {/* Center Arrow Indicator (Stationary) */}
        <div className="absolute inset-0 flex items-center justify-center text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
          <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
        </div>
      </div>
    </button>
  );
}
