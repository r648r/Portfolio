import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/language-context";
import { ThemeProvider } from "@/lib/theme-context";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Portfolio Cybersécurité",
  description: "Portfolio présentant mes projets et compétences en cybersécurité, développement web et infrastructure réseau.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Styles pour Asciinema */}
        <link
          rel="stylesheet"
          href="/css/asciinema-player.css"
        />
        <link
          rel="stylesheet"
          href="/css/asciinema-custom.css"
        />
        
        {/* Scripts pré-chargés */}
        <Script
          src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/js/asciinema-config.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/js/asciinema-embed-helper.js"
          strategy="beforeInteractive"
        />
        
        {/* Scripts chargés après interaction */}
        <Script
          src="https://cdn.jsdelivr.net/npm/asciinema-player@3.6.3/dist/bundle/asciinema-player.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/js/asciinema-page-handler.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          <ThemeProvider>
            <ClientBody>{children}</ClientBody>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}