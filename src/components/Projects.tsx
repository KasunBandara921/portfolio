"use client";

import { motion } from "framer-motion";


// To this specific import if the above fails:
import { Github } from "lucide-react";
import { ExternalLink } from "lucide-react";
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

  return (
    <section id="projects" className="py-32 px-6 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-4xl font-bold text-[var(--color-foreground)] mb-16"
      >
        Featured Projects
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="group relative p-6 rounded-[24px] bg-[var(--color-card)] border border-[var(--color-card-border)] hover:border-[var(--color-primary)]/30 transition-all duration-500"
          >
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
    </section>
  );
}