"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Hello", "Ayubowan", "Bonjour", "Hola", "Kasun Bandara"];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user already saw the loader in this session (optional, but keep it snappy on repeat visits)
    const isFirstVisit = !sessionStorage.getItem("portfolio_loaded");

    // Prevent scrolling during preloader
    document.body.style.overflow = "hidden";

    // Progress counter interval (0 to 100)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Rapid easing increment
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 45);

    // Sequence words cycle
    const wordInterval = setInterval(() => {
      setIndex((prev) => {
        if (prev < words.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 280);

    // Total timeout before dismiss
    const finishTimeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "auto";
        sessionStorage.setItem("portfolio_loaded", "true");
      }, 400);
    }, 1800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(wordInterval);
      clearTimeout(finishTimeout);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[99999] flex flex-col justify-between p-8 md:p-14 bg-[#050505] text-[#F4F4F5] select-none"
        >
          {/* Top Brand / Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                System Initializing
              </span>
            </div>
            <span className="text-xs font-mono text-zinc-400 tracking-wider">
              {progress}%
            </span>
          </div>

          {/* Center Dynamic Word Sequence */}
          <div className="flex flex-col items-center justify-center text-center my-auto">
            <div className="overflow-hidden h-20 md:h-28 flex items-center justify-center">
              <motion.h1
                key={index}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -35 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white flex items-center gap-2"
              >
                {index === words.length - 1 ? (
                  <>
                    <span>Kasun</span>
                    <span className="text-[var(--color-primary)]">Bandara</span>
                  </>
                ) : (
                  <span>{words[index]}</span>
                )}
              </motion.h1>
            </div>
            <p className="text-xs md:text-sm font-mono text-zinc-400 tracking-widest uppercase mt-3">
              Software Engineering • University of Moratuwa
            </p>
          </div>

          {/* Bottom Progress Bar & Details */}
          <div className="w-full space-y-3">
            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Next.js • Spring Boot • PostgreSQL</span>
              <span>Colombo, LK</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
