"use client";

import { motion } from "framer-motion";
import { Code2, Server, Database, Cloud, Terminal, Layout, Cpu, GitBranch } from "lucide-react";

import portfolioData from "@/data/portfolio.json";

const iconMap: Record<string, React.ReactNode> = {
    Layout: <Layout />,
    Server: <Server />,
    Database: <Database />,
    Code2: <Code2 />,
    Cloud: <Cloud />,
    Terminal: <Terminal />,
    GitBranch: <GitBranch />,
    Cpu: <Cpu />
};

export default function Skills() {
    const skills = portfolioData.skills;

    return (
        <section id="skills" className="py-20 overflow-hidden">
            <h2 className="text-center text-sm font-medium text-[var(--color-muted)] mb-12 tracking-widest uppercase">
                Technical Ecosystem
            </h2>

            {/* Marquee Row */}
            <div className="flex relative">
                <motion.div
                    className="flex gap-8 whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                >
                    {/* We duplicate the array to create a seamless infinite loop */}
                    {[...skills, ...skills].map((skill, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 px-6 py-4 rounded-full bg-[var(--color-card)] border border-[var(--color-card-border)] hover:border-zinc-700 transition-colors"
                        >
                            <div className="text-[var(--color-primary)]">
                                {iconMap[skill.icon] || <Code2 />}
                            </div>
                            <span className="font-medium text-[var(--color-foreground)]">{skill.name}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}