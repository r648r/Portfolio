"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Filter, Shield, Skull, Server } from "lucide-react";
import { getAllProjects, getProjectsByCategory, getCategoryCount, Project } from "@/lib/project-utils";

// Type pour catégorie de projet
type ProjectCategory = "Red Team" | "Blue Team" | "DevSecOps" | "All";

export default function ProjectsSection() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(getAllProjects());

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(getAllProjects());
    } else {
      setFilteredProjects(getProjectsByCategory(activeFilter as "Red Team" | "Blue Team" | "DevSecOps"));
    }
  }, [activeFilter]);

  // Calculer les totaux par catégorie
  const categoryCount = getCategoryCount();

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-blue-950 via-black to-blue-950">
      <div className="gemini-container animate-content">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gemini-gradient-text">{t("projects.title")}</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            {t("projects.description")}
          </p>

          {/* Filtres de catégorie */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 text-sm ${
                activeFilter === "All"
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
              onClick={() => setActiveFilter("All")}
            >
              <Filter className="w-4 h-4" />
              {t("projects.all")} ({categoryCount.all})
            </Badge>
            <Badge
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 text-sm ${
                activeFilter === "Red Team"
                  ? "bg-red-600 hover:bg-red-500"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
              onClick={() => setActiveFilter("Red Team")}
            >
              <Skull className="w-4 h-4" />
              {t("nav.redteam")} ({categoryCount.redTeam})
            </Badge>
            <Badge
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 text-sm ${
                activeFilter === "Blue Team"
                  ? "bg-blue-700 hover:bg-blue-600"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
              onClick={() => setActiveFilter("Blue Team")}
            >
              <Shield className="w-4 h-4" />
              {t("nav.blueteam")} ({categoryCount.blueTeam})
            </Badge>
            <Badge
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 text-sm ${
                activeFilter === "DevSecOps"
                  ? "bg-purple-600 hover:bg-purple-500"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
              onClick={() => setActiveFilter("DevSecOps")}
            >
              <Server className="w-4 h-4" />
              {t("nav.devsecops")} ({categoryCount.devSecOps})
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="gemini-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 180, 255, 0.2)" }}
            >
              <h3 className="text-2xl font-bold gemini-gradient-text mb-3">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-slate-800 rounded-full text-xs hover:bg-blue-900 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="text-sm text-gray-400 space-y-1 pl-5 list-disc mb-4">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button className="gemini-btn-primary px-4 py-2 w-full bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/20">
                Voir le projet
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
