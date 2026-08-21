"use client";

import { motion } from "framer-motion";
import { Award, Calendar, ChevronRight } from "lucide-react";
import portfolioData from "@/data/portfolio.json";

interface Milestone {
  year: string;
  title: string;
  desc: string;
}

export default function Milestones() {
  const milestones: Milestone[] = portfolioData.milestones;

  return (
    <section id="milestones" className="py-32 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-20">
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
            <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-xl bg-[var(--color-card)] border border-white/10 flex items-center justify-center text-[var(--color-primary)] group-hover:border-[var(--color-primary)]/50 group-hover:bg-[var(--color-primary)]/10 transition-all duration-300 shadow-lg">
              <Award size={16} className="group-hover:scale-110 transition-transform" />
            </div>

            {/* Mobile Year Badge */}
            <div className="md:hidden flex items-center gap-1.5 text-[var(--color-primary)] font-mono text-xs font-semibold mb-2">
              <Calendar size={12} />
              {milestone.year}
            </div>

            {/* Milestone Card */}
            <div className="p-6 rounded-[24px] bg-[var(--color-card)] border border-white/5 group-hover:border-white/10 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 max-w-3xl">
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
