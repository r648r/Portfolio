"use client";

import React, { ReactNode, useEffect, useState } from "react";

interface TerminalDisplayProps {
  children: ReactNode;
  title?: string;
  showControls?: boolean;
  showFooter?: boolean;
  showShortcuts?: boolean;
  className?: string;
}

export default function TerminalDisplay({
  children,
  title = "~/terminal-demo",
  showControls = true,
  showFooter = true,
  showShortcuts = true,
  className = "",
}: TerminalDisplayProps) {
  const [currentDate, setCurrentDate] = useState("4/9/2025");

  // Formater la date actuelle au format MM/DD/YYYY
  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const year = now.getFullYear();
    setCurrentDate(`${month}/${day}/${year}`);
  }, []);

  return (
    <div className={`w-full max-w-full ${className}`}>
      {/* Terminal container avec bordure noire */}
      <div className="rounded-lg overflow-hidden border border-gray-800 bg-black shadow-xl">
        {/* Barre de titre de terminal */}
        {showControls && (
          <div className="flex items-center justify-between px-4 py-2 bg-[#191A21] border-b border-slate-800">
            <div className="text-sm font-mono text-gray-300">{title}</div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
          </div>
        )}

        {/* Zone principale du terminal */}
        <div className="bg-black text-white">
          {children}
        </div>

        {/* Barre de statut en bas façon tmux */}
        {showFooter && (
          <div className="flex items-center justify-between px-4 py-1 bg-black border-t border-slate-800 text-xs font-mono">
            <div className="text-green-500">[0] bash</div>
            <div className="text-gray-400">user@server:~</div>
            <div className="text-green-500">{currentDate}</div>
          </div>
        )}
      </div>

      {/* Message d'aide sous le terminal */}
      {showShortcuts && (
        <div className="mt-2 text-center text-xs text-slate-400 font-mono">
          <p className="mb-1">
            <span className="px-1 py-0.5 bg-slate-800 rounded-md text-blue-400">Espace</span> jouer/pauser |
            <span className="px-1 py-0.5 bg-slate-800 rounded-md text-blue-400 ml-1">←/→</span> ±5s |
            <span className="px-1 py-0.5 bg-slate-800 rounded-md text-blue-400 ml-1">Shift+←/→</span> ±10% |
            <span className="px-1 py-0.5 bg-slate-800 rounded-md text-blue-400 ml-1">f</span> plein écran
          </p>
          <p>
            <span className="px-1 py-0.5 bg-slate-800 rounded-md text-blue-400">,/.</span> img par img |
            <span className="px-1 py-0.5 bg-slate-800 rounded-md text-blue-400 ml-1">0-9</span> aller à % |
            <span className="px-1 py-0.5 bg-slate-800 rounded-md text-blue-400 ml-1">[/]</span> marqueur préc/suiv
          </p>
        </div>
      )}
    </div>
  );
}