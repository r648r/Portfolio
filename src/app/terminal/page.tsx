"use client";

import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TerminalDemo from "@/components/TerminalDemo";
import TerminalPlayer from "@/components/TerminalPlayer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Terminal, Code, Cpu, Command, Server } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TerminalPage() {
  // Chargement du script asciinema
  useEffect(() => {
    const loadAsciinemaScript = () => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/asciinema-player@3.0.1/dist/bundle/asciinema-player.min.js';
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

      <section className="py-16">
        <div className="gemini-container">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4 text-center text-blue-400">Démos de Terminal</h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-8">
              Découvrez mes workflows et outils de cybersécurité en action à travers ces démos de terminal préenregistrées.
              Ces démos présentent des techniques et outils utilisés dans mes projets Red Team et Blue Team.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-700 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center mb-4">
                  <Code className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-300">Scripts d'Automatisation</h3>
                <p className="text-gray-300">
                  Automatisation des tâches répétitives pour des pentests et audits de sécurité plus efficaces.
                </p>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-700 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center mb-4">
                  <Cpu className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-300">Outils Spécialisés</h3>
                <p className="text-gray-300">
                  Démonstration des outils de cybersécurité pour la reconnaissance, l'exploitation et la post-exploitation.
                </p>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-700 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center mb-4">
                  <Server className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-300">Analyse de Logs</h3>
                <p className="text-gray-300">
                  Techniques d'analyse de logs et de détection d'intrusions pour les équipes défensives.
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
              <h2 className="text-2xl font-bold text-blue-400">Démos Interactives</h2>
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
                <h3 className="text-xl font-semibold mb-4 text-blue-300">Reconnaissance Red Team</h3>
                <p className="text-gray-300 mb-6">
                  Cette démo montre les techniques de reconnaissance utilisées dans une mission Red Team,
                  y compris la découverte de réseaux, l'énumération de services et l'exploration des vulnérabilités.
                </p>
                <TerminalPlayer castFile="/casts/1.cast" title="~/red-team-recon" />
              </TabsContent>

              <TabsContent value="demo2" className="mt-4">
                <h3 className="text-xl font-semibold mb-4 text-blue-300">Exploitation de Vulnérabilités</h3>
                <p className="text-gray-300 mb-6">
                  Démonstration des techniques d'exploitation de vulnérabilités communes, avec un accent
                  sur l'exploitation éthique et contrôlée dans un environnement de test.
                </p>
                <TerminalPlayer castFile="/casts/2.cast" title="~/exploitation" />
              </TabsContent>

              <TabsContent value="demo3" className="mt-4">
                <h3 className="text-xl font-semibold mb-4 text-blue-300">Analyse Blue Team</h3>
                <p className="text-gray-300 mb-6">
                  Cette démo présente les outils et techniques utilisés par les équipes Blue Team pour
                  détecter et analyser les incidents de sécurité à travers l'analyse de logs et de trafic réseau.
                </p>
                <TerminalDemo />
              </TabsContent>
            </Tabs>

            <div className="mt-8 bg-blue-900/40 p-4 rounded-lg border border-blue-600">
              <h3 className="text-xl font-semibold mb-3 text-blue-300">À propos de ces démos</h3>
              <ul className="space-y-2 text-gray-300 ml-5 list-disc">
                <li>Toutes les démonstrations sont exécutées dans des environnements contrôlés</li>
                <li>Les techniques sont présentées à des fins éducatives uniquement</li>
                <li>Certains outils peuvent nécessiter des autorisations spéciales dans un environnement de production</li>
                <li>Ces démos sont régulièrement mises à jour avec de nouvelles techniques et outils</li>
              </ul>
            </div>
          </motion.div>

          <div className="flex justify-center gap-4">
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
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
