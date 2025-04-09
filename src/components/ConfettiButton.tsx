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
  children: React.ReactNode;
}

const ConfettiButton = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  onClick,
  ...props
}: ConfettiButtonProps) => {

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof window !== 'undefined' && window.confetti) {
      const scalar = 2;
      const emoji = getRandomEmoji();

      try {
        const unicorn = window.confetti.shapeFromText({ text: emoji, scalar });

        const defaults = {
          spread: 360,
          ticks: 60,
          gravity: 0,
          decay: 0.96,
          startVelocity: 20,
          shapes: [unicorn],
          scalar
        };

        window.confetti({
          ...defaults,
          particleCount: 30
        });

        window.confetti({
          ...defaults,
          particleCount: 5,
          flat: true
        });

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

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ConfettiButton;
