"use client";

import { useState } from "react";
import { playConfetti, getRandomEmoji } from "@/lib/confetti";
import { motion } from "framer-motion";

type SocialLink = {
  name: string;
  url: string;
  svgPath: string;
  color: string;
  hoverColor: string;
};

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/your-username",
    svgPath: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
    color: "text-purple-400",
    hoverColor: "hover:text-gray-300"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/your-profile",
    svgPath: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    color: "text-purple-400",
    hoverColor: "hover:text-blue-500"
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/your-profile",
    svgPath: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    color: "text-purple-400",
    hoverColor: "hover:text-white"
  },
  {
    name: "Reddit",
    url: "https://www.reddit.com/user/your-username",
    svgPath: "M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z",
    color: "text-purple-400",
    hoverColor: "hover:text-orange-600"
  },
  {
    name: "Root-Me",
    url: "https://www.root-me.org/your-profile",
    svgPath: "M21.15,2.86a2.89,2.89,0,0,1,2.89,2.89v13.5a2.89,2.89,0,0,1-2.89,2.89H2.85A2.89,2.89,0,0,1,0,19.25V5.75A2.89,2.89,0,0,1,2.85,2.86ZM9.26,11.5v2.81h5.48c.68,0,1.22.54,1.22,1.22S15.42,17,14.74,17H9.26c-.68,0-1.22-.54-1.22-1.22V11.5H5.64c-.67,0-1.21-.55-1.21-1.22S5,9.06,5.64,9.06H8.04V7.81c0-.67.54-1.22,1.22-1.22h5.48c.68,0,1.22.55,1.22,1.22s-.54,1.25-1.22,1.25H9.26V9.06h3.2c.68,0,1.23.55,1.23,1.22s-.55,1.22-1.23,1.22Z",
    color: "text-purple-400",
    hoverColor: "hover:text-purple-600"
  },
  {
    name: "CodeWars",
    url: "https://www.codewars.com/users/your-username",
    svgPath: "M.76 12.2l-.08-.04c-.18-.1-.32-.25-.42-.44-.14-.26-.2-.5-.2-.75l.02-.13c0-.2.05-.38.14-.55l.08-.15c.04-.08.1-.15.15-.22.06-.07.07-.16.05-.24l-.05-.16c-.06-.2-.1-.4-.1-.6L.32 8.8c0-.22.06-.44.2-.6l.1-.13c.07-.1.18-.16.3-.2.1-.03.17-.13.18-.25l.02-.34c0-.27.13-.52.33-.7l.24-.18c.05-.05.1-.1.14-.18.05-.06.06-.14.05-.2-.02-.1 0-.13.05-.14.16-.18.3-.36.4-.55.2-.28.35-.5.5-.76.13-.25.13-.5.1-.75l-.1-.14c-.13-.2-.3-.3-.5-.3-.3 0-.6.2-.76.5l-.22.34c-.2.32-.5.56-.86.7l-.68.22c-.23.08-.3.3-.23.53.16.46.84.79 1.37.86.42.03.66.3.66.72v.5c0 .25-.12.5-.33.6-.23.16-.53.16-.8.02l-.4-.36c-.18-.15-.36-.3-.55-.44-.32-.24-.48-.5-.5-.8l-.03-.43c-.02-.26-.07-.5-.13-.75l-.14-.53-.34-.25c-.3-.2-.53-.47-.63-.8-.18-.6-.05-1.06.27-1.5.16-.22.74-.65 1.1-.65h.56c.17 0 .33-.1.4-.25l.08-.18.1-.12c.6-.7.94-1.37.94-2.06 0-.82-.16-1.54-.5-2.17l-.12-.21c-.07-.1-.11-.22-.13-.35l-.1-.58c0-.42-.2-.77-.57-1.07-.3-.24-.54-.36-.8-.36l-.4.08-.4.3-.16.05c-.17.05-.3.05-.45.05-.33.03-.6-.06-.83-.28L5.6 2.2c-.55-.44-.33-1.06.43-1.06h.3c.28.03.55.1.8.33l.06.06c.1.1.2.18.3.28.15.1.3.4.3.6l.03.2c.05.12.12.2.2.28l.1.08c.27.2.55.46.62.8l.03.18c.05.32.1.65.1.98 0 .33.03.66.06.98l.03.3c.03.34.1.67.25.97.15.3.35.53.6.72l.14.12c.3.2.4.53.47.88l.04.65c.04.3-.1.6-.35.85l-.86.86c-.23.23-.3.6-.15.9l.24.53c.07.15.1.3.1.47 0 .15.05.3.1.45l.12.42c.13.38.2.8.2 1.2 0 .46.03.94.1 1.42.05.36-.12.68-.4.9l-.58.4c-.35.27-.48.73-.3 1.1l.52.87c.06.13.12.25.15.4l.16.64c.1.3.15.62.23.93.06.3.1.6.1.9 0 .32.03.64.1.95l.06.43c.1.73.65 1.33 1.3 1.43.23.03.45.05.68.08l.57.04c.35 0 .7.08.96.26l.6.37.6.23c.28.12.53.3.72.54.18.24.3.5.35.8.06.3.02.6-.08.87l-.17.45c-.13.36-.15.77-.04 1.15.12.4.36.76.75.97l.33.15c.34.12.7.14 1.04.06l.52-.12c.2-.05.4-.02.6.08l.56.3c.38.2.83.18 1.17-.07l.42-.32c.4-.3.54-.85.32-1.3l-.28-.55c-.1-.2-.15-.4-.16-.62l-.02-.68c0-.2-.02-.38-.08-.54l-.12-.32c-.18-.36-.43-.6-.8-.7l-.57-.16c-.33-.1-.55-.37-.55-.7v-.57c0-.24-.07-.47-.2-.67l-.28-.32c-.32-.36-.66-.62-1.05-.77l-.5-.14c-.17-.05-.3-.18-.38-.33l-.14-.3c-.17-.34-.27-.7-.3-1.07l-.02-.33c0-.07-.04-.13-.1-.18l-.38-.3c-.24-.2-.42-.45-.52-.75l-.03-.1v-.02l.02-.03c.04-.1.08-.18.16-.24.1-.1.22-.14.35-.14.17 0 .34.04.48.12l.22.13c.13.08.3.05.4-.06l.2-.23c.06-.06.16-.06.22 0l.2.22c.1.1.24.12.36.05l.4-.23c.2-.12.48-.04.63.15l.08.1v.02c.02.15-.03.3-.12.4l-.27.3c-.12.13-.2.27-.2.43v.53c0 .03.02.07.05.1l.11.08c.08.07.2.08.28.02l.1-.09c.08-.06.2-.04.24.06l.05.11.32.73c.23.65.88 1 1.53.85l.34-.08c.1-.02.2-.1.27-.2l.2-.24c.06-.08.18-.08.26-.02l.3.22c.2.15.5.1.65-.12l.16-.24c.03-.05.1-.06.15-.03 0 0 .1.06.1.14l.1.3c.04.13.17.2.3.2H21c.2 0 .36-.17.36-.37v-.08c0-.1.05-.2.13-.3l.3-.28c.1-.08.15-.2.17-.32z",
    color: "text-purple-400",
    hoverColor: "hover:text-red-500"
  },
  {
    name: "Medium",
    url: "https://medium.com/@your-username",
    svgPath: "M0 0v24h24V0H0zm19.938 5.686L18.651 6.92a.376.376 0 0 0-.143.362v9.067a.376.376 0 0 0 .143.361l1.257 1.234v.271h-6.322v-.27l1.302-1.265c.128-.128.128-.165.128-.36V8.99l-3.62 9.195h-.49L6.69 8.99v6.163a.85.85 0 0 0 .233.707l1.694 2.054v.271H3.815v-.27L5.51 15.86a.82.82 0 0 0 .218-.707V8.027a.624.624 0 0 0-.203-.527L4.019 5.686v-.27h4.674l3.613 7.923 3.176-7.924h4.456v.271z",
    color: "text-purple-400",
    hoverColor: "hover:text-gray-800"
  },
  {
    name: "Discord",
    url: "https://discord.gg/your-server",
    svgPath: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z",
    color: "text-purple-400",
    hoverColor: "hover:text-indigo-500"
  },
  {
    name: "Stack Overflow",
    url: "https://stackoverflow.com/users/your-id",
    svgPath: "M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM1.89 15.47V24h19.19v-8.53h-2.133v6.4H4.021v-6.4H1.89zm4.265 2.133v1.067h10.66v-1.067H6.154Z",
    color: "text-purple-400",
    hoverColor: "hover:text-orange-500"
  },
  {
    name: "TryHackMe",
    url: "https://tryhackme.com/p/your-username",
    svgPath: "M10.729 5.2626L9.47812 10.6497L7.25189 8.3083L10.729 5.2626ZM17.5092 5.2626L21 8.3083L18.7595 10.6497L17.5092 5.2626ZM15.9624 18L14.9542 14.6748H9.03474L8.02652 18H3L9.95375 3H14.0463L21 18H15.9624Z",
    color: "text-purple-400",
    hoverColor: "hover:text-red-600"
  },
  {
    name: "HackTheBox",
    url: "https://app.hackthebox.com/profile/your-id",
    svgPath: "M11.9959 1L1 6.9979V16.9938L5.49979 19.4917V9.4958L11.9959 5.99792L18.4919 9.4958V19.4917L22.9917 16.9938V6.9979L11.9959 1Z",
    color: "text-purple-400",
    hoverColor: "hover:text-green-500"
  }
];

