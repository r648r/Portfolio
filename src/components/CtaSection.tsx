"use client";

import { motion } from "framer-motion";
import { Shield, Globe, Terminal, Server, Database, Code } from "lucide-react";

export default function CtaSection() {
  const skillCategories = [
    {
      id: "cybersecurity",
      title: "Cybersécurité",
      icon: <Shield className="h-6 w-6 text-blue-400" />,
      skills: [
        "Détection / correction de vulnérabilités Web (XSS)",
        "Mise en place de SIEM et XDR avec Wazuh",
        "Configuration automatisée via PowerShell de Sysmon, Wazuh Agent",
        "Remontée de règles SIGMA avec Chainsaw",
        "Mise en place de règles YARA"
      ]
    },
    {
      id: "networks",
      title: "Réseaux",
      icon: <Globe className="h-6 w-6 text-blue-400" />,
      skills: [
        "Attribution d'adresses IP publiques & préfixes DHCPv6 via PPPoE et RADIUS",
        "Mise en place de labos virtuels : EVE-NG, GNS3 VM",
        "Protocoles : OSPF, MPLS, BGP, PPPoE, L2TP, NAT, DHCP (v4/v6), HSRP, LACP, SNMP, Wireguard"
      ]
    },
    {
      id: "ansible",
      title: "Ansible",
      icon: <Terminal className="h-6 w-6 text-blue-400" />,
      skills: [
        "Développement d'un module Ansible en Python",
        "Création de rôles (SSH, SNMP, sauvegarde…)",
        "Déploiement de clés publiques et utilisateurs sur un parc de VM",
        "Sécurisation de l'inventaire via Ansible Vault"
      ]
    },
    {
      id: "scripting",
      title: "Scripting",
      icon: <Code className="h-6 w-6 text-blue-400" />,
      skills: [
        "Scripts PowerShell / Bash pour configuration d'utilisateurs et outils métiers",
        "Outils : raphaelito.py, raphaelito.sh"
      ]
    },
    {
      id: "linux",
      title: "Linux",
      icon: <Server className="h-6 w-6 text-blue-400" />,
      skills: [
        "Services : Bind9, Apache, Nginx, PostFix",
        "Authentification : DaloRADIUS, FreeRADIUS3, FOG",
        "Stockage : RAID 0/1/5, LVM",
        "Sécurité : UFW, VLAN, LACP",
        "Autres : Wiki.js, Wireguard"
      ]
    },
    {
      id: "virtualization",
      title: "Virtualisation",
      icon: <Database className="h-6 w-6 text-blue-400" />,
      skills: [
        "Type 1 : EVE-NG, Proxmox, Hyper-V",
        "Type 2 : VMware, VirtualBox"
      ]
    }
  ];

  const languages = [
    { id: "fr", name: "Français", level: "Langue maternelle", progress: 100 },
    { id: "en", name: "Anglais", level: "B2", progress: 75 }
  ];

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

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="competences" className="py-20 bg-gradient-to-b from-blue-950 via-black to-blue-950">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-br from-blue-500/10 to-indigo-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-to-tr from-indigo-600/10 to-blue-400/5 rounded-full blur-3xl" />
      </div>

      <div className="gemini-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
{/* Gradient 1 - Bleu à indigo (original) */}
<h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
    Compétences Techniques
  </span>
</h2>

{/* Gradient 1 - Violet à rose à rouge */}
<h2 className="text-3xl md:text-5xl font-bold mb-4">
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
    Technologies Avancées
  </span>
</h2>

{/* Gradient 2 - Bleu à cyan à vert */}
<h2 className="text-3xl md:text-5xl font-bold mb-4">
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400">
    Solutions Digitales
  </span>
</h2>

{/* Gradient 3 - Orange à rose à violet */}
<h2 className="text-3xl md:text-5xl font-bold mb-4">
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-rose-400 to-purple-500">
    Créations Artistiques
  </span>
</h2>

{/* Gradient 4 - Jaune à vert à bleu */}
<h2 className="text-3xl md:text-5xl font-bold mb-4">
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-green-400 to-blue-500">
    Projets Innovants
  </span>
</h2>

{/* Gradient 5 - Bleu foncé à bleu clair à indigo */}
<h2 className="text-3xl md:text-5xl font-bold mb-4">
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-400 to-indigo-500">
    Compétences Techniques
  </span>
</h2>
{/* Gradient 6 - Dégradé diagonal vert à turquoise */}
<h2 className="text-3xl md:text-5xl font-bold mb-4">
  <span className="bg-clip-text text-transparent bg-gradient-to-br from-green-500 via-teal-400 to-emerald-300">
    Expertise Numérique
  </span>
</h2>

{/* Gradient 7 - Dégradé de gauche à droite rouge à orange */}
<h2 className="text-3xl md:text-5xl font-bold mb-4">
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400">
    Stratégies Marketing
  </span>
</h2>

{/* Gradient 8 - Dégradé du bas vers le haut violet à rose */}
<h2 className="text-3xl md:text-5xl font-bold mb-4">
  <span className="bg-clip-text text-transparent bg-gradient-to-t from-violet-600 via-fuchsia-500 to-pink-400">
    Intelligence Artificielle
  </span>
</h2>

{/* Gradient 9 - Dégradé diagonal inversé bleu à vert */}
<h2 className="text-3xl md:text-5xl font-bold mb-4">
  <span className="bg-clip-text text-transparent bg-gradient-to-bl from-blue-600 via-sky-500 to-green-500">
    Développement Web
  </span>
</h2>

{/* Gradient 10 - Dégradé monochrome bleu */}
<h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400">
    Architecture Cloud
  </span>
</h2>

{/* Gradient 11 - Dégradé néon avec effet extra */}
<h2 className="text-3xl md:text-5xl font-bold mb-4">
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-500 to-indigo-600 drop-shadow-md">
    Design Interactif
  </span>
</h2>

{/* Gradient 12 - Dégradé tons terreux */}
<h2 className="text-3xl md:text-5xl font-bold mb-4">
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-500">
    Solutions Durables
  </span>
</h2>

{/* Gradient 13 - Dégradé circulaire */}
<h2 className="text-3xl md:text-5xl font-bold mb-4">
  <span className="bg-clip-text text-transparent bg-gradient-to-tl from-sky-400 via-blue-500 to-indigo-600">
    Analyse de Données
  </span>
</h2>

{/* Gradient 15 - Dégradé automne */}
<h2 className="text-3xl md:text-5xl font-bold mb-4">
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-red-500 to-orange-400">
    Vision Stratégique
  </span>
</h2>

{/* Gradient 16 - Dégradé océan profond */}
<h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-wide">
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-900 via-cyan-700 to-teal-600">
    Sécurité Informatique
  </span>
</h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Expertise technique et savoir-faire professionnel
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={item}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.skills.map((skill, index) => (
                  <li key={`${category.id}-skill-${index}`} className="text-slate-300 flex">
                    <span className="text-blue-400 mr-2">→</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <div className="mb-10">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Langues</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {languages.map((lang) => (
              <div key={lang.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <div className="flex justify-between mb-1">
                  <h4 className="font-medium text-white">{lang.name}</h4>
                  <span className="text-blue-400">{lang.level}</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full">
                  <div
                    className="h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                    style={{ width: `${lang.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-slate-400">En constante évolution et apprentissage de nouvelles technologies</p>
        </div>
      </div>
    </section>
  );
}