"use client";

import { motion, Variants } from "framer-motion";
import { Code2, Sparkles, BookOpen, Target, ArrowUpRight } from "lucide-react";
import portfolioData from "@/data/portfolio.json";

interface CurrentlyItem {
  icon: string;
  tag?: string;
  title: string;
  desc: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 size={18} />,
  Sparkles: <Sparkles size={18} />,
  BookOpen: <BookOpen size={18} />,
  Target: <Target size={18} />,
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function About() {
  const currentlyItems: CurrentlyItem[] = (portfolioData.currently as CurrentlyItem[]) || [];

  return (
    <section id="about" className="py-24 md:py-32 px-6 max-w-4xl mx-auto space-y-10">
      {/* About Me Main Card */}
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.2 }}
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

      {/* What I'm Doing Currently Section - Modern Staggered Animated Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative p-8 md:p-12 rounded-[32px] bg-[var(--color-card)] border border-[var(--color-card-border)] shadow-2xl overflow-hidden backdrop-blur-xl"
      >
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-[var(--color-primary)]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[var(--color-secondary)]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header with Pulse Beacon */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2.5 py-1 rounded-md border border-[var(--color-primary)]/20">
                Live Status
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-foreground)] tracking-tight">
              What I&apos;m Doing Currently
            </h3>
            <p className="text-sm text-[var(--color-muted)] mt-1.5">
              Active projects, technological explorations, and engineering milestones
            </p>
          </div>

          {/* Live Radar Pulse Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium w-fit shrink-0 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for Opportunities</span>
          </div>
        </div>

        {/* Staggered Interactive Activity Cards */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {currentlyItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative p-6 rounded-2xl bg-[var(--color-background)]/60 border border-[var(--color-card-border)] hover:border-[var(--color-primary)]/50 hover:shadow-lg hover:shadow-[var(--color-primary)]/5 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 group-hover:scale-110 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-300 shadow-sm">
                    {iconMap[item.icon] || <Code2 size={18} />}
                  </div>

                  {item.tag && (
                    <span className="text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--color-muted)] group-hover:text-[var(--color-foreground)] transition-colors">
                      {item.tag}
                    </span>
                  )}
                </div>

                <h4 className="font-semibold text-[var(--color-foreground)] text-base mb-2 group-hover:text-[var(--color-primary)] transition-colors flex items-center gap-1.5">
                  <span>{item.title}</span>
                  <ArrowUpRight size={14} className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-[var(--color-primary)]" />
                </h4>

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