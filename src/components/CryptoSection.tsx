"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";

export default function EducationSection() {
  const educations = [
    {
      id: "but-rt",
      degree: "B.U.T Réseaux & Télécommunications",
      institution: "Université Savoie Mont-Blanc",
      period: "2021 - 2024",
      details: [
        "BUT1",
        "BUT2",
        "BUT3"
      ]
    },
    {
      id: "master",
      degree: "M1 : Mastère management de la cybersécurité",
      institution: "École Supérieure",
      period: "2024 - Présent",
      details: [
        "D.U.T R&T"
      ]
    }
  ];

  const certifications = [
    {
      id: "stormshield",
      name: "Stormshield",
      certification: "CSNE (Network Expert)"
    },
    {
      id: "cisco",
      name: "CISCO",
      certification: "CCNA 2"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <section id="education" className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="gemini-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              Formation
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Mon parcours académique et mes certifications professionnelles
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <GraduationCap className="h-6 w-6 text-blue-400 mr-2" />
              Parcours académique
            </h3>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {educations.map((edu) => (
                <motion.div
                  key={edu.id}
                  variants={item}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-lg"
                >
                  <div className="mb-2 flex items-center">
                    <Calendar className="h-4 w-4 text-blue-400 mr-2" />
                    <span className="text-slate-400">{edu.period}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">{edu.degree}</h4>
                  <p className="text-blue-400 mb-3">{edu.institution}</p>

                  {edu.details.length > 0 && (
                    <ul className="space-y-1 text-slate-300">
                      {edu.details.map((detail, index) => (
                        <li key={`${edu.id}-detail-${index}`} className="flex items-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <GraduationCap className="h-6 w-6 text-blue-400 mr-2" />
              Certifications
            </h3>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {certifications.map((cert) => (
                <motion.div
                  key={cert.id}
                  variants={item}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white">{cert.name}</h4>
                    <div className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                      Certifié
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm mt-1">{cert.certification}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-slate-400">Désireux de continuer à me former et à acquérir de nouvelles compétences</p>
        </div>
      </div>
    </section>
  );
}
