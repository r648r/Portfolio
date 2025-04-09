"use client";

import Link from "next/link";
import { getRandomEmoji } from "@/lib/confetti";

interface EmojiLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const EmojiLink = ({
  href,
  className = "",
  children,
}: EmojiLinkProps) => {
  const handleClick = () => {
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
        console.error("Error with emoji confetti:", e);
      }
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default EmojiLink;
