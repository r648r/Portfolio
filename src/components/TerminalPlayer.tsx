"use client";

import { useEffect, useRef, useState } from "react";
import TerminalDisplay from "./TerminalDisplay";

interface TerminalPlayerProps {
  castFile: string;
  title?: string;
  autoPlay?: boolean;
  loop?: boolean;
  startAt?: number | string;
  speed?: number;
  idleTimeLimit?: number;
  theme?: string;
  fit?: 'width' | 'height' | 'both' | false;
  rows?: number; 
  cols?: number;
  poster?: string;
  className?: string;
  fontSize?: string;
  showShortcuts?: boolean;
  markers?: Array<number | [number, string]>;
  pauseOnMarkers?: boolean;
}

export default function TerminalPlayer({
  castFile,
  title = "~/terminal-demo",
  autoPlay = false,
  loop = false,
  startAt,
  speed = 1,
  idleTimeLimit,
  theme = "monokai",
  fit = "width",
  rows = 20,  // Réduit à 20 lignes par défaut
  cols = 80,
  poster = "npt:0:1", // Montrer le premier instant par défaut
  className = "",
  fontSize = "small", // Taille de police réduite
  showShortcuts = true,
  markers,
  pauseOnMarkers = false,
}: TerminalPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Fonction pour initialiser le lecteur
    const initializePlayer = () => {
      if (!containerRef.current) return;
      
      // Vider le conteneur avant l'initialisation pour éviter les doublons
      containerRef.current.innerHTML = "";
      
      try {
        // Vérifier si AsciinemaPlayer est disponible
        if (typeof window !== "undefined" && window.AsciinemaPlayer) {
          // Options pour le player
          const playerOptions = {
            autoPlay,
            loop,
            startAt,
            speed,
            idleTimeLimit,
            theme,
            fit,
            rows,
            cols,
            poster,
            fontSize,
            markers,
            pauseOnMarkers,
            // Améliorer la hauteur de ligne pour que ça soit plus dense
            terminalLineHeight: 1.2,
          };

          // Créer l'instance du lecteur avec les options
          playerInstanceRef.current = window.AsciinemaPlayer.create(
            castFile,
            containerRef.current,
            playerOptions
          );
          
          setIsLoaded(true);
        } else {
          console.error("AsciinemaPlayer non trouvé. Assurez-vous que le script est chargé.");
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation du lecteur asciinema:", error);
      }
    };

    // Initialiser après un court délai pour s'assurer que les scripts sont chargés
    const timer = setTimeout(() => {
      initializePlayer();
    }, 300);

    // Gérer l'événement d'espace pour jouer/pauser
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!playerInstanceRef.current) return;
      
      // Prendre en compte uniquement les événements lorsque le terminal est en focus
      const isTerminalInFocus = containerRef.current && 
        (containerRef.current.contains(document.activeElement) || 
        document.activeElement === document.body);
      
      if (!isTerminalInFocus) return;
      
      switch (e.code) {
        case "Space": // Espace pour jouer/pauser
          e.preventDefault();
          if (playerInstanceRef.current.state === "playing") {
            playerInstanceRef.current.pause();
          } else {
            playerInstanceRef.current.play();
          }
          break;
          
        case "KeyF": // f pour plein écran
          e.preventDefault();
          if (playerInstanceRef.current.toggleFullscreen) {
            playerInstanceRef.current.toggleFullscreen();
          }
          break;
          
        case "ArrowLeft": // Flèche gauche pour reculer
          e.preventDefault();
          if (e.shiftKey) {
            // Reculer de 10%
            const duration = playerInstanceRef.current.getDuration?.() || 0;
            const tenPercent = duration * 0.1;
            playerInstanceRef.current.seek(playerInstanceRef.current.getCurrentTime() - tenPercent);
          } else {
            // Reculer de 5 secondes
            playerInstanceRef.current.seek(playerInstanceRef.current.getCurrentTime() - 5);
          }
          break;
          
        case "ArrowRight": // Flèche droite pour avancer
          e.preventDefault();
          if (e.shiftKey) {
            // Avancer de 10%
            const duration = playerInstanceRef.current.getDuration?.() || 0;
            const tenPercent = duration * 0.1;
            playerInstanceRef.current.seek(playerInstanceRef.current.getCurrentTime() + tenPercent);
          } else {
            // Avancer de 5 secondes
            playerInstanceRef.current.seek(playerInstanceRef.current.getCurrentTime() + 5);
          }
          break;
          
        case "Comma": // , pour reculer d'une image
          e.preventDefault();
          if (playerInstanceRef.current.state === "paused" && playerInstanceRef.current.stepBack) {
            playerInstanceRef.current.stepBack();
          }
          break;
          
        case "Period": // . pour avancer d'une image
          e.preventDefault();
          if (playerInstanceRef.current.state === "paused" && playerInstanceRef.current.stepForward) {
            playerInstanceRef.current.stepForward();
          }
          break;
          
        case "BracketLeft": // [ pour aller au marqueur précédent
          e.preventDefault();
          if (playerInstanceRef.current.prevMarker) {
            playerInstanceRef.current.prevMarker();
          }
          break;
          
        case "BracketRight": // ] pour aller au marqueur suivant
          e.preventDefault();
          if (playerInstanceRef.current.nextMarker) {
            playerInstanceRef.current.nextMarker();
          }
          break;
          
        // Touches 0-9 pour aller à un pourcentage spécifique
        case "Digit0":
        case "Digit1":
        case "Digit2":
        case "Digit3":
        case "Digit4":
        case "Digit5":
        case "Digit6":
        case "Digit7":
        case "Digit8":
        case "Digit9":
          e.preventDefault();
          const digit = parseInt(e.code.slice(-1));
          const duration = playerInstanceRef.current.getDuration?.() || 0;
          playerInstanceRef.current.seek(duration * (digit / 10));
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Fonction de nettoyage
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      
      if (playerInstanceRef.current && typeof playerInstanceRef.current.dispose === "function") {
        playerInstanceRef.current.dispose();
      }
    };
  }, [castFile, autoPlay, loop, startAt, speed, idleTimeLimit, theme, fit, rows, cols, poster, fontSize, markers, pauseOnMarkers]);

  // Ajouter le focus au terminal lorsqu'on clique dessus
  const handleContainerClick = () => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  };

  return (
    <TerminalDisplay 
      title={title}
      className={className}
      showShortcuts={showShortcuts}
    >
      <div 
        className="p-2 bg-black"
        onClick={handleContainerClick}
      >
        <div
          ref={containerRef}
          className="w-full outline-none"
          style={{ minHeight: "300px", maxHeight: "400px" }}
          tabIndex={0} // Permet de recevoir le focus
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

// Ajout de la déclaration TypeScript
declare global {
  interface Window {
    AsciinemaPlayer: any;
  }
}