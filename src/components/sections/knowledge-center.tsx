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

const CATEGORIES = [
  "Articles",
  "Whitepapers",
  "Case Studies",
  "Industry Updates",
  "Audit Checklists",
  "Webinars",
];

export function KnowledgeCenter() {
  return (
    <section id="knowledge" className="relative py-24 lg:py-32 bg-[var(--silver)] overflow-hidden">
      <div className="absolute inset-0 bg-grid-ice pointer-events-none" />
      <div className="container-nucleus relative">
        <div className="grid lg:grid-cols-12 gap-8 mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <p className="text-eyebrow text-[var(--royal)] mb-4">/ Knowledge Center</p>
            <h2 className="text-headline text-[var(--navy)] text-balance">
              Knowledge that moves you forward.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-3">
            <p className="text-lede text-[var(--muted-foreground)]">
              Editorial perspectives on standards, audit practice and operational
              maturity — written by practitioners who sit on both sides of the audit table.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-[var(--navy)]/12 bg-white px-3 py-1 text-mono-label text-[var(--navy)]/70 text-[0.62rem]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* featured + supporting grid */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Featured — 60% */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 group"
          >
            <a href="#knowledge" className="block relative rounded-2xl overflow-hidden">
              <div className="relative aspect-[16/11] overflow-hidden">
                <img
                  src={FEATURED.image}
                  alt={FEATURED.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)]/80 via-[var(--navy-deep)]/30 to-transparent" />
                <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--royal)]" />
                  <span className="text-mono-label text-white/90 text-[0.62rem]">{FEATURED.category}</span>
                </div>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-6 lg:p-8 text-white">
                <div className="flex items-center gap-3 text-mono-label text-white/60 text-[0.62rem]">
                  <span>{FEATURED.read}</span>
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  <span>FEATURED</span>
                </div>
                <h3 className="mt-3 font-display text-[clamp(1.6rem,2.4vw,2.4rem)] font-semibold tracking-[-0.025em] leading-[1.05] text-balance">
                  {FEATURED.title}
                </h3>
                <p className="mt-3 max-w-2xl text-[0.95rem] text-white/80 leading-relaxed">
                  {FEATURED.excerpt}
                </p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white">
                  Read article
                  <ArrowUpRight className="h-4 w-4 arrow-nudge" strokeWidth={1.75} />
                </div>
              </div>
            </a>
          </motion.article>

          {/* Supporting — 40% */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {SUPPORTING.map((a, i) => (
              <motion.article
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group"
              >
                <a href="#knowledge" className="grid grid-cols-12 gap-4">
                  <div className="col-span-4 sm:col-span-5 relative aspect-square rounded-xl overflow-hidden">
                    <img
                      src={a.image}
                      alt={a.alt}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/40 to-transparent" />
                  </div>
                  <div className="col-span-8 sm:col-span-7 flex flex-col justify-center">
                    <div className="text-mono-label text-[var(--royal)] text-[0.6rem]">{a.category}</div>
                    <h3 className="mt-1.5 font-display text-base lg:text-lg font-semibold tracking-[-0.015em] text-[var(--navy)] leading-tight group-hover:text-[var(--royal)] transition-colors">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-[0.83rem] text-[var(--muted-foreground)] leading-snug line-clamp-3">
                      {a.excerpt}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-mono-label text-[var(--muted-foreground)] text-[0.6rem]">
                      <Clock className="h-3 w-3" strokeWidth={1.5} />
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
