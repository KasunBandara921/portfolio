"use client";

import { motion } from "framer-motion";
import { Code2, Sparkles, BookOpen, Target } from "lucide-react";
import portfolioData from "@/data/portfolio.json";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 size={20} />,
  Sparkles: <Sparkles size={20} />,
  BookOpen: <BookOpen size={20} />,
  Target: <Target size={20} />,
};

export default function About() {
  const currentlyItems = portfolioData.currently || [];

  return (
    <section id="about" className="py-24 md:py-32 px-6 max-w-4xl mx-auto space-y-8">
      {/* About Me Main Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="p-8 md:p-12 rounded-[32px] bg-[var(--color-card)] border border-[var(--color-card-border)] shadow-xl"
      >
        <h2 className="text-4xl font-bold mb-8 text-[var(--color-foreground)]">About Me</h2>
        <p className="text-[var(--color-muted)] text-lg mb-6 leading-relaxed">
          I am a second-year undergraduate at the University of Moratuwa, specializing in 
          Information Technology and Management. My journey is driven by a passion for 
          crafting efficient, scalable, and visually stunning digital experiences.
        </p>
        <p className="text-[var(--color-muted)] text-lg mb-8 leading-relaxed">
          Currently, I am focused on mastering the intersection of robust backend 
          architectures with modern, responsive frontend frameworks. I enjoy solving 
          complex problems through clean code and strategic software design.
        </p>

        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[var(--color-card-border)]">
          <div>
            <h4 className="font-semibold text-[var(--color-foreground)] mb-2">Education</h4>
            <p className="text-sm text-[var(--color-muted)]">University of Moratuwa</p>
          </div>
          <div>
            <h4 className="font-semibold text-[var(--color-foreground)] mb-2">Focus</h4>
            <p className="text-sm text-[var(--color-muted)]">Full-Stack Development</p>
          </div>
        </div>
      </motion.div>

      {/* What I'm Doing Currently Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        viewport={{ once: true }}
        className="p-8 md:p-12 rounded-[32px] bg-[var(--color-card)] border border-[var(--color-card-border)] shadow-xl relative overflow-hidden"
      >
        {/* Header with Live Status Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-foreground)]">
              What I&apos;m Doing Currently
            </h3>
            <p className="text-sm text-[var(--color-muted)] mt-1">
              My current areas of focus, ongoing projects, and learning journey
            </p>
          </div>

          {/* Live Pulse Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for Opportunities</span>
          </div>
        </div>

        {/* Current Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {currentlyItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-5 rounded-2xl bg-[var(--color-background)]/50 border border-[var(--color-card-border)] hover:border-[var(--color-primary)]/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 group-hover:scale-105 transition-transform duration-300">
                    {iconMap[item.icon] || <Code2 size={20} />}
                  </div>
                  <h4 className="font-semibold text-[var(--color-foreground)] text-base group-hover:text-[var(--color-primary)] transition-colors">
                    {item.title}
                  </h4>
                </div>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}