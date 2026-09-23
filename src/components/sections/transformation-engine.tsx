"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type Step = {
  id: number;
  code: string;
  title: string;
  desc: string;
};

const STEPS: Step[] = [
  { id: 1, code: "01", title: "Business Goals", desc: "We map compliance to commercial intent — markets, customers, risk appetite, growth horizon." },
  { id: 2, code: "02", title: "Gap Analysis", desc: "Diagnostic against the target standard, scored against process maturity, evidence, and culture." },
  { id: 3, code: "03", title: "Documentation & Planning", desc: "Manuals, procedures, risk registers and project plan — authored, not templated." },
  { id: 4, code: "04", title: "Training & Enablement", desc: "Role-specific capability transfer so the system survives the audit and the year after it." },
  { id: 5, code: "05", title: "Implementation Support", desc: "Embedded support during rollout — we are present on the floor, not on the slides." },
  { id: 6, code: "06", title: "Audit Preparation", desc: "Mock audits, evidence rehearsal and corrective-action rehearsals until audit-day is routine." },
  { id: 7, code: "07", title: "Certification & Beyond", desc: "Audit success, certificate issue, and the post-certification improvement roadmap." },
];

/**
 * Transformation Engine — signature scroll-driven section.
 * Uses sticky pinning + framer-motion useScroll to drive:
 *   1. SVG pathway drawing (progressive)
 *   2. Node activation in sequence
 *   3. Step content reveal
 */
