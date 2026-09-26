"use client";

import React from "react";
import { CLIENT_LOGOS } from "@/components/icons/client-logos";

// Duplicate logo sequence to ensure seamless continuous loop across any screen resolution
const LOGO_SET = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

export function TrustLogos() {
  return (
    <section
      className="relative bg-[var(--navy-deep)] text-white py-14 md:py-18 overflow-hidden border-y border-white/[0.06]"
      aria-label="Trusted by leading organizations"
    >
      {/* Subtle background atmospheric grid and radial glow */}
      <div className="absolute inset-0 bg-grid-navy opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-at-c from-[var(--royal)]/5 via-transparent to-transparent pointer-events-none" />

      <div className="container-nucleus relative z-10 mb-8 sm:mb-10">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[11px] sm:text-xs font-mono tracking-[0.24em] uppercase text-white/50 font-medium">
            Trusted by Leading Organizations
          </p>
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono tracking-[0.16em] uppercase text-white/30">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
            <span>Global Assurance Network</span>
          </div>
        </div>
      </div>

      {/* Infinite Marquee Track with edge fade masks */}
      <div className="relative overflow-hidden w-full group">
        {/* Left & Right gradient edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[var(--navy-deep)] via-[var(--navy-deep)]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[var(--navy-deep)] via-[var(--navy-deep)]/80 to-transparent z-20 pointer-events-none" />

        {/* Scrolling flex container */}
        <div
          className="flex items-center gap-12 sm:gap-16 md:gap-20 animate-marquee group-hover:[animation-play-state:paused] will-change-transform"
          style={{ width: "max-content" }}
        >
          {/* First loop half + second loop half for a seamless 50% translation wrap */}
          {[...LOGO_SET, ...LOGO_SET].map((logo, idx) => {
            const LogoComponent = logo.Component;
            return (
              <div
                key={`${logo.id}-${idx}`}
                className="flex items-center justify-center shrink-0 px-2 py-1 text-white/70 hover:text-white transition-all duration-300 transform hover:scale-105 select-none"
                title={logo.name}
              >
                <LogoComponent className={`${logo.heightClass} w-auto object-contain drop-shadow-[0_2px_12px_rgba(255,255,255,0.04)]`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
