"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { playConfetti } from "@/lib/confetti";
import { Copy, Terminal, Check, Info, Settings, Command } from "lucide-react";

const tmuxConfig = `# =============================================================================
# CONFIGURATION TMUX OPTIMISÉE
# =============================================================================

# -----------------------------------------------------------------------------
# CONFIGURATION DE BASE
# -----------------------------------------------------------------------------
# Shell par défaut
set-option -g default-shell /bin/zsh

# Activer la souris
set -g mouse on

# Support pour les touches du terminal
set-option -g xterm-keys on

# Définir le préfixe et les associations de touches
set -g prefix C-b
bind-key C-b send-prefix

# Indexation à partir de 1 (plus intuitif que 0)
set -g base-index 1
setw -g pane-base-index 1

# -----------------------------------------------------------------------------
# RACCOURCIS CLAVIER
# ----------------------------------------------------------------------------
# --------------------------------------------------------
# Supprimer toutes les associations de touches par défaut
# --------------------------------------------------------
unbind-key -a

# -----------------------------------------------------------------------------
# Raccourcis pour la gestion des fenêtres (avec préfixe)
# ---------------------------------------
# C-b w : Renommer la fenêtre
# C-b s : Renommer la session
bind w command-prompt "rename-window '%%'"
bind s command-prompt "rename-session '%%'"

# Raccourcis directs (sans préfixe)
# ---------------------------------------
# C-t : Nouvelle fenêtre
# C-w : Fermer la fenêtre
# C-n : Fenêtre suivante
# C-p : Pane suivante
# C-x : Fermer le panneau
# C-o : Diviser horizontalement
# C-v : Diviser verticalement
# C-d : Détacher le client
# C-s : Choisir une session
bind -n C-t new-window
bind -n C-w kill-window
bind -n C-n next-window
bind -n C-p select-pane -t :.+
bind -n C-h kill-pane
bind -n C-h split-window -v
bind -n C-v split-window -h
bind -n C-d detach-client
bind -n C-s choose-session

# -----------------------------------------------------------------------------
# CONFIGURATION DES PANNEAUX
# -----------------------------------------------------------------------------
# Affichage de la bordure des panneaux
set -g pane-border-status top
set -g pane-border-format "#{pane_index} #T #{pane_current_command}"

# -----------------------------------------------------------------------------
# PERSONNALISATION VISUELLE
# -----------------------------------------------------------------------------
# Couleurs de la barre de statut
set-option -g status-style bg=colour234,fg=colour75

# Couleurs des onglets de fenêtres
set-window-option -g window-status-style fg=colour250,bg=default
set-window-option -g window-status-current-style fg=colour51,bg=colour236,bright

# Couleurs des bordures de panneaux
set-option -g pane-border-style fg=colour240
set-option -g pane-active-border-style fg=colour51
set-option -g display-panes-active-colour colour51
set-option -g display-panes-colour colour75

# Couleur de l'horloge
set-window-option -g clock-mode-colour colour39

# Configuration de la barre d'état
set -g status-right-length 65
set -g status-interval 5
set -g status-left "#[fg=colour51,bold] #S "
set -g status-right "#[fg=colour233,bg=colour241,bold] %d/%m #[fg=colour233,bg=colour245,bold] %H:%M "
set -g window-status-current-format "#[fg=colour51,bg=colour238] #I:#W "
set -g window-status-format "#[fg=colour248] #I:#W "`;

