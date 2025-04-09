"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import { useTheme } from "@/lib/theme-context";
import CtaSection from "@/components/CtaSection";

export default function Home() {
  const { setTheme } = useTheme();

  // Force le thème bleu pour cette page au lieu du violet
  useEffect(() => {
    setTheme("blue");
    return () => {};
  }, [setTheme]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 via-black to-blue-950 text-white">
      <Header />

      <div id="hero" className="snap-section">
        <HeroSection />
      </div>

      {/* Section Expertise/Domaines d'expertise */}
      <div id="expertise" className="snap-section">
        <ExpertiseSection />
      </div>

      <div id="experience" className="snap-section">
        <ExperienceSection />
      </div>

      <div id="projets" className="snap-section">
        <ProjectsSection />
      </div>

      <div className="snap-section">
        <CtaSection />
      </div>

      <Footer />
    </main>
  );
}
