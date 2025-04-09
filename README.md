# CyberPortfolio

## Stack Technique
| Technologie | Description |
|-------------|-------------|
| **Next.js 15** | Framework React avec App Router et Server Components |
| **TypeScript** | Langage de programmation typé pour une meilleure fiabilité |
| **Tailwind CSS** | Framework CSS utilitaire pour le styling |
| **Shadcn UI** | Composants UI accessibles et personnalisables |
| **Framer Motion** | Bibliothèque d'animations React |
| **Three.js** | Bibliothèque 3D pour les effets visuels |
| **Canvas Confetti** | Pour les effets de confetti avec emojis |
| **Bun** | Runtime JavaScript et gestionnaire de paquets ultrarapide |

## Démarrage rapide
```bash
# Installer les dépendances
bun install

# Lancer le serveur de développement
bun run dev

# Le site sera accessible à l'adresse : http://localhost:3000
```

## Fonctionnalités
- Design moderne avec animations fluides et interface responsive
- Support multilingue (français, anglais, espagnol, allemand)
- Mode clair/sombre personnalisable
- Sections spécialisées pour différents aspects cybersécurité
- Animations avancées avec Framer Motion
- Effets de confetti interactifs
- Terminal interactif avec Asciinema

## Structure du projet
```
├── public/              # Ressources statiques
│   ├── casts/           # Fichiers de démonstration du terminal
│   ├── css/             # Styles pour le player Asciinema
│   ├── data/            # Données JSON (projets, etc.)
│   ├── fonts/           # Polices personnalisées
│   └── js/              # Scripts JS clients
├── src/                 # Code source
│   ├── app/             # Routes de l'application (App Router)
│   │   ├── blue-team/   # Page Blue Team
│   │   ├── devsecops/   # Page DevSecOps
│   │   ├── pgp/         # Page PGP
│   │   ├── red-team/    # Page Red Team
│   │   ├── terminal/    # Page Terminal
│   │   ├── tmux/        # Page Tmux
│   │   ├── globals.css  # Styles globaux
│   │   ├── layout.tsx   # Layout principal
│   │   └── page.tsx     # Page d'accueil
│   ├── components/      # Composants React
│   │   ├── ui/          # Composants UI de base (shadcn)
│   │   └── ...          # Autres composants fonctionnels
│   ├── lib/             # Logique métier et utilitaires
│   └── types/           # Définitions de types TypeScript
```

## Système de traduction
Le site utilise un contexte React pour gérer le multilinguisme:
```tsx
// Utilisation dans les composants
const { t, language, setLanguage } = useLanguage();
<h1>{t("page.title")}</h1>
```

## Thèmes clair/sombre
Système de thème avec contexte React:
```tsx
// Utilisation dans les composants
const { theme, setTheme } = useTheme();
<button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
  Changer de thème
</button>
```

## Animations
### Framer Motion
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Contenu
</motion.div>
```

### Effets de confetti
```tsx
import { playConfetti, getRandomEmoji } from "@/lib/confetti";

// Dans un gestionnaire d'événements
const handleClick = () => {
  playConfetti(); // Effet simple

  // Avec emoji personnalisé
  if (typeof window !== 'undefined' && window.confetti) {
    const emoji = getRandomEmoji();
    const shape = window.confetti.shapeFromText({ text: emoji, scalar: 2 });
    window.confetti({
      shapes: [shape],
      particleCount: 30
    });
  }
};
```

## Déploiement
### Netlify (recommandé)
- Build command: `bun run build`
- Publish directory: `out` ou `.next`

### Export statique
1. Ajouter `output: 'export'` dans `next.config.js`
2. Exécuter `bun run build`
3. Le site statique sera généré dans `out/`

## Conventions de code
- **camelCase** pour variables, fonctions, méthodes
- **PascalCase** pour composants React, interfaces, types, classes
- **kebab-case** pour fichiers utilitaires
- Structure d'import: React, librairies externes, imports internes
- Tailwind CSS pour le styling avec fonction `cn()`

## Optimisation
- Code splitting et lazy loading avec `dynamic`
- Optimisation d'images avec `next/image`
- Animations GPU-accélérées avec transformations
- Memoization avec `useMemo` et `useCallback`
- Respect des préférences de réduction de mouvement
- Optimisation des Core Web Vitals (LCP, FID, CLS)
