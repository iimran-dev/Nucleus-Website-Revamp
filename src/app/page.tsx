import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { CertificationOrbit } from "@/components/sections/certification-orbit";
import { IndustryExperience } from "@/components/sections/industry-experience";
import { TransformationEngine } from "@/components/sections/transformation-engine";
import { CertificationBlueprint } from "@/components/sections/certification-blueprint";
import { SuccessTheatre } from "@/components/sections/success-theatre";
import { TrustLogos } from "@/components/sections/trust-logos";
import { KnowledgeCenter } from "@/components/sections/knowledge-center";
import { CertificationFinder } from "@/components/sections/certification-finder";
import { CreqAISection } from "@/components/sections/creqai";
import { LeadershipSection } from "@/components/sections/leadership";
import { StandardsWall } from "@/components/sections/standards-wall";
import { InsightsTimeline } from "@/components/sections/insights-timeline";
import { FinalCTA } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--silver)]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <CertificationOrbit />
        <IndustryExperience />
        <TransformationEngine />
        <SuccessTheatre />
        <TrustLogos />
        <KnowledgeCenter />
        <CreqAISection />
        <LeadershipSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
