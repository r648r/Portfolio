"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Monitor, Shield, Terminal, GraduationCap, Key, Braces } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTheme } from "@/lib/theme-context";
import { useLanguage } from "@/lib/language-context";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  const { t } = useLanguage();

  // Détermine les couleurs basées sur la page/thème
  const getColors = () => {
    if (pathname.includes("/devsecops")) {
      return {
        bg: "bg-green-950/80",
        border: "border-green-700",
        text: "text-green-400",
        hover: "hover:text-green-300"
      };
    } else {
      return {
        bg: "bg-blue-950/80",
        border: "border-blue-700",
        text: "text-blue-400",
        hover: "hover:text-blue-300"
      };
    }
  };

  const colors = getColors();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Ferme le menu lorsque la route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: t("nav.home"), icon: <Home className="h-4 w-4" /> },
    { href: "/red-team", label: t("nav.redteam"), icon: <Monitor className="h-4 w-4" /> },
    { href: "/blue-team", label: t("nav.blueteam"), icon: <GraduationCap className="h-4 w-4" /> },
    { href: "/devsecops", label: t("nav.devsecops"), icon: <Shield className="h-4 w-4" /> },
    { href: "/tmux", label: t("nav.tmux"), icon: <Braces className="h-4 w-4" /> },
    { href: "/pgp", label: t("nav.pgp"), icon: <Key className="h-4 w-4" /> },
    { href: "/terminal", label: t("nav.terminal"), icon: <Terminal className="h-4 w-4" /> },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header
      className={`fixed w-full top-0 z-50 backdrop-blur-md transition-all duration-300
      ${isScrolled ? `${colors.bg} shadow-lg` : "bg-transparent"}`}
    >
      <div className="gemini-container flex justify-between items-center py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className={`text-2xl font-bold ${colors.text}`}>CyberPortfolio</span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 font-medium transition-colors duration-200
                ${isActive(link.href)
                  ? `${colors.text} border-b-2 ${colors.border}`
                  : `text-gray-300 ${colors.hover}`}`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>

        {/* Menu Toggle - Mobile */}
        <button
          className="md:hidden flex items-center p-2 rounded-lg group"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <X className={`h-6 w-6 ${colors.text}`} />
          ) : (
            <Menu className={`h-6 w-6 ${colors.text}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`md:hidden ${colors.bg} ${colors.border} border-t`}
          >
            <div className="gemini-container py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-200
                    ${isActive(link.href)
                      ? `${colors.bg.replace("80", "")} ${colors.text}`
                      : `text-gray-300 ${colors.hover}`}`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                <span className="text-gray-400">{t("language")}</span>
                <LanguageSwitcher />
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                <span className="text-gray-400">Thème</span>
                <ThemeSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
