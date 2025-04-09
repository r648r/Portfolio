"use client";

import { useEffect, useRef, useState } from 'react';

interface TerminalPlayerProps {
  castFile: string;
  title?: string;
}

const TerminalPlayer: React.FC<TerminalPlayerProps> = ({ castFile, title }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Définir la date côté client pour éviter les problèmes d'hydratation
    setCurrentDate(new Date().toLocaleDateString());

    const initializePlayer = () => {
      if (containerRef.current && typeof window !== 'undefined' && 'AsciinemaPlayer' in window) {
        if (containerRef.current.children.length === 0) {
          try {
            // @ts-ignore
            window.AsciinemaPlayer.create(
              castFile,
              containerRef.current,
              {
                autoPlay: false,
                idleTimeLimit: 2,
                poster: 'npt:0:2'
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
  }, [castFile]);

  return (
    <div className="w-full rounded-lg overflow-hidden border border-slate-700 shadow-xl bg-[#282a36] mb-6">
      {/* Barre de titre de terminal */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#191A21] border-b border-slate-700">
        <div className="text-sm font-mono text-gray-300">{title || "~/terminal"}</div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
      </div>

      {/* Conteneur Asciinema */}
      <div className="p-2 bg-black">
        <div
          ref={containerRef}
          className="asciinema-player-theme-dracula w-full"
          style={{ aspectRatio: '16/9' }}
        />
      </div>

      {/* Ligne de statut en bas façon tmux */}
      <div className="flex items-center justify-between px-4 py-1 bg-[#191A21] border-t border-slate-700 text-xs font-mono text-green-400">
        <div>[0] bash</div>
        <div>user@server:~</div>
        <div>{currentDate}</div>
      </div>
    </div>
  );
};

export default TerminalPlayer;
