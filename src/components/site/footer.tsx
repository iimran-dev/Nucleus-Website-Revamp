"use client";

import { Linkedin, Twitter, Youtube, ArrowUpRight } from "lucide-react";

const COLUMNS = [
  {
    title: "Certifications",
    links: [
      { label: "ISO 9001", href: "#certifications" },
      { label: "AS9100", href: "#certifications" },
      { label: "ISO 13485", href: "#certifications" },
      { label: "NADCAP", href: "#certifications" },
      { label: "All Certifications", href: "#certifications" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Aerospace", href: "#industries" },
      { label: "Medical Devices", href: "#industries" },
      { label: "Automotive", href: "#industries" },
      { label: "Manufacturing", href: "#industries" },
      { label: "Telecom & IT", href: "#industries" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Articles", href: "#knowledge" },
      { label: "Whitepapers", href: "#knowledge" },
      { label: "Case Studies", href: "#knowledge" },
      { label: "Webinars", href: "#knowledge" },
      { label: "Templates", href: "#knowledge" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#leadership" },
      { label: "Our Approach", href: "#approach" },
      { label: "Our Team", href: "#leadership" },
      { label: "Careers", href: "#leadership" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-[#02060f] text-white pt-20 pb-10 mt-auto overflow-hidden">
      <div className="absolute inset-0 bg-grid-navy opacity-30 pointer-events-none" />
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 h-72 w-[80%] bg-glow-royal pointer-events-none opacity-50" />

      <div className="container-nucleus relative">
        {/* top — brand + columns */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/8">
          {/* brand block */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center h-9 w-9 rounded-full border border-white/15">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="3" fill="#0E63FF" />
                  <ellipse cx="12" cy="12" rx="9" ry="4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.1" />
                  <ellipse cx="12" cy="12" rx="9" ry="4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.1" transform="rotate(60 12 12)" />
                  <ellipse cx="12" cy="12" rx="9" ry="4" stroke="rgba(255,255,255,0.35)" strokeWidth="1.1" transform="rotate(120 12 12)" />
                </svg>
              </span>
              <div>
                <div className="font-display text-xl font-bold tracking-[-0.02em]">NUCLEUS</div>
                <div className="text-mono-label text-white/50 text-[0.58rem] mt-0.5">
                  Compliance for a Better Tomorrow
                </div>
              </div>
            </div>
            <p className="mt-6 text-[0.92rem] text-white/55 leading-relaxed max-w-sm">
              India&apos;s leading compliance transformation partner — engineering
              global certifications and operational excellence across regulated industries.
            </p>
            {/* social */}
            <div className="mt-7 flex items-center gap-2">
              {[
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Twitter, label: "Twitter" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid place-items-center h-10 w-10 rounded-full border border-white/12 text-white/70 hover:bg-white/5 hover:text-white hover:border-white/25 transition-colors"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.7} />
                </a>
              ))}
            </div>
          </div>

          {/* link columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="text-mono-label text-white/40 text-[0.62rem] mb-4">
                  {col.title.toUpperCase()}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="group inline-flex items-center gap-1 text-[0.88rem] text-white/75 hover:text-white transition-colors"
                      >
                        {l.label}
                        <ArrowUpRight
                          className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity"
                          strokeWidth={1.75}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* bottom — legal */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-mono-label text-white/40 text-[0.62rem]">
            <span>© {new Date().getFullYear()} NUCLEUS COMPLIANCE</span>
            <a href="#" className="hover:text-white/80 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/80 transition-colors">Terms of Use</a>
          </div>
          <div className="text-mono-label text-white/40 text-[0.62rem]">
            / INDIA · UAE · SOUTHEAST ASIA
          </div>
        </div>
      </div>
    </footer>
  );
}
