"use client";

import { motion } from "framer-motion";
import { Shield, Globe, Terminal, Server, Database, Code } from "lucide-react";

export default function SkillsSection() {
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
    <section className="py-20 bg-gradient-to-b from-blue-950 via-black to-blue-950">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-br from-blue-500/10 to-indigo-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-to-tr from-indigo-600/10 to-blue-400/5 rounded-full blur-3xl" />
      </div>

      <div className="gemini-container animate-content relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              Compétences Techniques
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
