"use client";

import React, { useEffect, useState, useRef } from "react";
import { Terminal as TerminalIcon } from "lucide-react";

const InteractiveTerminal = () => {
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [outputHistory, setOutputHistory] = useState([
    { type: "system", content: "Bienvenue dans le terminal interactif de cybersécurité" },
    { type: "system", content: "Tapez 'help' pour voir les commandes disponibles" },
  ]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const commands = {
    help: {
      description: "Affiche la liste des commandes disponibles",
      action: () => {
        return [
          { type: "output", content: "Commandes disponibles:" },
          ...Object.keys(commands).map(cmd => (
            { type: "output", content: `  ${cmd}: ${commands[cmd].description}` }
          )),
        ];
      }
    },
    clear: {
      description: "Efface l'écran du terminal",
      action: () => {
        setOutputHistory([]);
        return [];
      }
    },
    whoami: {
      description: "Affiche les informations sur l'utilisateur",
      action: () => {
        return [
          { type: "output", content: "Expert en Cybersécurité & Pentester" },
          { type: "output", content: "Spécialiste en sécurité offensive et audits de sécurité" },
        ];
      }
    },
    scan: {
      description: "Simule un scan de vulnérabilités",
      action: () => {
        const outputs = [
          { type: "system", content: "Lancement du scan de vulnérabilités..." },
        ];

        // Simulation d'un scan avec délai
        setTimeout(() => {
          const scanResults = [
            { type: "warning", content: "[!] Vulnérabilité détectée: CVE-2023-4545 (Sévérité: Haute)" },
            { type: "info", content: "[i] Port 22 (SSH) ouvert - Version OpenSSH 8.2" },
            { type: "warning", content: "[!] Certificat SSL expiré sur https://example.com" },
            { type: "error", content: "[X] Injection SQL possible sur le formulaire de login" },
            { type: "success", content: "[✓] Scan terminé - 3 vulnérabilités détectées" },
          ];
          
          setOutputHistory(prev => [...prev, ...scanResults]);
        }, 2000);

        return outputs;
      }
    },
    exploit: {
      description: "Simule l'exploitation d'une vulnérabilité",
      action: () => {
        return [
          { type: "system", content: "Tentative d'exploitation de la vulnérabilité CVE-2023-4545..." },
          { type: "progress", content: "Exploitation en cours [##########] 100%" },
          { type: "success", content: "Exploitation réussie! Shell obtenu sur le système cible." },
          { type: "shell", content: "root@target:~# " },
        ];
      }
    },
    ls: {
      description: "Liste les fichiers dans le répertoire courant",
      action: () => {
        return [
          { type: "output", content: "tools/  scripts/  reports/  exploits/  notes.txt  config.json" },
        ];
      }
    },
    cat: {
      description: "Affiche le contenu d'un fichier",
      action: (args) => {
        if (!args.length) return [{ type: "error", content: "Usage: cat <filename>" }];
        
        const files = {
          "notes.txt": [
            "# Notes de Pentest",
            "- Vérifier les vulnérabilités récentes dans les services web",
            "- Tester les injections SQL sur tous les formulaires",
            "- Scanner les ports non standards",
            "- Tester les mécanismes d'authentification"
          ].join("\n"),
          "config.json": JSON.stringify({
            "target": "example.com",
            "ports": [22, 80, 443, 8080],
            "techniques": ["SQLi", "XSS", "CSRF", "RCE"],
            "tools": ["nmap", "burpsuite", "metasploit"]
          }, null, 2)
        };

        if (files[args[0]]) {
          return [{ type: "output", content: files[args[0]] }];
        } else {
          return [{ type: "error", content: `Le fichier '${args[0]}' n'existe pas` }];
        }
      }
    },
    skills: {
      description: "Affiche les compétences en cybersécurité",
      action: () => {
        return [
          { type: "output", content: "Compétences principales:" },
          { type: "output", content: "  • Pentesting (OSCP, OSWE)" },
          { type: "output", content: "  • Sécurité applicative Web" },
          { type: "output", content: "  • Tests d'intrusion réseau" },
          { type: "output", content: "  • Rédaction de rapports d'audit" },
          { type: "output", content: "  • Développement sécurisé" },
          { type: "output", content: "  • Réponse aux incidents" },
        ];
      }
    },
    contact: {
      description: "Affiche les informations de contact",
      action: () => {
        return [
          { type: "output", content: "Email: contact@example.com" },
          { type: "output", content: "LinkedIn: linkedin.com/in/cyberexpert" },
          { type: "output", content: "GitHub: github.com/security-pro" },
        ];
      }
    }
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return [];

    const [command, ...args] = trimmedCmd.split(" ");
    
    // Ajouter la commande à l'historique
    setCommandHistory(prev => [...prev, trimmedCmd]);
    
    // Exécuter la commande si elle existe
    if (commands[command]) {
      return commands[command].action(args);
    } else {
      return [{ type: "error", content: `Commande non reconnue: ${command}. Tapez 'help' pour voir les commandes disponibles.` }];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ajouter la commande à l'historique d'affichage
    const newOutput = [{ type: "command", content: `$ ${input}` }];
    
    // Exécuter la commande et récupérer la sortie
    const commandOutput = handleCommand(input);
    
    // Mettre à jour l'historique d'affichage
    setOutputHistory(prev => [...prev, ...newOutput, ...commandOutput]);
    
    // Réinitialiser l'entrée et l'index d'historique
    setInput("");
    setHistoryIndex(-1);
    
    // Faire défiler vers le bas
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 0);
  };

  const handleKeyDown = (e) => {
    // Navigation dans l'historique des commandes avec les flèches haut/bas
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        setCursorPosition(commandHistory[commandHistory.length - 1 - newIndex].length);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        setCursorPosition(commandHistory[commandHistory.length - 1 - newIndex].length);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
        setCursorPosition(0);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Auto-complétion simple
      const cmdStart = input.split(" ")[0];
      if (!input.includes(" ")) {
        const matchingCommands = Object.keys(commands).filter(cmd => 
          cmd.startsWith(cmdStart)
        );
        
        if (matchingCommands.length === 1) {
          setInput(matchingCommands[0]);
          setCursorPosition(matchingCommands[0].length);
        } else if (matchingCommands.length > 1) {
          // Afficher les commandes possibles
          setOutputHistory(prev => [
            ...prev, 
            { type: "command", content: `$ ${input}` },
            { type: "system", content: `Commandes possibles: ${matchingCommands.join(", ")}` }
          ]);
        }
      }
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    setCursorPosition(e.target.selectionStart);
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Gardez le focus sur l'input et placez le curseur à la bonne position
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.selectionStart = cursorPosition;
      inputRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition, input]);

  // Classes CSS conditionnelles pour les différents types de sorties
  const getOutputClass = (type) => {
    switch (type) {
      case 'system':
        return 'text-blue-400';
      case 'command':
        return 'text-green-400 font-bold';
      case 'output':
        return 'text-gray-300';
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      case 'info':
        return 'text-cyan-400';
      case 'success':
        return 'text-green-400';
      case 'shell':
        return 'text-red-300 font-bold';
      case 'progress':
        return 'text-purple-400';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <div className="w-full h-full" onClick={handleClick}>
      {/* Terminal Container */}
      <div className="relative rounded-lg overflow-hidden border border-blue-500/30 shadow-2xl bg-black">
        {/* Barre de titre du terminal */}
        <div className="bg-gray-900/80 backdrop-blur-sm px-4 py-2 flex items-center justify-between border-b border-blue-900/50">
          <div className="flex items-center gap-2">
            <TerminalIcon className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-mono text-blue-300">~/pentest-terminal</span>
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
          className="terminal-content font-mono text-sm p-4 h-96 overflow-y-auto bg-black"
        >
          {outputHistory.map((item, index) => (
            <div key={index} className={`${getOutputClass(item.type)} whitespace-pre-wrap mb-1`}>
              {item.content}
            </div>
          ))}
          
          {/* Formulaire pour l'entrée de commande */}
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-green-400 mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="flex-grow bg-transparent text-gray-100 outline-none caret-white font-mono"
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTerminal;