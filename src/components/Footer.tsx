"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa6";
import { Mail } from "lucide-react";
import portfolioData from "@/data/portfolio.json";

export default function Footer() {
  const socials = portfolioData.socials || {
    github: "https://github.com/KasunBandara921",
    linkedin: "https://www.linkedin.com/in/kasun-bandara",
    medium: "https://medium.com/@kasunbandara_56722",
    email: "bandarakasun495@gmail.com",
  };

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Blog", href: "#blogs" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="border-t border-[var(--color-card-border)] bg-[var(--color-background)]/80 pt-12 pb-16 px-6 transition-colors overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
        {/* Navigation & Social Icons Row */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-[var(--color-card-border)]">
          {/* Quick Nav */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-[var(--color-muted)]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[var(--color-primary)] transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-10 h-10 rounded-xl bg-[var(--color-card)] border border-[var(--color-card-border)] flex items-center justify-center text-[var(--color-muted)] hover:text-white hover:border-zinc-500 transition-all hover:scale-105"
            >
              <FaGithub size={17} />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-10 h-10 rounded-xl bg-[var(--color-card)] border border-[var(--color-card-border)] flex items-center justify-center text-[var(--color-muted)] hover:text-[#0a66c2] hover:border-[#0a66c2]/50 transition-all hover:scale-105"
            >
              <FaLinkedin size={17} />
            </a>
            <a
              href={socials.medium}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Medium Profile"
              className="w-10 h-10 rounded-xl bg-[var(--color-card)] border border-[var(--color-card-border)] flex items-center justify-center text-[var(--color-muted)] hover:text-emerald-400 hover:border-emerald-500/50 transition-all hover:scale-105"
            >
              <FaMedium size={17} />
            </a>
            <a
              href={`mailto:${socials.email}`}
              aria-label="Send direct email"
              className="w-10 h-10 rounded-xl bg-[var(--color-card)] border border-[var(--color-card-border)] flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/50 transition-all hover:scale-105"
            >
              <Mail size={17} />
            </a>
          </div>
        </div>

        {/* Stylized Dynamic Kasun Bandara Banner */}
        <div className="w-full text-center space-y-3 select-none overflow-hidden py-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 md:gap-x-8 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none uppercase pointer-events-none"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, x: -140 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 50,
                    damping: 15,
                    mass: 0.8,
                  },
                },
              }}
              className="bg-gradient-to-b from-[var(--color-foreground)]/25 via-[var(--color-foreground)]/10 to-transparent bg-clip-text text-transparent inline-block will-change-transform"
            >
              Kasun
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, x: 140 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 50,
                    damping: 15,
                    mass: 0.8,
                    delay: 0.05,
                  },
                },
              }}
              className="bg-gradient-to-b from-[var(--color-foreground)]/25 via-[var(--color-foreground)]/10 to-transparent bg-clip-text text-transparent inline-block will-change-transform"
            >
              Bandara
            </motion.span>
          </motion.h2>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] tracking-wide pt-2">
            © 2026 Kasun Bandara. All rights reserved.
          </p>
          <motion.p
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-[11px] sm:text-xs text-[var(--color-primary)] font-medium tracking-wider uppercase inline-block"
          >
            Powered by OOP
          </motion.p>
        </div>
      </div>
    </footer>
  );
}


