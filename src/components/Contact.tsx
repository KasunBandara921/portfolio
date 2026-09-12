"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa6";
import emailjs from "@emailjs/browser";
import portfolioData from "@/data/portfolio.json";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const socials = portfolioData.socials || {
    github: "https://github.com/KasunBandara921",
    githubHandle: "@KasunBandara921",
    linkedin: "https://www.linkedin.com/in/kasun-bandara",
    linkedinHandle: "Kasun Bandara",
    medium: "https://medium.com/@kasunbandara_56722",
    mediumHandle: "@kasunbandara_56722",
    email: "bandarakasun495@gmail.com",
    location: "University of Moratuwa, Sri Lanka",
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const socialLinks = [
    {
      name: "GitHub",
      handle: socials.githubHandle || "@KasunBandara921",
      url: socials.github || "https://github.com/KasunBandara921",
      icon: FaGithub,
      description: "Explore repositories & source code",
      badge: "Open Source",
      hoverClass: "hover:border-zinc-500/40 hover:bg-zinc-800/40",
      iconColor: "text-zinc-200 group-hover:text-white",
    },
    {
      name: "LinkedIn",
      handle: socials.linkedinHandle || "Kasun Bandara",
      url: socials.linkedin || "https://www.linkedin.com/in/kasun-bandara",
      icon: FaLinkedin,
      description: "Connect for opportunities & networking",
      badge: "Professional",
      hoverClass: "hover:border-[#0a66c2]/40 hover:bg-[#0a66c2]/10",
      iconColor: "text-[#0a66c2] group-hover:text-[#388bfd]",
    },
    {
      name: "Medium",
      handle: socials.mediumHandle || "@kasunbandara_56722",
      url: socials.medium || "https://medium.com/@kasunbandara_56722",
      icon: FaMedium,
      description: "Read tech articles & engineering notes",
      badge: "Publications",
      hoverClass: "hover:border-emerald-500/40 hover:bg-emerald-500/10",
      iconColor: "text-emerald-400 group-hover:text-emerald-300",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const serviceId =
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_y4vi687";
      const templateId =
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_30kfd6s";
      const publicKey =
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "4EK-GSlUN2_nYeiRY";

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "EmailJS credentials are missing. Please check your environment variables."
        );
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          from_name: formData.name,
          email: formData.email,
          from_email: formData.email,
          reply_to: formData.email,
          message: formData.message,
        },
        publicKey
      );

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err: unknown) {
      console.error("Email send error:", err);
      setIsSubmitting(false);

      let msg = `Failed to deliver message. Please email directly at ${socials.email}.`;
      if (
        err &&
        typeof err === "object" &&
        "text" in err &&
        typeof (err as { text: unknown }).text === "string"
      ) {
        msg = (err as { text: string }).text;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setErrorMessage(msg);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid lg:grid-cols-12 gap-12 lg:gap-16"
      >
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles size={13} />
              Get In Touch
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[var(--color-foreground)] mb-4 tracking-tight">
              Let&apos;s Connect
            </h2>
            <p className="text-[var(--color-muted)] text-base md:text-lg leading-relaxed">
              I&apos;m always open to new opportunities, collaborations, internships, or simply sharing thoughts on engineering. Drop me a line or connect via any platform below!
            </p>
          </div>

          {/* Direct Contact Items */}
          <div className="space-y-4">
            {/* Email Card with Copy Action */}
            <div className="p-4 rounded-2xl bg-[var(--color-card)] border border-[var(--color-card-border)] flex items-center justify-between gap-4 group hover:border-[var(--color-primary)]/40 transition-all duration-300">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail size={19} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-wider">
                    Direct Email
                  </h4>
                  <a
                    href={`mailto:${socials.email}`}
                    className="text-sm md:text-base font-medium text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors truncate block"
                  >
                    {socials.email}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                title="Copy email address"
                className="p-2.5 rounded-xl bg-[var(--color-background)]/70 hover:bg-[var(--color-primary)] hover:text-white text-[var(--color-muted)] border border-[var(--color-card-border)] transition-all shrink-0 cursor-pointer"
              >
                {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>

            {/* Location Card */}
            <div className="p-4 rounded-2xl bg-[var(--color-card)] border border-[var(--color-card-border)] flex items-center gap-3.5 group hover:border-[var(--color-primary)]/40 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <MapPin size={19} />
              </div>
              <div>
                <h4 className="text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-wider">
                  Location
                </h4>
                <p className="text-sm md:text-base font-medium text-[var(--color-foreground)]">
                  {socials.location}
                </p>
              </div>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="pt-2 space-y-3">
            <h3 className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">
              Social Profiles & Links
            </h3>
            <div className="grid sm:grid-cols-1 gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group p-4 rounded-2xl bg-[var(--color-card)] border border-[var(--color-card-border)] ${social.hoverClass} transition-all duration-300 flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-11 h-11 rounded-xl bg-[var(--color-background)]/80 border border-[var(--color-card-border)] flex items-center justify-center shrink-0 ${social.iconColor} group-hover:scale-110 transition-all duration-300`}
                      >
                        <Icon size={19} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors">
                            {social.name}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-background)] border border-[var(--color-card-border)] text-[var(--color-muted)] font-medium">
                            {social.badge}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--color-muted)] truncate mt-0.5">
                          {social.handle}
                        </p>
                      </div>
                    </div>

                    <div className="p-2 text-[var(--color-muted)] group-hover:text-[var(--color-foreground)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                      <ArrowUpRight size={16} />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          <div className="p-8 md:p-10 rounded-[32px] bg-[var(--color-card)] border border-[var(--color-card-border)] relative overflow-hidden shadow-2xl backdrop-blur-xl">
            {/* Subtle background glow */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-[var(--color-primary)]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="mb-6 relative z-10">
              <h3 className="text-2xl font-bold text-[var(--color-foreground)] tracking-tight">
                Send a Message
              </h3>
              <p className="text-sm text-[var(--color-muted)] mt-1">
                Fill out the form below and I&apos;ll get back to you promptly.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-[var(--color-foreground)]">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-[var(--color-background)]/50 border border-[var(--color-card-border)] text-[var(--color-foreground)] placeholder-zinc-500 focus:outline-none focus:border-[var(--color-primary)]/50 focus:ring-1 focus:ring-[var(--color-primary)]/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-[var(--color-foreground)]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-[var(--color-background)]/50 border border-[var(--color-card-border)] text-[var(--color-foreground)] placeholder-zinc-500 focus:outline-none focus:border-[var(--color-primary)]/50 focus:ring-1 focus:ring-[var(--color-primary)]/50 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-[var(--color-foreground)]">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-[var(--color-background)]/50 border border-[var(--color-card-border)] text-[var(--color-foreground)] placeholder-zinc-500 focus:outline-none focus:border-[var(--color-primary)]/50 focus:ring-1 focus:ring-[var(--color-primary)]/50 resize-none transition-all"
                  placeholder="How can I help you?"
                />
              </div>

              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs md:text-sm flex items-start gap-3">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-white rounded-2xl font-medium hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Success Overlay */}
            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[var(--color-card)] z-20 flex flex-col items-center justify-center p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
                    className="text-[var(--color-primary)] mb-4"
                  >
                    <CheckCircle2 size={56} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-2">Message Sent!</h3>
                  <p className="text-[var(--color-muted)] max-w-sm">
                    Thank you for reaching out. I have received your message and will get back to you shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
