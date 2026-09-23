"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, RotateCcw } from "lucide-react";

type IndustryKey = "aerospace" | "medical" | "automotive" | "manufacturing" | "telecom";
type SizeKey = "startup" | "growing" | "enterprise";
type GoalKey = "supplier" | "regulatory" | "market" | "efficiency";
type StatusKey = "none" | "iso9001" | "partial" | "multiple";

const INDUSTRIES: { key: IndustryKey; label: string; hint: string }[] = [
  { key: "aerospace", label: "Aerospace & Defense", hint: "Primes, tier-1/2 suppliers, special processes" },
  { key: "medical", label: "Medical Devices", hint: "Class I–III, IVD, contract manufacturers" },
  { key: "automotive", label: "Automotive", hint: "IATF supply chain, OEM expectations" },
  { key: "manufacturing", label: "Manufacturing", hint: "Industrial, precision, process industries" },
  { key: "telecom", label: "Telecom & IT", hint: "Information security, service management" },
];

const SIZES: { key: SizeKey; label: string; hint: string }[] = [
  { key: "startup", label: "Early-Stage", hint: "< 50 employees" },
  { key: "growing", label: "Growing Enterprise", hint: "50–500 employees" },
  { key: "enterprise", label: "Established Enterprise", hint: "500+ employees" },
];

const GOALS: { key: GoalKey; label: string; hint: string }[] = [
  { key: "supplier", label: "Global Supplier Qualification", hint: "Win regulated OEM business" },
  { key: "regulatory", label: "Regulatory Compliance", hint: "Operate legally in target markets" },
  { key: "market", label: "Market Expansion", hint: "Enter new geographies / segments" },
  { key: "efficiency", label: "Operational Excellence", hint: "Reduce variation, raise maturity" },
];

const STATUSES: { key: StatusKey; label: string; hint: string }[] = [
  { key: "none", label: "No certification", hint: "Starting from zero" },
  { key: "iso9001", label: "ISO 9001 in place", hint: "Single system, looking to extend" },
  { key: "partial", label: "Partial coverage", hint: "Some certifications, gaps remain" },
  { key: "multiple", label: "Multiple certifications", hint: "Looking to consolidate / optimize" },
];

type Rec = { code: string; name: string; rationale: string };

