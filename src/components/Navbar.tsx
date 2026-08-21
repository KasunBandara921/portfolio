"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
];

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to trigger the glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--color-background)]/80 backdrop-blur-md border-b border-white/5 py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tighter text-[var(--color-foreground)]">
          Kasun<span className="text-[var(--color-primary)]">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Resume Button */}
        <div className="hidden md:block">
          <a
            href="/resume.pdf"
            target="_blank"
            className="px-5 py-2.5 rounded-full bg-[var(--color-card)] border border-white/10 text-[var(--color-foreground)] text-sm font-medium hover:bg-[var(--color-card-hover)] transition-colors"
          >
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-[var(--color-foreground)]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </div>
    </motion.header>
  );
}