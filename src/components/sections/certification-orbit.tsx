"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Cert = {
  code: string;
  name: string;
  angle: number; // degrees on orbit
  radius: number; // px on desktop
  orbit: number; // ring index 0..2
};

const CERTS: Cert[] = [
  { code: "ISO 9001", name: "Quality Management Systems", angle: -30, radius: 150, orbit: 0 },
  { code: "AS9100", name: "Aerospace Quality Management", angle: 40, radius: 150, orbit: 0 },
  { code: "ISO 13485", name: "Medical Device QMS", angle: 150, radius: 150, orbit: 0 },
  { code: "NADCAP", name: "Special Process Accreditation", angle: 245, radius: 150, orbit: 0 },
  { code: "IRIS", name: "Railway Industry Standard", angle: 10, radius: 250, orbit: 1 },
  { code: "ISO 27001", name: "Information Security", angle: 90, radius: 250, orbit: 1 },
  { code: "ISO 45001", name: "Occupational H&S", angle: 175, radius: 250, orbit: 1 },
  { code: "ISO 14001", name: "Environmental Management", angle: 280, radius: 250, orbit: 1 },
];

export function CertificationOrbit() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  // slow auto-rotation (cancellable on hover)
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setRotation((r) => (r + dt * 1.2) % 360); // very slow
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <section
      id="certifications"
      className="relative py-24 lg:py-32 bg-[var(--ice)] overflow-hidden"
      aria-label="Certification ecosystem"
    >
      <div className="absolute inset-0 bg-grid-ice pointer-events-none opacity-70" />
      <div className="container-nucleus relative">
        {/* Section header */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 mb-16 lg:mb-20">
          <div className="lg:col-span-7">
            <p className="text-eyebrow text-[var(--royal)] mb-4">/ Certification Ecosystem</p>
            <h2 className="text-headline text-[var(--navy)] text-balance">
              One nucleus.
              <span className="text-[var(--muted-foreground)]">&nbsp;Every standard your organization needs to operate globally.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-3">
            <p className="text-lede text-[var(--muted-foreground)]">
              We orchestrate the full spectrum of management-system certifications
              through a single, structured transformation — eliminating redundant
              audits and accelerating time-to-certificate.
            </p>
          </div>
        </div>

        {/* Orbit + mobile fallback */}
        <div ref={wrapRef} className="relative">
          {/* Desktop orbital composition */}
          <div className="hidden lg:grid place-items-center min-h-[700px]">
            <OrbitalStage
              certs={CERTS}
              rotation={rotation}
              active={active}
              setActive={setActive}
              reduced={reduced}
            />
          </div>

          {/* Mobile vertical ecosystem */}
          <div className="lg:hidden">
            <MobileEcosystem certs={CERTS} active={active} setActive={setActive} />
          </div>
        </div>
      </div>
    </section>
  );
}

