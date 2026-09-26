"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Story = {
  id: string;
  industry: string;
  certification: string;
  client: string;
  quote: string;
  metrics: { label: string; value: string }[];
  image: string;
  alt: string;
};

const STORIES: Story[] = [
  {
    id: "aero",
    industry: "Aerospace & Defense",
    certification: "AS9100",
    client: "Tier-2 aerospace components manufacturer",
    quote:
      "Compliance became a structured path toward operational improvement — not a hurdle to clear once a year.",
    metrics: [
      { label: "Certification completed", value: "AS9100D" },
      { label: "Audit preparation", value: "14 weeks" },
      { label: "Process improvement", value: "+34%" },
      { label: "Market readiness", value: "Tier-1 qualified" },
    ],
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/41912279ac6d.jpg",
    alt: "Aircraft fuselage assembly representing aerospace manufacturing operations",
  },
  {
    id: "med",
    industry: "Medical Devices",
    certification: "ISO 13485",
    client: "Class II medical device engineering firm",
    quote:
      "Design controls finally clicked. Risk management stopped being paperwork and started being how we make decisions.",
    metrics: [
      { label: "Certification completed", value: "ISO 13485:2016" },
      { label: "Audit preparation", value: "10 weeks" },
      { label: "CAPA closure time", value: "−62%" },
      { label: "Market readiness", value: "MDSAP aligned" },
    ],
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/cbb8e0e953ad.png",
    alt: "Medical device laboratory representing ISO 13485 implementation",
  },
  {
    id: "auto",
    industry: "Automotive",
    certification: "IATF 16949",
    client: "Tier-1 automotive supplier",
    quote:
      "Core-tools discipline transformed our audit posture. We walked into audit-day with confidence — and walked out with no majors.",
    metrics: [
      { label: "Certification completed", value: "IATF 16949" },
      { label: "Audit preparation", value: "12 weeks" },
      { label: "Non-conformities", value: "0 major" },
      { label: "Market readiness", value: "OEM qualified" },
    ],
    image:
      "https://images.unsplash.com/photo-1547245324-d777c6f05e80?auto=format&fit=crop&w=1400&q=80",
    alt: "Automotive body welding line representing precision manufacturing",
  },
];

export function SuccessTheatre() {
  const [active, setActive] = useState(0);
  const story = STORIES[active];

  return (
    <section
      id="stories"
      className="relative py-24 lg:py-32 bg-[var(--silver)] overflow-hidden"
      aria-label="Client success stories"
    >
      <div className="absolute inset-0 bg-grid-ice pointer-events-none" />
      <div className="container-nucleus relative">
        <div className="flex items-end justify-between mb-12 lg:mb-16">
          <div>
            <p className="text-eyebrow text-[var(--royal)] mb-4">/ Client Success Stories</p>
            <h2 className="text-headline text-[var(--navy)] text-balance">
              Outcomes, told by the organizations that earned them.
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous story"
              onClick={() => setActive((a) => (a - 1 + STORIES.length) % STORIES.length)}
              className="grid place-items-center h-11 w-11 rounded-full border border-[var(--navy)]/15 bg-white text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              aria-label="Next story"
              onClick={() => setActive((a) => (a + 1) % STORIES.length)}
              className="grid place-items-center h-11 w-11 rounded-full border border-[var(--navy)]/15 bg-white text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white transition-colors"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid lg:grid-cols-12 gap-6 lg:gap-8"
          >
            {/* LEFT — context */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <div className="space-y-5 lg:sticky lg:top-28">
                <div>
                  <div className="text-mono-label text-[var(--royal)] text-[0.62rem]">INDUSTRY</div>
                  <div className="mt-1 font-display text-lg font-semibold text-[var(--navy)]">{story.industry}</div>
                </div>
                <div>
                  <div className="text-mono-label text-[var(--royal)] text-[0.62rem]">CERTIFICATION</div>
                  <div className="mt-1 font-display text-lg font-semibold text-[var(--navy)]">{story.certification}</div>
                </div>
                <div>
                  <div className="text-mono-label text-[var(--royal)] text-[0.62rem]">CLIENT</div>
                  <div className="mt-1 text-[0.9rem] text-[var(--muted-foreground)] leading-snug max-w-xs">
                    {story.client}
                  </div>
                </div>
              </div>
            </div>

            {/* CENTER — photography */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_24px_60px_-20px_rgba(7,27,58,0.35)]">
                <motion.img
                  src={story.image}
                  alt={story.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)]/40 to-transparent" />
                <div className="absolute top-4 left-4 text-mono-label text-white/80 text-[0.62rem]">
                  / {String(active + 1).padStart(2, "0")} — {String(STORIES.length).padStart(2, "0")}
                </div>
              </div>
            </div>

            {/* RIGHT — quote + metrics */}
            <div className="lg:col-span-3 order-3 flex flex-col">
              <blockquote className="font-display text-[clamp(1.4rem,1.8vw,1.8rem)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--navy)] text-balance">
                &ldquo;{story.quote}&rdquo;
              </blockquote>
              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
                {story.metrics.map((m) => (
                  <div key={m.label} className="border-l border-[var(--navy)]/15 pl-3">
                    <div className="font-display text-base font-semibold text-[var(--navy)]">{m.value}</div>
                    <div className="text-mono-label text-[var(--muted-foreground)] text-[0.6rem] mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* progress dots */}
        <div className="mt-10 flex items-center gap-2">
          {STORIES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Go to story ${i + 1}`}
              onClick={() => setActive(i)}
              className="h-1 rounded-full transition-all duration-500"
              style={{
                width: i === active ? 56 : 24,
                background: i === active ? "var(--navy)" : "rgba(7,27,58,0.18)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
