"use client";

import type React from "react";
import { useState } from "react";
import TerminalPlayer from "./TerminalPlayer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/lib/theme-context";
import { useLanguage } from "@/lib/language-context";
import { Badge } from "@/components/ui/badge";
import { Bug, Code, Shield, Siren, Layers, Award, GraduationCap, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ConfettiButton from "./ConfettiButton";

// Interface pour les compétences avec icônes
interface Skill {
  id: string; // Ajout d'un id unique
  name: string;
  icon: React.ReactNode;
  color: string;
}

// Interface pour les certifications avec badges
interface Certification {
  name: string;
  fullName: string;
  color: string;
}

export default function ProfileSection() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [expandedSection, setExpandedSection] = useState<string | null>("skills"); // Montrer les compétences par défaut

  // Liste des compétences avec leurs icônes
  const skills: Skill[] = [
    {
      id: "pentesting",
      name: "Pentesting et Analyse de vulnérabilités",
      icon: <Bug className="h-5 w-5" />,
      color: "text-blue-500"
    },
    {
      id: "secure-dev",
      name: "Développement sécurisé",
      icon: <Code className="h-5 w-5" />,
      color: "text-blue-500"
    },
    {
      id: "incident-response",
      name: "Détection d'incidents et réponse",
      icon: <Siren className="h-5 w-5" />,
      color: "text-blue-500"
    },
    {
      id: "malware-analysis",
      name: "Analyse de malware",
      icon: <Bug className="h-5 w-5" />,
      color: "text-blue-500"
    },
    {
      id: "security-arch",
      name: "Architecture de sécurité",
      icon: <Layers className="h-5 w-5" />,
      color: "text-blue-500"
    },
  ];

  // Liste des certifications avec leurs badges
  const certifications: Certification[] = [
    { name: "OSCP", fullName: "Offensive Security Certified Professional", color: "bg-blue-900 hover:bg-blue-800" },
    { name: "CISSP", fullName: "Certified Information Systems Security Professional", color: "bg-blue-900 hover:bg-blue-800" },
    { name: "CEH", fullName: "Certified Ethical Hacker", color: "bg-blue-900 hover:bg-blue-800" },
    { name: "GPEN", fullName: "GIAC Penetration Tester", color: "bg-blue-900 hover:bg-blue-800" },
    { name: "GXPN", fullName: "GIAC Exploit Researcher and Advanced Penetration Tester", color: "bg-blue-900 hover:bg-blue-800" },
  ];

  // Nouvelle liste pour les formations
  const formations = [
    {
      title: "Master en Sécurité Informatique",
      institution: "Université de Cybersécurité",
      year: "2018-2020",
      description: "Spécialisation en tests d'intrusion et analyse de vulnérabilités"
    },
    {
      title: "Licence en Informatique",
      institution: "École Supérieure d'Ingénierie",
      year: "2015-2018",
      description: "Programmation, architecture des systèmes et réseaux"
    },
    {
      title: "Formation Offensive Security",
      institution: "Offensive Security",
      year: "2021",
      description: "Préparation à la certification OSCP avec labs pratiques"
    }
  ];

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <section className="pt-8 pb-16 bg-gradient-to-b from-blue-950 to-black text-white">
      <div className="gemini-container">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-2 text-blue-400">{t("profile.title")}</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
            {t("profile.description")}
          </p>

          <ConfettiButton
            key="cv-button"
            className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all duration-300 transform hover:scale-105">
            {t("profile.cv")}
          </ConfettiButton>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-blue-900/20 p-6 rounded-lg border border-blue-700"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-blue-400 flex items-center gap-2">
              <Shield className="h-6 w-6" /> {t("profile.about")}
            </h3>
            <p className="text-gray-300 mb-4">
              Passionné par la cybersécurité depuis plus de 10 ans, je me spécialise dans la protection
              des infrastructures critiques et le développement de solutions de sécurité innovantes.
            </p>
            <p className="text-gray-300 mb-4">
              Mon approche combine une compréhension approfondie des techniques offensives (Red Team)
              avec une solide expertise en défense (Blue Team), ce qui me permet d'adopter une vision
              holistique des problématiques de sécurité.
            </p>

            <div className="mt-6 border-t border-blue-800 pt-4">
              <h4
                className="flex items-center justify-between text-xl font-semibold text-blue-400 cursor-pointer"
                onClick={() => toggleSection("skills")}
              >
                <span className="flex items-center gap-2">
                  <Code className="h-5 w-5" /> {t("profile.skills")}
                </span>
                <span className="bg-blue-800 rounded-full h-6 w-6 flex items-center justify-center text-sm">
                  {expandedSection === "skills" ? "−" : "+"}
                </span>
              </h4>

              {expandedSection === "skills" && (
                <div className="mt-5 pl-4 border-l-2 border-blue-700">
                  <div className="space-y-4">
                    {skills.map((skill) => (
                      <div key={skill.id} className="flex items-center gap-3 group transition-all hover:translate-x-1">
                        <div className={`p-2 rounded-lg bg-blue-900/50 ${skill.color} transition-colors`}>
                          {skill.icon}
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Nouvelle section Formation */}
            <div className="mt-6 border-t border-blue-800 pt-4">
              <h4
                className="flex items-center justify-between text-xl font-semibold text-blue-400 cursor-pointer"
                onClick={() => toggleSection("formation")}
              >
                <span className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" /> Ma Formation
                </span>
                <span className="bg-blue-800 rounded-full h-6 w-6 flex items-center justify-center text-sm">
                  {expandedSection === "formation" ? "−" : "+"}
                </span>
              </h4>

              {expandedSection === "formation" && (
                <div className="mt-5 pl-4 border-l-2 border-blue-700">
                  <div className="space-y-6">
                    {formations.map((formation, index) => (
                      <div key={index} className="transition-all">
                        <h5 className="text-lg font-medium text-blue-300">{formation.title}</h5>
                        <div className="flex justify-between items-center mt-1 mb-2">
                          <span className="text-sm text-gray-400">{formation.institution}</span>
                          <span className="text-xs bg-blue-900 px-2 py-1 rounded">{formation.year}</span>
                        </div>
                        <p className="text-gray-300 text-sm">{formation.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Certifications dans la section Formation */}
                  <div className="mt-6 pt-4 border-t border-blue-800/50">
                    <h5 className="text-lg font-medium text-blue-300 mb-3 flex items-center gap-2">
                      <Award className="h-4 w-4" /> Certifications
                    </h5>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {certifications.map((cert, index) => (
                        <Badge key={index} className={`${cert.color} px-3 py-1.5 cursor-default transition-all hover:scale-105`}>
                          <Award className="h-3 w-3 mr-1" />
                          {cert.name}
                        </Badge>
                      ))}
                    </div>
                    <ul className="space-y-2 mt-3">
                      {certifications.map((cert, index) => (
                        <li key={index} className="text-gray-300 flex items-start gap-2">
                          <span className="text-xs text-white px-2 py-0.5 rounded bg-blue-800 mt-1">{cert.name}</span>
                          <span>{cert.fullName}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 border-t border-blue-800 pt-4">
              <h4
                className="flex items-center justify-between text-xl font-semibold text-blue-400 cursor-pointer"
                onClick={() => toggleSection("certifications")}
              >
                <span className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" /> {t("profile.certifications")}
                </span>
                <span className="bg-blue-800 rounded-full h-6 w-6 flex items-center justify-center text-sm">
                  {expandedSection === "certifications" ? "−" : "+"}
                </span>
              </h4>

              {expandedSection === "certifications" && (
                <div className="mt-5 pl-4 border-l-2 border-blue-700">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {certifications.map((cert, index) => (
                      <Badge key={index} className={`${cert.color} cursor-pointer transition-all hover:scale-105`}>
                        <Award className="h-3 w-3 mr-1" />
                        {cert.name}
                      </Badge>
                    ))}
                  </div>
                  <ul className="space-y-2 mt-3">
                    {certifications.map((cert, index) => (
                      <li key={index} className="text-gray-300 flex items-start gap-2">
                        <span className="text-xs text-white px-2 py-0.5 rounded bg-blue-800 mt-1">{cert.name}</span>
                        <span>{cert.fullName}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="bg-blue-900/20 p-6 rounded-lg border border-blue-700"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-blue-400 flex items-center gap-2">
              <Terminal className="h-6 w-6" /> {t("profile.environment")}
            </h3>
            <p className="text-gray-300 mb-6">
              {t("profile.env.description")}
            </p>

            <Tabs defaultValue="config1" className="w-full">
              <TabsList className="w-full bg-blue-900/30 border border-blue-800">
                <TabsTrigger
                  value="config1"
                  className="data-[state=active]:bg-blue-800 data-[state=active]:text-white"
                >
                  Red Team Config
                </TabsTrigger>
                <TabsTrigger
                  value="config2"
                  className="data-[state=active]:bg-blue-800 data-[state=active]:text-white"
                >
                  Blue Team Config
                </TabsTrigger>
              </TabsList>
              <TabsContent value="config1" className="mt-4">
                <TerminalPlayer castFile="/casts/1.cast" title="~/red-team-config" />
              </TabsContent>
              <TabsContent value="config2" className="mt-4">
                <TerminalPlayer castFile="/casts/2.cast" title="~/blue-team-config" />
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link href="/pgp">
                <ConfettiButton className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all duration-300 transform hover:scale-105">
                  Ma clé PGP
                </ConfettiButton>
              </Link>
              <Link href="/tmux">
                <ConfettiButton className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all duration-300 transform hover:scale-105">
                  Configuration Tmux
                </ConfettiButton>
              </Link>
              <Link href="/terminal">
                <ConfettiButton className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all duration-300 transform hover:scale-105">
                  Démo Terminal
                </ConfettiButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
