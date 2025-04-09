"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MiniTerminal from "@/components/MiniTerminal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Terminal, Code, Cpu, Command, Server, Shield, Braces, Github } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/lib/theme-context";
import { getProjectsByCategory, Project } from "@/lib/project-utils";
import EmbedAsciinema from "@/components/EmbedAsciinema";

export default function DevPage() {
  const { setTheme } = useTheme();
  const [displayText, setDisplayText] = useState("");
  const fullText = "Développement";
  const [projects, setProjects] = useState<Project[]>([]);

  // Charger les projets Dev
  useEffect(() => {
    setProjects(getProjectsByCategory("Development"));
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
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-black to-blue-950 text-white">
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
              {displayText}
              <span className="animate-pulse">_</span>
            </h1>
          </motion.div>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Découvrez mes projets de développement, mes compétences techniques et mon activité sur GitHub.
          </motion.p>

          {/* Animation GitHub agrandie */}
          <motion.div
            className="mt-6 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Image
              src="https://green-wall.leoku.dev/_next/image?url=/mona-loading-default.gif&w=128&q=75"
              alt="GitHub Animation"
              width={256}   // Agrandi
              height={256}  // Agrandi
              className="rounded-full border-2 border-blue-400"
            />
          </motion.div>
        </div>

        {/* Section GitHub Stats */}
        <motion.div
          className="bg-blue-900/20 p-8 rounded-lg border border-blue-700 mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <Github className="h-8 w-8 text-blue-400 mr-3" />
            <h2 className="text-2xl font-bold text-blue-400">GitHub Stats</h2>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Langages utilisés */}
            <div className="bg-blue-900/40 p-4 rounded-lg border border-blue-600 flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Langages utilisés
              </h3>
              {/* On retire fill et on donne une taille plus grande */}
              <Image
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=r648r&size_weight=0&count_weight=1"
                alt="Langages par nombre de dépôts"
                width={800}   // Largeur agrandie
                height={500}  // Hauteur agrandie
                style={{ objectFit: "contain" }}
                className="rounded-lg"
              />
            </div>

            {/* Contributions */}
            <div className="bg-blue-900/40 p-4 rounded-lg border border-blue-600 flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Contributions
              </h3>
              {/* Idem, on retire fill et fixons la taille */}
              <Image
                src="/img/github.png"
                alt="Contributions GitHub"
                width={800}   // Largeur agrandie
                height={500}  // Hauteur agrandie
                style={{ objectFit: "contain" }}
                className="rounded-lg"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Section Terminal Interactif */}
        <motion.div
          className="bg-blue-900/20 p-8 rounded-lg border border-blue-700 mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center mb-6">
            <Command className="h-8 w-8 text-blue-400 mr-3" />
            <h2 className="text-2xl font-bold text-blue-400">Environnement de développement</h2>
          </div>

          <div className="mb-4">
            <p className="text-gray-300 mb-6">
              Explorez mon environnement de développement et mes outils à travers cette interface terminal interactive.
              Tapez <code className="px-2 py-1 bg-blue-900/60 rounded text-blue-300 font-mono">help</code> pour découvrir les commandes disponibles.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <MiniTerminal
              title="~/dev-environment"
              className="w-full shadow-xl"
              height="350px"
              prompt="[dev@r648r]$"
            />
            <div className="mt-2 text-center text-xs text-gray-400">
              <p>
                Essayez des commandes comme{" "}
                <span className="px-1 py-0.5 bg-blue-900 rounded text-blue-300">tech-stack</span>,{" "}
                <span className="px-1 py-0.5 bg-blue-900 rounded text-blue-300">projects</span> ou{" "}
                <span className="px-1 py-0.5 bg-blue-900 rounded text-blue-300">cat README.md</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Technologies et compétences */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-700 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center mb-4">
                <Code className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Langages
              </h3>
              <p className="text-gray-300">
                JavaScript/TypeScript, Python, Bash, Go, et autres langages utilisés dans mes projets.
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-700 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center mb-4">
                <Braces className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Frameworks
              </h3>
              <p className="text-gray-300">
                React, Next.js, Node.js, Express, et autres frameworks pour le développement web moderne.
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-700 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center mb-4">
                <Server className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                DevOps
              </h3>
              <p className="text-gray-300">
                CI/CD, Docker, Kubernetes, et autres outils pour le déploiement et la gestion d'applications.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section Démos de Code avec Asciinema (inchangé) */}
        <motion.div
          className="bg-blue-900/20 p-8 rounded-lg border border-blue-700 mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center mb-6">
            <Terminal className="h-8 w-8 text-blue-400 mr-3" />
            <h2 className="text-2xl font-bold text-blue-400">Démos de Code</h2>
          </div>

          <Tabs defaultValue="demo1" className="w-full">
            <TabsList className="w-full grid grid-cols-5 bg-transparent border border-blue-500 p-1 rounded-lg mb-6">
              <TabsTrigger
                value="demo1"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                Demo 1
              </TabsTrigger>
              <TabsTrigger
                value="demo2"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                Demo 2
              </TabsTrigger>
              <TabsTrigger
                value="demo3"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                Demo 3
              </TabsTrigger>
              <TabsTrigger
                value="demo4"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                Demo 4
              </TabsTrigger>
              <TabsTrigger
                value="demo5"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                Demo 5
              </TabsTrigger>
            </TabsList>

            <TabsContent value="demo1" className="mt-4">
              <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Animation Vim
              </h3>
              <p className="text-gray-300 mb-6">
                Démonstration de Vim et de ses capacités d'édition avancées.
              </p>
              <div className="bg-black rounded-lg border border-blue-800">
                <EmbedAsciinema
                  castId="24812"
                  title="~/vim-demo"
                  theme="monokai"
                  autoPlay={true}
                  height="400px"
                  fit="width"
                />
              </div>
            </TabsContent>

            <TabsContent value="demo2" className="mt-4">
              <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Processus de développement
              </h3>
              <p className="text-gray-300 mb-6">
                Visualisation du processus de développement et d'exécution de scripts.
              </p>
              <div className="bg-black rounded-lg border border-blue-800">
                <EmbedAsciinema
                  castId="239367"
                  title="~/dev-process"
                  theme="monokai"
                  autoPlay={true}
                  height="400px"
                  fit="width"
                />
              </div>
            </TabsContent>

            <TabsContent value="demo3" className="mt-4">
              <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Animation Système
              </h3>
              <p className="text-gray-300 mb-6">
                Présentation d'outils système et de commandes shell avancées.
              </p>
              <div className="bg-black rounded-lg border border-blue-800">
                <EmbedAsciinema
                  castId="117813"
                  title="~/system-tools"
                  theme="monokai"
                  autoPlay={true}
                  height="400px"
                  fit="width"
                />
              </div>
            </TabsContent>

            <TabsContent value="demo4" className="mt-4">
              <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Démo bash
              </h3>
              <p className="text-gray-300 mb-6">
                Démonstration de commandes bash et d'utilitaires en ligne de commande.
              </p>
              <div className="bg-black rounded-lg border border-blue-800">
                <EmbedAsciinema
                  castId="8"
                  title="~/bash-demo"
                  autoPlay={true}
                  height="400px"
                  fit="width"
                />
              </div>
            </TabsContent>

            <TabsContent value="demo5" className="mt-4">
              <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Animation Terminal
              </h3>
              <p className="text-gray-300 mb-6">
                Présentation des fonctionnalités avancées du terminal et des outils de développement.
              </p>
              <div className="bg-black rounded-lg border border-blue-800">
                <EmbedAsciinema
                  castId="441582"
                  title="~/terminal-tools"
                  autoPlay={true}
                  height="400px"
                  fit="width"
                />
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Boutons de navigation */}
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/terminal">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              Terminal
            </Button>
          </Link>
          <Link href="/devsecops">
            <Button className="bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-600/20 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              DevSecOps
            </Button>
          </Link>
          <Link href="/red-team">
            <Button className="bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              Red Team
            </Button>
          </Link>
          <Link href="/blue-team">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Blue Team
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
    </div>
  );
}