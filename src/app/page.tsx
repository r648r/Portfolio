"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import { useTheme } from "@/lib/theme-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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

      <div className="snap-section">
        <div className="gemini-container pt-16 animate-content">
          <div className="flex justify-center mb-8 space-x-4">
            <Link href="/configurations">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/20">
                Voir mes configurations
              </Button>
            </Link>
            <Link href="/terminal">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/20">
                Démo Terminal
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="snap-section">
        <ExperienceSection />
      </div>

      <div className="snap-section">
        <ProjectsSection />
      </div>

      <div className="snap-section">
        <CtaSection />
      </div>

      <Footer />
    </main>
  );
}
