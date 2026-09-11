"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Command,
  Sun,
  Moon,
  Copy,
  Check,
  FileText,
  Github,
  BookOpen,
  ArrowRight,
  FolderGit2,
  Sparkles,
  Compass,
  User,
  Cpu,
  Mail,
  X,
  Layers,
} from "lucide-react";
import portfolioData from "@/data/portfolio.json";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Navigation" | "Projects" | "Actions";
  icon: React.ReactNode;
  perform: () => void;
  keywords?: string[];
  shortcut?: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Toggle Theme helper
  const handleToggleTheme = () => {
    const isLight = document.documentElement.classList.contains("light");
    if (isLight) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("bandarakasun495@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
    }, 2500);
  };

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    if (id === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Build command items list
  const allItems: CommandItem[] = useMemo(() => {
    const navItems: CommandItem[] = [
      {
        id: "nav-about",
        title: "About Me",
        subtitle: "Education, background, and current focus",
        category: "Navigation",
        icon: <User size={18} />,
        perform: () => scrollToSection("#about"),
        keywords: ["about", "education", "moratuwa", "student", "bio"],
      },
      {
        id: "nav-skills",
        title: "Technical Ecosystem",
        subtitle: "Languages, frameworks, and dev tools",
        category: "Navigation",
        icon: <Cpu size={18} />,
        perform: () => scrollToSection("#skills"),
        keywords: ["skills", "tech", "react", "nextjs", "spring", "docker", "aws"],
      },
      {
        id: "nav-projects",
        title: "Featured Projects",
        subtitle: "Full-stack apps, AI tools, and architectures",
        category: "Navigation",
        icon: <FolderGit2 size={18} />,
        perform: () => scrollToSection("#projects"),
        keywords: ["projects", "work", "portfolio", "apps", "code"],
      },
      {
        id: "nav-milestones",
        title: "Milestones & Journey",
        subtitle: "Career timeline and achievements",
        category: "Navigation",
        icon: <Compass size={18} />,
        perform: () => scrollToSection("#milestones"),
        keywords: ["milestones", "timeline", "experience", "journey", "ifs"],
      },
      {
        id: "nav-blogs",
        title: "Articles & Insights",
        subtitle: "Technical blogs on Medium",
        category: "Navigation",
        icon: <BookOpen size={18} />,
        perform: () => scrollToSection("#blogs"),
        keywords: ["blogs", "articles", "medium", "writing", "spring boot"],
      },
      {
        id: "nav-contact",
        title: "Get In Touch",
        subtitle: "Contact form and direct messages",
        category: "Navigation",
        icon: <Mail size={18} />,
        perform: () => scrollToSection("#contact"),
        keywords: ["contact", "email", "message", "hire", "collaborate"],
      },
    ];

    const projectItems: CommandItem[] = (portfolioData.projects || []).map((project, idx) => ({
      id: `project-${idx}`,
      title: project.title,
      subtitle: project.stack?.slice(0, 4).join(" · "),
      category: "Projects",
      icon: <Layers size={18} />,
      perform: () => {
        scrollToSection("#projects");
      },
      keywords: ["project", ...project.stack, project.title],
    }));

    const actionItems: CommandItem[] = [
      {
        id: "action-copy-email",
        title: copiedEmail ? "Email Copied to Clipboard!" : "Copy Email Address",
        subtitle: "bandarakasun495@gmail.com",
        category: "Actions",
        icon: copiedEmail ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />,
        perform: handleCopyEmail,
        keywords: ["copy", "email", "mail", "contact", "gmail"],
        shortcut: "Click",
      },
      {
        id: "action-resume",
        title: "View / Download Resume",
        subtitle: "PDF version of curriculum vitae",
        category: "Actions",
        icon: <FileText size={18} />,
        perform: () => {
          window.open("/resume.pdf", "_blank");
          setIsOpen(false);
        },
        keywords: ["resume", "cv", "pdf", "bio", "experience"],
        shortcut: "PDF",
      },
      {
        id: "action-theme",
        title: "Toggle Theme",
        subtitle: "Switch between dark and light mode",
        category: "Actions",
        icon: <Sparkles size={18} />,
        perform: () => {
          handleToggleTheme();
          setIsOpen(false);
        },
        keywords: ["theme", "dark", "light", "mode", "toggle", "color"],
      },
      {
        id: "action-github",
        title: "Visit GitHub Profile",
        subtitle: "github.com/KasunBandara921",
        category: "Actions",
        icon: <Github size={18} />,
        perform: () => {
          window.open("https://github.com/KasunBandara921", "_blank");
          setIsOpen(false);
        },
        keywords: ["github", "git", "profile", "repo", "repositories"],
        shortcut: "↗",
      },
      {
        id: "action-medium",
        title: "Visit Medium Profile",
        subtitle: "medium.com/@kasunbandara_56722",
        category: "Actions",
        icon: <BookOpen size={18} />,
        perform: () => {
          window.open("https://medium.com/@kasunbandara_56722", "_blank");
          setIsOpen(false);
        },
        keywords: ["medium", "blog", "articles", "stories", "writing"],
        shortcut: "↗",
      },
    ];

    return [...navItems, ...actionItems, ...projectItems];
  }, [copiedEmail]);

  // Filter items based on user search query
  const filteredItems = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return allItems;
    return allItems.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSubtitle = item.subtitle?.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchKeywords = item.keywords?.some((k) => k.toLowerCase().includes(q));
      return matchTitle || matchSubtitle || matchCategory || matchKeywords;
    });
  }, [allItems, search]);

  // Reset selectedIndex whenever search query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Listen for global keyboard shortcut (Cmd+K / Ctrl+K / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation within list
  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (filteredItems.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = filteredItems[selectedIndex];
      if (current) {
        current.perform();
      }
    }
  };

  // Group filtered items by category
  const groupedCategories = useMemo(() => {
    const categories: { name: string; items: { item: CommandItem; globalIndex: number }[] }[] = [];
    const categoryMap: Record<string, { item: CommandItem; globalIndex: number }[]> = {};

    filteredItems.forEach((item, index) => {
      if (!categoryMap[item.category]) {
        categoryMap[item.category] = [];
      }
      categoryMap[item.category].push({ item, globalIndex: index });
    });

    ["Actions", "Navigation", "Projects"].forEach((catName) => {
      if (categoryMap[catName]?.length) {
        categories.push({ name: catName, items: categoryMap[catName] });
      }
    });

    return categories;
  }, [filteredItems]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100000] flex items-start justify-center pt-20 md:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl bg-[var(--color-card)]/95 backdrop-blur-2xl border border-[var(--color-card-border)] rounded-2xl shadow-2xl shadow-black/40 overflow-hidden flex flex-col max-h-[75vh]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-card-border)]">
              <Search size={20} className="text-[var(--color-primary)] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyNavigation}
                placeholder="Type a command, project, or section..."
                className="w-full bg-transparent text-[var(--color-foreground)] placeholder-zinc-500 text-base focus:outline-none"
              />
              {search ? (
                <button
                  onClick={() => setSearch("")}
                  className="p-1 text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  <X size={16} />
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400">
                  ESC
                </kbd>
              )}
            </div>

            {/* Results List */}
            <div
              ref={listRef}
              className="overflow-y-auto p-3 space-y-4 max-h-[50vh] [scrollbar-width:thin]"
            >
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-[var(--color-muted)] text-sm">
                  <p className="font-medium text-base text-[var(--color-foreground)] mb-1">
                    No results found
                  </p>
                  <p>Try searching for &quot;About&quot;, &quot;Projects&quot;, &quot;Resume&quot;, or &quot;Email&quot;</p>
                </div>
              ) : (
                groupedCategories.map((group) => (
                  <div key={group.name} className="space-y-1">
                    <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                      {group.name}
                    </div>

                    {group.items.map(({ item, globalIndex }) => {
                      const isSelected = selectedIndex === globalIndex;
                      return (
                        <div
                          key={item.id}
                          onClick={() => item.perform()}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                            isSelected
                              ? "bg-[var(--color-primary)]/15 text-[var(--color-foreground)] border border-[var(--color-primary)]/30"
                              : "text-[var(--color-foreground)]/80 hover:bg-white/5 border border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`p-2 rounded-lg transition-colors ${
                                isSelected
                                  ? "bg-[var(--color-primary)] text-white shadow-sm shadow-[var(--color-primary)]/50"
                                  : "bg-white/5 text-[var(--color-primary)] border border-white/5"
                              }`}
                            >
                              {item.icon}
                            </div>
                            <div className="min-w-0">
                              <p
                                className={`text-sm font-medium truncate ${
                                  isSelected ? "text-[var(--color-foreground)] font-semibold" : ""
                                }`}
                              >
                                {item.title}
                              </p>
                              {item.subtitle && (
                                <p className="text-xs text-[var(--color-muted)] truncate">
                                  {item.subtitle}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pl-3 shrink-0">
                            {item.shortcut && (
                              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400">
                                {item.shortcut}
                              </span>
                            )}
                            {isSelected && (
                              <ArrowRight size={14} className="text-[var(--color-primary)] animate-pulse" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer Bar with Keyboard Hints */}
            <div className="px-5 py-3 border-t border-[var(--color-card-border)] bg-[var(--color-background)]/60 flex items-center justify-between text-xs text-[var(--color-muted)]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">
                    ↑
                  </kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">
                    ↓
                  </kbd>{" "}
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">
                    ↵
                  </kbd>{" "}
                  Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">
                    esc
                  </kbd>{" "}
                  Close
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-primary)] font-medium">
                <Command size={12} />
                <span>Command Palette</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
