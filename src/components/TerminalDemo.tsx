"use client";

import type React from 'react';
import { useEffect, useRef } from 'react';

const TerminalDemo: React.FC = ({ className = "", ...rest }) => {
  const asciiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializePlayer = () => {
      if (asciiContainerRef.current && typeof window !== 'undefined' && 'AsciinemaPlayer' in window) {
        // Vérifier si le conteneur est vide
        if (asciiContainerRef.current.children.length === 0) {
          try {
            // @ts-ignore
            window.AsciinemaPlayer.create(
              'https://asciinema.org/a/WCEGnczBKoqx7FctHHJD0GtMU.cast',
              asciiContainerRef.current,
              {
                autoPlay: false,
                idleTimeLimit: 2,
                poster: 'npt:0:3'
              }
            );
          } catch (error) {
            console.error('Erreur lors de l\'initialisation d\'asciinema:', error);
          }
        }
      }
    };

    // Essayer d'initialiser le player
    if (typeof window !== 'undefined' && 'AsciinemaPlayer' in window) {
      initializePlayer();
    } else {
      // Si le script n'est pas encore chargé, attendons un peu
      const checkInterval = setInterval(() => {
        if (typeof window !== 'undefined' && 'AsciinemaPlayer' in window) {
          initializePlayer();
          clearInterval(checkInterval);
        }
      }, 500);

      // Nettoyer l'intervalle après 5 secondes pour éviter des vérifications infinies
      setTimeout(() => clearInterval(checkInterval), 5000);
    }

    return () => {
      // Nettoyage si nécessaire
    };
  }, []);

  return (
    <section className="py-16 bg-[#121314]">
      <div className="gemini-container">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-4">
            <h2 className="text-center text-3xl font-bold mb-8 gemini-gradient-text">Démo Terminal</h2>

            {/* Faux contrôles de terminal */}
            <div className="w-full rounded-lg overflow-hidden border border-slate-700 shadow-xl bg-[#282a36]">
              {/* Barre de titre de terminal */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#191A21] border-b border-slate-700">
                <div className="text-sm font-mono text-gray-300">~/terminal-demo</div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
              </div>

              {/* Conteneur Asciinema */}
              <div className="p-2 bg-black">
                <div
                  ref={asciiContainerRef}
                  id="asciinema-player"
                  className="asciinema-player-theme-dracula w-full"
                  style={{ aspectRatio: '16/9' }}
                />
              </div>

              {/* Ligne de statut en bas façon tmux */}
              <div className="flex items-center justify-between px-4 py-1 bg-[#191A21] border-t border-slate-700 text-xs font-mono text-green-400">
                <div>[0] bash</div>
                <div>user@server:~</div>
                <div>{new Date().toLocaleDateString()}</div>
              </div>
            </div>

            {/* Information à propos du terminal */}
            <div className="mt-4 text-center text-sm text-slate-400 font-mono">
              <p>Pressez <span className="px-2 py-1 bg-slate-800 rounded text-xs">ESPACE</span> pour jouer/pauser la démonstration</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TerminalDemo;
