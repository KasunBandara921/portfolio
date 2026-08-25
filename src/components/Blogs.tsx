"use client";

import { motion } from "framer-motion";
import { BookOpen, Calendar, ArrowUpRight } from "lucide-react";
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

  return (
    <section id="blogs" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-foreground)] mb-4">
            Recent Blogs
          </h2>
          <p className="text-[var(--color-muted)] text-lg max-w-xl">
            My thoughts, tutorials, and guides about software engineering, architecture, and design.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-[var(--color-primary)] font-medium">
          <BookOpen size={16} />
          <span>Articles & Insights</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {blogs.map((blog, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="group relative p-8 rounded-[32px] bg-[var(--color-card)] border border-[var(--color-card-border)] hover:border-[var(--color-primary)]/30 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
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
    </section>
  );
}
