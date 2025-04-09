"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTheme } from "@/lib/theme-context";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { getProjectsByCategory, Project } from "@/lib/project-utils";

export default function BlueTeamPage() {
  const { setTheme } = useTheme();
  const [displayText, setDisplayText] = useState("");
  const fullText = "Projets Blue Team";
  const [projects, setProjects] = useState<Project[]>([]);

  // Charger les projets Blue Team
  useEffect(() => {
    setProjects(getProjectsByCategory("Blue Team"));
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
    // Restauration impossible car cette page doit toujours être bleue
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
            <Shield className="h-10 w-10 text-blue-400" />
          </motion.div>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Collection de mes projets défensifs, outils et recherches dans le domaine de la sécurité défensive.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="gemini-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <h3 className="text-2xl font-bold gemini-gradient-text mb-3">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-slate-800 rounded-full text-xs">
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="text-sm text-gray-400 space-y-1 pl-5 list-disc mb-4">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button className="gemini-btn-primary px-4 py-2 w-full">Voir le projet</button>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
