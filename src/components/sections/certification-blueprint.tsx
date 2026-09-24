"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const NODES = [
  { id: "req", label: "Requirements", code: "01", x: 80, y: 100 },
  { id: "proc", label: "Processes", code: "02", x: 200, y: 220 },
  { id: "doc", label: "Documents", code: "03", x: 120, y: 340 },
  { id: "train", label: "Training", code: "04", x: 340, y: 120 },
  { id: "evid", label: "Evidence", code: "05", x: 460, y: 250 },
  { id: "aud", label: "Audits", code: "06", x: 380, y: 380 },
  { id: "capa", label: "Corrective Actions", code: "07", x: 560, y: 140 },
  { id: "cert", label: "Certification", code: "08", x: 640, y: 320 },
] as const;

// connecting lines (curved blueprint)
const PATHS = [
  ["req", "proc"],
  ["proc", "doc"],
  ["proc", "train"],
  ["train", "evid"],
  ["doc", "evid"],
  ["evid", "aud"],
  ["aud", "capa"],
  ["capa", "cert"],
  ["aud", "cert"],
] as const;

export function CertificationBlueprint() {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // draw lines progressively across 0.15 -> 0.6
  const draw = useTransform(scrollYProgress, [0.15, 0.6], [0, 1]);
  const sealScale = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
  const sealOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
  const finalTextOpacity = useTransform(scrollYProgress, [0.82, 0.95], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative bg-[#02060f] text-white py-24 lg:py-32 overflow-hidden"
      aria-label="The Certification Blueprint"
    >
      {/* blueprint grid */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(14,99,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(14,99,255,0.10) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container-nucleus relative">
        {/* header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-14">
          <div className="lg:col-span-8">
            <p className="text-eyebrow text-[var(--royal)] mb-4">/ The Certification Blueprint™</p>
            <h2 className="text-headline text-white text-balance">
              An engineering blueprint for
              <span className="text-white/55">&nbsp;organizational compliance.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pt-3">
            <p className="text-lede" style={{ color: "rgba(255,255,255,0.8)" }}>
              We don&apos;t hand you a template — we draft your organization as
              a system: requirements, processes, evidence, and audit checkpoints
              in continuous alignment.
            </p>
          </div>
        </div>

        {/* blueprint canvas */}
        <div className="relative rounded-2xl border border-white/10 bg-white/[0.015] p-6 lg:p-10 overflow-hidden">
          {/* corner ticks */}
          <CornerTicks />

          <div className="relative aspect-[16/10] max-w-5xl mx-auto">
            <svg viewBox="0 0 720 460" className="absolute inset-0 h-full w-full" fill="none">
              <defs>
                <linearGradient id="bp-line" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#0E63FF" />
                  <stop offset="100%" stopColor="#9cc2ff" />
                </linearGradient>
              </defs>

              {/* paths */}
              {PATHS.map((p, i) => {
                const a = NODES.find((n) => n.id === p[0])!;
                const b = NODES.find((n) => n.id === p[1])!;
                const mx = (a.x + b.x) / 2;
                const my = (a.y + b.y) / 2;
                // slight curvature
                const cx = Math.round((mx + Math.cos(i * 1.7) * 30) * 100) / 100;
                const cy = Math.round((my + Math.sin(i * 1.3) * 24) * 100) / 100;
                const d = `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
                const start = 0.15 + (i / PATHS.length) * 0.4;
                const end = start + 0.08;
                return (
                  <BlueprintPath
                    key={i}
                    d={d}
                    progress={scrollYProgress}
                    start={start}
                    end={end}
                    reduced={reduced}
                  />
                );
              })}

              {/* nodes */}
              {NODES.map((n, i) => {
                const start = 0.2 + (i / NODES.length) * 0.45;
                return (
                  <BlueprintNode
                    key={n.id}
                    node={n}
                    progress={scrollYProgress}
                    start={start}
                    reduced={reduced}
                  />
                );
              })}

              {/* certification seal */}
              <motion.g
                style={{ opacity: sealOpacity, scale: reduced ? 1 : sealScale, transformOrigin: "640px 320px" }}
              >
                <circle cx="640" cy="320" r="48" fill="none" stroke="#0E63FF" strokeWidth="1.5" strokeDasharray="2 4" />
                <circle cx="640" cy="320" r="34" fill="rgba(14,99,255,0.12)" stroke="#0E63FF" strokeWidth="1" />
                <text x="640" y="316" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600" fontFamily="var(--font-display)">
                  CERTIFIED
                </text>
                <text x="640" y="330" textAnchor="middle" fill="#9cc2ff" fontSize="7" fontFamily="monospace" letterSpacing="1.5">
                  READY FOR GROWTH
                </text>
              </motion.g>
            </svg>

            {/* floating technical labels */}
            <div className="absolute top-3 left-3 text-mono-label text-white/40 text-[0.6rem]">
              DWG · NUCLEUS-BP-01
            </div>
            <div className="absolute top-3 right-3 text-mono-label text-white/40 text-[0.6rem]">
              SCALE 1:1 / REV A
            </div>
          </div>

          {/* final state */}
          <motion.div
            style={{ opacity: finalTextOpacity }}
            className="mt-10 grid sm:grid-cols-3 gap-4 lg:gap-8 text-center"
          >
            <div className="border-t border-[var(--royal)]/40 pt-4">
              <div className="font-display text-2xl lg:text-3xl font-bold tracking-[-0.03em] text-white">CERTIFIED.</div>
              <div className="text-mono-label text-white/45 mt-1">/01</div>
            </div>
            <div className="border-t border-[var(--royal)]/40 pt-4">
              <div className="font-display text-2xl lg:text-3xl font-bold tracking-[-0.03em] text-white">COMPLIANT.</div>
              <div className="text-mono-label text-white/45 mt-1">/02</div>
            </div>
            <div className="border-t border-[var(--royal)]/40 pt-4">
              <div className="font-display text-2xl lg:text-3xl font-bold tracking-[-0.03em] text-white">READY FOR GROWTH.</div>
              <div className="text-mono-label text-white/45 mt-1">/03</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BlueprintPath({
  d,
  progress,
  start,
  end,
  reduced,
}: {
  d: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  reduced: boolean;
}) {
  const pathLength = useTransform(progress, [start, end], [0, 1]);
  const opacity = useTransform(progress, [start - 0.02, start], [0.15, 1]);
  if (reduced) {
    return <path d={d} stroke="url(#bp-line)" strokeWidth="1.5" fill="none" opacity={0.9} />;
  }
  return <motion.path d={d} stroke="url(#bp-line)" strokeWidth="1.5" fill="none" style={{ pathLength, opacity }} />;
}

function BlueprintNode({
  node,
  progress,
  start,
  reduced,
}: {
  node: (typeof NODES)[number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  reduced: boolean;
}) {
  const opacity = useTransform(progress, [start - 0.05, start], [0.25, 1]);
  const dotScale = useTransform(progress, [start, start + 0.04], [0.4, 1]);
  const ringR = useTransform(progress, [start, start + 0.08], [4, 16]);
  return (
    <motion.g style={{ opacity }}>
      <motion.circle cx={node.x} cy={node.y} r={reduced ? 14 : ringR} fill="none" stroke="#0E63FF" strokeWidth="1" opacity={0.6} />
      <motion.circle cx={node.x} cy={node.y} r={reduced ? 4 : dotScale} fill="#0E63FF" />
      <circle cx={node.x} cy={node.y} r="2" fill="#fff" />
      <line x1={node.x} y1={node.y - 22} x2={node.x} y2={node.y - 14} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <text x={node.x} y={node.y - 28} textAnchor="middle" fill="#fff" fontSize="9" fontFamily="monospace" letterSpacing="1.5">
        {node.code}
      </text>
      <text x={node.x} y={node.y + 28} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="500" fontFamily="var(--font-display)">
        {node.label}
      </text>
    </motion.g>
  );
}

function CornerTicks() {
  return (
    <>
      <span className="absolute top-2 left-2 h-3 w-3 border-t border-l border-[var(--royal)]/50" />
      <span className="absolute top-2 right-2 h-3 w-3 border-t border-r border-[var(--royal)]/50" />
      <span className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-[var(--royal)]/50" />
      <span className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-[var(--royal)]/50" />
    </>
  );
}
