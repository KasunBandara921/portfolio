"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending message (or hook up to EmailJS if desired)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: "", email: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid md:grid-cols-5 gap-16"
      >
        {/* Info Column */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-[var(--color-foreground)] mb-6">
              Let's Connect
            </h2>
            <p className="text-[var(--color-muted)] text-lg leading-relaxed">
              I'm always open to new opportunities, collaborations, or simply sharing thoughts on technology. Drop me a line, and I'll get back to you as soon as possible!
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-card)] border border-[var(--color-card-border)] flex items-center justify-center text-[var(--color-primary)] group-hover:border-[var(--color-primary)]/30 transition-all">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">Email</h4>
                <a href="mailto:bandarakasun495@gmail.com" className="text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors">
                  bandarakasun495@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-card)] border border-[var(--color-card-border)] flex items-center justify-center text-[var(--color-primary)] group-hover:border-[var(--color-primary)]/30 transition-all">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">Location</h4>
                <p className="text-[var(--color-foreground)]">
                  University of Moratuwa, Sri Lanka
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-3">
          <div className="p-8 rounded-[32px] bg-[var(--color-card)] border border-[var(--color-card-border)] relative overflow-hidden">
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-white rounded-2xl font-medium hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
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
