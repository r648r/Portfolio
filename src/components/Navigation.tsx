"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Navigation = () => {
  const links = [
    { name: "Compétences Techniques", href: "#competences" },
    { name: "Mes Projets", href: "#projets" },
    { name: "Mes Domaines d'Expertise", href: "#expertise" }
  ];

  return (
    <motion.div
      className="w-full flex justify-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <nav className="backdrop-blur-sm bg-black/30 rounded-full px-6 py-2 border border-blue-800/30">
        <ul className="flex flex-wrap gap-1 md:gap-4 justify-center items-center">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className="text-sm md:text-base text-blue-300 hover:text-white px-3 py-2 rounded-md transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default Navigation;
