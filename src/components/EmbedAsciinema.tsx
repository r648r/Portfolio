"use client";

import React, { useEffect, useRef, useState } from "react";
import TerminalDisplay from "./TerminalDisplay";

interface EmbedAsciinemaProps {
  castId: string;
  title?: string;
  theme?: string;
  autoPlay?: boolean;
  height?: string;
  fit?: 'width' | 'height' | 'both' | false;
  idleTimeLimit?: number;
  speed?: number;
  fontSize?: string;
  className?: string;
  showControls?: boolean;
  showFooter?: boolean;
}

export default function EmbedAsciinema({
  castId,
  title = "~/terminal-demo",
  theme = "monokai",
  autoPlay = false,
  height = "300px",
  fit = "width",
  idleTimeLimit = 2,
  speed = 1,
  fontSize = "small",
  className = "",
  showControls = true,
  showFooter = true
}: EmbedAsciinemaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const playerInstanceRef = useRef<any>(null);

  useEffect(() => {
    // S'assurer que les styles sont chargés
    const loadStyles = async () => {
      // Vérifier si la feuille de style est déjà chargée
      const styleExists = document.querySelector('link[href*="asciinema-consolidated.css"]');
      
      if (!styleExists) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/css/asciinema-consolidated.css';
        document.head.appendChild(link);
      }
    };

    // Fonction pour initialiser le lecteur Asciinema
    const initializePlayer = () => {
      if (!containerRef.current || !window.AsciinemaPlayer) return;
      
      // Vider le conteneur avant l'initialisation pour éviter les doublons
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      
      try {
        // Déterminer l'URL du cast
        let castUrl: string;
        
        // Vérifier si castId est déjà une URL complète
        if (castId.startsWith('http') || castId.startsWith('/')) {
          castUrl = castId;
        } else {
          // Si c'est juste un ID, construire l'URL Asciinema
          castUrl = `https://asciinema.org/a/${castId}.cast`;
        }
        
        // Créer le lecteur avec les options
        playerInstanceRef.current = window.AsciinemaPlayer.create(
          castUrl,
          containerRef.current,
          {
            theme,
            autoPlay,
            idleTimeLimit,
            speed,
            fit,
            fontSize,
            poster: 'npt:0:1', // Montrer le premier instant par défaut
          }
        );
        
        setIsLoaded(true);
      } catch (error) {
        console.error("Erreur lors de l'initialisation du lecteur Asciinema:", error);
      }
    };

    // Charger les styles et initialiser
    loadStyles();
    
    // Essayer d'initialiser le lecteur ou attendre que la bibliothèque soit chargée
    const loadScript = () => {
      if (typeof window.AsciinemaPlayer !== 'undefined') {
        initializePlayer();
      } else {
        // Si le script n'est pas encore chargé, on ajoute un écouteur pour quand il sera prêt
        window.addEventListener('asciinema-player-ready', initializePlayer);
        
        // Vérifier également si le script est déjà en train de se charger
        const scriptExists = document.querySelector('script[src*="asciinema-player.min.js"]');
        
        if (!scriptExists) {
          const script = document.createElement('script');
          script.src = '/js/asciinema-player.min.js';
          script.async = true;
          script.onload = () => {
            window.dispatchEvent(new Event('asciinema-player-ready'));
          };
          document.head.appendChild(script);
        }
      }
    };
    
    loadScript();
    
    // Nettoyage
    return () => {
      window.removeEventListener('asciinema-player-ready', initializePlayer);
      
      if (playerInstanceRef.current && typeof playerInstanceRef.current.dispose === 'function') {
        try {
          playerInstanceRef.current.dispose();
        } catch (e) {
          console.warn('Erreur lors de la suppression du lecteur Asciinema:', e);
        }
      }
    };
  }, [castId, theme, autoPlay, idleTimeLimit, speed, fit, fontSize]);

  return (
    <TerminalDisplay 
      title={title}
      className={className}
      showControls={showControls}
      showFooter={showFooter}
      showShortcuts={true}
    >
      <div className="p-1 bg-black">
        <div
          ref={containerRef}
          className="asciinema-container w-full"
          style={{ minHeight: height }}
        />
        {!isLoaded && (
          <div className="flex items-center justify-center h-48 text-gray-500 font-mono text-sm">
            Chargement du terminal...
          </div>
        )}
      </div>
    </TerminalDisplay>
  );
}

// Déclaration TypeScript pour le type global
declare global {
  interface Window {
    AsciinemaPlayer: any;
  }
}