"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Industry = {
  id: string;
  name: string;
  tag: string;
  blurb: string;
  certs: string[];
  image: string;
  alt: string;
};

const INDUSTRIES: Industry[] = [
  {
    id: "aerospace",
    name: "Aerospace & Defense",
    tag: "AS9100 · NADCAP",
    blurb:
      "Supplier qualification for primes and tier-1s — from special-process accreditation to full AS9100 system integration.",
    certs: ["AS9100", "NADCAP", "ISO 9001"],
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/77d52127b17e.jpg",
    alt: "Aircraft assembly line representing aerospace and defense manufacturing",
  },
  {
    id: "medical",
    name: "Medical Devices",
    tag: "ISO 13485 · MDSAP",
    blurb:
      "Quality systems engineered for regulatory rigor — design controls, risk management and CAPA discipline that hold up under audit.",
    certs: ["ISO 13485", "ISO 14971", "ISO 9001"],
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f72b502345ac.jpeg",
    alt: "Medical device engineering lab representing ISO 13485 quality systems",
  },
  {
    id: "automotive",
    name: "Automotive",
    tag: "IATF 16949 · VDA",
    blurb:
      "Core-tools discipline and process-oriented auditing aligned to IATF expectations and global OEM requirements.",
    certs: ["IATF 16949", "ISO 9001", "VDA 6.3"],
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2cdb7c870a25.jpg",
    alt: "Automotive manufacturing robot assembly line",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    tag: "ISO 9001 · ISO 45001",
    blurb:
      "Lean-aligned quality, environmental and safety systems that reduce variation and unlock operational maturity.",
    certs: ["ISO 9001", "ISO 45001", "ISO 14001"],
    image:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1400&q=80",
    alt: "Industrial robotics in a precision manufacturing facility",
  },
  {
    id: "telecom",
    name: "Telecom & IT",
    tag: "ISO 27001 · ISO 20000",
    blurb:
      "Information security, service management and business continuity systems built for digital-scale operations.",
    certs: ["ISO 27001", "ISO 20000", "ISO 22301"],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80",
    alt: "Network operations data center representing telecom and IT infrastructure",
  },
];

