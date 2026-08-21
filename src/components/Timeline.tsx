"use client";

import { motion } from "framer-motion";

import portfolioData from "@/data/portfolio.json";

export default function Timeline() {
  const events = portfolioData.experience;
  return (
    <section id="experience" className="py-32 px-6 max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold text-[var(--color-foreground)] mb-16 text-center">Experience</h2>
      
      <div className="space-y-12 border-l border-[var(--color-primary)]/20 ml-4">
        {events.map((event, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative pl-8"
          >
            {/* The dot on the line */}
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]" />
            
            <span className="text-[var(--color-primary)] font-mono text-sm">{event.year}</span>
            <h3 className="text-xl font-bold text-[var(--color-foreground)] mt-1">{event.title}</h3>
            <p className="text-[var(--color-muted)] mt-2">{event.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}