"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Briefcase, Star, Award, Clock } from "lucide-react";
import Link from "next/link";

export default function ExperienceSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-16 bg-gradient-to-b from-blue-900 to-blue-950">
      <div className="gemini-container mb-12 animate-content">
        <h2 className="text-center text-3xl font-bold mb-8 text-blue-400">Expériences et Formation</h2>

        <Tabs defaultValue="professional" className="w-full mb-12">
          <TabsList className="w-full grid grid-cols-2 mb-8 bg-transparent border border-blue-500 p-1 rounded-lg">
            <TabsTrigger
              value="professional"
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              <Briefcase className="h-4 w-4" /> Expériences Professionnelles
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              <GraduationCap className="h-4 w-4" /> Formation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="professional">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div
                className="p-6 rounded-lg border border-blue-500 bg-blue-900/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                variants={item}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-blue-300">Lead Pentester</h3>
                  <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> Actuel
                  </span>
                </div>
                <h4 className="text-lg font-medium text-white mb-1">SecureTech</h4>
                <p className="text-sm text-blue-200 mb-3 flex items-center">
                  <Clock className="h-3 w-3 mr-2" /> 2020 - Présent
                </p>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Direction des opérations Red Team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Coordination des audits de sécurité</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Formation des équipes en pentest avancé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Développement de méthodologies d'audit</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                className="p-6 rounded-lg border border-blue-500 bg-blue-900/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                variants={item}
              >
                <h3 className="text-xl font-semibold text-blue-300 mb-2">Analyste SOC</h3>
                <h4 className="text-lg font-medium text-white mb-1">CyberDefense Inc.</h4>
                <p className="text-sm text-blue-200 mb-3 flex items-center">
                  <Clock className="h-3 w-3 mr-2" /> 2017 - 2020
                </p>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Surveillance et analyse des incidents de sécurité</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Mise en place de systèmes de détection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Gestion des alertes de sécurité</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Conduite d'investigations numériques</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                className="p-6 rounded-lg border border-blue-500 bg-blue-900/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                variants={item}
              >
                <h3 className="text-xl font-semibold text-blue-300 mb-2">Consultant Cybersécurité</h3>
                <h4 className="text-lg font-medium text-white mb-1">SecureNet Solutions</h4>
                <p className="text-sm text-blue-200 mb-3 flex items-center">
                  <Clock className="h-3 w-3 mr-2" /> 2015 - 2017
                </p>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Audit de sécurité pour clients divers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Implémentation de solutions de sécurité</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Conseil en gouvernance de la sécurité</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Évaluation des risques informatiques</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                className="p-6 rounded-lg border border-blue-500 bg-blue-900/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                variants={item}
              >
                <h3 className="text-xl font-semibold text-blue-300 mb-2">Développeur Sécurité</h3>
                <h4 className="text-lg font-medium text-white mb-1">TechGuard Systems</h4>
                <p className="text-sm text-blue-200 mb-3 flex items-center">
                  <Clock className="h-3 w-3 mr-2" /> 2013 - 2015
                </p>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Développement d'outils de sécurité interne</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Tests d'intrusion d'applications web</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Audit de code et révision de sécurité</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Maintenance de l'infrastructure sécurisée</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="education">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div
                className="p-6 rounded-lg border border-blue-500 bg-blue-900/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                variants={item}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-blue-300">Master en Cybersécurité</h3>
                  <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full flex items-center">
                    <Award className="h-3 w-3 mr-1" /> Diplôme
                  </span>
                </div>
                <h4 className="text-lg font-medium text-white mb-1">Université de Technologie</h4>
                <p className="text-sm text-blue-200 mb-3 flex items-center">
                  <Clock className="h-3 w-3 mr-2" /> 2011 - 2013
                </p>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Spécialisation en sécurité des systèmes distribués</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Projet de recherche sur les vulnérabilités zero-day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Stage en entreprise chez DefenseTech</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                className="p-6 rounded-lg border border-blue-500 bg-blue-900/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                variants={item}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-blue-300">Licence en Informatique</h3>
                  <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full flex items-center">
                    <Award className="h-3 w-3 mr-1" /> Diplôme
                  </span>
                </div>
                <h4 className="text-lg font-medium text-white mb-1">École Polytechnique</h4>
                <p className="text-sm text-blue-200 mb-3 flex items-center">
                  <Clock className="h-3 w-3 mr-2" /> 2008 - 2011
                </p>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Option sécurité des systèmes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Projet d'étude sur les infrastructures critiques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Participation à des CTF universitaires</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                className="p-6 rounded-lg border border-blue-500 bg-blue-900/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                variants={item}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-blue-300">Formation continue</h3>
                  <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full flex items-center">
                    <Star className="h-3 w-3 mr-1" /> Certifications
                  </span>
                </div>
                <h4 className="text-lg font-medium text-white mb-1">Certifications et cours spécialisés</h4>
                <p className="text-sm text-blue-200 mb-3 flex items-center">
                  <Clock className="h-3 w-3 mr-2" /> 2013 - Présent
                </p>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Formation SANS en forensique avancée</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Certification Offensive Security (OSCP, OSWE)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Cours en ligne sur la sécurité cloud</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>

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
          <Link href="/terminal">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all duration-300 transform hover:scale-105">
              Démo Terminal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
