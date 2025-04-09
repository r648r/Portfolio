"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TerminalDemo from "@/components/TerminalDemo";
import TerminalPlayer from "@/components/TerminalPlayer";
import MiniTerminal from "@/components/MiniTerminal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Terminal, Code, Cpu, Command, Server, Shield, Skull } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/lib/theme-context";
import { getProjectsByCategory, Project } from "@/lib/project-utils";

export default function TerminalPage() {
  const { setTheme } = useTheme();
  const [displayText, setDisplayText] = useState("");
  const fullText = "Terminal";
  const [projects, setProjects] = useState<Project[]>([]);

  // Charger les projets Terminal
  useEffect(() => {
    setProjects(getProjectsByCategory("Terminal"));
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

  // Chargement du script asciinema
  useEffect(() => {
    const loadAsciinemaScript = () => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/asciinema-player@3.6.3/dist/bundle/asciinema-player.min.js';
      script.async = true;
      document.body.appendChild(script);
    };

    // Vérifiez si le script n'est pas déjà chargé
    if (typeof window !== 'undefined' && !window.AsciinemaPlayer) {
      loadAsciinemaScript();
    }

    return () => {
      // Nettoyage si nécessaire
    };
  }, []);

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
            Explorez mes workflows et outils de cybersécurité en action à travers ces terminaux interactifs et démos préenregistrées.
          </motion.p>
        </div>

        {/* Section Terminal Interactif */}
        <motion.div
          className="bg-blue-900/20 p-8 rounded-lg border border-blue-700 mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <Command className="h-8 w-8 text-blue-400 mr-3" />
            <h2 className="text-2xl font-bold text-blue-400">Terminal Interactif</h2>
          </div>

          <div className="mb-4">
            <p className="text-gray-300 mb-6">
              Explorez mon profil et mes compétences à travers cette interface terminal interactive.
              Tapez <code className="px-2 py-1 bg-blue-900/60 rounded text-blue-300 font-mono">help</code> pour découvrir les commandes disponibles.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <MiniTerminal
              title="~/cybersecurity-portfolio"
              className="w-full shadow-xl"
              height="350px"
              prompt="[user@cybersec]$"
            />
            <div className="mt-2 text-center text-xs text-gray-400">
              <p>Utilisez <span className="px-1 py-0.5 bg-blue-900 rounded text-blue-300">Tab</span> pour l'autocomplétion et <span className="px-1 py-0.5 bg-blue-900 rounded text-blue-300">↑/↓</span> pour l'historique des commandes</p>
              <p className="mt-1">Essayez des commandes comme <span className="px-1 py-0.5 bg-blue-900 rounded text-blue-300">projects</span>, <span className="px-1 py-0.5 bg-blue-900 rounded text-blue-300">skills</span> ou <span className="px-1 py-0.5 bg-blue-900 rounded text-blue-300">cat README.md</span></p>
            </div>
          </div>
        </motion.div>

        {/* Reste du contenu */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-700 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center mb-4">
                <Code className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Scripts d&apos;Automatisation</h3>
              <p className="text-gray-300">
                Automatisation des tâches répétitives pour des pentests et audits de sécurité plus efficaces.
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-700 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center mb-4">
                <Cpu className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Outils Spécialisés</h3>
              <p className="text-gray-300">
                Démonstration des outils de cybersécurité pour la reconnaissance, l&apos;exploitation et la post-exploitation.
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-700 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center mb-4">
                <Server className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Analyse de Logs</h3>
              <p className="text-gray-300">
                Techniques d&apos;analyse de logs et de détection d&apos;intrusions pour les équipes défensives.
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
            <h2 className="text-2xl font-bold text-blue-400">Démos Préenregistrées</h2>
          </div>

          <Tabs defaultValue="demo1" className="w-full">
            <TabsList className="w-full grid grid-cols-3 bg-transparent border border-blue-500 p-1 rounded-lg mb-6">
              <TabsTrigger
                value="demo1"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                Red Team Recon
              </TabsTrigger>
              <TabsTrigger
                value="demo2"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                Exploitation
              </TabsTrigger>
              <TabsTrigger
                value="demo3"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                Blue Team Analysis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="demo1" className="mt-4">
              <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Reconnaissance Red Team</h3>
              <p className="text-gray-300 mb-6">
                Cette démo montre les techniques de reconnaissance utilisées dans une mission Red Team,
                y compris la découverte de réseaux, l&apos;énumération de services et l&apos;exploration des vulnérabilités.
              </p>
              <TerminalPlayer
                castFile="/casts/1.cast"
                title="~/red-team-recon"
                fit="width"
                theme="monokai"
                cols={80}
                rows={24}
              />
            </TabsContent>

            <TabsContent value="demo2" className="mt-4">
              <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Exploitation de Vulnérabilités</h3>
              <p className="text-gray-300 mb-6">
                Démonstration des techniques d&apos;exploitation de vulnérabilités communes, avec un accent
                sur l&apos;exploitation éthique et contrôlée dans un environnement de test.
              </p>
              <TerminalPlayer
                castFile="/casts/2.cast"
                title="~/exploitation"
                fit="width"
                theme="monokai"
                cols={80}
                rows={24}
              />
            </TabsContent>

            <TabsContent value="demo3" className="mt-4">
              <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Analyse Blue Team</h3>
              <p className="text-gray-300 mb-6">
                Cette démo présente les outils et techniques utilisés par les équipes Blue Team pour
                détecter et analyser les incidents de sécurité à travers l&apos;analyse de logs et de trafic réseau.
              </p>
              <TerminalDemo
                title="~/blue-team-analysis"
                className="w-full"
              />
            </TabsContent>
          </Tabs>

          <div className="mt-8 bg-blue-900/40 p-4 rounded-lg border border-blue-600">
            <h3 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">À propos de ces démos</h3>
            <ul className="space-y-2 text-gray-300 ml-5 list-disc">
              <li>Toutes les démonstrations sont exécutées dans des environnements contrôlés</li>
              <li>Les techniques sont présentées à des fins éducatives uniquement</li>
              <li>Certains outils peuvent nécessiter des autorisations spéciales dans un environnement de production</li>
              <li>Ces démos sont régulièrement mises à jour avec de nouvelles techniques et outils</li>
            </ul>
          </div>
        </motion.div>

        <div className="flex justify-center gap-4">
          <Link href="/red-team">
            <Button className="bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              <Skull className="h-4 w-4" />
              Projets Red Team
            </Button>
          </Link>
          <Link href="/blue-team">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Projets Blue Team
            </Button>
          </Link>
          <Link href="/pgp">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all duration-300 transform hover:scale-105">
              Ma clé PGP
            </Button>
          </Link>
          <Link href="/tmux">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all duration-300 transform hover:scale-105">
              Configuration Tmux
            </Button>
          </Link>
          <Link href="/">
            <Button className="bg-gray-700 hover:bg-gray-600 text-white shadow-lg shadow-gray-700/20 transition-all duration-300 transform hover:scale-105">
              Retour à l&apos;accueil
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
