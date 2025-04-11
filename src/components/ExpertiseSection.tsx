"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, BarChart, FileCode, Globe } from "lucide-react";
import ConfettiButton from "./ConfettiButton";

// Import du style CSS pour la section
import "../../src/app/globals.css";

export default function ExpertiseSection() {
  return (
    <div className="snap-section py-16">
      <div className="gemini-container animate-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold mb-3 text-blue-400 flex items-center justify-center gap-3">
            <ShieldCheck className="h-8 w-8" /> Mes domaines d'expertise
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Une approche complète de la cybersécurité, de l'analyse des vulnérabilités à la sécurisation des infrastructures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-blue-900/20 p-6 rounded-lg border border-blue-700 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-red-900 flex items-center justify-center mb-4">
              <BarChart className="h-8 w-8 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-red-300">Pentesting</h3>
            <p className="text-gray-300">
              Identification et exploitation des vulnérabilités pour renforcer vos systèmes
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-blue-900/20 p-6 rounded-lg border border-blue-700 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center mb-4">
              <ShieldCheck className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-blue-300">Sécurité Défensive</h3>
            <p className="text-gray-300">
              Détection et réponse aux incidents pour protéger votre infrastructure
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-blue-900/20 p-6 rounded-lg border border-blue-700 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-purple-900 flex items-center justify-center mb-4">
              <FileCode className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-purple-300">DevSecOps</h3>
            <p className="text-gray-300">
              Intégration de la sécurité dans le cycle de développement
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-blue-900/20 p-6 rounded-lg border border-blue-700 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-900 flex items-center justify-center mb-4">
              <Globe className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-green-300">Cloud Security</h3>
            <p className="text-gray-300">
              Sécurisation des environnements cloud et des infrastructures virtuelles
            </p>
          </motion.div>
        </div>

        {/* Boutons sans la barre de dégradé */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 relative"
        >
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            <ConfettiButton
              href="#audit"
              className="bg-gradient-to-r from-blue-800 via-blue-600 to-violet-700 hover:from-blue-700 hover:via-blue-600 hover:to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap flex-1 text-center max-w-xs"
            >
              Service d'audit sécurité
            </ConfettiButton>

            <ConfettiButton
              href="#formation"
              className="bg-gradient-to-r from-violet-800 via-red-700 to-red-700 hover:from-violet-700 hover:via-violet-600 hover:to-violet-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap flex-1 text-center max-w-xs"
            >
              Formations cybersécurité
            </ConfettiButton>

            <ConfettiButton
              href="#conseil"
              className="bg-gradient-to-r from-red-600 via-violet-600 to-blue-600 hover:from-red-700 hover:via-red-600 hover:to-red-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap flex-1 text-center max-w-xs"
            >
              Conseil stratégique
            </ConfettiButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}