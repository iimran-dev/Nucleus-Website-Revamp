"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity, Calendar, CheckCircle2, FileText, ShieldCheck } from "lucide-react";

const MODULES = [
  { code: "01", title: "Audit Management", stat: "94%", note: "audit readiness", progress: 94 },
  { code: "02", title: "Evidence Vault", stat: "1.2k", note: "records linked", progress: 88 },
  { code: "03", title: "CAPA Tracking", stat: "−62%", note: "cycle time", progress: 62 },
  { code: "04", title: "Traceability Matrix", stat: "100%", note: "clause coverage", progress: 100 },
  { code: "05", title: "Client Portal", stat: "Live", note: "24/7 transparent", progress: 90 },
  { code: "06", title: "Compliance Engine", stat: "98.7%", note: "continuous audit", progress: 98 },
];

const EVIDENCE_ITEMS = [
  { name: "Procedure · PR-014", status: "Linked", statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  { name: "Risk Register Rev 4.2", status: "Linked", statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  { name: "Internal Audit Q3 Report", status: "In Review", statusColor: "text-amber-300 bg-amber-500/10 border-amber-500/20" },
  { name: "CAPA · 2025-021 Resolution", status: "Closed", statusColor: "text-blue-300 bg-blue-500/10 border-blue-500/20" },
];

export function CreqAISection() {
  return (
    <section
      id="creqai"
      className="relative py-16 sm:py-20 lg:py-24 bg-[var(--navy-deep)] text-white overflow-hidden border-t border-white/[0.06]"
      aria-label="CREQAI digital compliance platform"
    >
      {/* Ambient background glow and grid */}
      <div className="absolute inset-0 bg-grid-navy opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[var(--royal)]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="container-nucleus relative z-10">
        {/* Clean, well-aligned header */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 mb-10 lg:mb-12 items-end">
          <div className="lg:col-span-7">
            <p className="text-eyebrow text-[var(--royal)] mb-2">/ Digital Compliance Infrastructure</p>
            <h2 className="font-display text-[clamp(1.85rem,3.2vw,3rem)] font-bold text-white tracking-[-0.025em] leading-[1.08] text-balance">
              Compliance made <span className="text-white/50">digital, continuous & audited.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[0.95rem] lg:text-[1.02rem] text-white/70 leading-relaxed">
              <strong className="text-white font-medium">CREQAI</strong> serves as the unified operational layer beneath your management system — connecting audit schedules, evidence repositories, CAPA workflows, and client visibility into a single verifiable source of truth.
            </p>
          </div>
        </div>

        {/* Clean, structured 2-column dashboard layout (8 cols + 4 cols) */}
        <div className="grid lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          {/* Main Console Panel (8 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 rounded-2xl glass-panel p-5 sm:p-7 border border-white/10 relative overflow-hidden"
          >
            {/* Top status bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-[var(--royal)]/20 border border-[var(--royal)]/40 flex items-center justify-center shrink-0">
                  <Activity className="h-4 w-4 text-[var(--royal-soft)]" />
                </div>
                <div>
                  <div className="font-display text-sm sm:text-base font-semibold text-white tracking-tight flex items-center gap-2">
                    CREQAI Operational Console
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/10 text-white/70">v4.2</span>
                  </div>
                  <div className="text-[0.62rem] font-mono uppercase tracking-[0.16em] text-white/45 mt-0.5">
                    Live System-Wide Assurance State
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Real-Time Sync</span>
                </div>
              </div>
            </div>

            {/* 6 Modules Grid — perfectly aligned 2x3 on mobile/tablet, 3x2 on desktop */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3.5 mt-5">
              {MODULES.map((m) => (
                <div
                  key={m.code}
                  className="rounded-xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.12] p-4 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-mono-label text-[var(--royal-soft)] text-[0.6rem] font-semibold">{m.code}</span>
                      <ShieldCheck className="h-3.5 w-3.5 text-white/30 group-hover:text-[var(--royal-soft)] transition-colors" />
                    </div>
                    <div className="mt-2 font-display text-sm font-semibold text-white leading-tight">
                      {m.title}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="font-display text-xl font-bold text-white tracking-tight">{m.stat}</span>
                      <span className="text-[0.62rem] font-mono text-white/45 uppercase">{m.note}</span>
                    </div>
                    <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[var(--royal)] to-[var(--royal-soft)] rounded-full transition-all duration-700"
                        style={{ width: `${m.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom status metadata */}
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-mono-label text-white/50 text-[0.62rem]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-white/80">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" /> 4 Active Standards
                </span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span>Next External Audit: 38 Days</span>
              </div>
              <span className="text-white/40">Enterprise Tier SLA 99.98%</span>
            </div>
          </motion.div>

          {/* Right Column Panels (4 Columns) — cleanly stacked & aligned */}
          <div className="lg:col-span-4 flex flex-col gap-5 w-full">
            {/* 1. Evidence Pipeline Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl glass-panel p-5 border border-white/10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[var(--royal-soft)]" />
                  <span className="font-display text-sm font-semibold text-white">Evidence Pipeline</span>
                </div>
                <span className="text-mono-label text-emerald-400 text-[0.6rem]">72% Ready</span>
              </div>

              <div className="mt-3.5 space-y-2.5">
                {EVIDENCE_ITEMS.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[0.8rem]"
                  >
                    <span className="text-white/80 truncate text-xs">{item.name}</span>
                    <span className={`text-[0.6rem] font-mono px-2 py-0.5 rounded border shrink-0 uppercase ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3.5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[0.62rem] font-mono text-white/45">
                <span>1,248 Verified Artifacts</span>
                <span className="text-emerald-400">Tamper-Proof Audit Trail</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
