"use client";

import { useInViewOnce } from "@/lib/motion";

// NOTE: We avoid fabricating authorized client relationships.
// This section is positioned as "Trusted across global industries"
// and uses sector marks rather than client logos.
const SECTORS = [
  "AEROSPACE",
  "MEDICAL DEVICES",
  "AUTOMOTIVE",
  "PRECISION MFG",
  "TELECOM & IT",
  "DEFENSE",
  "INDUSTRIAL",
  "ENERGY",
];

export function TrustLogos() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="relative bg-[var(--navy-deep)] text-white py-20 overflow-hidden"
      aria-label="Trusted across global industries"
    >
      <div className="absolute inset-0 bg-grid-navy opacity-40 pointer-events-none" />
      <div className="container-nucleus relative">
        <div className="text-center mb-12">
          <p className="text-eyebrow text-[var(--royal)] mb-3">/ Trusted Across Global Industries</p>
          <p className="text-lede max-w-2xl mx-auto text-pretty" style={{ color: "rgba(255,255,255,0.75)" }}>
            We operate across regulated, high-assurance sectors where compliance
            is a precondition for participation — not a competitive claim.
          </p>
        </div>

        {/* marquee strip */}
        <div className="relative overflow-hidden">
          {/* edge fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--navy-deep)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--navy-deep)] to-transparent z-10 pointer-events-none" />

          <div
            className={`flex gap-12 ${inView ? "animate-marquee" : ""}`}
            style={{ width: "max-content" }}
          >
            {[...SECTORS, ...SECTORS].map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-3 shrink-0"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--royal)]/60" />
                <span className="font-display text-xl lg:text-2xl font-semibold tracking-[0.04em] text-white/70 whitespace-nowrap">
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 max-w-4xl mx-auto text-center">
          {[
            ["AEROSPACE", "AS9100 · NADCAP"],
            ["MEDICAL", "ISO 13485 · MDSAP"],
            ["AUTOMOTIVE", "IATF 16949"],
            ["TELECOM", "ISO 27001 · 20000"],
          ].map(([k, v]) => (
            <div key={k} className="border-t border-white/10 pt-4">
              <div className="font-display text-sm font-semibold text-white">{k}</div>
              <div className="text-mono-label text-white/45 mt-1">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
