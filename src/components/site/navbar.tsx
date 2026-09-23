"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Certifications", href: "#certifications" },
  { label: "Industries", href: "#industries" },
  { label: "Our Approach", href: "#approach" },
  { label: "Resources", href: "#knowledge" },
  { label: "About", href: "#leadership" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-[var(--border)]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="container-nucleus">
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-500",
              scrolled ? "h-16" : "h-20"
            )}
          >
            {/* Brand */}
            <a href="#top" className="flex items-center gap-3 group" aria-label="Nucleus home">
              <BrandMark />
              <div className="flex flex-col leading-none">
                <span className="font-display text-[1.05rem] font-bold tracking-[-0.02em] text-[var(--navy)]">
                  NUCLEUS
                </span>
                <span className="text-mono-label text-[0.6rem] text-[var(--muted-foreground)] mt-1 hidden sm:block">
                  Compliance for a Better Tomorrow
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-9" aria-label="Primary">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[0.875rem] font-medium text-[var(--navy)]/80 hover:text-[var(--navy)] transition-colors link-underline"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right cluster */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Search"
                className="hidden sm:grid place-items-center h-10 w-10 rounded-full text-[var(--navy)]/70 hover:text-[var(--navy)] hover:bg-[var(--ice)] transition-colors"
              >
                <Search className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.6} />
              </button>
              <a
                href="#contact"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[var(--royal)] text-white text-[0.8125rem] font-medium pl-4 pr-3 py-2.5 hover:bg-[var(--navy)] transition-colors group"
              >
                Book Consultation
                <ArrowUpRight className="h-3.5 w-3.5 arrow-nudge" strokeWidth={1.75} />
              </a>
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className="lg:hidden grid place-items-center h-10 w-10 rounded-full text-[var(--navy)] hover:bg-[var(--ice)] transition-colors"
              >
                <Menu className="h-5 w-5" strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[var(--navy-deep)] text-white lg:hidden"
          >
            <div className="container-nucleus h-20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BrandMark light />
                <span className="font-display text-lg font-bold tracking-[-0.02em]">NUCLEUS</span>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid place-items-center h-10 w-10 rounded-full text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" strokeWidth={1.6} />
              </button>
            </div>

            <div className="container-nucleus pt-8">
              <nav className="flex flex-col" aria-label="Mobile">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                    className="py-4 border-b border-white/10 font-display text-2xl font-semibold tracking-[-0.02em] text-white/90 hover:text-white"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-10 flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--royal)] text-white text-sm font-medium px-5 py-3.5"
                >
                  Book Consultation
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                </a>
                <a
                  href="#knowledge"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/20 text-white/90 text-sm font-medium px-5 py-3.5"
                >
                  Explore Resources
                </a>
              </div>

              <p className="mt-10 text-mono-label text-white/40 text-[0.65rem]">
                Compliance for a Better Tomorrow
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <span
      className={cn(
        "grid place-items-center h-9 w-9 rounded-full border transition-colors",
        light ? "border-white/20" : "border-[var(--navy)]/15"
      )}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="3" fill={light ? "#0E63FF" : "#0E63FF"} />
        <ellipse
          cx="12"
          cy="12"
          rx="9"
          ry="4"
          stroke={light ? "rgba(255,255,255,0.7)" : "var(--navy)"}
          strokeWidth="1.1"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="9"
          ry="4"
          stroke={light ? "rgba(255,255,255,0.5)" : "var(--royal)"}
          strokeWidth="1.1"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="9"
          ry="4"
          stroke={light ? "rgba(255,255,255,0.35)" : "var(--navy-soft)"}
          strokeWidth="1.1"
          transform="rotate(120 12 12)"
        />
      </svg>
    </span>
  );
}
