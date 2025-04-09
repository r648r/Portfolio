import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Github, Linkedin, Twitter, Code, BookOpen } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

type SocialLink = {
  name: string;
  url: string;
  icon: React.ReactNode;
  hoverColor: string;
  tooltipKey: string;
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  // Effet pour charger les scripts côté client seulement
  useEffect(() => {
    setIsMounted(true);

    // Charger les scripts nécessaires pour le canvas
    const loadScripts = async () => {
      // Vérifier si les scripts sont déjà chargés
      if (document.getElementById('three-js-script')) return;

      // Ajouter le CSS
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = '/css/footer-canvas.css';
      document.head.appendChild(cssLink);

      // Créer et ajouter les scripts dans l'ordre
      const threeScript = document.createElement('script');
      threeScript.id = 'three-js-script';
      threeScript.src = '/js/three.min.js';
      document.body.appendChild(threeScript);

      // Attendre que Three.js soit chargé
      await new Promise(resolve => {
        threeScript.onload = resolve;
      });

      // Charger les autres scripts qui dépendent de Three.js
      const simplexScript = document.createElement('script');
      simplexScript.src = '/js/simplexNoise.js';
      document.body.appendChild(simplexScript);

      const chromaScript = document.createElement('script');
      chromaScript.src = '/js/chroma.min.js';
      document.body.appendChild(chromaScript);

      // Attendre que les autres scripts soient chargés
      await new Promise(resolve => {
        chromaScript.onload = resolve;
      });

      // Enfin, charger le script du footer
      const footerScript = document.createElement('script');
      footerScript.src = '/js/footer-canvas.js';
      document.body.appendChild(footerScript);
    };

    loadScripts();

  }, []);

  const socialLinks: SocialLink[] = [
    {
      name: "GitHub",
      url: "https://github.com/your-username",
      icon: <Github className="h-10 w-10" />,
      hoverColor: "hover:text-gray-100",
      tooltipKey: "footer.social.github"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/your-profile",
      icon: <Linkedin className="h-10 w-10" />,
      hoverColor: "hover:text-blue-400",
      tooltipKey: "footer.social.linkedin"
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/your-profile",
      icon: <Twitter className="h-10 w-10" />,
      hoverColor: "hover:text-blue-400",
      tooltipKey: "footer.social.twitter"
    },
    {
      name: "Mail",
      url: "mailto:contact@example.com",
      icon: <Mail className="h-10 w-10" />,
      hoverColor: "hover:text-red-400",
      tooltipKey: "footer.social.mail"
    },
    {
      name: "Root-Me",
      url: "https://www.root-me.org/your-profile",
      icon: <Code className="h-10 w-10" />,
      hoverColor: "hover:text-green-400",
      tooltipKey: "footer.social.rootme"
    },
    {
      name: "CodeWars",
      url: "https://www.codewars.com/users/your-username",
      icon: <BookOpen className="h-10 w-10" />,
      hoverColor: "hover:text-yellow-400",
      tooltipKey: "footer.social.codewars"
    },
  ];

  return (
    <footer className="py-16 relative bg-gradient-to-b from-blue-950 to-black text-white border-t border-gray-800">
      {/* Canvas Background */}
      <canvas id="background" className="absolute top-0 left-0 w-full h-full"></canvas>

      <div className="gemini-container footer-content">
        {/* Titre section réseaux sociaux */}
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-3 text-blue-400">{t("footer.connect_with_me")}</h2>
        </motion.div>

        {/* Grandes icônes sociales */}
        <div className="social-links-container">
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-link text-gray-300 ${link.hoverColor}`}
              aria-label={link.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="social-icon">
                {link.icon}
              </div>
              <span className="social-label">{link.name}</span>
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          © {currentYear} CyberPortfolio. {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}
