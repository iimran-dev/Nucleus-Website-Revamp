"use client";

import { motion } from "framer-motion";

// oversized typography wall — standards enter progressively with different scales
const STANDARDS = [
  { code: "AS9100", scale: "text-[clamp(3.5rem,9vw,8rem)]", delay: 0, weight: "font-bold" },
  { code: "NADCAP", scale: "text-[clamp(2.4rem,5.5vw,4.5rem)]", delay: 0.1, weight: "font-semibold" },
  { code: "ISO 13485", scale: "text-[clamp(2.8rem,7vw,6rem)]", delay: 0.2, weight: "font-bold" },
  { code: "IRIS", scale: "text-[clamp(2rem,4vw,3.5rem)]", delay: 0.3, weight: "font-semibold" },
  { code: "ISO 27001", scale: "text-[clamp(3rem,8vw,7rem)]", delay: 0.4, weight: "font-bold" },
  { code: "ISO 9001", scale: "text-[clamp(2.6rem,6vw,5rem)]", delay: 0.5, weight: "font-semibold" },
  { code: "ISO 14001", scale: "text-[clamp(2.2rem,4.5vw,3.8rem)]", delay: 0.6, weight: "font-medium" },
  { code: "ISO 45001", scale: "text-[clamp(2rem,3.8vw,3.2rem)]", delay: 0.7, weight: "font-medium" },
];

export function StandardsWall() {
  return (
    <section
      className="relative bg-[var(--navy)] text-white py-24 lg:py-36 overflow-hidden"
      aria-label="Global standards"
    >
      <div className="absolute inset-0 bg-grid-navy opacity-50 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-[80%] bg-glow-royal pointer-events-none" />

      <div className="container-nucleus relative">
        <div className="grid lg:grid-cols-12 gap-8 mb-14">
          <div className="lg:col-span-8">
            <p className="text-eyebrow text-[var(--royal)] mb-4">/ Global Standards Wall</p>
            <h2 className="text-headline text-white text-balance">
              Every standard we engineer your organization toward.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pt-3">
            <p className="text-lede" style={{ color: "rgba(255,255,255,0.75)" }}>
              We don&apos;t bolt standards on. We design your management
              system so multiple standards operate from one coherent core.
            </p>
          </div>
        </div>

        {/* typographic wall — staggered asymmetric layout */}
        <div className="flex flex-col items-start gap-2 lg:gap-1">
          {STANDARDS.map((s, i) => (
            <motion.div
              key={s.code}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: s.delay, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <div
                className={`font-display ${s.scale} ${s.weight} leading-[0.95] tracking-[-0.04em] text-white/90 hover:text-white transition-colors`}
                style={{
                  marginLeft: `${(i % 4) * 6}%`,
                }}
              >
                {s.code}
                <span className="text-[var(--royal)]/60 ml-3 align-top text-[0.3em] font-medium tracking-wider">
                  /{String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* footer caption */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="text-mono-label text-white/40">
            / 08 STANDARDS · ONE COHERENT SYSTEM
          </div>
          <a
            href="#certifications"
            className="group inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
          >
            Explore certification ecosystem
            <span className="h-px w-8 bg-white/40 group-hover:bg-white group-hover:w-12 transition-all" />
          </a>
        </div>
      </div>
    </section>
  );
}
