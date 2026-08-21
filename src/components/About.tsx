"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Visual / Image Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative aspect-square rounded-[32px] overflow-hidden bg-[var(--color-card)] border border-white/10"
        >
          {/* You can place your professional photo here */}
          <div className="absolute inset-0 flex items-center justify-center text-[var(--color-muted)]">
            [Photo Placeholder]
          </div>
        </motion.div>

        {/* Right Side: Narrative */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
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

          <div className="grid grid-cols-2 gap-6">
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
      </div>
    </section>
  );
}