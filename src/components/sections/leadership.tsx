"use client";

import { motion } from "framer-motion";

export function LeadershipSection() {
  return (
    <section
      id="leadership"
      className="relative py-24 lg:py-36 bg-[var(--silver)] overflow-hidden"
      aria-label="Leadership"
    >
      <div className="absolute inset-0 bg-grid-ice pointer-events-none" />
      <div className="container-nucleus relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-[0_30px_70px_-30px_rgba(7,27,58,0.4)] border border-[var(--navy)]/10">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=85"
                alt="Executive portrait of Nucleus founding partner and practice lead"
                className="absolute inset-0 h-full w-full object-cover grayscale contrast-115 brightness-95 transition-transform duration-700 hover:scale-102"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)]/85 via-[var(--navy-deep)]/20 to-transparent" />
              {/* technical label */}
              <div className="absolute top-4 left-4 text-mono-label text-white/90 text-[0.6rem] bg-black/30 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-full">
                / LEADERSHIP · NUCLEUS
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="font-display text-lg font-semibold">Founding Partner</div>
                <div className="text-mono-label text-white/65 text-[0.6rem] mt-0.5">
                  Practice Lead · Aerospace & Medical
                </div>
              </div>
            </div>
          </motion.div>

          {/* quote */}
          <div className="lg:col-span-7">
            <p className="text-eyebrow text-[var(--royal)] mb-5">/ Leadership</p>
            <h2 className="text-headline text-[var(--navy)] text-balance">
              Built on expertise.<br />
              <span className="text-[var(--muted-foreground)]">Driven by outcomes.</span>
            </h2>
            <motion.blockquote
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--navy)] text-balance max-w-2xl"
            >
              &ldquo;Compliance is not just about certification. It is about
              building stronger, more resilient businesses.&rdquo;
            </motion.blockquote>

            <div className="mt-10 grid sm:grid-cols-3 gap-6 max-w-xl">
              {[
                ["20+", "years audit practice"],
                ["8", "standards led"],
                ["6", "sectors covered"],
              ].map(([n, l]) => (
                <div key={l} className="border-l border-[var(--navy)]/15 pl-4">
                  <div className="font-display text-2xl font-bold text-[var(--navy)] tracking-[-0.02em]">{n}</div>
                  <div className="text-mono-label text-[var(--muted-foreground)] mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
