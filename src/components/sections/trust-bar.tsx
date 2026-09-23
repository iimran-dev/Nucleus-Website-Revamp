"use client";

import { useCountUp, useInViewOnce, useReducedMotion } from "@/lib/motion";

const METRICS = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Organizations Served" },
  { value: 100, suffix: "+", label: "Certifications Delivered" },
  { value: 95, suffix: "%", label: "First-Time Success Rate" },
  { value: 20, suffix: "+", label: "Industries Supported" },
];

export function TrustBar() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  return (
    <section
      ref={ref}
      className="relative bg-[var(--navy)] text-white py-16 lg:py-20 overflow-hidden"
      aria-label="Nucleus by the numbers"
    >
      <div className="absolute inset-0 bg-grid-navy opacity-60 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-[80%] bg-glow-royal pointer-events-none" />

      <div className="container-nucleus relative">
        <div className="flex items-center justify-between mb-10 lg:mb-14">
          <p className="text-mono-label text-white/60 max-w-md">
            Two decades of disciplined compliance engineering — measured outcomes, not promises.
          </p>
          <div className="hidden md:block text-mono-label text-white/40">
            / BY THE NUMBERS
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
          {METRICS.map((m, i) => (
            <Metric key={m.label} index={i} {...m} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Metric({
  value,
  suffix,
  label,
  active,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
  index: number;
}) {
  const reduced = useReducedMotion();
  const n = useCountUp(value, active && !reduced, 1600);
  const display = reduced ? value : Math.round(n);
  return (
    <div
      className="relative"
      style={{ transitionDelay: `${index * 60}ms` }}
      suppressHydrationWarning
    >
      <div
        className="font-display text-[clamp(2.6rem,4vw,4rem)] font-semibold leading-none tracking-[-0.03em] text-white"
        aria-label={`${value}${suffix} ${label}`}
      >
        {display}
        <span className="text-[var(--royal)]">{suffix}</span>
      </div>
      <div className="mt-2 text-mono-label text-white/55">{label}</div>
      {/* subtle hairline below */}
      <div className="mt-3 h-px w-8 bg-[var(--royal)]/60" />
    </div>
  );
}
