"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const LanguageSwitcher = () => {
  const { language, setLanguage, t, availableLanguages } = useLanguage();

  // Map des icônes de drapeaux pour chaque langue
  const languageFlags: Record<string, string> = {
    fr: "🇫🇷",
    en: "🇬🇧",
    es: "🇪🇸",
    de: "🇩🇪"
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent border border-gray-700 hover:bg-gray-800 hover:border-gray-600 text-white"
        >
          <Globe className="h-4 w-4 mr-1" />
          <span className="mr-1">{t("language")}</span>
          <span>{languageFlags[language]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-900 border border-gray-700 text-white">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            className={`flex items-center gap-2 cursor-pointer ${
              language === lang ? "bg-blue-900/50" : "hover:bg-gray-800"
            }`}
            onClick={() => setLanguage(lang)}
          >
            <span className="text-lg">{languageFlags[lang]}</span>
            <span>{t(`language.${lang}`)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
