"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Server, Code, Terminal, Cog, Lock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTheme } from "@/lib/theme-context";
import { getProjectsByCategory, Project } from "@/lib/project-utils";

export default function DevSecOpsPage() {
  const { setTheme } = useTheme();
  const [displayText, setDisplayText] = useState("");
  const fullText = "Projets DevSecOps";
  const [projects, setProjects] = useState<Project[]>([]);

  // Charger les projets DevSecOps
  useEffect(() => {
    setProjects(getProjectsByCategory("DevSecOps"));
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

  // Force le thème vert pour cette page
  useEffect(() => {
    setTheme("green");
    return () => {};
  }, [setTheme]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-950 via-black to-green-950 text-white">
      <Header />
      <div className="pt-32 pb-20 gemini-container">
        <div className="mb-12 text-center">
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold text-green-400 mb-6 font-mono">
              {displayText}<span className="animate-pulse">_</span>
            </h1>
            <Server className="h-10 w-10 text-green-400" />
          </motion.div>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Intégration de la sécurité tout au long du cycle de développement et des opérations.
          </motion.p>
        </div>

        {/* Pipeline DevSecOps */}
        <motion.div
          className="bg-green-900/30 p-8 rounded-lg border border-green-700 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-green-400">Pipeline DevSecOps</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="flex flex-col items-center p-4">
              <div className="bg-green-800/50 p-3 rounded-full mb-3">
                <Code className="h-6 w-6 text-green-400" />
              </div>
              <span className="text-green-200">Développement</span>
            </div>
            <div className="text-green-600 flex items-center">→</div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-green-800/50 p-3 rounded-full mb-3">
                <Lock className="h-6 w-6 text-green-400" />
              </div>
              <span className="text-green-200">Tests Sécurité</span>
            </div>
            <div className="text-green-600 flex items-center">→</div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-green-800/50 p-3 rounded-full mb-3">
                <Cog className="h-6 w-6 text-green-400" />
              </div>
              <span className="text-green-200">Build</span>
            </div>
            <div className="text-green-600 flex items-center">→</div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-green-800/50 p-3 rounded-full mb-3">
                <Shield className="h-6 w-6 text-green-400" />
              </div>
              <span className="text-green-200">Audit</span>
            </div>
            <div className="text-green-600 flex items-center">→</div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-green-800/50 p-3 rounded-full mb-3">
                <Server className="h-6 w-6 text-green-400" />
              </div>
              <span className="text-green-200">Déploiement</span>
            </div>
            <div className="text-green-600 flex items-center">→</div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-green-800/50 p-3 rounded-full mb-3">
                <Terminal className="h-6 w-6 text-green-400" />
              </div>
              <span className="text-green-200">Monitoring</span>
            </div>
          </div>
        </motion.div>

        {/* Projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="gemini-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 255, 170, 0.2)" }}
            >
              <h3 className="text-2xl font-bold gemini-gradient-text mb-3">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-slate-800 rounded-full text-xs hover:bg-green-900 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="text-sm text-gray-400 space-y-1 pl-5 list-disc mb-4">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button className="gemini-btn-primary px-4 py-2 w-full bg-green-600 hover:bg-green-500 text-white transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-600/20">
                Voir le projet
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