export default function TmuxConfig() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("config");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tmuxConfig);
    setCopied(true);
    playConfetti();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8">
      <div className="flex flex-col space-y-6">
        {/* En-tête avec le titre et le bouton de copie */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-blue-400" />
            <h3 className="text-xl font-bold text-blue-400">Configuration Tmux Optimisée</h3>
          </div>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? "Configuration copiée" : "Copier la configuration"}</span>
          </button>
        </div>

        {/* Onglets améliorés */}
        <Tabs
          defaultValue="config"
          className="w-full"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList className="grid w-full grid-cols-2 mb-4 p-1 bg-gray-800 rounded-lg">
            <TabsTrigger
              value="config"
              className={`${activeTab === "config" ? "bg-blue-700 text-white" : "text-gray-400"} py-2 rounded-md transition-all`}
            >
              <div className="flex items-center gap-2">
                <Command className="h-4 w-4" />
                <span>Configuration</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className={`${activeTab === "preview" ? "bg-blue-700 text-white" : "text-gray-400"} py-2 rounded-md transition-all`}
            >
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span>Fonctionnalités</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="mt-0">
            {/* Bloc de code avec design amélioré */}
            <div className="relative group rounded-lg overflow-hidden border border-gray-700 shadow-xl">
              {/* Barre supérieure du bloc de code */}
              <div className="bg-gray-800 text-gray-300 px-4 py-2 text-xs font-mono flex items-center justify-between border-b border-gray-700">
                <span>~/.tmux.conf</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>

              {/* Bloc de code avec style amélioré */}
              <div className="relative">
                <pre className="p-6 bg-gray-900 text-gray-300 overflow-x-auto text-sm font-mono h-[400px] overflow-y-auto leading-relaxed">
                  <code className="block whitespace-pre text-xs md:text-sm">
                    {tmuxConfig.split('\n').map((line, index) => {
                      // Coloration syntaxique basique
                      let coloredLine = line;

                      // Commentaires
                      if (line.trim().startsWith('#')) {
                        return <div key={index} className="text-green-400">{line}</div>;
                      }
                      // Commandes et options
                      else if (line.trim().startsWith('set') || line.trim().startsWith('bind')) {
                        const parts = line.split(' ');
                        return (
                          <div key={index}>
                            <span className="text-blue-400">{parts[0]} </span>
                            <span className="text-purple-400">{parts.slice(1).join(' ')}</span>
                          </div>
                        );
                      }
                      // Lignes vides et autres
                      else {
                        return <div key={index} className="text-gray-300">{line}</div>;
                      }
                    })}
                  </code>
                </pre>

                {/* Élément flottant pour indiquer la copie */}
                {copied && activeTab === "config" && (
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium shadow-lg flex items-center gap-2 animate-pulse">
                    <Check className="h-4 w-4" />
                    Configuration copiée
                  </div>
                )}

                {/* Bouton de copie qui apparaît au survol */}
                <button
                  onClick={copyToClipboard}
                  className="absolute top-4 right-4 bg-blue-600/80 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-blue-700"
                  title="Copier la configuration Tmux"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-0">
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-xl">
              <div className="bg-gray-800 text-gray-300 px-4 py-2 text-xs font-mono flex items-center justify-between border-b border-gray-700">
                <span>Tmux - Aperçu des fonctionnalités</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>

              <div className="p-6 text-gray-300 h-[400px] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-900/20 p-5 rounded-lg border border-blue-700/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Settings className="h-5 w-5 text-blue-400" />
                      <h4 className="font-semibold text-blue-300">Configuration Optimisée</h4>
                    </div>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li>Interface visuelle améliorée avec des couleurs personnalisées</li>
                      <li>Support complet de la souris pour une navigation facile</li>
                      <li>Barre d'état informative avec l'heure et le nom de session</li>
                      <li>Indexation à partir de 1 (plus intuitif que 0)</li>
                      <li>Organisation des fenêtres et panneaux optimisée</li>
                    </ul>
                  </div>

                  <div className="bg-blue-900/20 p-5 rounded-lg border border-blue-700/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Command className="h-5 w-5 text-blue-400" />
                      <h4 className="font-semibold text-blue-300">Raccourcis Clavier</h4>
                    </div>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li><span className="text-blue-200 font-mono">C-t</span>: Nouvelle fenêtre</li>
                      <li><span className="text-blue-200 font-mono">C-w</span>: Fermer la fenêtre</li>
                      <li><span className="text-blue-200 font-mono">C-n</span>: Fenêtre suivante</li>
                      <li><span className="text-blue-200 font-mono">C-v</span>: Diviser verticalement</li>
                      <li><span className="text-blue-200 font-mono">C-d</span>: Détacher la session</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 bg-blue-900/40 p-5 rounded-lg border border-blue-600">
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="h-5 w-5 text-blue-400" />
                    <h4 className="font-semibold text-blue-300">Avantages Principaux</h4>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Cette configuration est particulièrement utile pour les développeurs et administrateurs système qui:
                  </p>
                  <ul className="list-disc list-inside text-blue-200 space-y-2">
                    <li>Travaillent sur des sessions multiples simultanément</li>
                    <li>Ont besoin d'une gestion efficace de l'espace terminal</li>
                    <li>Veulent personnaliser leur environnement de travail</li>
                    <li>Cherchent à augmenter leur productivité en ligne de commande</li>
                  </ul>

                  <div className="mt-4 flex items-center">
                    <div className="text-blue-400 font-mono rounded-md bg-blue-900/30 px-3 py-1 text-sm">
                      tmux source-file ~/.tmux.conf
                    </div>
                    <span className="ml-3 text-gray-400">← pour charger la configuration</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
