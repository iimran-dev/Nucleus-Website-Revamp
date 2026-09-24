"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Step = {
  code: string;
  title: string;
  descLines: string[];
  icon: (props: { className?: string }) => React.JSX.Element;
};

// Custom crisp SVG icons matching the exact iconography in image.png
function ConsultationIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7.5" />
      <path d="m21 21-4.35-4.35" />
      <circle cx="11" cy="11" r="2.2" fill="currentColor" />
    </svg>
  );
}

function GapAnalysisIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  );
}

function DocumentationIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}

function TrainingIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function AuditSupportIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CertificationIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="m15.4 12.5 1.6 8.5-5-3-5 3 1.6-8.5" />
      <path d="m9 8 2 2 4-4" />
    </svg>
  );
}

const STEPS: Step[] = [
  {
    code: "01",
    title: "Consultation",
    descLines: ["Understand", "your goals"],
    icon: ConsultationIcon,
  },
  {
    code: "02",
    title: "Gap Analysis",
    descLines: ["Identify", "requirements"],
    icon: GapAnalysisIcon,
  },
  {
    code: "03",
    title: "Documentation",
    descLines: ["Create & review"],
    icon: DocumentationIcon,
  },
  {
    code: "04",
    title: "Training",
    descLines: ["Empower", "your team"],
    icon: TrainingIcon,
  },
  {
    code: "05",
    title: "Audit Support",
    descLines: ["Guidance", "till audit"],
    icon: AuditSupportIcon,
  },
  {
    code: "06",
    title: "Certification",
    descLines: ["Achieve with", "confidence"],
    icon: CertificationIcon,
  },
];

export function TransformationEngine() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      id="approach"
      className="relative py-20 lg:py-28 bg-[#f8fafd] text-[#071B3A] overflow-hidden border-t border-slate-100"
      aria-label="Our 6-Step Approach"
    >
      {/* Subtle atmospheric glow & background grid */}
      <div className="absolute inset-0 bg-grid-ice opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[350px] bg-blue-100/35 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container-nucleus relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="text-eyebrow text-slate-500 tracking-[0.16em] text-xs font-semibold uppercase">
            A CLEAR PATH TO CERTIFICATION
          </p>
          <h2 className="mt-2.5 font-display text-[clamp(2rem,3.2vw,3rem)] font-bold tracking-tight text-[#071B3A] text-balance">
            Our 6-Step Approach
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            A structured, transparent and supportive process from start to finish.
          </p>
        </motion.div>

        {/* Desktop 6-Step Flow */}
        <div className="hidden lg:block mt-14 lg:mt-18">
          <div className="flex items-start w-full">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.code}
                initial={{ opacity: 0, y: reduced ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: reduced ? 0 : idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex-1 flex flex-col"
              >
                {/* Step node + connecting line */}
                <div className="flex items-center w-full">
                  {/* Circular Node */}
                  <div className="relative group flex-shrink-0 cursor-default">
                    {/* Outer halo */}
                    <div className="w-14 h-14 rounded-full bg-[#eef5fe] border border-[#d2e3fa] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-[#e4effd] group-hover:border-[#0E63FF]/35 group-hover:shadow-[0_4px_20px_rgba(14,99,255,0.12)]">
                      {/* Inner white circle */}
                      <div className="w-9 h-9 rounded-full bg-white border border-[#dbe6f6] shadow-sm flex items-center justify-center">
                        <step.icon className="w-4.5 h-4.5 text-[#071B3A] transition-colors duration-300 group-hover:text-[#0E63FF]" />
                      </div>
                    </div>
                  </div>

                  {/* Horizontal connecting line to the next node */}
                  {idx < STEPS.length - 1 && (
                    <div className="flex-1 h-[1.5px] bg-[#cde0f7]" />
                  )}
                </div>

                {/* Step details below circle */}
                <div className="mt-5 pr-2">
                  <span className="block text-xs font-bold text-[#071B3A] font-mono tracking-wider">
                    {step.code}
                  </span>
                  <h3 className="font-display font-bold text-base text-[#071B3A] mt-1 tracking-tight">
                    {step.title}
                  </h3>
                  <div className="text-xs sm:text-[0.85rem] text-slate-500 mt-1 leading-snug">
                    {step.descLines.map((line, lineIdx) => (
                      <span key={lineIdx} className="block">
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile & Tablet Flow */}
        <div className="lg:hidden mt-10 space-y-5">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.code}
              initial={{ opacity: 0, x: reduced ? 0 : -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: reduced ? 0 : idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex items-start gap-4"
            >
              {/* Vertical connector + Node */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#eef5fe] border border-[#d2e3fa] flex items-center justify-center shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#dbe6f6] flex items-center justify-center">
                    <step.icon className="w-4 h-4 text-[#071B3A]" />
                  </div>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className="w-[1.5px] h-8 bg-[#cde0f7] my-1" />
                )}
              </div>

              {/* Text content */}
              <div className="pt-0.5 pb-2">
                <span className="block text-xs font-bold text-[#071B3A] font-mono tracking-wider">
                  {step.code}
                </span>
                <h3 className="font-display font-bold text-base text-[#071B3A] mt-0.5 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                  {step.descLines.join(" ")}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: reduced ? 0 : 0.25 }}
          className="mt-12 lg:mt-16"
        >
          <a
            href="#blueprint"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#071B3A] hover:bg-[#0E63FF] text-white font-medium text-sm transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            <span>See How It Works</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
