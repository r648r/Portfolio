"use client";

import { useState } from "react";
import { Copy, Download } from "lucide-react";
import { playConfetti } from "@/lib/confetti";
import { useTheme } from "@/lib/theme-context";

interface TerminalDisplayProps {
  content: string;
  title: string;
  fileName?: string;
  defaultTheme?: "purple" | "blue" | "red";
  staticPath?: string;
}

export default function TerminalDisplay({
  content,
  title,
  fileName = "terminal.txt",
  defaultTheme = "purple",
  staticPath
}: TerminalDisplayProps) {
  const [copied, setCopied] = useState(false);
  const themeContext = useTheme();
  const currentTheme = themeContext?.theme || defaultTheme;

  const themeColors = {
    purple: {
      headerBg: "bg-purple-900",
      windowBg: "bg-slate-900",
      buttonHighlight: "bg-purple-500",
      border: "border-purple-800",
    },
    blue: {
      headerBg: "bg-blue-900",
      windowBg: "bg-slate-900",
      buttonHighlight: "bg-blue-500",
      border: "border-blue-800",
    },
    red: {
      headerBg: "bg-red-900",
      windowBg: "bg-slate-900",
      buttonHighlight: "bg-red-500",
      border: "border-red-800",
    }
  };

  const colors = themeColors[currentTheme];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    playConfetti();
    setTimeout(() => setCopied(false), 2000);
  };

  const exportAsFile = () => {
    if (staticPath) {
      // Si un chemin statique est fourni, nous redirigerons vers ce fichier
      return;
    }

    // Sinon, générer un fichier depuis le contenu
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    playConfetti();
  };

  return (
    <div className={`rounded-lg overflow-hidden ${colors.border} border shadow-xl my-6`}>
      {/* Barre de titre de terminal */}
      <div className={`flex items-center justify-between px-4 py-3 ${colors.headerBg}`}>
        <div className="text-sm font-mono text-white">{title}</div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
      </div>

      {/* Zone de contenu */}
      <div className={`${colors.windowBg} p-6`}>
        <pre className="text-gray-300 font-mono text-sm overflow-x-auto whitespace-pre-wrap h-[350px] overflow-y-auto">
          <code>{content}</code>
        </pre>
      </div>

      {/* Barre d'actions */}
      <div className={`flex items-center justify-between px-4 py-2 ${colors.headerBg} border-t ${colors.border}`}>
        <div className="text-xs font-mono text-gray-300">$ cat {fileName}</div>
        <div className="flex space-x-2">
          <button
            onClick={copyToClipboard}
            className={`flex items-center space-x-1 px-3 py-1 rounded ${colors.buttonHighlight} text-white text-xs transition-colors`}
          >
            <Copy className="h-3 w-3 mr-1" />
            <span>{copied ? "Copié !" : "Copier"}</span>
          </button>

          {staticPath ? (
            <a
              href={staticPath}
              download={fileName}
              className="flex items-center space-x-1 px-3 py-1 rounded bg-gray-700 text-white text-xs transition-colors hover:bg-gray-600"
              onClick={() => playConfetti()}
            >
              <Download className="h-3 w-3 mr-1" />
              <span>Télécharger</span>
            </a>
          ) : (
            <button
              onClick={exportAsFile}
              className="flex items-center space-x-1 px-3 py-1 rounded bg-gray-700 text-white text-xs transition-colors hover:bg-gray-600"
            >
              <Download className="h-3 w-3 mr-1" />
              <span>Télécharger</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
