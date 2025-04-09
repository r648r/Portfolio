"use client";

import React, { useEffect, useState, useRef } from "react";
import { Terminal } from "lucide-react";

interface MiniTerminalProps {
  title?: string;
  className?: string;
  height?: string;
  prompt?: string;
}

const MiniTerminal: React.FC<MiniTerminalProps> = ({
  title = "~/user",
  className = "",
  height = "300px",
  prompt = "$",
}) => {
  const [text, setText] = useState("");
  const [cursor, setCursor] = useState(true);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Commandes possibles et leurs réponses
  const commands: Record<string, string | string[]> = {
    help: [
      "Commandes disponibles:",
      "whoami     - Qui suis-je?",
      "skills     - Mes compétences",
      "certs      - Mes certifications",
      "contact    - Comment me contacter",
      "projects   - Mes projets récents",
      "tools      - Mes outils préférés",
      "experience - Mon expérience professionnelle",
      "clear      - Effacer le terminal",
      "ls         - Lister les fichiers",
      "cat <file> - Afficher le contenu d'un fichier",
      "help       - Afficher cette aide"
    ],
    whoami: "Pentester et spécialiste en cybersécurité",
    skills: [
      "Compétences principales:",
      "- Pentesting et Red Team",
      "- Détection et réponse aux incidents",
      "- Développement sécurisé",
      "- Architecture de sécurité",
      "- Analyse de vulnérabilités"
    ],
    certs: [
      "Certifications:",
      "- OSCP (Offensive Security Certified Professional)",
      "- CISSP (Certified Information Systems Security Professional)",
      "- CEH (Certified Ethical Hacker)",
      "- GPEN (GIAC Penetration Tester)",
      "- GXPN (GIAC Exploit Researcher and Advanced Penetration Tester)"
    ],
    contact: "contact@votredomaine.com | LinkedIn: votre-profil",
    ls: [
      "projets/",
      "outils/",
      "scripts/",
      "cv.pdf",
      "pgp-key.asc",
      "config.tmux",
      "README.md"
    ],
    projects: [
      "Projets récents:",
      "- Plateforme de détection d'intrusion",
      "- Audit de sécurité pour entreprise CAC 40",
      "- Développement d'un outil d'analyse de vulnérabilités",
      "- Sécurisation d'infrastructures cloud",
      "- CTF et challenges de sécurité"
    ],
    tools: [
      "Outils préférés:",
      "- Systèmes: Kali Linux, Parrot OS",
      "- Pentesting: Metasploit, Burp Suite, Nmap",
      "- Réseau: Wireshark, tcpdump",
      "- Forensique: Volatility, Autopsy",
      "- Dev: VS Code, tmux, vim"
    ],
    experience: [
      "Expérience professionnelle:",
      "- RSSI - Entreprise de cybersécurité (2022-présent)",
      "- Consultant en sécurité - Cabinet de conseil (2019-2022)",
      "- Pentester - Red Team (2017-2019)",
      "- Développeur sécurité - Start-up (2015-2017)"
    ]
  };

  // Files content for cat command
  const files: Record<string, string | string[]> = {
    "README.md": [
      "# Portfolio Cybersécurité",
      "",
      "Ce portfolio présente mes compétences et projets en cybersécurité.",
      "Utilisez les commandes du terminal pour explorer mon profil."
    ],
    "pgp-key.asc": [
      "-----BEGIN PGP PUBLIC KEY BLOCK-----",
      "Version: GnuPG v2.0.22 (GNU/Linux)",
      "",
      "mQINBGJhD7QBEACvS8q8GWYXMeb5qpd4rz0tABH2EGwP0i4dvGqAEt7kY0y5qGkr",
      "... [clé tronquée pour plus de lisibilité] ...",
      "N16A9Jtde4jR29qJuT+IuAjm0d5+CPUBJ9jdEw==",
      "=LtBm",
      "-----END PGP PUBLIC KEY BLOCK-----"
    ],
    "config.tmux": [
      "# Configuration tmux",
      "set -g default-terminal \"screen-256color\"",
      "set -g status-bg black",
      "set -g status-fg white",
      "set -g mouse on",
      "# Raccourcis personnalisés",
      "bind-key v split-window -h",
      "bind-key s split-window -v"
    ]
  };

  // Simuler le comportement de typing dans le terminal
  useEffect(() => {
    const lines = [
      "Bienvenue sur mon terminal interactif!",
      "Tapez 'help' pour voir les commandes disponibles."
    ];
    
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentLineIndex < lines.length) {
        const currentLineText = lines[currentLineIndex];
        
        if (currentCharIndex <= currentLineText.length) {
          setText((prev) => 
            prev + currentLineText.charAt(currentCharIndex - 1)
          );
          currentCharIndex++;
        } else {
          setText((prev) => prev + "\n");
          currentLineIndex++;
          currentCharIndex = 1;
        }
      } else {
        clearInterval(typingInterval);
        setText((prev) => prev + `\n${prompt} `);
      }
    }, 20);
    
    return () => clearInterval(typingInterval);
  }, [prompt]);

  // Effet de clignotement du curseur
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  // Fonction pour traiter les commandes
  const processCommand = (cmd: string): string => {
    if (!cmd) return "";
    
    const cmdParts = cmd.split(" ");
    const mainCmd = cmdParts[0].toLowerCase();
    
    // Commande clear
    if (mainCmd === "clear") {
      setTimeout(() => {
        setText(`${prompt} `);
      }, 50);
      return "";
    }
    
    // Commande cat
    if (mainCmd === "cat" && cmdParts.length > 1) {
      const fileName = cmdParts[1];
      if (files[fileName]) {
        const fileContent = files[fileName];
        if (Array.isArray(fileContent)) {
          return fileContent.join("\n");
        }
        return fileContent;
      }
      return `cat: ${fileName}: Fichier introuvable`;
    }
    
    // Autres commandes
    if (commands[mainCmd]) {
      const output = commands[mainCmd];
      if (Array.isArray(output)) {
        return output.join("\n");
      }
      return output;
    }
    
    return `${mainCmd}: commande introuvable. Tapez 'help' pour voir les commandes disponibles.`;
  };

  // Ajouter la gestion des entrées utilisateur
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    // Si la touche Entrée est pressée
    if (e.key === "Enter") {
      const output = processCommand(currentLine.trim());
      
      // Mise à jour de l'historique des commandes
      if (currentLine.trim()) {
        setCommandHistory(prev => [...prev, currentLine.trim()]);
      }
      
      // Ajouter la commande et sa sortie au texte du terminal
      setText(prev => `${prev}${currentLine}\n${output}\n${prompt} `);
      
      // Réinitialiser la ligne courante et l'index d'historique
      setCurrentLine("");
      setHistoryIndex(-1);
      
      // Faire défiler vers le bas
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
      return;
    }
    
    // Gestion des touches flèches pour naviguer dans l'historique
    if (e.key === "ArrowUp") {
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentLine(commandHistory[commandHistory.length - 1 - newIndex]);
      }
      return;
    }
    
    if (e.key === "ArrowDown") {
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentLine(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentLine("");
      }
      return;
    }
    
    // Tab pour autocomplétion
    if (e.key === "Tab") {
      const cmd = currentLine.trim().toLowerCase();
      // Trouver les commandes qui commencent par la saisie actuelle
      const possibleCommands = Object.keys(commands).filter(c => 
        c.startsWith(cmd)
      );
      
      if (possibleCommands.length === 1) {
        // S'il n'y a qu'une seule commande possible, l'auto-compléter
        setCurrentLine(possibleCommands[0]);
      } else if (possibleCommands.length > 1) {
        // S'il y a plusieurs possibilités, les afficher
        const cmdList = possibleCommands.join("  ");
        setText(prev => `${prev}${currentLine}\n${cmdList}\n${prompt} ${currentLine}`);
        
        // Faire défiler vers le bas
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }
      return;
    }
    
    // Backspace pour supprimer des caractères
    if (e.key === "Backspace") {
      setCurrentLine(prev => prev.slice(0, -1));
      return;
    }
    
    // Ctrl+C pour annuler
    if (e.key === "c" && e.ctrlKey) {
      setText(prev => `${prev}^C\n${prompt} `);
      setCurrentLine("");
      return;
    }
    
    // Ctrl+L pour effacer l'écran (comme clear)
    if (e.key === "l" && e.ctrlKey) {
      setText(`${prompt} `);
      setCurrentLine("");
      return;
    }
    
    // Ignorer les touches qui ne sont pas des caractères imprimables
    if (e.key.length !== 1) return;
    
    // Ajouter le caractère à la ligne courante
    setCurrentLine(prev => prev + e.key);
  };

  return (
    <div 
      className={`w-full font-mono text-sm bg-black text-green-400 rounded-lg overflow-hidden border border-gray-800 shadow-lg ${className}`}
      style={{ height }}
    >
      {/* Barre de titre du terminal */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center">
          <Terminal className="h-4 w-4 mr-2" />
          <span className="text-gray-200">{title}</span>
        </div>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      
      {/* Contenu du terminal */}
      <div 
        ref={terminalRef}
        className="p-3 h-full overflow-auto focus:outline-none"
        style={{ height: `calc(${height} - 2.5rem)` }}
        tabIndex={0}
        onKeyDown={handleKeyPress}
      >
        <pre className="whitespace-pre-wrap break-words">
          {text}
          {currentLine}
          {cursor ? '█' : ''}
        </pre>
      </div>
    </div>
  );
};

export default MiniTerminal;