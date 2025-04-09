"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PgpKey from "@/components/PgpKey";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Key, Lock, Mail } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { getProjectsByCategory, Project } from "@/lib/project-utils";

export default function PgpPage() {
  const { setTheme } = useTheme();
  const [displayText, setDisplayText] = useState("");
  const fullText = "PGP"; // Modified title to "PGP"
  const [projects, setProjects] = useState<Project[]>([]);

  // Charger les projets PGP
  useEffect(() => {
    setProjects(getProjectsByCategory("PGP"));
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
            Cette clé publique PGP vous permet de m'envoyer des messages chiffrés ou de vérifier
            l'authenticité des communications que je vous envoie.
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
                <Lock className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Confidentialité</h3>
              <p className="text-gray-300">
                Les messages chiffrés avec cette clé ne peuvent être lus que par moi, garantissant la confidentialité de nos échanges.
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-700 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Authenticité</h3>
              <p className="text-gray-300">
                Vérifiez que les communications que je vous envoie sont authentiques et n'ont pas été modifiées.
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-700 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Communication Sécurisée</h3>
              <p className="text-gray-300">
                Établissez un canal de communication sécurisé pour partager des informations sensibles.
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
            <Key className="h-8 w-8 text-blue-400 mr-3" />
            <h2 className="text-2xl font-bold text-blue-400">Détails de la Clé PGP</h2>
          </div>

          <PgpKey />

          <div className="mt-8 bg-blue-900/40 p-4 rounded-lg border border-blue-600">
            <h3 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Comment utiliser cette clé ?</h3>
            <ol className="space-y-2 text-gray-300 ml-5 list-decimal">
              <li>Importez cette clé dans votre gestionnaire GPG (GnuPG, GPGTools, etc.)</li>
              <li>Chiffrez votre message avec cette clé publique</li>
              <li>Envoyez le message chiffré via e-mail ou tout autre canal</li>
              <li>Je pourrai déchiffrer le message avec ma clé privée correspondante</li>
            </ol>
          </div>
        </motion.div>

        <div className="flex justify-center gap-4">
          <Link href="/tmux">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all duration-300 transform hover:scale-105">
              Configuration Tmux
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
