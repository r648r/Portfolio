"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Command, Terminal as TerminalIcon, Code, Server } from "lucide-react";
import EmbedAsciinema from "./EmbedAsciinema";
import TerminalDisplay from "./TerminalDisplay";
import MiniTerminal from "./MiniTerminal";

interface DemoTab {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  castId: string;
  icon?: React.ReactNode;
}

interface TerminalContainerProps {
  title?: string;
  className?: string;
  tabs?: DemoTab[];
}

const DEFAULT_TABS: DemoTab[] = [
  {
    id: "demo1",
    title: "Animation Vim",
    subtitle: "Démo d'édition avancée",
    description: "Démonstration de Vim et de ses capacités d'édition avancées pour le développement.",
    castId: "24812",
    icon: <Code className="h-4 w-4" />
  },
  {
    id: "demo2",
    title: "Processus dev",
    subtitle: "Workflow de développement",
    description: "Visualisation du processus de développement et d'exécution de scripts.",
    castId: "239367",
    icon: <Server className="h-4 w-4" />
  },
  {
    id: "demo3",
    title: "Commandes Shell",
    subtitle: "Techniques avancées",
    description: "Présentation d'outils système et de commandes shell avancées pour l'automatisation.",
    castId: "117813",
    icon: <Command className="h-4 w-4" />
  },
  {
    id: "demo4",
    title: "Demo Bash",
    subtitle: "Scripts d'automatisation",
    description: "Démonstration de commandes bash et d'utilitaires en ligne de commande.",
    castId: "8",
    icon: <TerminalIcon className="h-4 w-4" />
  },
  {
    id: "demo5",
    title: "Terminal avancé",
    subtitle: "Outils de développement",
    description: "Présentation des fonctionnalités avancées du terminal et des outils de développement.",
    castId: "441582",
    icon: <Terminal className="h-4 w-4" />
  },
];

export default function TerminalContainer({
  title = "Démos de Code",
  className = "",
  tabs = DEFAULT_TABS
}: TerminalContainerProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "demo1");
  const [isInteractive, setIsInteractive] = useState(false);

  // Trouver l'onglet actif
  const activeTabData = tabs.find(tab => tab.id === activeTab) || tabs[0];

  return (
    <div className={`bg-blue-900/20 p-8 rounded-lg border border-blue-700 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <TerminalIcon className="h-8 w-8 text-blue-400 mr-3" />
          <h2 className="text-2xl font-bold text-blue-400">{title}</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsInteractive(!isInteractive)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              isInteractive 
                ? 'bg-blue-600 text-white' 
                : 'bg-blue-900/50 text-blue-300 hover:bg-blue-800'
            }`}
          >
            {isInteractive ? 'Mode Démo' : 'Mode Interactif'}
          </button>
        </div>
      </div>

      {isInteractive ? (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Terminal Interactif
          </h3>
          <p className="text-gray-300 mb-6">
            Explorez mon environnement de développement et mes outils à travers cette interface terminal interactive.
            Tapez <code className="px-2 py-1 bg-blue-900/60 rounded text-blue-300 font-mono">help</code> pour découvrir les commandes disponibles.
          </p>
          
          <MiniTerminal
            title="~/dev-environment"
            className="w-full shadow-xl"
            height="400px"
            prompt="[dev@r648r]$"
          />
          
          <div className="mt-2 text-center text-xs text-gray-400">
            <p>Essayez des commandes comme <span className="px-1 py-0.5 bg-blue-900 rounded text-blue-300">tech-stack</span>, <span className="px-1 py-0.5 bg-blue-900 rounded text-blue-300">projects</span> ou <span className="px-1 py-0.5 bg-blue-900 rounded text-blue-300">cat README.md</span></p>
          </div>
        </div>
      ) : (
        <>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-5 bg-transparent border border-blue-500 p-1 rounded-lg mb-6">
              {tabs.map(tab => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map(tab => (
              <TabsContent key={tab.id} value={tab.id} className="mt-4">
                <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                  {tab.subtitle}
                </h3>
                <p className="text-gray-300 mb-6">
                  {tab.description}
                </p>
                <div className="bg-black rounded-lg border border-blue-800">
                  <EmbedAsciinema 
                    castId={tab.castId} 
                    title={`~/${tab.id}`} 
                    theme="monokai" 
                    autoPlay={true} 
                    height="400px" 
                    fit="width"
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-4 text-center text-xs text-gray-400">
            <p>Les raccourcis clavier fonctionnent lorsque le terminal est en focus: <span className="px-1 py-0.5 bg-blue-900 rounded text-blue-300">Espace</span> pour jouer/pauser, <span className="px-1 py-0.5 bg-blue-900 rounded text-blue-300">f</span> pour plein écran.</p>
          </div>
        </>
      )}
    </div>
  );
}

const Terminal = ({ children }: { children: React.ReactNode }) => (
  <TerminalIcon className="h-4 w-4" />
);