"use client";

import { ArrowUpRight, Clock } from "lucide-react";
import { motion } from "framer-motion";

type Article = {
  id: string;
  title: string;
  category: string;
  read: string;
  excerpt: string;
  image: string;
  alt: string;
};

const FEATURED: Article = {
  id: "featured",
  title: "Why AS9100 Rev D still surprises aerospace suppliers in 2025",
  category: "Article · Aerospace",
  read: "9 min read",
  excerpt:
    "Three years into Rev D, audit findings remain concentrated in risk-based thinking, design assurance and supplier control. We unpack the persistent gaps and what they mean for supplier qualification.",
  image:
    "https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=1600&q=80",
  alt: "Aircraft engine close-up representing aerospace engineering precision",
};

const SUPPORTING: Article[] = [
  {
    id: "wp1",
    title: "ISO 13485:2016 vs MDSAP — a practical gap map",
    category: "Whitepaper · Medical",
    read: "12 min",
    excerpt:
      "Where the MDSAP model extends ISO 13485, where it diverges, and how to scope a single system that satisfies both.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7b70fcb6f58d.jpg",
    alt: "Medical device in a quality lab",
  },
  {
    id: "cs1",
    title: "IATF 16949 rollout in 12 weeks — a Tier-1 case study",
    category: "Case Study · Automotive",
    read: "8 min",
    excerpt:
      "How a Tier-1 supplier compressed their IATF timeline without compromising core-tools discipline.",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80",
    alt: "Automotive factory assembly line",
  },
  {
    id: "up1",
    title: "ISO 27001:2022 transition deadlines — what changes",
    category: "Industry Update · Information Security",
    read: "6 min",
    excerpt:
      "The 2022 amendment timeline, what auditors are looking for in transition audits, and how to evidence the changes.",
    image:
      "https://images.unsplash.com/photo-1614064548237-096f735f344f?auto=format&fit=crop&w=1000&q=80",
    alt: "Server racks representing information security infrastructure",
  },
];

export function KnowledgeCenter() {
  return (
    <section id="knowledge" className="relative py-14 sm:py-16 lg:py-20 bg-[var(--silver)] overflow-hidden">
      <div className="absolute inset-0 bg-grid-ice pointer-events-none" />
      <div className="container-nucleus relative">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 mb-8 lg:mb-10 items-end">
          <div className="lg:col-span-7">
            <p className="text-eyebrow text-[var(--royal)] mb-2">/ Knowledge Center</p>
            <h2 className="font-display text-[clamp(1.75rem,2.8vw,2.5rem)] font-semibold tracking-[-0.025em] text-[var(--navy)] text-balance leading-[1.08]">
              Knowledge that moves you forward.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[0.92rem] lg:text-[1rem] text-[var(--muted-foreground)] leading-relaxed">
              Editorial perspectives on standards, audit practice and operational
              maturity — written by practitioners who sit on both sides of the audit table.
            </p>
          </div>
        </div>

        {/* featured + supporting grid */}
        <div className="grid lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* Featured — 60% */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 group flex"
          >
            <a href="#knowledge" className="block relative rounded-xl overflow-hidden w-full bg-[var(--navy-deep)] flex flex-col justify-end">
              <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full overflow-hidden">
                <img
                  src={FEATURED.image}
                  alt={FEATURED.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)]/90 via-[var(--navy-deep)]/40 to-transparent" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md px-2.5 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--royal)]" />
                  <span className="text-mono-label text-white/90 text-[0.6rem]">{FEATURED.category}</span>
                </div>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white">
                <div className="flex items-center gap-2.5 text-mono-label text-white/60 text-[0.6rem]">
                  <span>{FEATURED.read}</span>
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  <span>FEATURED</span>
                </div>
                <h3 className="mt-2 font-display text-[clamp(1.25rem,1.9vw,1.75rem)] font-semibold tracking-[-0.02em] leading-[1.12] text-balance">
                  {FEATURED.title}
                </h3>
                <p className="mt-2 max-w-xl text-[0.85rem] sm:text-[0.88rem] text-white/80 leading-snug line-clamp-2">
                  {FEATURED.excerpt}
                </p>
                <div className="mt-3.5 inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white group-hover:text-[var(--royal-soft)] transition-colors">
                  Read article
                  <ArrowUpRight className="h-3.5 w-3.5 arrow-nudge" strokeWidth={1.75} />
                </div>
              </div>
            </a>
          </motion.article>

          {/* Supporting — 40% */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3.5 sm:gap-4">
            {SUPPORTING.map((a, i) => (
              <motion.article
                key={a.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group p-3 sm:p-3.5 rounded-xl border border-[var(--navy)]/8 bg-white/60 hover:bg-white hover:border-[var(--royal)]/25 hover:shadow-sm transition-all"
              >
                <a href="#knowledge" className="grid grid-cols-12 gap-3.5 items-center">
                  <div className="col-span-4 relative aspect-[4/3] rounded-lg overflow-hidden shrink-0">
                    <img
                      src={a.image}
                      alt={a.alt}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/30 to-transparent" />
                  </div>
                  <div className="col-span-8 flex flex-col justify-center">
                    <div className="text-mono-label text-[var(--royal)] text-[0.58rem]">{a.category}</div>
                    <h3 className="mt-1 font-display text-sm sm:text-[0.92rem] font-semibold tracking-[-0.015em] text-[var(--navy)] leading-snug group-hover:text-[var(--royal)] transition-colors line-clamp-2">
                      {a.title}
                    </h3>
                    <p className="mt-1 text-[0.78rem] text-[var(--muted-foreground)] leading-snug line-clamp-2">
                      {a.excerpt}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 text-mono-label text-[var(--muted-foreground)] text-[0.58rem]">
                      <Clock className="h-2.5 w-2.5" strokeWidth={1.5} />
                      {a.read}
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
