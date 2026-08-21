"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-32 px-6 max-w-4xl mx-auto">
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
    </section>
  );
}