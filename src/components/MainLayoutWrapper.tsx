"use client";

import React, { useEffect, useState } from "react";

/**
 * Composant wrapper qui ajuste automatiquement le padding-top 
 * pour compenser la navbar fixe pour toutes les sections du site
 */
export default function MainLayoutWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    // Fonction pour mesurer la hauteur de la navbar
    const updateNavbarHeight = () => {
      const navbar = document.querySelector('header');
      if (navbar) {
        const height = navbar.getBoundingClientRect().height;
        setNavbarHeight(height);
      }
    };

    // Mesurer au chargement initial
    updateNavbarHeight();
    
    // Réagir aux changements de taille de fenêtre
    window.addEventListener('resize', updateNavbarHeight);
    
    // Nettoyage à la suppression du composant
    return () => {
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, []);

  return (
    <div 
      className={`${className}`}
      style={{ paddingTop: `${navbarHeight}px` }}
    >
      {children}
    </div>
  );
}