"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Linear navigation mapped directly to the section order in page.tsx
export const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Certifications", href: "#certifications" },
  { label: "Industries", href: "#industries" },
  { label: "Approach", href: "#approach" },
  { label: "Case Studies", href: "#stories" },
  { label: "Knowledge", href: "#knowledge" },
  { label: "CREQAI", href: "#creqai" },
  { label: "Leadership", href: "#leadership" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#top");

  // Track scroll position for backdrop blur and linear scrollspy highlighting
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const sectionIds = NAV_LINKS.map((link) => link.href.replace("#", ""));
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        if (id === "top") {
          if (window.scrollY < 300) {
            setActiveSection("#top");
            break;
          }
        } else {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= scrollPosition) {
            setActiveSection(`#${id}`);
            break;
          }
        }
      }
    };

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
            ? "bg-white/85 backdrop-blur-xl border-b border-[var(--border)] shadow-[0_4px_24px_rgba(7,27,58,0.04)]"
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
            {/* Brand Logo */}
            <a href="#top" className="flex items-center gap-3 shrink-0 group" aria-label="Nucleus home">
              <BrandMark />
              <div className="flex flex-col leading-none">
                <span className="font-display text-[1.05rem] font-bold tracking-[-0.02em] text-[var(--navy)]">
                  NUCLEUS
                </span>
              </div>
            </a>

            {/* Linear Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6" aria-label="Primary Linear Navigation">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "text-[0.8125rem] xl:text-[0.84rem] py-1 transition-all duration-200 relative whitespace-nowrap",
                      isActive
                        ? "text-[var(--royal)] font-semibold"
                        : "font-medium text-[var(--navy)]/70 hover:text-[var(--navy)]"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="linearNavActive"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--royal)] rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right cluster */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <button
                type="button"
                aria-label="Search"
                className="hidden sm:grid place-items-center h-9 w-9 rounded-full text-[var(--navy)]/70 hover:text-[var(--navy)] hover:bg-[var(--ice)] transition-colors"
              >
                <Search className="h-4 w-4" strokeWidth={1.6} />
              </button>
              <a
                href="#contact"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[var(--royal)] text-white text-[0.8125rem] font-medium pl-4 pr-3 py-2 hover:bg-[var(--navy)] transition-colors group shadow-sm shadow-blue-500/20"
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

      {/* Mobile Linear Drawer Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[var(--navy-deep)] text-white lg:hidden overflow-y-auto"
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

            <div className="container-nucleus pt-4 pb-12">
              <p className="text-mono-label text-white/40 text-[0.62rem] mb-2 uppercase tracking-[0.2em]">
                Page Navigation
              </p>
              <nav className="flex flex-col" aria-label="Mobile Linear Navigation">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.href;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.35 }}
                      className={cn(
                        "py-3.5 border-b border-white/10 font-display text-xl font-semibold tracking-[-0.02em] flex items-center justify-between transition-colors",
                        isActive ? "text-[var(--royal-soft)]" : "text-white/80 hover:text-white"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-[0.68rem] font-mono text-white/35 font-normal">
                          0{i + 1}
                        </span>
                        <span>{link.label}</span>
                      </span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--royal)]" />
                      )}
                    </motion.a>
                  );
                })}
              </nav>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--royal)] text-white text-sm font-medium px-5 py-3.5 shadow-md shadow-blue-500/25"
                >
                  Book Consultation
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                </a>
              </div>

              <p className="mt-8 text-mono-label text-white/40 text-[0.65rem]">
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
        "grid place-items-center h-9 w-9 rounded-full border transition-colors shrink-0",
        light ? "border-white/20" : "border-[var(--navy)]/15"
      )}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="3" fill="#0E63FF" />
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
