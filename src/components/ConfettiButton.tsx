"use client";

import type { ButtonHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { getRandomEmoji } from "@/lib/confetti";

interface ConfettiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  mailto?: string;
  children: React.ReactNode;
}

const ConfettiButton = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  onClick,
  href,
  target,
  rel,
  mailto,
  ...props
}: ConfettiButtonProps) => {

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Vérifier si le script confetti est chargé et disponible
    if (typeof window !== 'undefined' && window.confetti) {
      // Définir la taille de l'emoji
      const scalar = 2;
      // Obtenir un emoji aléatoire
      const emoji = getRandomEmoji();

      try {
        // Créer une forme personnalisée avec l'emoji
        const shape = window.confetti.shapeFromText({ text: emoji, scalar });

        // Configuration de base pour les confettis
        const defaults = {
          spread: 360,
          ticks: 60,
          gravity: 0,
          decay: 0.96,
          startVelocity: 20,
          shapes: [shape],
          scalar
        };

        // Premier lancer de confettis
        window.confetti({
          ...defaults,
          particleCount: 30
        });

        // Confettis plats (effet différent)
        window.confetti({
          ...defaults,
          particleCount: 5,
          flat: true
        });

        // Petits cercles comme effet supplémentaire
        window.confetti({
          ...defaults,
          particleCount: 15,
          scalar: scalar / 2,
          shapes: ['circle']
        });
      } catch(e) {
        console.error("Error with confetti:", e);
      }
    }

    // Si un gestionnaire d'événements onClick a été fourni, l'exécuter
    if (onClick) {
      onClick(e);
    }
    
    // Si un lien href est fourni, naviguer vers ce lien
    if (href) {
      // Ouvrir dans un nouvel onglet si target="_blank"
      if (target === "_blank") {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = href;
      }
    }
    
    // Si un mailto est fourni, ouvrir le client mail
    if (mailto) {
      window.location.href = `mailto:${mailto}`;
    }
  };

  // Déterminer les attributs rel pour les liens externes
  const relAttr = target === "_blank" ? "noopener noreferrer" : rel;

  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      onClick={handleClick}
      {...(href && { as: "a", href })}
      {...(target && { target })}
      {...(relAttr && { rel: relAttr })}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ConfettiButton;