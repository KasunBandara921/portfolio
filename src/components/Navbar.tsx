"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Milestones", href: "#milestones" },
  { name: "Blogs", href: "#blogs" },
  { name: "Contact", href: "#contact" },
];

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    } else {
      const isLight = document.documentElement.classList.contains("light");
      setTheme(isLight ? "light" : "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

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
          ? "bg-[var(--color-background)]/90 backdrop-blur-md border-b border-[var(--color-card-border)] py-4 shadow-lg shadow-black/20"
          : "bg-black/30 backdrop-blur-md border-b border-[var(--color-card-border)] py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tighter text-[var(--color-foreground)] hover:opacity-90 transition-opacity">
          Kasun<span className="text-[var(--color-primary)]">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-300 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Controls (Theme Toggle + Resume + Mobile Menu) */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-full bg-[var(--color-card)] border border-[var(--color-card-border)] text-zinc-300 hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center shadow-md hover:border-[var(--color-primary)]/40 duration-200"
          >
            {!mounted || theme === "dark" ? (
              <Sun size={18} className="text-[var(--color-primary)]" />
            ) : (
              <Moon size={18} className="text-[var(--color-primary)]" />
            )}
          </button>

          <div className="hidden md:block">
            <a
              href="/resume.pdf"
              target="_blank"
              className="px-5 py-2.5 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-zinc-200 text-sm font-medium hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-300"
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
      </div>
    </motion.header>
  );
}