export function IndustryExperience() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <section
      id="industries"
      className="relative py-24 lg:py-32 bg-[var(--navy)] text-white overflow-hidden"
      aria-label="Industry expertise"
    >
      <div className="absolute inset-0 bg-grid-navy pointer-events-none opacity-60" />
      <div className="absolute top-0 right-0 h-96 w-96 bg-glow-royal pointer-events-none" />

      <div className="container-nucleus relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <p className="text-eyebrow text-[var(--royal)] mb-4">/ Industry Expertise</p>
            <h2 className="text-headline text-white text-balance">
              Sector fluency that
              <span className="text-white/55">&nbsp;auditors recognize.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-3">
            <p className="text-lede" style={{ color: "rgba(255,255,255,0.85)" }}>
              Generic compliance fails in regulated industries. We bring
              process context, technical vocabulary, and audit-day familiarity
              that translates to faster outcomes.
            </p>
          </div>
        </div>

        {/* Desktop horizontal expanding panels — flex to keep single row */}
        <div
          ref={containerRef}
          className="hidden md:flex gap-4 h-[560px]"
        >
          {INDUSTRIES.map((ind, i) => {
            const isActive = active === i;
            return (
              <button
                key={ind.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-expanded={isActive}
                style={{ flex: isActive ? "3 1 0%" : "1 1 0%" }}
                className="relative overflow-hidden rounded-2xl text-left transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                {/* image */}
                <img
                  src={ind.image}
                  alt={ind.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out"
                  style={{ transform: isActive ? "scale(1.04)" : "scale(1.0)" }}
                  loading="lazy"
                />
                {/* overlay — lighter, directional */}
                <div
                  className={`absolute inset-0 transition-all duration-700 ${
                    isActive
                      ? "bg-gradient-to-t from-[var(--navy-deep)]/75 via-[var(--navy-deep)]/25 to-transparent"
                      : "bg-gradient-to-t from-[var(--navy)]/75 via-[var(--navy)]/35 to-[var(--navy)]/10"
                  }`}
                />
                {/* content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <div className="text-mono-label text-[var(--royal)] text-[0.62rem] mb-2">
                    {ind.tag}
                  </div>
                  <AnimatePresence mode="wait">
                    {isActive ? (
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.4 }}
                      >
                        <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.4rem)] font-semibold tracking-[-0.02em] text-white">
                          {ind.name}
                        </h3>
                        <p className="mt-3 max-w-md text-[0.95rem] text-white/85 leading-relaxed">
                          {ind.blurb}
                        </p>
                        <div className="mt-5 flex flex-wrap items-center gap-2">
                          {ind.certs.map((c) => (
                            <span
                              key={c}
                              className="rounded-full border border-white/25 bg-white/5 px-3 py-1 text-mono-label text-[0.62rem] text-white/90"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="collapsed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <h3
                          className="font-display text-lg font-semibold tracking-[-0.02em] text-white"
                          style={{ writingMode: "vertical-rl" }}
                        >
                          {ind.name}
                        </h3>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {/* index marker */}
                <div className="absolute top-4 left-4 text-mono-label text-white/55 text-[0.6rem]">
                  0{i + 1}
                </div>
              </button>
            );
          })}
          {/* 6th CTA tile — always flex-1, fills remaining space */}
          <a
            href="#contact"
            style={{ flex: "1 1 0%" }}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--royal)] to-[var(--navy-soft)] p-5 flex flex-col justify-end transition-all duration-500 hover:from-[var(--royal-soft)] hover:to-[var(--navy)] hover:-translate-y-0.5"
          >
            <div className="absolute inset-0 bg-grid-navy opacity-20" />
            <div className="absolute top-4 left-4 text-mono-label text-white/60 text-[0.6rem]">06 / VIEW ALL</div>
            <div className="relative">
              <h3 className="font-display text-lg font-semibold text-white">All Sectors</h3>
              <p className="mt-1 text-[0.78rem] text-white/80 leading-snug">
                Custom scopes for industries beyond these five.
              </p>
              <div className="mt-3 inline-flex items-center gap-1 text-mono-label text-white/95 text-[0.62rem]">
                SCOPING CALL
                <ArrowUpRight className="h-3.5 w-3.5 arrow-nudge" strokeWidth={1.75} />
              </div>
            </div>
          </a>
        </div>

        {/* Mobile accordion */}
        <div className="md:hidden space-y-3">
          {INDUSTRIES.map((ind, i) => {
            const isActive = active === i;
            return (
              <div
                key={ind.id}
                className="rounded-2xl overflow-hidden border border-white/10"
              >
                <button
                  type="button"
                  onClick={() => setActive(isActive ? -1 : i)}
                  aria-expanded={isActive}
                  className="w-full relative h-32 block"
                >
                  <img src={ind.image} alt={ind.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy-deep)]/85 to-[var(--navy)]/40" />
                  <div className="absolute inset-0 p-4 flex items-center justify-between">
                    <div>
                      <div className="text-mono-label text-[var(--royal)] text-[0.6rem]">{ind.tag}</div>
                      <h3 className="mt-1 font-display text-lg font-semibold text-white">{ind.name}</h3>
                    </div>
                    <ArrowUpRight
                      className={`h-5 w-5 text-white transition-transform ${isActive ? "rotate-0" : "rotate-45"}`}
                      strokeWidth={1.75}
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-[var(--navy-deep)]/60">
                        <p className="text-[0.9rem] text-white/80 leading-relaxed">{ind.blurb}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {ind.certs.map((c) => (
                            <span
                              key={c}
                              className="rounded-full border border-white/15 px-2.5 py-1 text-mono-label text-[0.6rem] text-white/85"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
