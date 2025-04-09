"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "fr" | "en" | "es" | "de";

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  availableLanguages: Language[];
}

// Définition des traductions
const translations: Translations = {
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.redteam": "Red Team",
    "nav.blueteam": "Blue Team",
    "nav.devsecops": "DevSecOps",
    "nav.tmux": "Tmux",
    "nav.pgp": "PGP",
    "nav.terminal": "Terminal",
    "nav.projects": "Projets",

    // Profil
    "profile.title": "Mon Profil",
    "profile.description": "Expert en cybersécurité avec une forte expérience dans les domaines Red Team et Blue Team. Je travaille sur des projets variés qui explorent différentes facettes de la sécurité informatique.",
    "profile.cv": "Télécharger mon CV",
    "profile.about": "À propos de moi",
    "profile.skills": "Compétences",
    "profile.certifications": "Certifications",
    "profile.environment": "Environnement de Travail",
    "profile.env.description": "Mes configurations de terminaux et environnements de développement pour mes projets de cybersécurité. Explorez mes configurations pour les projets Red Team et Blue Team.",

    // Projets
    "projects.title": "Mes Projets",
    "projects.description": "Découvrez une sélection de mes projets récents en matière de sécurité informatique, développement web et infrastructure.",
    "projects.all": "Tous",
    "projects.view": "Voir le projet",

    // Footer
    "footer.copyright": "Tous droits réservés.",
    "footer.about": "À propos",
    "footer.about.text": "Portfolio spécialisé en cybersécurité, présentant mes compétences en Red Team, Blue Team, DevSecOps et autres technologies.",
    "footer.navigation": "Navigation",
    "footer.resources": "Ressources",
    "footer.connect": "Me contacter",
    "footer.connect_with_me": "Mes réseaux sociaux",
    "footer.social.github": "GitHub: Voir mes projets",
    "footer.social.linkedin": "LinkedIn: Mon profil professionnel",
    "footer.social.twitter": "Twitter: Suivez-moi",
    "footer.social.mail": "Email: Contactez-moi",
    "footer.social.rootme": "Root-Me: Mon profil",
    "footer.social.codewars": "CodeWars: Défis de code",

    // Bouton langue
    "language": "Langue",
    "language.fr": "Français",
    "language.en": "Anglais",
    "language.es": "Espagnol",
    "language.de": "Allemand",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.redteam": "Red Team",
    "nav.blueteam": "Blue Team",
    "nav.devsecops": "DevSecOps",
    "nav.tmux": "Tmux",
    "nav.pgp": "PGP",
    "nav.terminal": "Terminal",
    "nav.projects": "Projects",

    // Profil
    "profile.title": "My Profile",
    "profile.description": "Cybersecurity expert with strong experience in both Red Team and Blue Team domains. I work on various projects that explore different aspects of information security.",
    "profile.cv": "Download my CV",
    "profile.about": "About me",
    "profile.skills": "Skills",
    "profile.certifications": "Certifications",
    "profile.environment": "Work Environment",
    "profile.env.description": "My terminal configurations and development environments for cybersecurity projects. Explore my configurations for Red Team and Blue Team projects.",

    // Projets
    "projects.title": "My Projects",
    "projects.description": "Discover a selection of my recent projects in cybersecurity, web development, and infrastructure.",
    "projects.all": "All",
    "projects.view": "View project",

    // Footer
    "footer.copyright": "All rights reserved.",
    "footer.about": "About",
    "footer.about.text": "Cybersecurity portfolio showcasing my skills in Red Team, Blue Team, DevSecOps and other technologies.",
    "footer.navigation": "Navigation",
    "footer.resources": "Resources",
    "footer.connect": "Connect with me",
    "footer.connect_with_me": "My social networks",
    "footer.social.github": "GitHub: View my projects",
    "footer.social.linkedin": "LinkedIn: My professional profile",
    "footer.social.twitter": "Twitter: Follow me",
    "footer.social.mail": "Email: Contact me",
    "footer.social.rootme": "Root-Me: My profile",
    "footer.social.codewars": "CodeWars: Coding challenges",

    // Bouton langue
    "language": "Language",
    "language.fr": "French",
    "language.en": "English",
    "language.es": "Spanish",
    "language.de": "German",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.redteam": "Equipo Rojo",
    "nav.blueteam": "Equipo Azul",
    "nav.devsecops": "DevSecOps",
    "nav.tmux": "Tmux",
    "nav.pgp": "PGP",
    "nav.terminal": "Terminal",
    "nav.projects": "Proyectos",

    // Profil
    "profile.title": "Mi Perfil",
    "profile.description": "Experto en ciberseguridad con amplia experiencia en los dominios de Equipo Rojo y Equipo Azul. Trabajo en diversos proyectos que exploran diferentes aspectos de la seguridad informática.",
    "profile.cv": "Descargar mi CV",
    "profile.about": "Sobre mí",
    "profile.skills": "Habilidades",
    "profile.certifications": "Certificaciones",
    "profile.environment": "Entorno de Trabajo",
    "profile.env.description": "Mis configuraciones de terminal y entornos de desarrollo para proyectos de ciberseguridad. Explore mis configuraciones para proyectos de Equipo Rojo y Equipo Azul.",

    // Projets
    "projects.title": "Mis Proyectos",
    "projects.description": "Descubra una selección de mis proyectos recientes en ciberseguridad, desarrollo web e infraestructura.",
    "projects.all": "Todos",
    "projects.view": "Ver proyecto",

    // Footer
    "footer.copyright": "Todos los derechos reservados.",
    "footer.about": "Acerca de",
    "footer.about.text": "Portafolio especializado en ciberseguridad, mostrando mis habilidades en Equipo Rojo, Equipo Azul, DevSecOps y otras tecnologías.",
    "footer.navigation": "Navegación",
    "footer.resources": "Recursos",
    "footer.connect": "Conéctate conmigo",
    "footer.connect_with_me": "Mis redes sociales",
    "footer.social.github": "GitHub: Ver mis proyectos",
    "footer.social.linkedin": "LinkedIn: Mi perfil profesional",
    "footer.social.twitter": "Twitter: Sígueme",
    "footer.social.mail": "Email: Contáctame",
    "footer.social.rootme": "Root-Me: Mi perfil",
    "footer.social.codewars": "CodeWars: Desafíos de código",

    // Bouton langue
    "language": "Idioma",
    "language.fr": "Francés",
    "language.en": "Inglés",
    "language.es": "Español",
    "language.de": "Alemán",
  },
  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.redteam": "Red Team",
    "nav.blueteam": "Blue Team",
    "nav.devsecops": "DevSecOps",
    "nav.tmux": "Tmux",
    "nav.pgp": "PGP",
    "nav.terminal": "Terminal",
    "nav.projects": "Projekte",

    // Profil
    "profile.title": "Mein Profil",
    "profile.description": "Cybersicherheitsexperte mit umfangreicher Erfahrung in den Bereichen Red Team und Blue Team. Ich arbeite an verschiedenen Projekten, die verschiedene Aspekte der Informationssicherheit erforschen.",
    "profile.cv": "Meinen Lebenslauf herunterladen",
    "profile.about": "Über mich",
    "profile.skills": "Fähigkeiten",
    "profile.certifications": "Zertifizierungen",
    "profile.environment": "Arbeitsumgebung",
    "profile.env.description": "Meine Terminal-Konfigurationen und Entwicklungsumgebungen für Cybersicherheitsprojekte. Erkunden Sie meine Konfigurationen für Red-Team- und Blue-Team-Projekte.",

    // Projets
    "projects.title": "Meine Projekte",
    "projects.description": "Entdecken Sie eine Auswahl meiner aktuellen Projekte in den Bereichen Cybersicherheit, Webentwicklung und Infrastruktur.",
    "projects.all": "Alle",
    "projects.view": "Projekt ansehen",

    // Footer
    "footer.copyright": "Alle Rechte vorbehalten.",
    "footer.about": "Über",
    "footer.about.text": "Cybersicherheits-Portfolio, das meine Fähigkeiten in Red Team, Blue Team, DevSecOps und anderen Technologien präsentiert.",
    "footer.navigation": "Navigation",
    "footer.resources": "Ressourcen",
    "footer.connect": "Verbinde dich mit mir",
    "footer.connect_with_me": "Meine sozialen Netzwerke",
    "footer.social.github": "GitHub: Meine Projekte ansehen",
    "footer.social.linkedin": "LinkedIn: Mein Berufsprofil",
    "footer.social.twitter": "Twitter: Folge mir",
    "footer.social.mail": "E-Mail: Kontaktiere mich",
    "footer.social.rootme": "Root-Me: Mein Profil",
    "footer.social.codewars": "CodeWars: Coding-Herausforderungen",

    // Bouton langue
    "language": "Sprache",
    "language.fr": "Französisch",
    "language.en": "Englisch",
    "language.es": "Spanisch",
    "language.de": "Deutsch",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr");
  const availableLanguages: Language[] = ["fr", "en", "es", "de"];

  useEffect(() => {
    // Récupérer la langue depuis localStorage si disponible
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage && availableLanguages.includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    } else {
      // Sinon, essayer de détecter la langue du navigateur
      const browserLanguage = navigator.language.split("-")[0] as Language;
      if (availableLanguages.includes(browserLanguage)) {
        setLanguageState(browserLanguage);
      }
    }
  }, []);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem("language", newLanguage);
    document.documentElement.lang = newLanguage;
  };

  // Fonction de traduction
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
