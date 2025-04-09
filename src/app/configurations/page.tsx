"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTheme } from "@/lib/theme-context";
import { useLanguage } from "@/lib/language-context";
import TmuxConfig from "@/components/TmuxConfig";
import TerminalPlayer from "@/components/TerminalPlayer";

export default function Configurations() {
  const { setTheme } = useTheme();
  const { t } = useLanguage();

  // Force le thème blue pour cette page
  useEffect(() => {
    setTheme("blue");
    return () => {};
  }, [setTheme]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 via-black to-blue-950 text-white">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Mes configurations</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-900/30 p-6 rounded-lg backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Configuration Tmux</h2>
            <TmuxConfig />
          </div>

          <div className="bg-blue-900/30 p-6 rounded-lg backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Terminal</h2>
            <TerminalPlayer castId="1" />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
