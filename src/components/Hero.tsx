"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[150vh] flex flex-col overflow-hidden">
      {/* Temporary Full Screen Background Image (150vh height, shifted up with -top-28) */}
      <div className="absolute inset-x-0 -top-28 h-[calc(150vh+7rem)] z-0">
        <Image
          src="/images/235017E - Kasun Bandara1.jpg"
          alt="Kasun Bandara Background"
          fill
          className="object-cover object-top transition-opacity duration-300"
          style={{ opacity: "var(--hero-img-opacity, 0.8)" }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--hero-overlay-from)] via-[var(--hero-overlay-via)] to-[var(--hero-overlay-to)]" />
      </div>

      {/* Content centered in the first fold (min-h-screen) */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full min-h-screen flex items-center justify-center pt-200">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="backdrop-blur-md bg-[var(--color-card)]/70 border border-[var(--color-card-border)] p-8 md:p-12 rounded-[32px] shadow-2xl w-full"
        >
          {/* Capsule Profile Image hidden temporarily for full screen view */}

          <h2 className="text-[var(--color-primary)] font-medium tracking-wide mb-6">
            Hello, I'm Kasun Bandara
          </h2>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-[var(--color-foreground)] mb-8">
            Software Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
              Student
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-muted)] max-w-2xl mx-auto mb-12 leading-relaxed">
            Building scalable full-stack applications with Next.js, Spring Boot, and PostgreSQL. Focused on elegant architecture and performance.
          </p>
        </motion.div>
      </div>
    </section>
  );
}