// recommendation matrix — deterministic, conservative, fact-based around common industry expectations
const MATRIX: Record<IndustryKey, Record<GoalKey, Rec[]>> = {
  aerospace: {
    supplier: [
      { code: "AS9100", name: "Aerospace QMS", rationale: "Baseline requirement for aerospace supplier qualification" },
      { code: "NADCAP", name: "Special Process", rationale: "Required for chemical processing, NDT, welding, heat treat" },
      { code: "ISO 9001", name: "Quality Management", rationale: "Foundation that AS9100 builds upon" },
    ],
    regulatory: [
      { code: "AS9100", name: "Aerospace QMS", rationale: "Industry baseline for design & production controls" },
      { code: "ISO 9001", name: "Quality Management", rationale: "Foundational QMS" },
    ],
    market: [
      { code: "AS9100", name: "Aerospace QMS", rationale: "Unlock primes and tier-1 supply chains globally" },
      { code: "ISO 14001", name: "Environmental", rationale: "Increasingly expected in aerospace ESG reporting" },
    ],
    efficiency: [
      { code: "AS9100", name: "Aerospace QMS", rationale: "Risk-based thinking drives measurable maturity" },
      { code: "ISO 9001", name: "Quality Management", rationale: "Process discipline foundation" },
    ],
  },
  medical: {
    supplier: [
      { code: "ISO 13485", name: "Medical Device QMS", rationale: "Required to supply medical device manufacturers" },
      { code: "ISO 14971", name: "Risk Management", rationale: "Risk file discipline required by regulators" },
    ],
    regulatory: [
      { code: "ISO 13485", name: "Medical Device QMS", rationale: "Quality system expectation under MDR / FDA QSR" },
      { code: "MDSAP", name: "Medical Device Single Audit", rationale: "Multi-market regulatory pathway" },
    ],
    market: [
      { code: "ISO 13485", name: "Medical Device QMS", rationale: "Pre-condition for most regulated markets" },
      { code: "ISO 27001", name: "Information Security", rationale: "Expected for connected medical devices" },
    ],
    efficiency: [
      { code: "ISO 13485", name: "Medical Device QMS", rationale: "Design control + CAPA discipline" },
      { code: "ISO 14971", name: "Risk Management", rationale: "Reduces post-market surprises" },
    ],
  },
  automotive: {
    supplier: [
      { code: "IATF 16949", name: "Automotive QMS", rationale: "Mandated across the IATF OEM supply chain" },
      { code: "ISO 9001", name: "Quality Management", rationale: "Foundation under IATF 16949" },
    ],
    regulatory: [
      { code: "IATF 16949", name: "Automotive QMS", rationale: "Customer-specific requirements aligned" },
      { code: "ISO 14001", name: "Environmental", rationale: "Increasingly tied to OEM sustainability scorecards" },
    ],
    market: [
      { code: "IATF 16949", name: "Automotive QMS", rationale: "Unlocks global OEM qualification" },
      { code: "VDA 6.3", name: "Process Audit", rationale: "European OEM expectation" },
    ],
    efficiency: [
      { code: "IATF 16949", name: "Automotive QMS", rationale: "Core-tools discipline reduces variation" },
      { code: "ISO 45001", name: "Occupational H&S", rationale: "Reduces downtime and human-error variation" },
    ],
  },
  manufacturing: {
    supplier: [
      { code: "ISO 9001", name: "Quality Management", rationale: "Foundational supplier expectation" },
      { code: "ISO 14001", name: "Environmental", rationale: "Increasingly required in ESG-linked tenders" },
    ],
    regulatory: [
      { code: "ISO 9001", name: "Quality Management", rationale: "Process discipline baseline" },
      { code: "ISO 45001", name: "Occupational H&S", rationale: "Regulatory H&S baseline in many jurisdictions" },
    ],
    market: [
      { code: "ISO 9001", name: "Quality Management", rationale: "Market-entry baseline across geographies" },
      { code: "ISO 14001", name: "Environmental", rationale: "ESG-aligned market access" },
    ],
    efficiency: [
      { code: "ISO 9001", name: "Quality Management", rationale: "Process variation reduction" },
      { code: "ISO 45001", name: "Occupational H&S", rationale: "Reduces incident-driven downtime" },
      { code: "ISO 14001", name: "Environmental", rationale: "Reduces resource waste" },
    ],
  },
  telecom: {
    supplier: [
      { code: "ISO 27001", name: "Information Security", rationale: "Baseline for telecom and IT supplier onboarding" },
      { code: "ISO 9001", name: "Quality Management", rationale: "Operational baseline expectation" },
    ],
    regulatory: [
      { code: "ISO 27001", name: "Information Security", rationale: "Aligns with most data-protection regimes" },
      { code: "ISO 22301", name: "Business Continuity", rationale: "Operational resilience expectation" },
    ],
    market: [
      { code: "ISO 27001", name: "Information Security", rationale: "Unlocks regulated-sector customers" },
      { code: "ISO 20000", name: "Service Management", rationale: "Service-level alignment for IT services" },
    ],
    efficiency: [
      { code: "ISO 27001", name: "Information Security", rationale: "Reduces incident overhead" },
      { code: "ISO 20000", name: "Service Management", rationale: "Standardizes service operations" },
    ],
  },
};

