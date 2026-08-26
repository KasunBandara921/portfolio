"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import portfolioData from "@/data/portfolio.json";

interface Blog {
  title: string;
  summary: string;
  date: string;
  link: string;
  image?: string;
}

export default function Blogs() {
  const blogs: Blog[] = portfolioData.blogs;
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

  const maxIndex = isDesktop ? Math.max(0, blogs.length - 2) : Math.max(0, blogs.length - 1);

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
    <section id="blogs" className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-foreground)] mb-4">
            Recent Blogs
          </h2>
          <p className="text-[var(--color-muted)] text-lg max-w-xl">
            My thoughts, tutorials, and guides about software engineering, architecture, and design.
          </p>
        </div>
        <div className="flex items-center gap-6 justify-between md:justify-end w-full md:w-auto">
          <div className="flex items-center gap-2 text-sm text-[var(--color-primary)] font-medium">
            <BookOpen size={16} />
            <span>Articles & Insights</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="p-3 rounded-full border border-[var(--color-card-border)] bg-[var(--color-card)] text-[var(--color-foreground)] hover:border-[var(--color-primary)]/50 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 cursor-pointer flex items-center justify-center hover:scale-105 active:scale-95"
              aria-label="Previous blog"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="p-3 rounded-full border border-[var(--color-card-border)] bg-[var(--color-card)] text-[var(--color-foreground)] hover:border-[var(--color-primary)]/50 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 cursor-pointer flex items-center justify-center hover:scale-105 active:scale-95"
              aria-label="Next blog"
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
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="snap-start shrink-0 w-full md:w-[calc(50%-1rem)] group relative p-8 rounded-[32px] bg-[var(--color-card)] border border-[var(--color-card-border)] hover:border-[var(--color-primary)]/30 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Blog Image */}
                {blog.image && (
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-[var(--color-card-border)] bg-zinc-900/50">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Blog Date Tag */}
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-muted)] mb-6">
                  <Calendar size={12} />
                  <span>{blog.date}</span>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-4 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed mb-8 line-clamp-3">
                  {blog.summary}
                </p>
              </div>

              {/* Read Article Button Link */}
              <div>
                {blog.link && blog.link !== "#" ? (
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] group-hover:underline"
                  >
                    Read Article <ArrowUpRight size={16} />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] opacity-70 group-hover:opacity-100 transition-opacity cursor-pointer">
                    Read Article (Coming Soon) <ArrowUpRight size={16} className="opacity-50" />
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
