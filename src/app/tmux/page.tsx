"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TmuxConfig from "@/components/TmuxConfig";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Terminal, Command, Layers, Monitor } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { getProjectsByCategory, Project } from "@/lib/project-utils";

export default function TmuxPage() {
  const { setTheme } = useTheme();
  const [displayText, setDisplayText] = useState("");
  const fullText = "Tmux"; // Modified title
  const [projects, setProjects] = useState<Project[]>([]);

  // Charger les projets Tmux
  useEffect(() => {
    setProjects(getProjectsByCategory("Tmux"));
  }, []);

  // Effect pour l'animation du texte type terminal
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  // Force le thème bleu pour cette page
  useEffect(() => {
    setTheme("blue");
    return () => {};
  }, [setTheme]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 via-black to-blue-950 text-white">
      <Header />
      <div className="pt-32 pb-20 gemini-container">
        <div className="mb-12 text-center">
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold text-blue-400 mb-6 font-mono">
              {displayText}<span className="animate-pulse">_</span>
            </h1>
          </motion.div>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Tmux est un multiplexeur de terminal permettant de lancer plusieurs sessions de terminal dans une seule fenêtre.
            Voici ma configuration personnalisée pour optimiser mon flux de travail en cybersécurité.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-700 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center mb-4">
                <Layers className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Sessions Persistantes</h3>
              <p className="text-gray-300">
                Gardez vos sessions actives même après la déconnexion, idéal pour les tests d'intrusion de longue durée.
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-700 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center mb-4">
                <Monitor className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Multiples Panneaux</h3>
              <p className="text-gray-300">
                Divisez votre terminal en plusieurs panneaux pour surveiller différents processus simultanément.
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-700 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center mb-4">
                <Command className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Raccourcis Personnalisés</h3>
              <p className="text-gray-300">
                Raccourcis clavier optimisés pour une navigation rapide et une productivité maximale.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-blue-900/20 p-8 rounded-lg border border-blue-700 mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center mb-6">
            <Terminal className="h-8 w-8 text-blue-400 mr-3" />
            <h2 className="text-2xl font-bold text-blue-400">Fichier de Configuration</h2>
          </div>

          <TmuxConfig />

          <div className="mt-8 bg-blue-900/40 p-4 rounded-lg border border-blue-600">
            <h3 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Installation et utilisation</h3>
            <ol className="space-y-2 text-gray-300 ml-5 list-decimal">
              <li>Copiez ce contenu dans un fichier <code className="bg-blue-900 px-1 rounded">.tmux.conf</code> dans votre répertoire principal</li>
              <li>Rechargez la configuration avec <code className="bg-blue-900 px-1 rounded">tmux source-file ~/.tmux.conf</code></li>
              <li>Démarrez une nouvelle session tmux avec <code className="bg-blue-900 px-1 rounded">tmux</code></li>
              <li>Utilisez <code className="bg-blue-900 px-1 rounded">C-b</code> (Ctrl+b) comme touche préfixe par défaut</li>
            </ol>
          </div>
        </motion.div>

        <div className="flex justify-center gap-4">
          <Link href="/pgp">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all duration-300 transform hover:scale-105">
              Ma clé PGP
            </Button>
          </Link>
          <Link href="/terminal">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all duration-300 transform hover:scale-105">
              Démo Terminal
            </Button>
          </Link>
          <Link href="/">
            <Button className="bg-gray-700 hover:bg-gray-600 text-white shadow-lg shadow-gray-700/20 transition-all duration-300 transform hover:scale-105">
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