function OrbitalStage({
  certs,
  rotation,
  active,
  setActive,
  reduced,
}: {
  certs: Cert[];
  rotation: number;
  active: string | null;
  setActive: (s: string | null) => void;
  reduced: boolean;
}) {
  const size = 660;
  const c = size / 2;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* outer orbital rings */}
      <svg
        className="absolute inset-0"
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        aria-hidden
      >
        <defs>
          <radialGradient id="nucleus-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0E63FF" stopOpacity="0.10" />
            <stop offset="55%" stopColor="#0E63FF" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#0E63FF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nucleus-disc" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#071B3A" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#071B3A" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* faint filled disc to give orbit body */}
        <circle cx={c} cy={c} r="265" fill="url(#nucleus-disc)" />
        <circle cx={c} cy={c} r="220" fill="url(#nucleus-core)" />
        {/* rings — strengthened */}
        <circle
          cx={c}
          cy={c}
          r="150"
          stroke="rgba(7,27,58,0.55)"
          strokeWidth="1.75"
          strokeDasharray="2 6"
        />
        <circle
          cx={c}
          cy={c}
          r="250"
          stroke="rgba(7,27,58,0.42)"
          strokeWidth="1.5"
          strokeDasharray="2 6"
        />
        {/* royal accent outer ring — made a real accent */}
        <circle
          cx={c}
          cy={c}
          r="285"
          stroke="rgba(14,99,255,0.65)"
          strokeWidth="1.75"
          strokeDasharray="1 10"
        />
        {/* tick marks every 30deg */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          const x1 = c + 295 * Math.cos(a);
          const y1 = c + 295 * Math.sin(a);
          const x2 = c + 305 * Math.cos(a);
          const y2 = c + 305 * Math.sin(a);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(7,27,58,0.45)"
              strokeWidth="1.2"
            />
          );
        })}
        {/* connecting line from core to hovered cert */}
        {active &&
          (() => {
            const cert = certs.find((x) => x.code === active);
            if (!cert) return null;
            const a = ((cert.angle + rotation) * Math.PI) / 180;
            const x = c + cert.radius * Math.cos(a);
            const y = c + cert.radius * Math.sin(a);
            return (
              <line
                x1={c}
                y1={c}
                x2={x}
                y2={y}
                stroke="var(--royal)"
                strokeWidth="1.25"
                strokeDasharray="3 4"
                opacity="0.85"
              />
            );
          })()}
      </svg>

      {/* core */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 180, height: 180 }}
      >
        <div className="relative h-full w-full">
          {/* pulsing ring */}
          <div className="absolute inset-0 rounded-full border border-[var(--royal)]/30 animate-pulse-soft" />
          <div className="absolute inset-4 rounded-full bg-[var(--navy)] grid place-items-center text-center text-white shadow-[0_18px_40px_-12px_rgba(7,27,58,0.5)]">
            <div>
              <div className="font-display text-2xl font-bold tracking-[-0.03em]">NUCLEUS</div>
              <div className="mt-1 text-mono-label text-[0.6rem] text-white/60 px-4 leading-tight">
                Compliance for a<br />Better Tomorrow
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* certification nodes — counter-rotate so labels stay upright */}
      {certs.map((cert) => {
        const a = ((cert.angle + rotation) * Math.PI) / 180;
        const x = c + cert.radius * Math.cos(a);
        const y = c + cert.radius * Math.sin(a);
        const isActive = active === cert.code;
        return (
          <button
            key={cert.code}
            type="button"
            onMouseEnter={() => setActive(cert.code)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(cert.code)}
            onBlur={() => setActive(null)}
            className="absolute z-10"
            style={{
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
            }}
            aria-label={`${cert.code} — ${cert.name}`}
          >
            <motion.div
              animate={{
                scale: isActive ? 1.08 : 1,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative"
            >
              <div
                className={`rounded-full px-3.5 py-2 backdrop-blur-md transition-all duration-300 ${
                  isActive
                    ? "bg-[var(--navy)] text-white border border-[var(--royal)] shadow-[0_12px_28px_-10px_rgba(14,99,255,0.55)]"
                    : "bg-white/85 text-[var(--navy)] border border-[var(--navy)]/10 shadow-[0_6px_18px_-10px_rgba(7,27,58,0.25)]"
                }`}
              >
                <div className="font-display text-[0.78rem] font-semibold tracking-[-0.01em] whitespace-nowrap">
                  {cert.code}
                </div>
              </div>
              {/* tooltip description */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 rounded-lg bg-[var(--navy-deep)] text-white px-3.5 py-2.5 shadow-xl text-left z-20"
                >
                  <div className="text-mono-label text-[var(--royal)] text-[0.6rem]">
                    {cert.code}
                  </div>
                  <div className="mt-1 text-[0.78rem] font-medium leading-snug">
                    {cert.name}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </button>
        );
      })}

      {/* technical corner labels */}
      <div className="absolute top-0 left-0 text-mono-label text-[var(--navy)]/40">FIG.01 / ECOSYSTEM</div>
      <div className="absolute bottom-0 right-0 text-mono-label text-[var(--navy)]/40">
        {reduced ? "STATIONARY" : "ORBIT · LIVE"}
      </div>
    </div>
  );
}

function MobileEcosystem({
  certs,
  active,
  setActive,
}: {
  certs: Cert[];
  active: string | null;
  setActive: (s: string | null) => void;
}) {
  return (
    <div className="relative">
      {/* central nucleus */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <div className="absolute inset-0 rounded-full border border-[var(--royal)]/30 animate-pulse-soft" />
          <div className="h-32 w-32 rounded-full bg-[var(--navy)] grid place-items-center text-center text-white">
            <div>
              <div className="font-display text-base font-bold">NUCLEUS</div>
              <div className="text-mono-label text-[0.55rem] text-white/60 mt-1 px-2 leading-tight">
                Better Tomorrow
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* vertical list */}
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--navy)]/15" />
        <div className="space-y-2">
          {certs.map((cert) => {
            const isActive = active === cert.code;
            return (
              <button
                key={cert.code}
                type="button"
                onClick={() => setActive(isActive ? null : cert.code)}
                className="w-full text-left flex items-center gap-4 pl-0 pr-2 py-3"
                aria-expanded={isActive}
              >
                <span
                  className={`relative z-10 grid place-items-center h-8 w-8 rounded-full transition-colors ${
                    isActive ? "bg-[var(--royal)]" : "bg-white border border-[var(--navy)]/15"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-white" : "bg-[var(--navy)]/40"}`} />
                </span>
                <div className="flex-1">
                  <div className="font-display text-[0.95rem] font-semibold text-[var(--navy)]">
                    {cert.code}
                  </div>
                  <div
                    className={`grid transition-all duration-300 ${
                      isActive ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden text-[0.82rem] text-[var(--muted-foreground)] leading-snug">
                      {cert.name}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
