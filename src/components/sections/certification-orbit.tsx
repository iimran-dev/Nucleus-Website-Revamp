"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

type CertGroup = "all" | "quality" | "cyber" | "special";

type Cert = {
  code: string;
  name: string;
  category: string;
  scope: string;
  impact: string;
  group: "quality" | "cyber" | "special";
  angle: number; // degrees on orbit
  radius: number; // px in desktop coordinate space (660x660)
  mobileRadius: number; // px in mobile coordinate space (320x320)
  orbit: number; // ring index 0..1
};

const CERTS: Cert[] = [
  {
    code: "ISO 9001",
    name: "Quality Management Systems",
    category: "Operational Quality",
    scope: "Global benchmark for quality management, process consistency, and risk-based operational governance.",
    impact: "Universal supply chain prerequisite across 170+ countries.",
    group: "quality",
    angle: -30,
    radius: 150,
    mobileRadius: 76,
    orbit: 0,
  },
  {
    code: "AS9100",
    name: "Aerospace Quality Management",
    category: "Aerospace & Defense",
    scope: "Stringent aviation, defense, and space standard requiring tight configuration control and counterfeit part prevention.",
    impact: "Mandatory qualification for Boeing, Airbus, and DoD Tier-1 suppliers.",
    group: "quality",
    angle: 40,
    radius: 150,
    mobileRadius: 76,
    orbit: 0,
  },
  {
    code: "ISO 13485",
    name: "Medical Device QMS",
    category: "Life Sciences & Devices",
    scope: "Rigorous quality management system for medical device manufacturers, ensuring clinical safety and FDA/MDR alignment.",
    impact: "Unlocks accelerated EU CE-mark and global medical device distribution.",
    group: "quality",
    angle: 150,
    radius: 150,
    mobileRadius: 76,
    orbit: 0,
  },
  {
    code: "NADCAP",
    name: "Special Process Accreditation",
    category: "Special Processes",
    scope: "Deep technical accreditation covering heat treatment, coatings, welding, and NDT administered by PRI.",
    impact: "Highest technical scrutiny in defense and aerospace manufacturing.",
    group: "special",
    angle: 245,
    radius: 150,
    mobileRadius: 76,
    orbit: 0,
  },
  {
    code: "IRIS",
    name: "Railway Industry Standard",
    category: "Transportation & Rail",
    scope: "ISO/TS 22163 global management standard for railway rolling stock, track equipment, and signaling infrastructure.",
    impact: "Pre-condition for UNIFE global rolling stock procurement tenders.",
    group: "special",
    angle: 10,
    radius: 250,
    mobileRadius: 124,
    orbit: 1,
  },
  {
    code: "ISO 27001",
    name: "Information Security",
    category: "Cybersecurity & Data",
    scope: "Comprehensive ISMS framework governing digital asset security, vulnerability management, and breach prevention.",
    impact: "Essential assurance for enterprise SaaS, banking, and data partners.",
    group: "cyber",
    angle: 90,
    radius: 250,
    mobileRadius: 124,
    orbit: 1,
  },
  {
    code: "ISO 45001",
    name: "Occupational H&S",
    category: "Health & Safety",
    scope: "Proactive framework to eliminate workplace hazards, mitigate industrial injuries, and advance worker safety culture.",
    impact: "Protects workforce liability and strengthens institutional ESG ratings.",
    group: "cyber",
    angle: 175,
    radius: 250,
    mobileRadius: 124,
    orbit: 1,
  },
  {
    code: "ISO 14001",
    name: "Environmental Management",
    category: "Sustainability & ESG",
    scope: "Systematic environmental management system to control resource usage, emissions, waste cycles, and compliance risks.",
    impact: "Drives cost reduction and unlocks green public procurement bids.",
    group: "cyber",
    angle: 280,
    radius: 250,
    mobileRadius: 124,
    orbit: 1,
  },
];

