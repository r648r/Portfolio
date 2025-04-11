"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
// Import ChevronDown supprimé car il n'est plus utilisé
import ConfettiButton from "./ConfettiButton";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import InteractiveTerminal from "./TerminalWhoami";

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Animation pour desktop seulement - suppression de l'effet de transparence
  const y = useTransform(scrollYProgress, [0, 0.7], [0, 100]);

  useEffect(() => {
    setIsClient(true);
    
    // Détecter si l'appareil est mobile
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      
      // Assurer que le terminal est visible sur tous les appareils
      const terminalContainer = document.querySelector('.order-1.lg\\:order-2');
      if (terminalContainer) {
        terminalContainer.classList.remove('hidden');
      }
    };
    
    // Vérifier au chargement initial
    checkIfMobile();
    
    // Vérifier à chaque redimensionnement de la fenêtre
    window.addEventListener('resize', checkIfMobile);

    // Le code pour l'effet de scroll avec le chevron a été supprimé

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen pt-20 pb-10 flex flex-col justify-between">
      {/* Overlay avec motif de fond */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 via-black/80 to-blue-950/70"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 flex-grow flex items-center">
        <div className="gemini-container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center mt-4 md:mt-0">
            {/* Informations de profil - 2 colonnes sur 5 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ y }}
              className="order-2 lg:order-1 lg:col-span-2 relative z-20"
            >
              <div className="relative">
                {/* Badge expérience */}
                <div className="absolute -top-12 -left-5 bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-1 rounded-full text-xs font-medium text-white transform -rotate-3 shadow-lg">
                  +10 ans d'expérience
                </div>



                {/* Conteneur flex modifié pour être en colonne sur mobile et en ligne sur tablette */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6 max-w-full">
                  <Avatar className="h-20 w-20 mb-4 sm:mb-0 sm:mr-4 border-2 border-blue-500">
                    <AvatarImage src="https://avatars.githubusercontent.com/u/159589807?u=a00faeb742a49d9dfa2ccef5cda68b23a73d5b88&v=4" alt="Photo de profil" />
                    <AvatarFallback className="bg-blue-900 text-blue-200">SC</AvatarFallback>
                  </Avatar>

                  <div className="text-center sm:text-left">



                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold flex flex-col gap-0">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-500 to-indigo-700 drop-shadow-md"
      >
        Design
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-600 drop-shadow-md"
      >
        Interactif
      </motion.span>
    </h1>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl text-gray-300 mb-6 text-center sm:text-left">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                  >
                    Pentester & Consultant Sécurité
                  </motion.span>
                </h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  className="text-lg text-gray-400 mb-8 max-w-xl text-center sm:text-left"
                >
                  Spécialiste en sécurité offensive, audit, défense et développement sécurisé.
                  Je protège vos infrastructures contre les menaces numériques avec
                  une approche à la fois technique et stratégique.
                </motion.p>

                {/* Navigation sur deux lignes - progression de gradient continue */}
                <div className="space-y-3 mb-6">
                  {/* Première ligne de boutons - conteneur transparent et boutons avec gradient */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.0 }}
                    className="flex flex-wrap gap-3"
                  >
                    <ConfettiButton
                      href="/cv/cv-fr.pdf"
                      className="bg-gradient-to-r from-violet-900 to-pink-600 hover:from-pink-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm font-medium flex-1"
                    >
                      📄 CV Français
                    </ConfettiButton>

                    <ConfettiButton
                      href="#competences"
                      className="bg-gradient-to-r from-pink-600 to-pink-600 hover:from-blue-600 hover:to-blue-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm font-medium flex-1"
                    >
                      🧠 Compétences
                    </ConfettiButton>

                    <ConfettiButton
                      href="#projets"
                      className="bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm font-medium flex-1"
                    >
                      🚀 Projets
                    </ConfettiButton>
                  </motion.div>

                  {/* Deuxième ligne de boutons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.2 }}
                    className="flex flex-wrap gap-3"
                  >
                    <ConfettiButton
                      href="/cv/cv-en.pdf"
                      className="bg-gradient-to-r from-violet-900 to-pink-600 hover:from-blue-500 hover:to-blue-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm font-medium flex-1"
                    >
                      📄 CV English
                    </ConfettiButton>

                    <ConfettiButton
                      href="#contact"
                      className="bg-gradient-to-r from-pink-600 to-pink-600 hover:from-pink-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm font-medium flex-1"
                    >
                      📨 Contact
                    </ConfettiButton>

                    <ConfettiButton
                      href="#expertise"
                      className="bg-gradient-to-r from-pink-600 to-blue-600 hover:from-blue-500 hover:to-blue-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm font-medium flex-1"
                    >
                      🛡️ Expertise
                    </ConfettiButton>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Terminal interactif à droite - 3 colonnes sur 5 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="order-1 lg:order-2 lg:col-span-3 relative z-10 md:block"
            >
              <div className="relative">
                {/* Effet de glow derrière le terminal */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-30"></div>
                
                {/* Terminal interactif remplace l'ancien terminal */}
                {isClient && <InteractiveTerminal />}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Le bouton "Découvrir" avec la flèche a été supprimé */}
    </div>
  );
}