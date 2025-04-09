"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, Mail, Linkedin, Github } from "lucide-react";
import ConfettiButton from "./ConfettiButton";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 pt-32 overflow-hidden">
      {/* Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="gemini-container relative pb-20 md:pb-32 flex flex-col md:flex-row items-center animate-content">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-0 md:mr-12"
        >
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-purple-500 shadow-xl">
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white">
              JP
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center md:text-left"
        >
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
              Jean Prénom
            </h1>
            <div className="bg-purple-500/20 px-4 py-2 rounded-full text-purple-300 font-semibold mb-6">
              Ingénieur Cybersécurité / Réseaux
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mb-6">
              Alternant passionné par la cybersécurité et les réseaux, avec une expertise en détection de vulnérabilités, déploiement de systèmes SIEM/XDR et administration réseau.
            </p>

            <div className="flex items-center mb-8 bg-purple-800/30 px-4 py-2 rounded-lg">
              <h2 className="text-3xl text-purple-400 font-medium">Bonjour</h2>
              <span className="text-3xl ml-2 animate-bounce">👋</span>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
              <ConfettiButton className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-6 flex items-center">
                <Download className="mr-2 h-5 w-5" />
                Télécharger CV
              </ConfettiButton>
              <ConfettiButton variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 rounded-full px-6 py-6 flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Contact
              </ConfettiButton>
            </div>

            <div className="flex space-x-4">
              <a href="https://www.linkedin.com" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Github size={24} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