export function TransformationEngine() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // pathway drawing (0 -> 1 across the whole pin)
  const pathLength = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);
  const pathOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  // total steps; we activate one segment at a time
  const segments = STEPS.length;

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="relative bg-[var(--navy-deep)] text-white"
      style={{ height: `${segments * 60}vh` }}
      aria-label="The Compliance Transformation Engine"
    >
      <div className="absolute inset-0 bg-grid-navy opacity-50 pointer-events-none" />

      {/* sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy-deep)] via-[var(--navy-deep)] to-[#01060f]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] bg-glow-royal pointer-events-none" />

        <div className="container-nucleus relative h-full">
          {/* header */}
          <div className="absolute top-10 lg:top-14 inset-x-0 z-20">
            <div className="container-nucleus">
              <div className="flex items-baseline justify-between">
                <p className="text-eyebrow text-[var(--royal)]">/ The Compliance Transformation Engine™</p>
                <ProgressIndicator steps={segments} progress={scrollYProgress} />
              </div>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,2.8vw,2.4rem)] font-semibold tracking-[-0.025em] text-white text-balance max-w-3xl">
                Seven stages. One structured path from intent to certificate.
              </h2>
            </div>
          </div>

          {/* composition */}
          <div className="absolute inset-0 grid lg:grid-cols-12">
            {/* left rail — step list */}
            <div className="hidden lg:flex lg:col-span-5 items-center">
              <StepRail steps={STEPS} progress={scrollYProgress} reduced={reduced} />
            </div>

            {/* right — pathway diagram */}
            <div className="lg:col-span-7 relative">
              <PathwayDiagram
                steps={STEPS}
                pathLength={pathLength}
                pathOpacity={pathOpacity}
                progress={scrollYProgress}
                reduced={reduced}
              />
            </div>
          </div>

          {/* mobile step stack */}
          <div className="lg:hidden absolute inset-x-0 bottom-0 top-32 px-5 overflow-y-auto scroll-premium pb-10">
            <MobilePathway steps={STEPS} progress={scrollYProgress} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgressIndicator({
  steps,
  progress,
}: {
  steps: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  return (
    <div className="hidden sm:flex items-center gap-2">
      <motion.span
        className="font-display text-sm font-semibold text-white"
      >
        <ActiveStepText progress={progress} total={steps} />
      </motion.span>
      <span className="text-mono-label text-white/40">/ {String(steps).padStart(2, "0")}</span>
    </div>
  );
}

function ActiveStepText({
  progress,
  total,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  total: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  return (
    <motion.span
      ref={ref}
      style={{
        // we render the active step using a frame callback via onUpdate
      }}
    >
      01
    </motion.span>
  );
}

function StepRail({
  steps,
  progress,
  reduced,
}: {
  steps: Step[];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
}) {
  return (
    <div className="relative w-full max-w-md">
      <div className="space-y-1">
        {steps.map((s, i) => {
          const start = i / steps.length;
          const end = (i + 1) / steps.length;
          return <StepRow key={s.id} step={s} start={start} end={end} progress={progress} reduced={reduced} index={i} total={steps.length} />;
        })}
      </div>
    </div>
  );
}

function StepRow({
  step,
  start,
  end,
  progress,
  reduced,
  index,
  total,
}: {
  step: Step;
  start: number;
  end: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
  index: number;
  total: number;
}) {
  const opacity = useTransform(progress, [Math.max(0, start - 0.05), start, end, Math.min(1, end + 0.05)], [0.35, 1, 1, 0.35]);
  const x = useTransform(progress, [start, end], [0, 8]);
  const dotScale = useTransform(progress, [start, start + 0.02], [0.7, 1]);
  const dotColor = useTransform(progress, [start - 0.02, start], ["#1e3a6e", "#0E63FF"]);

  return (
    <motion.div style={{ opacity, x }} className="flex items-start gap-4 py-4 border-b border-white/5">
      <motion.span
        style={{ scale: reduced ? 1 : dotScale, backgroundColor: reduced ? "#0E63FF" : dotColor }}
        className="mt-1 h-2.5 w-2.5 rounded-full flex-none"
      />
      <div>
        <div className="flex items-center gap-3">
          <span className="text-mono-label text-white/45 text-[0.62rem]">STEP {step.code}</span>
        </div>
        <h3 className="mt-1 font-display text-xl font-semibold tracking-[-0.02em] text-white">
          {step.title}
        </h3>
        <p className="mt-1.5 text-[0.86rem] text-white/65 leading-relaxed max-w-sm">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}

function PathwayDiagram({
  steps,
  pathLength,
  pathOpacity,
  progress,
  reduced,
}: {
  steps: Step[];
  pathLength: ReturnType<typeof useTransform>;
  pathOpacity: ReturnType<typeof useTransform>;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
}) {
  const W = 720;
  const H = 560;
  const cx = W / 2;
  // vertical nodes
  const nodeYs = steps.map((_, i) => 80 + (i * (H - 160)) / (steps.length - 1));
  // path: gentle S-curve through nodes
  const d = nodeYs
    .map((y, i) => {
      const x = cx + (i % 2 === 0 ? -120 : 120);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className="absolute inset-0 grid place-items-center">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[680px] h-full" fill="none" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="path-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0E63FF" />
            <stop offset="100%" stopColor="#7aa8ff" />
          </linearGradient>
          <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0E63FF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0E63FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* background ghost path */}
        <path d={d} stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="3 6" />

        {/* animated drawing path */}
        <motion.path
          d={d}
          stroke="url(#path-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength, opacity: pathOpacity }}
        />

        {/* nodes */}
        {steps.map((s, i) => {
          const x = cx + (i % 2 === 0 ? -120 : 120);
          const y = nodeYs[i];
          const start = i / steps.length;
          const mid = (i + 0.5) / steps.length;
          return (
            <PathNode
              key={s.id}
              x={x}
              y={y}
              step={s}
              progress={progress}
              start={start}
              mid={mid}
              reduced={reduced}
              side={i % 2 === 0 ? "left" : "right"}
            />
          );
        })}

        {/* start label */}
        <text x="40" y="40" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="monospace" letterSpacing="2">
          INTENT
        </text>
        <text x={W - 90} y={H - 20} fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="monospace" letterSpacing="2">
          CERTIFICATE
        </text>
      </svg>
    </div>
  );
}

function PathNode({
  x,
  y,
  step,
  progress,
  start,
  mid,
  reduced,
  side,
}: {
  x: number;
  y: number;
  step: Step;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  mid: number;
  reduced: boolean;
  side: "left" | "right";
}) {
  const r = useTransform(progress, [Math.max(0, start - 0.05), mid], [4, 12]);
  const glowOpacity = useTransform(progress, [start, mid], [0, 1]);
  const labelOpacity = useTransform(progress, [start, mid + 0.01], [0.25, 1]);
  const labelY = useTransform(progress, [start, mid], [4, 0]);

  return (
    <g>
      {/* glow */}
      <motion.circle cx={x} cy={y} r="36" fill="url(#node-glow)" style={{ opacity: glowOpacity }} />
      {/* ring */}
      <motion.circle
        cx={x}
        cy={y}
        r={18}
        fill="none"
        stroke="#0E63FF"
        strokeWidth="1"
        style={{ opacity: glowOpacity, scale: reduced ? 1 : 1 }}
        transform={`translate(${x} ${y}) scale(1) translate(${-x} ${-y})`}
      />
      {/* dot */}
      <motion.circle cx={x} cy={y} fill="#0E63FF" style={{ r: reduced ? 8 : r }} />
      <circle cx={x} cy={y} r="3" fill="#fff" />

      {/* label */}
      <motion.g style={{ opacity: labelOpacity }}>
        <motion.line
          x1={x}
          y1={y}
          x2={side === "left" ? x - 60 : x + 60}
          y2={y}
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
          style={{ opacity: labelOpacity }}
        />
        <motion.text
          x={side === "left" ? x - 70 : x + 70}
          y={y + 1}
          fill="#fff"
          fontSize="13"
          fontFamily="var(--font-display), sans-serif"
          fontWeight="600"
          textAnchor={side === "left" ? "end" : "start"}
          dominantBaseline="middle"
          style={{ opacity: labelOpacity, y: reduced ? y : labelY }}
        >
          {step.title}
        </motion.text>
        <motion.text
          x={side === "left" ? x - 70 : x + 70}
          y={y + 16}
          fill="rgba(255,255,255,0.45)"
          fontSize="9"
          fontFamily="monospace"
          letterSpacing="2"
          textAnchor={side === "left" ? "end" : "start"}
        >
          STEP {step.code}
        </motion.text>
      </motion.g>
    </g>
  );
}

function MobilePathway({
  steps,
  progress,
}: {
  steps: Step[];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  return (
    <div className="space-y-4">
      {steps.map((s, i) => {
        const start = i / steps.length;
        const end = (i + 1) / steps.length;
        return (
          <MobileStep key={s.id} step={s} start={start} end={end} progress={progress} index={i} />
        );
      })}
    </div>
  );
}

function MobileStep({
  step,
  start,
  end,
  progress,
  index,
}: {
  step: Step;
  start: number;
  end: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
}) {
  const opacity = useTransform(progress, [Math.max(0, start - 0.05), start, end, Math.min(1, end + 0.05)], [0.4, 1, 1, 0.4]);
  const borderColor = useTransform(progress, [start, start + 0.01], ["rgba(255,255,255,0.06)", "rgba(14,99,255,0.5)"]);
  return (
    <motion.div
      style={{ opacity, borderColor }}
      className="rounded-xl border bg-white/[0.03] p-4"
    >
      <div className="flex items-center gap-2">
        <span className="grid place-items-center h-6 w-6 rounded-full bg-[var(--royal)] text-white text-[0.7rem] font-semibold">
          {step.code}
        </span>
        <h3 className="font-display text-base font-semibold text-white">{step.title}</h3>
      </div>
      <p className="mt-2 text-[0.86rem] text-white/65 leading-relaxed">{step.desc}</p>
    </motion.div>
  );
}
