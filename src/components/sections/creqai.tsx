"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

const MODULES = [
  { code: "01", title: "Audit Management", stat: "94", note: "audit-day readiness" },
  { code: "02", title: "Evidence Collection", stat: "1.2k", note: "documents linked" },
  { code: "03", title: "CAPA Tracking", stat: "−62%", note: "closure time" },
  { code: "04", title: "Corrective Actions", stat: "100%", note: "traceability" },
  { code: "05", title: "Client Portal", stat: "live", note: "24/7 access" },
  { code: "06", title: "Compliance Tracking", stat: "98.7%", note: "real-time" },
];

export function CreqAISection() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  // subtle parallax for the glass panels
  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const offset = (window.innerHeight / 2 - center) / window.innerHeight;
        el.style.setProperty("--py", `${offset}`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-36 bg-[var(--navy-deep)] text-white overflow-hidden"
      aria-label="CREQAI digital compliance"
    >
      <div className="absolute inset-0 bg-grid-navy opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-0 h-[600px] w-[600px] bg-glow-royal pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(60% 60% at 70% 50%, rgba(14,99,255,0.15), transparent 70%)",
        }}
      />

      <div className="container-nucleus relative">
        <div className="grid lg:grid-cols-12 gap-8 mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <p className="text-eyebrow text-[var(--royal)] mb-4">/ CREQAI</p>
            <h2 className="text-headline text-white text-balance">
              Compliance made
              <span className="text-white/55">&nbsp;digital.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-3">
            <p className="text-lede" style={{ color: "rgba(255,255,255,0.75)" }}>
              CREQAI is the operating layer beneath your management system —
              audit schedules, evidence, CAPA and client communication connected
              to the same source of truth.
            </p>
          </div>
        </div>

        {/* floating glass dashboard composition */}
        <div className="relative min-h-[560px] lg:min-h-[640px]">
          {/* main glass panel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-0 lg:right-[5%] lg:left-[15%] glass-panel rounded-3xl p-6 lg:p-8"
            style={{
              transform: reduced ? undefined : "translateY(calc(var(--py,0) * 18px))",
            }}
          >
            {/* dashboard header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="grid place-items-center h-9 w-9 rounded-lg bg-[var(--royal)]/20 border border-[var(--royal)]/40">
                  <span className="h-2 w-2 rounded-full bg-[var(--royal)] animate-pulse-soft" />
                </div>
                <div>
                  <div className="font-display text-base font-semibold text-white">CREQAI Console</div>
                  <div className="text-mono-label text-white/45 text-[0.6rem]">/ LIVE COMPLIANCE STATE</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-mono-label text-white/60 text-[0.6rem]">SYNCED</span>
              </div>
            </div>

            {/* module grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {MODULES.map((m, i) => (
                <motion.div
                  key={m.code}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                  className="rounded-xl bg-white/[0.03] border border-white/8 p-4 hover:bg-white/[0.06] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-mono-label text-[var(--royal)]/70 text-[0.6rem]">{m.code}</span>
                    <span className="h-1 w-1 rounded-full bg-white/30" />
                  </div>
                  <div className="mt-2 font-display text-base font-semibold text-white leading-tight">
                    {m.title}
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-xl font-bold text-white">{m.stat}</span>
                    <span className="text-mono-label text-white/40 text-[0.58rem]">{m.note}</span>
                  </div>
                  {/* progress bar */}
                  <div className="mt-3 h-1 w-full rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${60 + i * 6}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-gradient-to-r from-[var(--royal)] to-[#9cc2ff] rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* footer bar */}
            <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
              <div className="flex items-center gap-3 text-mono-label text-white/45 text-[0.6rem]">
                <span>QMS · 4 standards</span>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span>NEXT AUDIT · 38d</span>
              </div>
              <span className="text-mono-label text-white/45 text-[0.6rem]">v 4.2 · ENTERPRISE</span>
            </div>
          </motion.div>

          {/* floating side panel — evidence */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 bottom-[10%] hidden lg:block glass-panel rounded-2xl p-5 w-64"
            style={{
              transform: reduced ? undefined : "translateY(calc(var(--py,0) * -22px))",
            }}
          >
            <div className="text-mono-label text-white/45 text-[0.6rem]">EVIDENCE PIPELINE</div>
            <div className="mt-3 space-y-2">
              {[
                ["Procedure · PR-014", "linked"],
                ["Risk register", "linked"],
                ["Audit report Q3", "in review"],
                ["CAPA · 2025-021", "closed"],
              ].map(([k, v], i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center justify-between text-[0.78rem]"
                >
                  <span className="text-white/80">{k}</span>
                  <span className="text-mono-label text-white/40 text-[0.58rem]">{v}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 h-1 w-full rounded-full bg-white/5 overflow-hidden">
              <div className="h-full w-[72%] bg-[var(--royal)]" />
            </div>
          </motion.div>

          {/* floating top-right small panel — audit calendar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="absolute right-0 top-[8%] hidden lg:block glass-panel rounded-2xl p-4 w-52"
            style={{
              transform: reduced ? undefined : "translateY(calc(var(--py,0) * 14px))",
            }}
          >
            <div className="text-mono-label text-white/45 text-[0.6rem]">AUDIT SCHEDULE</div>
            <div className="mt-3 grid grid-cols-7 gap-1">
              {Array.from({ length: 21 }).map((_, i) => {
                const active = [3, 8, 14, 19].includes(i);
                return (
                  <span
                    key={i}
                    className={`aspect-square rounded-[2px] ${active ? "bg-[var(--royal)]" : "bg-white/8"}`}
                  />
                );
              })}
            </div>
            <div className="mt-3 flex items-center gap-2 text-mono-label text-white/45 text-[0.58rem]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--royal)]" /> 4 audits scheduled
            </div>
          </motion.div>

          {/* technical annotation lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block opacity-40"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="creqai-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0E63FF" stopOpacity="0" />
                <stop offset="50%" stopColor="#0E63FF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0E63FF" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}