export function CertificationOrbit() {
  const reduced = useReducedMotion() ?? false;
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<string>("ISO 9001");
  const [rotation, setRotation] = useState(0);

  // slow auto-rotation (cancellable on hover)
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setRotation((r) => (r + dt * 1.2) % 360); // slow ambient rotation
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const activeCert = CERTS.find((c) => c.code === active) || CERTS[0];

  return (
    <section
      id="certifications"
      className="relative py-20 lg:py-28 xl:py-32 bg-[var(--ice)] overflow-hidden"
      aria-label="Certification ecosystem"
    >
      <div className="absolute inset-0 bg-grid-ice pointer-events-none opacity-70" />
      <div className="container-nucleus relative">
        {/* DESKTOP VIEW: Split 2 columns (Left: Text & Inspector, Right: Orbit Diagram) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          {/* LEFT COLUMN: Editorial Text & Interactive Standard Inspector */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center">
            <p className="text-eyebrow text-[var(--royal)] mb-3">/ Certification Ecosystem</p>
            <h2 className="text-headline text-[var(--navy)] text-balance">
              One nucleus.
              <span className="text-[var(--muted-foreground)] block mt-1">
                Every standard your organization needs to operate globally.
              </span>
            </h2>
            <p className="text-lede text-[var(--muted-foreground)] mt-4">
              We orchestrate the full spectrum of management-system certifications
              through a single, structured transformation — eliminating redundant
              audits and accelerating time-to-certificate.
            </p>

            {/* Interactive Inspector Card for active cert */}
            <div className="mt-8 rounded-xl border border-[var(--navy)]/10 bg-white/85 backdrop-blur-md p-5 shadow-[0_8px_24px_-12px_rgba(7,27,58,0.12)]">
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[var(--navy)] text-white text-[0.72rem] font-semibold tracking-wide">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--royal)] animate-pulse" />
                  {activeCert.code}
                </div>
                <span className="text-mono-label text-[var(--royal)] text-[0.62rem]">
                  {activeCert.category}
                </span>
              </div>

              <h3 className="font-display text-base font-semibold text-[var(--navy)] tracking-[-0.01em]">
                {activeCert.name}
              </h3>
              <p className="text-[0.84rem] text-[var(--muted-foreground)] leading-relaxed mt-1.5">
                {activeCert.scope}
              </p>

              <div className="mt-3.5 pt-3 border-t border-[var(--navy)]/10 flex items-start gap-2 text-[0.78rem] text-[var(--navy)]">
                <CheckCircle2 className="h-4 w-4 text-[var(--royal)] shrink-0 mt-0.5" />
                <span className="leading-snug font-medium text-[var(--navy)]/90">{activeCert.impact}</span>
              </div>
            </div>

            {/* Quick interactive selector chips */}
            <div className="mt-6">
              <div className="text-mono-label text-[var(--muted-foreground)] text-[0.6rem] mb-2.5">
                SELECT A FRAMEWORK TO INSPECT ORBIT:
              </div>
              <div className="flex flex-wrap gap-2">
                {CERTS.map((c) => {
                  const isSelected = activeCert.code === c.code;
                  return (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => setActive(c.code)}
                      onMouseEnter={() => setActive(c.code)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-[var(--royal)] text-white shadow-sm ring-2 ring-[var(--royal)]/20"
                          : "bg-white/70 hover:bg-white text-[var(--navy)] border border-[var(--navy)]/10"
                      }`}
                    >
                      {c.code}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action / Assurance footer */}
            <div className="mt-8 pt-5 border-t border-[var(--navy)]/10 flex items-center justify-between gap-4">
              <a
                href="#approach"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--royal)] hover:text-[var(--navy)] transition-colors group"
              >
                <span>Explore certification pathways</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
              <div className="flex items-center gap-1.5 text-[0.7rem] text-[var(--muted-foreground)] font-mono">
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--royal)]" />
                <span>IMS Unified Audit</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Nucleus Orbit Diagram */}
          <div ref={wrapRef} className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-end">
            <div className="w-full max-w-[560px] xl:max-w-[620px] aspect-square relative">
              <OrbitalStage
                certs={CERTS}
                rotation={rotation}
                active={active}
                setActive={setActive}
                reduced={reduced}
              />
            </div>
          </div>
        </div>

        {/* MOBILE VIEW: Optimized Vertical Layout with Mini-Orbit & Touch Cards */}
        <div className="lg:hidden">
          <MobileEcosystem
            certs={CERTS}
            active={active}
            setActive={setActive}
            rotation={rotation}
            reduced={reduced}
          />
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
  setActive: (s: string) => void;
  reduced: boolean;
}) {
  const size = 660;
  const c = size / 2;

  return (
    <div className="relative w-full h-full">
      {/* SVG orbit canvas */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        aria-hidden
      >
        <defs>
          <radialGradient id="nucleus-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0E63FF" stopOpacity="0.12" />
            <stop offset="55%" stopColor="#0E63FF" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#0E63FF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nucleus-disc" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#071B3A" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#071B3A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* faint filled disc to give orbit body */}
        <circle cx={c} cy={c} r="270" fill="url(#nucleus-disc)" />
        <circle cx={c} cy={c} r="220" fill="url(#nucleus-core)" />

        {/* rings */}
        <circle
          cx={c}
          cy={c}
          r="150"
          stroke="rgba(7,27,58,0.45)"
          strokeWidth="1.5"
          strokeDasharray="2 6"
        />
        <circle
          cx={c}
          cy={c}
          r="250"
          stroke="rgba(7,27,58,0.35)"
          strokeWidth="1.5"
          strokeDasharray="2 6"
        />
        {/* royal accent outer ring */}
        <circle
          cx={c}
          cy={c}
          r="285"
          stroke="rgba(14,99,255,0.6)"
          strokeWidth="1.75"
          strokeDasharray="1 10"
        />

        {/* tick marks every 30deg */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          const x1 = Math.round((c + 295 * Math.cos(a)) * 100) / 100;
          const y1 = Math.round((c + 295 * Math.sin(a)) * 100) / 100;
          const x2 = Math.round((c + 305 * Math.cos(a)) * 100) / 100;
          const y2 = Math.round((c + 305 * Math.sin(a)) * 100) / 100;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(7,27,58,0.4)"
              strokeWidth="1.2"
            />
          );
        })}

        {/* connecting laser line from core to active cert */}
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
                strokeWidth="1.75"
                strokeDasharray="3 4"
                opacity="0.9"
              />
            );
          })()}
      </svg>

      {/* central core */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: "27%", height: "27%" }}
      >
        <div className="relative h-full w-full">
          {/* pulsing ring */}
          <div className="absolute inset-0 rounded-full border border-[var(--royal)]/40 animate-pulse-soft" />
          <div className="absolute inset-2 xl:inset-3 rounded-full bg-[var(--navy)] grid place-items-center text-center text-white shadow-[0_18px_40px_-12px_rgba(7,27,58,0.5)]">
            <div className="px-2">
              <div className="font-display text-lg xl:text-xl font-bold tracking-[-0.03em]">NUCLEUS</div>
              <div className="mt-0.5 text-mono-label text-[0.52rem] xl:text-[0.58rem] text-white/70 leading-tight">
                Compliance for a<br />Better Tomorrow
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* certification nodes — counter-rotate so labels stay upright */}
      {certs.map((cert) => {
        const a = ((cert.angle + rotation) * Math.PI) / 180;
        const x = Math.round((c + cert.radius * Math.cos(a)) * 100) / 100;
        const y = Math.round((c + cert.radius * Math.sin(a)) * 100) / 100;
        const isActive = active === cert.code;

        return (
          <button
            key={cert.code}
            type="button"
            onClick={() => setActive(cert.code)}
            onMouseEnter={() => setActive(cert.code)}
            onFocus={() => setActive(cert.code)}
            className="absolute z-10 focus:outline-none"
            style={{
              left: `${(x / size) * 100}%`,
              top: `${(y / size) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
            aria-label={`${cert.code} — ${cert.name}`}
          >
            <motion.div
              animate={{
                scale: isActive ? 1.1 : 1,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="relative cursor-pointer"
            >
              <div
                className={`rounded-full px-3 py-1.5 xl:px-3.5 xl:py-2 backdrop-blur-md transition-all duration-300 ${
                  isActive
                    ? "bg-[var(--navy)] text-white border-2 border-[var(--royal)] shadow-[0_12px_28px_-8px_rgba(14,99,255,0.6)]"
                    : "bg-white/90 hover:bg-white text-[var(--navy)] border border-[var(--navy)]/15 shadow-[0_6px_16px_-8px_rgba(7,27,58,0.2)]"
                }`}
              >
                <div className="font-display text-[0.72rem] xl:text-[0.78rem] font-semibold tracking-[-0.01em] whitespace-nowrap">
                  {cert.code}
                </div>
              </div>

              {/* Tooltip on hover/active */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-52 rounded-lg bg-[var(--navy-deep)] text-white px-3 py-2 shadow-xl text-left z-30 pointer-events-none"
                >
                  <div className="text-mono-label text-[var(--royal)] text-[0.6rem]">
                    {cert.category}
                  </div>
                  <div className="mt-0.5 text-[0.75rem] font-medium leading-snug">
                    {cert.name}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </button>
        );
      })}

      {/* technical corner labels */}
      <div className="absolute top-0 left-0 text-mono-label text-[var(--navy)]/40 text-[0.62rem]">
        FIG.01 / ECOSYSTEM
      </div>
      <div className="absolute bottom-0 right-0 text-mono-label text-[var(--navy)]/40 text-[0.62rem]">
        {reduced ? "STATIONARY" : "ORBIT · LIVE"}
      </div>
    </div>
  );
}

function MobileEcosystem({
  certs,
  active,
  setActive,
  rotation,
  reduced,
}: {
  certs: Cert[];
  active: string | null;
  setActive: (s: string) => void;
  rotation: number;
  reduced: boolean;
}) {
  const [selectedGroup, setSelectedGroup] = useState<CertGroup>("all");

  const filteredCerts =
    selectedGroup === "all" ? certs : certs.filter((c) => c.group === selectedGroup);

  const activeCert = certs.find((c) => c.code === active) || certs[0];

  const mSize = 320;
  const mCenter = mSize / 2;

  return (
    <div className="relative">
      {/* Mobile section header */}
      <div className="mb-8">
        <p className="text-eyebrow text-[var(--royal)] mb-2">/ Certification Ecosystem</p>
        <h2 className="text-headline text-[var(--navy)] text-balance">
          One nucleus.
          <span className="text-[var(--muted-foreground)] block mt-1">
            Every standard your organization needs to operate globally.
          </span>
        </h2>
        <p className="text-[0.95rem] text-[var(--muted-foreground)] mt-3 leading-relaxed">
          We orchestrate the full spectrum of management-system certifications
          through a single, structured transformation — eliminating redundant audits.
        </p>
      </div>

      {/* Compact Interactive Mini-Orbital Radar */}
      <div className="relative w-full max-w-[320px] aspect-square mx-auto mb-8">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${mSize} ${mSize}`}
          fill="none"
          aria-hidden
        >
          <defs>
            <radialGradient id="m-nucleus-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0E63FF" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0E63FF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* orbit disc */}
          <circle cx={mCenter} cy={mCenter} r="135" fill="url(#m-nucleus-core)" />
          {/* inner ring */}
          <circle
            cx={mCenter}
            cy={mCenter}
            r="76"
            stroke="rgba(7,27,58,0.4)"
            strokeWidth="1.2"
            strokeDasharray="2 4"
          />
          {/* outer ring */}
          <circle
            cx={mCenter}
            cy={mCenter}
            r="124"
            stroke="rgba(7,27,58,0.3)"
            strokeWidth="1.2"
            strokeDasharray="2 4"
          />
          {/* accent perimeter ring */}
          <circle
            cx={mCenter}
            cy={mCenter}
            r="142"
            stroke="rgba(14,99,255,0.5)"
            strokeWidth="1.5"
            strokeDasharray="1 8"
          />

          {/* connecting ray to active cert */}
          {active &&
            (() => {
              const cert = certs.find((x) => x.code === active);
              if (!cert) return null;
              const a = ((cert.angle + rotation) * Math.PI) / 180;
              const x = mCenter + cert.mobileRadius * Math.cos(a);
              const y = mCenter + cert.mobileRadius * Math.sin(a);
              return (
                <line
                  x1={mCenter}
                  y1={mCenter}
                  x2={x}
                  y2={y}
                  stroke="var(--royal)"
                  strokeWidth="1.75"
                  strokeDasharray="3 3"
                />
              );
            })()}
        </svg>

        {/* mobile center core */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[var(--navy)] grid place-items-center text-center text-white shadow-lg pointer-events-none"
        >
          <div className="absolute inset-0 rounded-full border border-[var(--royal)]/40 animate-pulse-soft" />
          <div className="relative">
            <div className="font-display text-[0.82rem] font-bold tracking-tight">NUCLEUS</div>
            <div className="text-mono-label text-[0.45rem] text-white/60">Ecosystem</div>
          </div>
        </div>

        {/* mobile orbital pips */}
        {certs.map((cert) => {
          const a = ((cert.angle + rotation) * Math.PI) / 180;
          const x = Math.round((mCenter + cert.mobileRadius * Math.cos(a)) * 100) / 100;
          const y = Math.round((mCenter + cert.mobileRadius * Math.sin(a)) * 100) / 100;
          const isActive = active === cert.code;

          return (
            <button
              key={cert.code}
              type="button"
              onClick={() => setActive(cert.code)}
              className="absolute z-10 focus:outline-none"
              style={{
                left: `${(x / mSize) * 100}%`,
                top: `${(y / mSize) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
              aria-label={cert.code}
            >
              <div
                className={`rounded-full px-2 py-1 text-[0.65rem] font-semibold tracking-tight transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[var(--navy)] text-white border-2 border-[var(--royal)] shadow-md scale-110"
                    : "bg-white/95 text-[var(--navy)] border border-[var(--navy)]/15 shadow-sm"
                }`}
              >
                {cert.code}
              </div>
            </button>
          );
        })}
      </div>

      {/* Category filter tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scroll-premium mb-4">
        {[
          { id: "all", label: "All Standards (8)" },
          { id: "quality", label: "Quality & Aerospace" },
          { id: "cyber", label: "Cyber & Safety" },
          { id: "special", label: "Special Processes" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedGroup(tab.id as CertGroup)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              selectedGroup === tab.id
                ? "bg-[var(--navy)] text-white shadow-sm"
                : "bg-white/80 text-[var(--muted-foreground)] hover:text-[var(--navy)] border border-[var(--navy)]/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Touch-Friendly Expandable Certification Cards */}
      <div className="space-y-2.5">
        {filteredCerts.map((cert) => {
          const isActive = active === cert.code;
          return (
            <div
              key={cert.code}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isActive
                  ? "border-[var(--royal)] bg-white shadow-sm ring-1 ring-[var(--royal)]/20"
                  : "border-[var(--navy)]/10 bg-white/75"
              }`}
            >
              <button
                type="button"
                onClick={() => setActive(isActive ? "" : cert.code)}
                className="w-full text-left p-3.5 flex items-center justify-between gap-3 focus:outline-none cursor-pointer"
                aria-expanded={isActive}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                      isActive ? "bg-[var(--royal)] animate-pulse" : "bg-[var(--navy)]/20"
                    }`}
                  />
                  <div className="truncate">
                    <span className="font-display font-semibold text-sm text-[var(--navy)]">
                      {cert.code}
                    </span>
                    <span className="text-xs text-[var(--muted-foreground)] ml-2">
                      · {cert.category}
                    </span>
                  </div>
                </div>
                <span
                  className={`text-xs font-mono font-semibold transition-transform ${
                    isActive ? "rotate-90 text-[var(--royal)]" : "text-[var(--muted-foreground)]"
                  }`}
                >
                  →
                </span>
              </button>

              {/* Expanded details */}
              {isActive && (
                <div className="px-3.5 pb-4 pt-1 border-t border-[var(--navy)]/5 text-xs">
                  <div className="font-medium text-[var(--navy)] mb-1">
                    {cert.name}
                  </div>
                  <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">
                    {cert.scope}
                  </p>
                  <div className="p-2.5 rounded-lg bg-[var(--ice)] text-[var(--navy)] flex items-start gap-2 text-[0.72rem]">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[var(--royal)] shrink-0 mt-0.5" />
                    <span>{cert.impact}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile action bar */}
      <div className="mt-6 pt-4 border-t border-[var(--navy)]/10 flex items-center justify-between text-xs">
        <a
          href="#approach"
          className="inline-flex items-center gap-1.5 font-semibold text-[var(--royal)]"
        >
          <span>Explore certification roadmap</span>
          <ArrowRight className="h-3 w-3" />
        </a>
        <span className="text-[0.7rem] text-[var(--muted-foreground)] font-mono">
          Unified IMS
        </span>
      </div>
    </div>
  );
}

