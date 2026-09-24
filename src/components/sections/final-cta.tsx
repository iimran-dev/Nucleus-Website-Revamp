"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";

export function FinalCTA() {
  const reduced = useReducedMotion();
  return (
    <section
      id="contact"
      className="relative bg-[var(--navy-deep)] text-white overflow-hidden"
      aria-label="Book a consultation"
    >
      {/* background image */}
      <div className="absolute inset-0">
        <motion.img
          src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=2400&q=80"
          alt="Mountain summit at dawn representing the journey to certification readiness"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.06 }}
          animate={{ scale: reduced ? 1.06 : 1 }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy-deep)]/85 via-[var(--navy-deep)]/75 to-[var(--navy-deep)]/95" />
        <div className="absolute inset-0 bg-grid-navy opacity-30" />
      </div>

      <div className="container-nucleus relative">
        <div className="py-28 lg:py-40 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-eyebrow text-[var(--royal)] mb-5"
          >
            / Ready when you are
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.6rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.035em] text-white text-balance"
          >
            Ready to get certified?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lede max-w-xl text-pretty" style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Transform compliance into a competitive advantage — structured, evidence-backed
            and built around your commercial intent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white text-[var(--navy)] px-6 py-4 text-sm font-semibold hover:bg-[var(--royal)] hover:text-white transition-colors"
            >
              Book Consultation
              <ArrowUpRight className="h-4 w-4 arrow-nudge" strokeWidth={1.75} />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-4 text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              <Phone className="h-4 w-4" strokeWidth={1.75} />
              Talk To Expert
            </a>
            <a
              href="https://wa.me/910000000000"
              className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-4 text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
              WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-16 flex items-center gap-4 text-mono-label text-white/40 text-[0.62rem]"
          >
            <span>INDIA · UAE · SOUTHEAST ASIA</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>30-MINUTE SCOPING CALL</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>RESPONSE WITHIN 24H</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
