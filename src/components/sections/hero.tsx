"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

/**
 * Hero — cinematic, layered, editorial.
 * Left: editorial headline + CTAs.
 * Right: layered image ecosystem (engine / architecture / medical / digital compliance).
 */
export function Hero() {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement | null>(null);

  // subtle parallax for layered image stack
  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--px", `${x}`);
        el.style.setProperty("--py", `${y}`);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  const word = {
    hidden: { y: "110%" },
    show: (i: number) => ({
      y: "0%",
      transition: { delay: 0.1 + i * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <section
      id="top"
      ref={ref}
      className="relative pt-28 pb-0 lg:pt-36 bg-[var(--silver)] overflow-hidden"
      aria-label="Nucleus hero"
    >
      {/* background grid + glow */}
      <div className="absolute inset-0 bg-grid-ice pointer-events-none" />
      <div className="absolute -top-40 right-[-10%] h-[640px] w-[640px] bg-glow-royal pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[var(--silver)] pointer-events-none" />

      <div className="container-nucleus relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-end">
          {/* LEFT — Editorial copy */}
          <div className="lg:col-span-7 xl:col-span-7 pt-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/60 px-3 py-1.5 text-mono-label text-[var(--navy)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--royal)] animate-pulse-soft" />
                India&apos;s Leading Compliance Transformation Partner
              </span>
            </motion.div>

            <h1 className="font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.95] tracking-[-0.04em] font-semibold text-[var(--navy)] text-balance">
              <span className="block overflow-hidden">
                <motion.span variants={word} custom={0} initial="hidden" animate="show" className="inline-block">
                  COMPLIANCE
                </motion.span>{" "}
                <motion.span variants={word} custom={1} initial="hidden" animate="show" className="inline-block">
                  TODAY.
                </motion.span>
              </span>
              <span className="block overflow-hidden whitespace-nowrap">
                <motion.span variants={word} custom={2} initial="hidden" animate="show" className="inline-block">
                  A
                </motion.span>{" "}
                <motion.span variants={word} custom={3} initial="hidden" animate="show" className="inline-block">
                  STRONGER
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span variants={word} custom={4} initial="hidden" animate="show" className="inline-block">
                  TOMORROW.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="mt-7 max-w-xl text-lede text-pretty text-[var(--muted-foreground)]"
            >
              Helping organizations achieve global certifications, operational
              excellence, and sustainable growth — engineered across aerospace,
              medical devices, automotive, manufacturing and telecom.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--royal)] text-white px-6 py-3.5 text-[0.95rem] font-semibold hover:bg-[var(--navy)] transition-colors"
                style={{ boxShadow: "0 12px 28px -12px rgba(14, 99, 255, 0.55)" }}
              >
                Book Consultation
                <ArrowUpRight className="h-4 w-4 arrow-nudge" strokeWidth={1.75} />
              </a>
              <a
                href="#certifications"
                className="group inline-flex items-center gap-2 rounded-full border border-[var(--navy)]/15 bg-white/50 px-5 py-3.5 text-[0.9rem] font-medium text-[var(--navy)] hover:bg-white transition-colors"
              >
                Explore Certifications
                <ArrowRight className="h-4 w-4 arrow-nudge" strokeWidth={1.75} />
              </a>
            </motion.div>
          </div>

          {/* RIGHT — Layered visual ecosystem */}
          <div className="lg:col-span-5 xl:col-span-5 relative h-[440px] sm:h-[520px] lg:h-[640px]">
            <HeroVisual reduced={reduced} />
          </div>
        </div>
      </div>

      {/* bottom hairline transition into trust bar */}
      <div className="relative mt-16 lg:mt-24">
        <div className="hairline" />
      </div>
    </section>
  );
}

function HeroVisual({ reduced }: { reduced: boolean }) {
  const tx = "calc(var(--px,0) * 14px)";
  const ty = "calc(var(--py,0) * 14px)";

  return (
    <div className="absolute inset-0">
      {/* primary aerospace engine panel */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 right-0 w-[78%] h-[68%] rounded-[14px] overflow-hidden shadow-[0_24px_60px_-20px_rgba(7,27,58,0.35)]"
        style={{ transform: reduced ? undefined : `translate3d(${tx}, ${ty}, 0)` }}
      >
        <img
          src="https://images.unsplash.com/photo-1569629743817-70d8db6c323b?auto=format&fit=crop&w=1200&q=80"
          alt="Jet engine turbine close-up representing aerospace engineering precision"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--navy-deep)]/55 via-transparent to-transparent" />
        {/* corner technical label */}
        <div aria-hidden="true" className="absolute top-4 left-4 text-white/90">
          <div className="text-mono-label text-[0.62rem]">01 / AEROSPACE</div>
        </div>
        <div aria-hidden="true" className="absolute bottom-4 right-4 flex items-center gap-2 text-white/85">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--royal)] animate-pulse-soft" />
          <span className="text-mono-label text-[0.62rem]">AS9100 · NADCAP</span>
        </div>
      </motion.div>

      {/* glass architecture panel */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-[2%] left-0 w-[58%] h-[44%] rounded-[14px] overflow-hidden shadow-[0_24px_60px_-22px_rgba(7,27,58,0.45)]"
        style={{ transform: reduced ? undefined : `translate3d(calc(var(--px,0) * -10px), calc(var(--py,0) * -10px), 0)` }}
      >
        <img
          src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/eea65dbc0095.jpg"
          alt="Modern glass architecture representing engineered enterprise systems"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/60 to-transparent" />
        <div aria-hidden="true" className="absolute bottom-3 left-3 text-white/90">
          <div className="text-mono-label text-[0.6rem]">02 / SYSTEMS</div>
        </div>
      </motion.div>

      {/* medical device floating panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95, duration: 0.8 }}
        className="absolute top-[6%] left-[2%] w-[40%] h-[30%] rounded-[14px] overflow-hidden shadow-[0_18px_40px_-16px_rgba(7,27,58,0.45)] hidden sm:block"
        style={{ transform: reduced ? undefined : `translate3d(calc(var(--px,0) * 6px), calc(var(--py,0) * 6px), 0)` }}
      >
        <img
          src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/cba817ae9f7a.png"
          alt="Medical device laboratory representing ISO 13485 compliance"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy)]/30 to-[var(--navy)]/70" />
        <div aria-hidden="true" className="absolute bottom-2 left-2 text-white/90">
          <div className="text-mono-label text-[0.55rem]">03 / MEDICAL</div>
        </div>
      </motion.div>

      {/* digital compliance HUD chip — top right floating */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute top-[34%] right-[2%] glass-panel rounded-xl px-3 py-2.5 text-white"
        style={{ transform: reduced ? undefined : `translate3d(${tx}, ${ty}, 0)` }}
        aria-hidden="true"
      >
      </motion.div>

      {/* decorative orbital ring SVG */}
      <svg
        className="absolute -bottom-6 -right-6 h-40 w-40 opacity-30 pointer-events-none hidden md:block"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden
      >
        <circle cx="100" cy="100" r="80" stroke="var(--royal)" strokeWidth="0.5" strokeDasharray="2 6" className="animate-orbit-slow origin-center" />
        <circle cx="100" cy="100" r="60" stroke="var(--navy)" strokeWidth="0.5" strokeDasharray="2 6" className="animate-orbit-slow origin-center" style={{ animationDirection: "reverse", animationDuration: "90s" }} />
        <circle cx="100" cy="100" r="40" stroke="var(--royal)" strokeWidth="0.5" strokeDasharray="2 6" />
      </svg>

      {/* thin scan line top to bottom */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[14px]">
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--royal)]/40 to-transparent"
          style={{ top: "55%", animation: reduced ? undefined : "nucleus-line-scan 6s ease-in-out infinite" }}
        />
      </div>
    </div>
  );
}