export function CertificationFinder() {
  const [step, setStep] = useState(0); // 0..3 questions, 4 = result
  const [industry, setIndustry] = useState<IndustryKey | null>(null);
  const [size, setSize] = useState<SizeKey | null>(null);
  const [goal, setGoal] = useState<GoalKey | null>(null);
  const [status, setStatus] = useState<StatusKey | null>(null);

  const recommendations = useMemo<Rec[]>(() => {
    if (!industry || !goal) return [];
    return MATRIX[industry][goal] ?? [];
  }, [industry, goal]);

  const steps = [
    {
      key: "industry",
      title: "What industry do you operate in?",
      sub: "We tailor certification paths to sector-specific regulatory and customer expectations.",
      options: INDUSTRIES,
      value: industry,
      onSelect: (k: string) => setIndustry(k as IndustryKey),
    },
    {
      key: "size",
      title: "What scale are you operating at?",
      sub: "Implementation depth is shaped by organization size and process complexity.",
      options: SIZES,
      value: size,
      onSelect: (k: string) => setSize(k as SizeKey),
    },
    {
      key: "goal",
      title: "What is your primary goal?",
      sub: "We recommend paths that map to commercial intent — not generic checklists.",
      options: GOALS,
      value: goal,
      onSelect: (k: string) => setGoal(k as GoalKey),
    },
    {
      key: "status",
      title: "What is your current certification status?",
      sub: "Knowing your starting point lets us scope only what's missing.",
      options: STATUSES,
      value: status,
      onSelect: (k: string) => setStatus(k as StatusKey),
    },
  ];

  const current = steps[step];
  const isResult = step >= steps.length;

  const reset = () => {
    setIndustry(null);
    setSize(null);
    setGoal(null);
    setStatus(null);
    setStep(0);
  };

  return (
    <section
      id="finder"
      className="relative py-24 lg:py-32 bg-[var(--navy)] text-white overflow-hidden"
      aria-label="Find your certification path"
    >
      <div className="absolute inset-0 bg-grid-navy opacity-60 pointer-events-none" />
      <div className="absolute -top-32 right-0 h-[500px] w-[500px] bg-glow-royal pointer-events-none" />

      <div className="container-nucleus relative">
        <div className="grid lg:grid-cols-12 gap-8 mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <p className="text-eyebrow text-[var(--royal)] mb-4">/ Certification Finder</p>
            <h2 className="text-headline text-white text-balance">
              Find your
              <span className="text-white/55">&nbsp;certification path.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-3">
            <p className="text-lede" style={{ color: "rgba(255,255,255,0.75)" }}>
              Four inputs. A structured recommendation grounded in real
              sector practice — not a generic contact form.
            </p>
          </div>
        </div>

        {/* product interface */}
        <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
          {/* progress header */}
          <div className="flex items-center justify-between p-5 lg:p-7 border-b border-white/8">
            <div className="flex items-center gap-3">
              {steps.map((s, i) => (
                <div key={s.key} className="flex items-center gap-2">
                  <span
                    className={`grid place-items-center h-7 w-7 rounded-full text-[0.7rem] font-semibold transition-colors ${
                      i < step || isResult
                        ? "bg-[var(--royal)] text-white"
                        : i === step
                        ? "bg-white text-[var(--navy)]"
                        : "bg-white/5 text-white/40 border border-white/15"
                    }`}
                  >
                    {i < step || isResult ? <Check className="h-3.5 w-3.5" strokeWidth={2.2} /> : i + 1}
                  </span>
                  {i < steps.length - 1 && (
                    <span
                      className={`h-px w-6 lg:w-12 transition-colors ${
                        i < step || isResult ? "bg-[var(--royal)]" : "bg-white/15"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-mono-label text-white/40 text-[0.6rem] hidden sm:block">
              {isResult ? "RECOMMENDATION READY" : `STEP ${step + 1} / ${steps.length}`}
            </div>
          </div>

          {/* body */}
          <div className="p-5 lg:p-10 min-h-[440px] grid lg:grid-cols-12 gap-8">
            {/* left meta */}
            <div className="lg:col-span-3 flex flex-col justify-between">
              <div>
                <div className="text-mono-label text-[var(--royal)] text-[0.62rem]">
                  {isResult ? "OUTPUT" : "INPUT"}
                </div>
                <div className="mt-2 font-display text-lg font-semibold text-white">
                  {isResult ? "Recommended paths" : `0${step + 1} of 0${steps.length}`}
                </div>
              </div>
              {/* summary */}
              <div className="mt-8 lg:mt-0 space-y-3 text-sm">
                {[
                  ["Industry", INDUSTRIES.find((x) => x.key === industry)?.label],
                  ["Size", SIZES.find((x) => x.key === size)?.label],
                  ["Goal", GOALS.find((x) => x.key === goal)?.label],
                  ["Status", STATUSES.find((x) => x.key === status)?.label],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-3 border-b border-white/8 pb-2">
                    <span className="text-mono-label text-white/40 text-[0.6rem]">{k}</span>
                    <span className="text-white/85 text-right text-[0.82rem] truncate max-w-[60%]">
                      {v ?? "—"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* right interactive */}
            <div className="lg:col-span-9">
              <AnimatePresence mode="wait">
                {!isResult ? (
                  <motion.div
                    key={current.key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h3 className="font-display text-2xl lg:text-3xl font-semibold tracking-[-0.02em] text-white text-balance">
                      {current.title}
                    </h3>
                    <p className="mt-2 text-white/60 max-w-lg">{current.sub}</p>
                    <div className="mt-7 grid sm:grid-cols-2 gap-3">
                      {current.options.map((o) => {
                        const selected = current.value === o.key;
                        return (
                          <button
                            key={o.key}
                            type="button"
                            onClick={() => current.onSelect(o.key)}
                            className={`group text-left p-4 rounded-xl border transition-all duration-300 ${
                              selected
                                ? "border-[var(--royal)] bg-[var(--royal)]/12"
                                : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="font-display text-base font-semibold text-white">
                                  {o.label}
                                </div>
                                <div className="mt-1 text-[0.82rem] text-white/55 leading-snug">
                                  {o.hint}
                                </div>
                              </div>
                              <span
                                className={`grid place-items-center h-5 w-5 rounded-full border flex-none mt-0.5 transition-colors ${
                                  selected
                                    ? "bg-[var(--royal)] border-[var(--royal)] text-white"
                                    : "border-white/25 text-transparent"
                                }`}
                              >
                                <Check className="h-3 w-3" strokeWidth={2.4} />
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep((s) => Math.max(0, s - 1))}
                        disabled={step === 0}
                        className="text-mono-label text-white/45 hover:text-white/80 disabled:opacity-30 transition-colors text-[0.62rem]"
                      >
                        ← BACK
                      </button>
                      <button
                        type="button"
                        disabled={!current.value}
                        onClick={() => setStep((s) => s + 1)}
                        className="group inline-flex items-center gap-2 rounded-full bg-white text-[var(--navy)] px-5 py-2.5 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--royal)] hover:text-white transition-colors"
                      >
                        {step === steps.length - 1 ? "See recommendation" : "Continue"}
                        <ArrowRight className="h-4 w-4 arrow-nudge" strokeWidth={1.75} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h3 className="font-display text-2xl lg:text-3xl font-semibold tracking-[-0.02em] text-white text-balance">
                      Your recommended certification path
                    </h3>
                    <p className="mt-2 text-white/65 max-w-2xl">
                      Based on your inputs, here is a structured starting set.
                      We refine scope after a 30-minute consultation.
                    </p>

                    <div className="mt-7 space-y-3">
                      {recommendations.map((r, i) => (
                        <motion.div
                          key={r.code}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.1, duration: 0.45 }}
                          className="group flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:border-[var(--royal)]/50 hover:bg-[var(--royal)]/8 transition-all"
                        >
                          <span className="font-display text-3xl font-bold text-[var(--royal)]/80 w-10 text-center">
                            0{i + 1}
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <span className="font-display text-xl font-semibold text-white">{r.code}</span>
                              <span className="text-mono-label text-white/45 text-[0.6rem]">{r.name}</span>
                            </div>
                            <p className="mt-1 text-[0.86rem] text-white/65 leading-snug">{r.rationale}</p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" strokeWidth={1.75} />
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--royal)] text-white px-5 py-3 text-sm font-medium hover:bg-[var(--royal-soft)] transition-colors"
                      >
                        Book a scoping call
                        <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                      </a>
                      <button
                        type="button"
                        onClick={reset}
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white/85 hover:bg-white/5 transition-colors"
                      >
                        <RotateCcw className="h-4 w-4" strokeWidth={1.75} />
                        Restart finder
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
