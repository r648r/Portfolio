"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

export type ThemeType = "blue" | "green" | "purple" | "red";

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

// Valeur par défaut du contexte pour éviter les erreurs d'initialisation
const defaultContext: ThemeContextType = {
  theme: "blue", // Bleu par défaut maintenant
  setTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>("blue"); // Thème bleu par défaut
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Appliquer le thème au chargement
    const savedTheme = localStorage.getItem("theme") as ThemeType;
    if (savedTheme && ["blue", "green", "purple", "red"].includes(savedTheme)) {
      setTheme(savedTheme);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Mettre à jour la classe du body lorsque le thème change
    document.body.classList.remove("theme-blue", "theme-green", "theme-purple", "theme-red");
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}
