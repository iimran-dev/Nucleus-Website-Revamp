"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Insight = {
  id: string;
  topic: string;
  title: string;
  detail: string;
  date: string;
  trend: "up" | "shift" | "stable";
};

const INSIGHTS: Insight[] = [
  {
    id: "reg",
    topic: "Regulatory Updates",
    title: "EU MDR post-market surveillance tightening",
    detail: "Notified bodies are intensifying PMS documentation expectations across Class IIa devices.",
    date: "2025 · Q1",
    trend: "up",
  },
  {
    id: "shift",
    topic: "Industry Shifts",
    title: "Aerospace supplier consolidation drives NADCAP uptake",
    detail: "Primes tightening special-process accreditation across tier-2 supply chains.",
    date: "2025 · Q1",
    trend: "up",
  },
  {
    id: "trend",
    topic: "Quality Trends",
    title: "Risk-based thinking maturing in automotive audits",
    detail: "IATF auditors increasing emphasis on risk evidence during process audits.",
    date: "2025 · Q2",
    trend: "shift",
  },
  {
    id: "cert",
    topic: "Certification Changes",
    title: "ISO 27001:2022 transition deadlines approach",
    detail: "Organizations should be actively evidencing the new Annex A controls before transition window closes.",
    date: "2025 · Q2",
    trend: "up",
  },
  {
    id: "tech",
    topic: "Technology Changes",
    title: "Connected medical devices reshape 13485 scope",
    detail: "Cybersecurity evidence increasingly expected in design files for connected devices.",
    date: "2025 · Q3",
    trend: "shift",
  },
];

export function InsightsTimeline() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // horizontal scroll translate
  // We translate the inner row from 0% to ~-60% over the pinned section
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-62%"]);

  return (
    <section
      ref={ref}
      className="relative bg-[var(--silver)]"
      style={{ height: `${INSIGHTS.length * 60}vh` }}
      aria-label="Industry insights timeline"
    >
      <div className="absolute inset-0 bg-grid-ice pointer-events-none opacity-50" />
      {/* sticky horizontal viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="container-nucleus relative z-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-eyebrow text-[var(--royal)] mb-3">/ Industry Insights Timeline</p>
              <h2 className="text-headline text-[var(--navy)] text-balance max-w-2xl">
                Where the standards are heading.
              </h2>
            </div>
            <div className="hidden md:block text-mono-label text-[var(--navy)]/40">
              SCROLL → TO ADVANCE
            </div>
          </div>
        </div>

        {/* horizontal track */}
        <motion.div
          style={{ x }}
          className="flex gap-6 pl-[5%] pr-[20%] will-change-transform"
        >
          {INSIGHTS.map((it, i) => (
            <InsightCard key={it.id} insight={it} index={i} />
          ))}
        </motion.div>

        {/* progress bar */}
        <div className="container-nucleus mt-10">
          <div className="h-px w-full bg-[var(--navy)]/10 relative overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="absolute left-0 top-0 h-full w-full bg-[var(--royal)] origin-left"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InsightCard({ insight, index }: { insight: Insight; index: number }) {
  return (
    <article className="relative shrink-0 w-[78vw] sm:w-[60vw] lg:w-[36vw] xl:w-[30vw] rounded-2xl border border-[var(--navy)]/10 bg-white p-7 lg:p-8 shadow-[0_18px_50px_-30px_rgba(7,27,58,0.35)]">
      {/* date / topic */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="grid place-items-center h-9 w-9 rounded-full bg-[var(--ice)] border border-[var(--navy)]/10 font-display text-sm font-bold text-[var(--navy)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-mono-label text-[var(--royal)] text-[0.62rem]">
            {insight.topic.toUpperCase()}
          </span>
        </div>
        <span className="text-mono-label text-[var(--muted-foreground)] text-[0.6rem]">
          {insight.date}
        </span>
      </div>

      <h3 className="font-display text-xl lg:text-2xl font-semibold tracking-[-0.02em] text-[var(--navy)] leading-tight text-balance">
        {insight.title}
      </h3>
      <p className="mt-3 text-[0.95rem] text-[var(--muted-foreground)] leading-relaxed">
        {insight.detail}
      </p>

      {/* mini trend bar */}
      <div className="mt-7 pt-5 border-t border-[var(--navy)]/8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-mono-label text-[var(--muted-foreground)] text-[0.58rem]">SIGNAL</span>
          <div className="flex items-end gap-0.5 h-4">
            {[2, 4, 3, 6, 8, 7, 10].map((h, i) => (
              <span
                key={i}
                className="w-1 rounded-sm bg-[var(--royal)]"
                style={{ height: `${h * 10}%`, opacity: 0.4 + i * 0.08 }}
              />
            ))}
          </div>
        </div>
        <span
          className={`text-mono-label text-[0.6rem] px-2 py-1 rounded-full ${
            insight.trend === "up"
              ? "bg-emerald-100 text-emerald-700"
              : insight.trend === "shift"
              ? "bg-amber-100 text-amber-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {insight.trend.toUpperCase()}
        </span>
      </div>
    </article>
  );
}
