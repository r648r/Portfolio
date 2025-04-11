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
    
    // Ajuster le comportement du défilement en fonction de la taille de l'écran
    const adjustScrollBehavior = () => {
      const html = document.documentElement;
      if (window.innerWidth < 768 || window.innerHeight < 700) {
        // Désactiver le snap sur petit écran ou écran de faible hauteur
        html.style.scrollSnapType = "none";
        // Réduire les distances d'animation pour éviter les disparitions
        document.documentElement.style.setProperty('--scroll-fade-distance', '10px');
      } else {
        // Activer un snap plus doux sur les grands écrans
        html.style.scrollSnapType = "y proximity";
        document.documentElement.style.setProperty('--scroll-fade-distance', '30px');
      }
    };

    // Exécuter au chargement et à chaque redimensionnement
    adjustScrollBehavior();
    window.addEventListener("resize", adjustScrollBehavior);

    // Observer le scroll pour éviter les comportements indésirables
    const handleScroll = () => {
      // Assurer que les éléments ne disparaissent pas pendant le défilement
      const scrollElements = document.querySelectorAll('[data-scroll-item]');
      scrollElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Si l'élément est partiellement visible, s'assurer qu'il reste visible
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('stay-visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", adjustScrollBehavior);
      window.removeEventListener('scroll', handleScroll);
    };
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