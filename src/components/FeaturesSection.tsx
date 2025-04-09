"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Calendar } from "lucide-react";

export default function ExperienceSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const experiences = [
    {
      id: "alpes-networks",
      title: "Ingénieur Cybersécurité / Réseaux",
      company: "Alpes Networks",
      period: "Avril 2023 - Actuel",
      type: "Alternance",
      description: "Administration réseaux et sécurité. Mise en place de solutions de sécurité, gestion des infrastructures réseau et déploiement d'outils de surveillance.",
      current: true
    },
    {
      id: "municipalite",
      title: "Technicien de surface",
      company: "Municipalité",
      period: "Juin 2022 - Juillet 2022",
      type: "CDD",
      description: "Nettoyage sanitaire, excellente maîtrise du karcher.",
      current: false
    },
    {
      id: "teleconseiller",
      title: "Téléconseiller",
      company: "Performance Direct",
      period: "Octobre 2021 - Mars 2022",
      type: "CDD",
      description: "Gestion des appels clients, résolution de problèmes et service à la clientèle.",
      current: false
    },
    {
      id: "formateur",
      title: "Formateur informatique",
      company: "Particuliers",
      period: "Avril 2020 - Septembre 2021",
      type: "Freelance",
      description: "Formation informatique pour des particuliers, accompagnement dans l'apprentissage des outils numériques.",
      current: false
    }
  ];

  return (
    <section id="experience" className="bg-slate-900 py-24 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-50">
        <div className="absolute top-40 -right-60 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl" />
      </div>

      <div className="gemini-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              Expériences Professionnelles
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Mon parcours professionnel dans le domaine de la technologie et de la cybersécurité
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {experiences.map((experience) => (
            <motion.div key={experience.id} variants={fadeInUp}>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-lg hover:shadow-blue-500/5 transition-shadow relative overflow-hidden">
                {experience.current && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-blue-500 text-white text-xs px-3 py-1 rounded-bl-lg">
                      Actuel
                    </div>
                  </div>
                )}
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-white mb-1">{experience.title}</h3>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-3">
                      <p className="text-blue-400 font-medium">{experience.company}</p>
                      <div className="hidden md:block h-1 w-1 rounded-full bg-slate-600" />
                      <div className="flex items-center text-slate-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{experience.period}</span>
                      </div>
                      <div className="hidden md:block h-1 w-1 rounded-full bg-slate-600" />
                      <span className="text-slate-400">{experience.type}</span>
                    </div>
                    <p className="text-gray-300">{experience.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
