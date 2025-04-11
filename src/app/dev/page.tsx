"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MiniTerminal from "@/components/MiniTerminal";
import PgpKey from "@/components/PgpKey";
import TmuxConfig from "@/components/TmuxConfig";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Terminal,
  Code,
  Cpu,
  Command,
  Server,
  Shield,
  Braces,
  Github,
  Key,
  Lock,
  Mail,
  Layers,
  Monitor,
} from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { getProjectsByCategory, Project } from "@/lib/project-utils";

export default function DevPage() {
  const { setTheme } = useTheme();
  const [displayText, setDisplayText] = useState("");
  const fullText = "Développement";
  const [projects, setProjects] = useState<Project[]>([]);

  // Charger les projets Dev
  useEffect(() => {
    setProjects(getProjectsByCategory("Development"));
  }, []);

  // Animation du texte façon terminal
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

  // Forcer le thème bleu pour cette page
  useEffect(() => {
    setTheme("blue");
  }, [setTheme]);

  // Injection des styles NES (animation console rétro)
  useEffect(() => {
    const nesStyle = document.createElement("style");
    nesStyle.textContent = `
    @import url(https://fonts.googleapis.com/css?family=Coda+Caption:800);
    .nes-container {
      padding: 30px;
      border-radius: 8px;
      position: relative;
      margin: 2rem auto;
      max-width: 45em;
    }
    #size1, #size2, #size3, #size4 {
      position: absolute;
      left: -9999px;
    }
    input:checked + .size1, input:checked + .size2, input:checked + .size3, input:checked + .size4 {
      box-shadow: inset 2px 3px 0px rgba(0, 0, 0, 0.34),inset -1px -1px 0px rgba(255, 255, 255, 0.22);
      background: #7A7077;
    }
    .size1 {
      position: absolute;
      width: 20px;
      height: 20px;
      background: #CDC8C5;
      left: 60px;
      top: 60px;
      border-radius: 50%;
    }
    .size2 {
      position: absolute;
      width: 40px;
      height: 40px;
      background: #CDC8C5;
      left: 90px;
      top: 50px;
      border-radius: 50%;
    }
    .size3 {
      position: absolute;
      width: 60px;
      height: 60px;
      background: #CDC8C5;
      left: 140px;
      top: 40px;
      border-radius: 50%;
    }
    .size4 {
      position: absolute;
      width: 80px;
      height: 80px;
      background: #CDC8C5;
      left: 220px;
      top: 30px;
      border-radius: 50%;
    }
    #size1:checked ~ #nes {
      font-size: 8px;
    }
    #size2:checked ~ #nes {
      font-size: 12px;
    }
    #size3:checked ~ #nes {
      font-size: 16px;
    }
    #size4:checked ~ #nes {
      font-size: 20px;
    }
    #nes {
      width: 45em;
      height: 15em;
      margin: 140px auto;
      position: relative;
      color: #B62F28;
      font-family: 'Coda Caption', sans-serif;
      transition: all 0.1s;
    }
    #nes:after {
      content: "";
      position: absolute;
      width: 80%;
      height: 0;
      box-shadow: 0 0 5em 3em rgba(0, 0, 0, 0.22);
      bottom: -4%;
      left: 10%;
      z-index: -1;
      border-radius: 50%;
    }
    .nes-top {
      position: absolute;
      top: 0;
      left: 0;
      width: 45em;
      height: 7.4em;
      background: #cdc8c5;
      border-radius: 0.3em 0.3em 0 0;
      box-shadow: 0 0.1em 0em #B8B4B2,0 0.5em 0em -0.2em #535353;
      border-top: 0.2em solid rgba(255, 255, 255, 0.32);
      border-left: 0.2em solid rgba(255, 255, 255, 0.32);
      border-right: 0.2em solid rgba(0, 0, 0, 0.05);
      box-sizing: border-box;
    }
    .lid {
      z-index: 1;
      width: 25em;
      height: 6em;
      background: #CDC8C5;
      position: absolute;
      left: 5em;
      transition: all 1s;
      transform-style: preserve-3d;
      transform-origin:0 0 -6em;
      box-sizing: border-box;
      border-top: 0.2em solid rgba(255, 255, 255, 0.32);
      top: -0.2em;
      box-shadow: 0 0.1em 0.2em 0 rgba(0, 0, 0, 0.41);
      border-right: 0.1em solid rgba(255, 255, 255, 0.26);
      border-bottom: 0.1em solid rgba(255, 255, 255, 0.26);
      border-radius: 0.15em;
    }
    .nes-bottom {
      width: 39em;
      height: 7.5em;
      background: #7A7077;
      position: absolute;
      bottom: 0;
      left: 3em;
      border-bottom: 0.2em solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 0.6em 1em -0.3em rgba(0, 0, 0, 0.45);
    }
    .power-box {
      position: absolute;
      left: 1.4em;
      width: 11.5em;
      top: 0;
      height: 5.8em;
      border: 0.1em solid rgba(0, 0, 0, 0.05);
      border-top: 0;
      border-radius: 0.3em;
      border-top-right-radius: 0;
      border-right: 0.1em solid rgba(255, 255, 255, 0.05);
      color: #AC2828;
    }
    /* ...etc (réduction pour brièveté)... */
    `;
    document.head.appendChild(nesStyle);
    return () => {
      document.head.removeChild(nesStyle);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-black to-blue-950 text-white">
      {/* En-tête */}
      <Header />

      <div className="pt-32 pb-20 gemini-container">
        {/* ------ SECTION INTRO (animation) ------ */}
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

          {/* Animation GitHub */}
          <motion.div
            className="mt-6 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Image
              src="https://green-wall.leoku.dev/_next/image?url=/mona-loading-default.gif&w=128&q=75"
              alt="GitHub Animation"
              width={256}
              height={256}
              className="rounded-full border-2 border-blue-400"
            />
          </motion.div>
        </div>

        {/* ------ GITHUB STATS ------ */}
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
            {/* Langages */}
            <div className="bg-blue-900/40 p-4 rounded-lg border border-blue-600 flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Langages utilisés
              </h3>
              <Image
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=r648r&size_weight=0&count_weight=1"
                alt="Langages par nombre de dépôts"
                width={800}
                height={500}
                style={{ objectFit: "contain" }}
                className="rounded-lg"
              />
            </div>

            {/* Contributions */}
            <div className="bg-blue-900/40 p-4 rounded-lg border border-blue-600 flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Contributions
              </h3>
              <Image
                src="/img/github.png"
                alt="Contributions GitHub"
                width={800}
                height={500}
                style={{ objectFit: "contain" }}
                className="rounded-lg"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* ------ TERMINAL INTERACTIF ------ */}
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

        {/* ------ TECHNOLOGIES ET COMPÉTENCES ------ */}
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

        {/* ------ CLÉ PGP ------ */}
        <motion.div
          className="bg-blue-900/20 p-8 rounded-lg border border-blue-700 mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center mb-6">
            <Key className="h-8 w-8 text-blue-400 mr-3" />
            <h2 className="text-2xl font-bold text-blue-400">Clé PGP</h2>
          </div>

          <div className="mb-6">
            <p className="text-gray-300">
              Cette clé publique PGP vous permet de m'envoyer des messages chiffrés ou de vérifier
              l'authenticité des communications que je vous envoie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-900/40 p-4 rounded-lg border border-blue-600 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center mb-3">
                <Lock className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Confidentialité
              </h3>
              <p className="text-gray-300 text-sm">
                Les messages chiffrés avec cette clé ne peuvent être lus que par moi.
              </p>
            </div>
            <div className="bg-blue-900/40 p-4 rounded-lg border border-blue-600 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center mb-3">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Authenticité
              </h3>
              <p className="text-gray-300 text-sm">
                Vérifiez l'authenticité des communications que je vous envoie.
              </p>
            </div>
            <div className="bg-blue-900/40 p-4 rounded-lg border border-blue-600 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center mb-3">
                <Mail className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Communication Sécurisée
              </h3>
              <p className="text-gray-300 text-sm">
                Établissez un canal de communication sécurisé pour les informations sensibles.
              </p>
            </div>
          </div>

          <PgpKey />

          <div className="mt-6 bg-blue-900/40 p-4 rounded-lg border border-blue-600">
            <h3 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Comment utiliser cette clé ?
            </h3>
            <ol className="space-y-2 text-gray-300 ml-5 list-decimal">
              <li>Importez cette clé dans votre gestionnaire GPG (GnuPG, GPGTools, etc.)</li>
              <li>Chiffrez votre message avec cette clé publique</li>
              <li>Envoyez le message chiffré via e-mail ou tout autre canal</li>
              <li>Je pourrai déchiffrer le message avec ma clé privée correspondante</li>
            </ol>
          </div>
        </motion.div>

        {/* ------ TMUX CONFIG ------ */}
        <motion.div
          className="bg-blue-900/20 p-8 rounded-lg border border-blue-700 mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <Terminal className="h-8 w-8 text-blue-400 mr-3" />
            <h2 className="text-2xl font-bold text-blue-400">Configuration Tmux</h2>
          </div>

          <div className="mb-6">
            <p className="text-gray-300">
              Tmux est un multiplexeur de terminal permettant de lancer plusieurs sessions de terminal dans une seule fenêtre.
              Voici ma configuration personnalisée pour optimiser mon flux de travail en cybersécurité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-900/40 p-4 rounded-lg border border-blue-600 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center mb-3">
                <Layers className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Sessions Persistantes
              </h3>
              <p className="text-gray-300 text-sm">
                Gardez vos sessions actives même après la déconnexion.
              </p>
            </div>
            <div className="bg-blue-900/40 p-4 rounded-lg border border-blue-600 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center mb-3">
                <Monitor className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Multiples Panneaux
              </h3>
              <p className="text-gray-300 text-sm">
                Divisez votre terminal en plusieurs panneaux pour une meilleure productivité.
              </p>
            </div>
            <div className="bg-blue-900/40 p-4 rounded-lg border border-blue-600 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center mb-3">
                <Command className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Raccourcis Personnalisés
              </h3>
              <p className="text-gray-300 text-sm">
                Raccourcis clavier optimisés pour une navigation rapide.
              </p>
            </div>
          </div>

          <TmuxConfig />

          <div className="mt-6 bg-blue-900/40 p-4 rounded-lg border border-blue-600">
            <h3 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Installation et utilisation
            </h3>
            <ol className="space-y-2 text-gray-300 ml-5 list-decimal">
              <li>
                Copiez ce contenu dans un fichier <code className="bg-blue-900 px-1 rounded">.tmux.conf</code> dans votre répertoire principal
              </li>
              <li>
                Rechargez la configuration avec{" "}
                <code className="bg-blue-900 px-1 rounded">tmux source-file ~/.tmux.conf</code>
              </li>
              <li>
                Démarrez une nouvelle session tmux avec{" "}
                <code className="bg-blue-900 px-1 rounded">tmux</code>
              </li>
              <li>
                Utilisez <code className="bg-blue-900 px-1 rounded">C-b</code> (Ctrl+b) comme touche préfixe par défaut
              </li>
            </ol>
          </div>
        </motion.div>
      </div>

      {/* Pied de page */}
      <Footer />
    </div>
  );
}