"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Calendar, ChevronRight } from "lucide-react";
import portfolioData from "@/data/portfolio.json";

interface Milestone {
  year: string;
  title: string;
  desc: string;
}

const quoteText = "“Frameworks change. Technologies evolve. Fundamentals endure.”";

const quoteContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.025,
      delayChildren: 0.1,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 6, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

export default function Milestones() {
  const [isLoaded, setIsLoaded] = useState(false);
  const milestones: Milestone[] = portfolioData.milestones;

  return (
    <section id="milestones" className="py-32 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-20">
        <motion.div
          animate={
            isLoaded
              ? {
                  x: [0, -2, 2, -1.5, 1.5, -1, 1, 0],
                  y: [0, -1, 1, -0.6, 0.6, -0.4, 0.4, 0],
                  rotate: [0, -0.4, 0.4, -0.2, 0.2, 0],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          className="inline-block"
        >
          <motion.p
            variants={quoteContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            onAnimationComplete={() => setIsLoaded(true)}
            className="text-lg md:text-2xl font-semibold tracking-wide text-[var(--color-primary)] mb-4"
          >
            {quoteText.split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block whitespace-nowrap">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
                {wordIndex < quoteText.split(" ").length - 1 && (
                  <span className="inline-block">&nbsp;</span>
                )}
              </span>
            ))}
          </motion.p>
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-foreground)] mb-4">
          Key Milestones
        </h2>
        <p className="text-[var(--color-muted)] text-lg max-w-xl mx-auto">
          A retrospective journey of my educational highlights, industrial milestones, and achievements.
        </p>
      </div>

      <div className="relative border-l border-white/10 ml-4 md:ml-32 space-y-16">
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative pl-10 md:pl-16 group"
          >
            {/* Year Label for larger screens (positioned absolutely to the left of the line) */}
            <div className="absolute left-[-110px] top-1.5 hidden md:flex items-center gap-2 text-right w-24 justify-end text-[var(--color-primary)] font-mono text-sm font-semibold">
              <Calendar size={14} />
              {milestone.year}
            </div>

            {/* Glowing Icon indicator on the vertical timeline line */}
            <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-xl bg-[var(--color-card)] border border-[var(--color-card-border)] flex items-center justify-center text-[var(--color-primary)] group-hover:border-[var(--color-primary)]/50 group-hover:bg-[var(--color-primary)]/10 transition-all duration-300 shadow-lg">
              <Award size={16} className="group-hover:scale-110 transition-transform" />
            </div>

            {/* Mobile Year Badge */}
            <div className="md:hidden flex items-center gap-1.5 text-[var(--color-primary)] font-mono text-xs font-semibold mb-2">
              <Calendar size={12} />
              {milestone.year}
            </div>

            {/* Milestone Card */}
            <div className="p-6 rounded-[24px] bg-[var(--color-card)] border border-[var(--color-card-border)] group-hover:border-[var(--color-primary)]/30 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 max-w-3xl">
              <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-2 flex items-center gap-2">
                {milestone.title}
                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[var(--color-primary)]" />
              </h3>
              <p className="text-[var(--color-muted)] leading-relaxed">{milestone.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
