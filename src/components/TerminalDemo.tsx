"use client";

import { useEffect, useRef, useState } from "react";
import TerminalDisplay from "./TerminalDisplay";

interface TerminalDemoProps {
  castUrl?: string;
  title?: string;
  className?: string;
}

export default function TerminalDemo({
  castUrl = "https://asciinema.org/a/WCEGnczBKoqx7FctHHJD0GtMU.cast",
  title = "~/terminal-demo",
  className = ""
}: TerminalDemoProps) {
  const asciiContainerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const playerInstanceRef = useRef<any>(null);

  useEffect(() => {
    const initializePlayer = () => {
      if (asciiContainerRef.current && typeof window !== "undefined" && "AsciinemaPlayer" in window) {
        // Vérifier si le conteneur est vide
        if (asciiContainerRef.current.children.length === 0) {
          try {
            playerInstanceRef.current = window.AsciinemaPlayer.create(
              castUrl,
              asciiContainerRef.current,
              {
                autoPlay: false,
                idleTimeLimit: 2,
                poster: "npt:0:3",
                theme: "monokai",
                fit: "width",  // Modifié de true à "width"
                fontSize: "small"
              }
            );
            setIsLoaded(true);
          } catch (error) {
            console.error("Erreur lors de l'initialisation d'asciinema:", error);
          }
        }
      }
    };

    // Gérer l'événement d'espace pour jouer/pauser
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && playerInstanceRef.current) {
        e.preventDefault();
        
        if (playerInstanceRef.current.state === "playing") {
          playerInstanceRef.current.pause();
        } else {
          playerInstanceRef.current.play();
        }
      }
    };

    // Essayer d'initialiser le player
    if (typeof window !== "undefined" && "AsciinemaPlayer" in window) {
      initializePlayer();
    } else {
      // Si le script n'est pas encore chargé, attendons un peu
      const checkInterval = setInterval(() => {
        if (typeof window !== "undefined" && "AsciinemaPlayer" in window) {
          initializePlayer();
          clearInterval(checkInterval);
        }
      }, 500);

      // Nettoyer l'intervalle après 5 secondes pour éviter des vérifications infinies
      setTimeout(() => clearInterval(checkInterval), 5000);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      
      if (playerInstanceRef.current && typeof playerInstanceRef.current.dispose === "function") {
        playerInstanceRef.current.dispose();
      }
    };
  }, [castUrl]);

  return (
    <TerminalDisplay title={title} className={className}>
      <div className="p-2 bg-black">
        <div
          ref={asciiContainerRef}
          className="w-full"
          style={{ aspectRatio: "16/9" }}
        />
        {!isLoaded && (
          <div className="flex items-center justify-center h-64 text-gray-500 font-mono text-sm">
            Chargement du terminal...
          </div>
        )}
      </div>
    </TerminalDisplay>
  );
}