export default function SocialLinks() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const handleSocialClick = () => {
    playConfetti();
  };

  // Animation variants améliorés
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  // Animation pour le survol
  const hoverAnimation = {
    scale: 1.1,
    rotate: [0, 5, -5, 0],
    transition: {
      rotate: {
        duration: 0.5,
        repeat: 0,
        ease: "easeInOut"
      }
    }
  };

  // Animation pour le clic
  const tapAnimation = {
    scale: 0.95
  };

  // Composant qui affiche le logo SVG
  const SocialIcon = ({ path, className }: { path: string; className: string }) => (
    <svg
      xmlns="http://www.w3.org/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-6 h-6 ${className}`}
    >
      <path d={path} />
    </svg>
  );

  return (
    <div className="py-16 bg-gradient-to-b from-purple-950 via-black to-purple-950">
      <div className="gemini-container">
        <motion.h2
          className="text-center text-3xl font-bold mb-12 text-purple-400"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Mes Profils
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                handleSocialClick();
                // Affiche un emoji aléatoire lors du clic
                if (typeof window !== 'undefined' && window.confetti) {
                  const emoji = getRandomEmoji();
                  try {
                    const unicorn = window.confetti.shapeFromText({ text: emoji, scalar: 2 });
                    window.confetti({
                      spread: 360,
                      ticks: 60,
                      gravity: 0,
                      decay: 0.96,
                      startVelocity: 20,
                      shapes: [unicorn],
                      scalar: 2,
                      particleCount: 30
                    });
                  } catch(e) {
                    console.error("Error with confetti:", e);
                  }
                }
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border border-purple-700/50 bg-purple-900/20 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 ${link.hoverColor}`}
              variants={item}
              whileHover={hoverAnimation}
              whileTap={tapAnimation}
              onHoverStart={() => setHoveredIcon(link.name)}
              onHoverEnd={() => setHoveredIcon(null)}
            >
              <div className={`w-10 h-10 mb-2 ${link.color} group-hover:${link.hoverColor} transition-all duration-300`}>
                <SocialIcon path={link.svgPath} className="w-10 h-10" />
              </div>
              <span className="text-sm font-medium text-purple-200">{link.name}</span>

              {/* Indication visuelle que le lien s'ouvre dans un nouvel onglet */}
              <motion.span
                className="text-xs text-purple-400 mt-1 opacity-0"
                animate={{
                  opacity: hoveredIcon === link.name ? 1 : 0,
                  y: hoveredIcon === link.name ? 0 : 5
                }}
                transition={{ duration: 0.2 }}
              >
                s'ouvre dans un nouvel onglet
              </motion.span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
