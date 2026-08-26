"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowLeft, ArrowRight, Briefcase } from "lucide-react";
import Image from "next/image";

import portfolioData from "@/data/portfolio.json";

interface Project {
  title: string;
  description: string;
  stack: string[];
  image: string;
  github?: string;
  demo?: string;
}

const techEmojis: Record<string, string> = {
  "react": "⚛️",
  "next": "🚀",
  "typescript": "🔷",
  "javascript": "🟨",
  "spring": "🍃",
  "postgres": "🐘",
  "prisma": "◬",
  "java": "☕",
  "python": "🐍",
  "docker": "🐳",
  "aws": "☁️",
  "tailwind": "🌊",
  "node": "🟢",
  "git": "🐙",
  "firebase": "🔥",
  "mongodb": "💾"
};

function getTechEmoji(tech: string): string {
  const normalized = tech.toLowerCase().trim();
  for (const [key, value] of Object.entries(techEmojis)) {
    if (normalized.includes(key)) {
      return value;
    }
  }
  return "💻";
}

export default function Projects() {
  const projects: Project[] = portfolioData.projects;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Screen size detection
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  const maxIndex = isDesktop ? Math.max(0, projects.length - 2) : Math.max(0, projects.length - 1);

  // Synchronize scroll-snap index on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardElement = container.firstElementChild as HTMLElement;
      if (cardElement) {
        const cardWidth = cardElement.offsetWidth;
        const gap = 32; // gap-8 = 32px
        const newIndex = Math.round(scrollLeft / (cardWidth + gap));
        const boundIndex = Math.max(0, Math.min(newIndex, maxIndex));
        setCurrentIndex(boundIndex);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [maxIndex]);

  const slideTo = (index: number) => {
    if (containerRef.current) {
      const cardElement = containerRef.current.firstElementChild as HTMLElement;
      if (cardElement) {
        const cardWidth = cardElement.offsetWidth;
        const gap = 32;
        containerRef.current.scrollTo({
          left: index * (cardWidth + gap),
          behavior: "smooth",
        });
        setCurrentIndex(index);
      }
    }
  };

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      slideTo(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      slideTo(currentIndex - 1);
    }
  };

  return (
    <section id="projects" className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-foreground)] mb-4">
            Featured Projects
          </h2>
          <p className="text-[var(--color-muted)] text-lg max-w-xl">
            A curated selection of my work, demonstrating expertise in full-stack development, database architecture, and API design.
          </p>
        </div>
        <div className="flex items-center gap-6 justify-between md:justify-end w-full md:w-auto">
          <div className="flex items-center gap-2 text-sm text-[var(--color-primary)] font-medium">
            <Briefcase size={16} />
            <span>Portfolio & Work</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="p-3 rounded-full border border-[var(--color-card-border)] bg-[var(--color-card)] text-[var(--color-foreground)] hover:border-[var(--color-primary)]/50 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 cursor-pointer flex items-center justify-center hover:scale-105 active:scale-95"
              aria-label="Previous project"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="p-3 rounded-full border border-[var(--color-card-border)] bg-[var(--color-card)] text-[var(--color-foreground)] hover:border-[var(--color-primary)]/50 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 cursor-pointer flex items-center justify-center hover:scale-105 active:scale-95"
              aria-label="Next project"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative -mx-4 px-4 py-4">
        <div
          ref={containerRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="snap-start shrink-0 w-full md:w-[calc(50%-1rem)] group relative p-6 rounded-[24px] bg-[var(--color-card)] border border-[var(--color-card-border)] hover:border-[var(--color-primary)]/30 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Project Image */}
                <div className="h-74 w-full bg-[var(--color-secondary)]/10 rounded-xl mb-6 overflow-hidden relative">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  )}
                </div>

                <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                   {project.title}
                </h3>
                <p className="text-[var(--color-muted)] mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.stack.map((tech) => {
                    const emoji = getTechEmoji(tech);
                    return (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-[var(--color-foreground)]/70 border border-white/10 hover:bg-white/10 hover:text-[var(--color-foreground)] transition-all duration-300"
                      >
                        <span>{emoji}</span>
                        <span>{tech}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-4">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium hover:text-[var(--color-primary)] transition-colors"
                  >
                    <Github size={16} /> Code
                  </a>
                ) : (
                  <span className="flex items-center gap-2 text-sm font-medium text-[var(--color-muted)] opacity-50 cursor-not-allowed">
                    <Github size={16} /> Code
                  </span>
                )}
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium hover:text-[var(--color-primary)] transition-colors"
                  >
                    <ExternalLink size={16} /> Demo
                  </a>
                ) : (
                  <span className="flex items-center gap-2 text-sm font-medium text-[var(--color-muted)] opacity-50 cursor-not-allowed">
                    <ExternalLink size={16} /> Demo
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}