"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Filter, Shield, Skull, Server } from "lucide-react";
import { getAllProjects, getProjectsByCategory, getCategoryCount, Project } from "@/lib/project-utils";
import ConfettiButton from "./ConfettiButton";

// Supprimé l'import problématique: import ScrollSection, { ScrollItem } from "./ScrollSection";

// Type pour catégorie de projet
type ProjectCategory = "Red Team" | "Blue Team" | "DevSecOps" | "All";

export default function ProjectsSection() {
  const { t } = useLanguage();
  // Changer le filtre par défaut ici (par exemple "Blue Team" au lieu de "All")
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("Blue Team");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Au chargement, appliquer le filtre actif
    if (activeFilter === "All") {
      // Pour "All", récupérer tous les projets mais les trier par catégorie
      const allProjects = getAllProjects();
      // Trier les projets par catégorie (Blue Team, Red Team, puis DevSecOps)
      const sortedProjects = [
        ...allProjects.filter(project => project.category === "Blue Team"),
        ...allProjects.filter(project => project.category === "Red Team"),
        ...allProjects.filter(project => project.category === "DevSecOps")
      ];
      setFilteredProjects(sortedProjects);
    } else {
      // Pour une catégorie spécifique, utiliser getProjectsByCategory
      setFilteredProjects(getProjectsByCategory(activeFilter as "Red Team" | "Blue Team" | "DevSecOps"));
    }
  }, [activeFilter]);

  // Calculer les totaux par catégorie
  const categoryCount = getCategoryCount();

  // Fonction pour changer le filtre avec effet confetti
  const changeFilter = (filter: ProjectCategory) => {
    setActiveFilter(filter);
  };

  // Fonction pour obtenir les couleurs selon la catégorie
  const getCategoryColors = (category: string) => {
    switch (category) {
      case "Red Team":
        return {
          bg: "bg-red-600",
          hover: "hover:bg-red-500",
          shadow: "shadow-red-600/20",
          gradient: "bg-gradient-to-r from-red-400 to-red-600",
          hoverBg: "hover:bg-red-900"
        };
      case "Blue Team":
        return {
          bg: "bg-blue-700",
          hover: "hover:bg-blue-600",
          shadow: "shadow-blue-600/20",
          gradient: "bg-gradient-to-r from-blue-400 to-blue-600",
          hoverBg: "hover:bg-blue-900"
        };
      case "DevSecOps":
        return {
          bg: "bg-green-600",
          hover: "hover:bg-green-500",
          shadow: "shadow-green-600/20",
          gradient: "bg-gradient-to-r from-green-400 to-green-600",
          hoverBg: "hover:bg-green-900"
        };
      default:
        return {
          bg: "bg-blue-600",
          hover: "hover:bg-blue-500",
          shadow: "shadow-blue-600/20",
          gradient: "gemini-gradient-text",
          hoverBg: "hover:bg-blue-900"
        };
    }
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-blue-950 via-black to-blue-950">
      <div className="gemini-container animate-content">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gemini-gradient-text">{t("projects.title")}</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            {t("projects.description")}
          </p>

          {/* Filtres de catégorie avec confetti */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <ConfettiButton
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 text-sm rounded-md transition-colors ${
                activeFilter === "All"
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
              onClick={() => changeFilter("All")}
            >
              <Filter className="w-4 h-4" />
              {t("projects.all")} ({categoryCount.all})
            </ConfettiButton>
            <ConfettiButton
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 text-sm rounded-md transition-colors ${
                activeFilter === "Red Team"
                  ? "bg-red-600 hover:bg-red-500"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
              onClick={() => changeFilter("Red Team")}
            >
              <Skull className="w-4 h-4" />
              {t("nav.redteam")} ({categoryCount.redTeam})
            </ConfettiButton>
            <ConfettiButton
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 text-sm rounded-md transition-colors ${
                activeFilter === "Blue Team"
                  ? "bg-blue-700 hover:bg-blue-600"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
              onClick={() => changeFilter("Blue Team")}
            >
              <Shield className="w-4 h-4" />
              {t("nav.blueteam")} ({categoryCount.blueTeam})
            </ConfettiButton>
            <ConfettiButton
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 text-sm rounded-md transition-colors ${
                activeFilter === "DevSecOps"
                  ? "bg-green-600 hover:bg-green-500"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
              onClick={() => changeFilter("DevSecOps")}
            >
              <Server className="w-4 h-4" />
              {t("nav.devsecops")} ({categoryCount.devSecOps})
            </ConfettiButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const categoryColors = getCategoryColors(project.category);
            
            return (
              <motion.div
                key={project.id}
                className="gemini-card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: project.category === "Red Team" 
                    ? "0 10px 25px -5px rgba(255, 0, 0, 0.2)" 
                    : project.category === "Blue Team"
                    ? "0 10px 25px -5px rgba(0, 180, 255, 0.2)"
                    : project.category === "DevSecOps"
                    ? "0 10px 25px -5px rgba(0, 255, 0, 0.2)"
                    : "0 10px 25px -5px rgba(0, 180, 255, 0.2)"
                }}
              >
                <h3 className={`text-2xl font-bold mb-3 bg-clip-text text-transparent ${categoryColors.gradient}`}>
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className={`px-2 py-1 bg-slate-800 rounded-full text-xs ${categoryColors.hoverBg} transition-colors`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="text-sm text-gray-400 space-y-1 pl-5 list-disc mb-4">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <button 
                  className={`px-4 py-2 w-full ${categoryColors.bg} ${categoryColors.hover} text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg ${categoryColors.shadow}`}
                >
                  Voir le projet
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}