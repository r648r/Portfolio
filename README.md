# CyberPortfolio

## Comment exécuter ce projet

Pour exécuter ce projet, suivez ces étapes simples :

```bash
# 1. Installer les dépendances avec Bun
bun install

# 2. Lancer le serveur de développement
bun run dev

# Le site sera accessible à l'adresse : http://localhost:3000
```

Un portfolio moderne axé sur la cybersécurité, offrant une présentation complète des compétences et projets en sécurité informatique.

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Installation et démarrage](#installation-et-démarrage)
- [Structure du projet](#structure-du-projet)
- [Pages et navigation](#pages-et-navigation)
- [Composants principaux](#composants-principaux)
- [Système de traduction](#système-de-traduction)
- [Thèmes clair/sombre](#thèmes-clairsombre)
- [Animations et interactions](#animations-et-interactions)
- [Déploiement](#déploiement)
- [Maintenance et contribution](#maintenance-et-contribution)

## Fonctionnalités

- **Design moderne** avec animations fluides et interface responsive
- **Support multilingue** avec changement de langue à la volée (français, anglais, espagnol, allemand)
- **Mode clair/sombre** personnalisable et détection automatique des préférences système
- **Sections spécialisées** pour différents aspects de la cybersécurité:
  - Red Team (tests d'intrusion, hacking éthique)
  - Blue Team (défense, SOC, surveillance)
  - DevSecOps (intégration de la sécurité dans le développement)
  - PGP (cryptographie et clés publiques)
  - Tmux (configuration avancée de terminal)
  - Terminal (démonstration de compétences CLI)
- **Animations avancées** avec Framer Motion pour une interface utilisateur dynamique
- **Effets de confetti** interactifs avec emojis personnalisés lors des interactions
- **Terminal interactif** avec lecteur Asciinema pour des démonstrations de commandes
- **Réseaux sociaux animés** avec effets au survol et au clic

## Technologies utilisées

- **Next.js 15** - Framework React basé sur les App Router et Server Components
- **TypeScript** - Pour un code type-safe et une meilleure expérience de développement
- **Tailwind CSS** - Framework CSS utilitaire pour un styling rapide et cohérent
- **Shadcn UI** - Composants UI accessibles et personnalisables
- **Framer Motion** - Bibliothèque d'animations React
- **Lucide Icons** - Bibliothèque d'icônes légère et moderne
- **Canvas Confetti** - Pour les effets de confetti avec emojis
- **Bun** - Runtime JavaScript et gestionnaire de paquets ultrarapide

## Installation et démarrage

Voici comment installer et démarrer le projet en local:

```bash
# 1. Cloner le dépôt
git clone <URL_DU_REPO>
cd cyber-portfolio

# 2. Installer les dépendances avec Bun (recommandé)
bun install
# ou avec npm si Bun n'est pas disponible
npm install

# 3. Lancer le serveur de développement
bun run dev
# ou
npm run dev

# 4. Accéder au site
# Ouvrir http://localhost:3000 dans votre navigateur
```

### Prérequis

- Node.js 18+ ou Bun 1.0+
- Un navigateur moderne (Chrome, Firefox, Safari, Edge)

### Scripts disponibles

- `bun run dev` - Lance le serveur de développement avec hot-reloading
- `bun run build` - Compile le projet pour la production
- `bun run start` - Démarre le serveur en mode production
- `bun run lint` - Exécute les vérifications de linting avec Biome

## Structure du projet

L'organisation des fichiers suit une architecture logique et modulaire:

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
│   │   ├── confetti.ts             # Gestion des effets de confetti
│   │   ├── language-context.tsx    # Contexte de traduction
│   │   ├── pgp-data.ts             # Données de clé PGP
│   │   ├── project-utils.ts        # Utilitaires pour les projets
│   │   ├── theme-context.tsx       # Contexte de thème
│   │   ├── tmux-data.ts            # Configuration Tmux
│   │   └── utils.ts                # Fonctions utilitaires
│   └── types/           # Définitions de types TypeScript
```

## Pages et navigation

Le site contient plusieurs pages spécialisées, chacune dédiée à un aspect de la cybersécurité:

### Page d'accueil (`/`)
- **HeroSection**: Introduction visuelle avec animations
- **ProfileSection**: Présentation des compétences et certifications
- **ProjectsSection**: Portfolio de projets avec filtrage par catégorie
- **ExperienceSection**: Parcours professionnel
- **SocialLinks**: Liens vers les réseaux sociaux avec animations
- **CtaSection**: Appel à l'action pour prendre contact
- **Footer**: Pied de page avec section "Connect with me" et certifications

### Pages spécialisées
- **Red Team** (`/red-team`): Expertise en offensive security
- **Blue Team** (`/blue-team`): Compétences de défense et monitoring
- **DevSecOps** (`/devsecops`): Intégration de la sécurité dans le cycle de développement
- **PGP** (`/pgp`): Présentation et utilisation de la clé PGP
- **Tmux** (`/tmux`): Configuration et astuces Tmux
- **Terminal** (`/terminal`): Démos interactives en ligne de commande

## Composants principaux

### Layout et navigation
- **Header.tsx**: Barre de navigation responsive avec menu mobile
- **Footer.tsx**: Pied de page avec liens sociaux, informations de contact et certifications
- **LanguageSwitcher.tsx**: Permet de changer la langue du site
- **ThemeSwitcher.tsx**: Alternance entre mode clair et sombre

### Sections de la page d'accueil
- **HeroSection.tsx**: Section d'introduction avec animation
- **ProfileSection.tsx**: Présentation des compétences et certifications
- **ProjectsSection.tsx**: Galerie de projets filtrables par catégorie
- **ExperienceSection.tsx**: Timeline d'expérience professionnelle
- **SocialLinks.tsx**: Liens vers les réseaux sociaux avec animations
- **CtaSection.tsx**: Call-to-action pour le contact

### Composants spécialisés
- **TerminalPlayer.tsx**: Lecteur Asciinema pour les démos de terminal
- **TerminalDemo.tsx**: Version interactive du terminal
- **PgpKey.tsx**: Affichage formatté de la clé PGP
- **TmuxConfig.tsx**: Présentation et explication de la configuration Tmux
- **ConfettiButton.tsx**: Bouton avec effet de confetti au clic

## Système de traduction

Le site utilise un système de traduction personnalisé avec React Context pour gérer plusieurs langues:

### Comment ça fonctionne
1. Le contexte `LanguageContext` est défini dans `src/lib/language-context.tsx`
2. Les traductions sont stockées dans un objet avec une entrée par langue
3. La langue par défaut est détectée automatiquement à partir des préférences du navigateur
4. Le choix de l'utilisateur est sauvegardé dans le localStorage

### Utilisation dans les composants

```tsx
// Importer le hook
import { useLanguage } from "@/lib/language-context";

// Dans votre composant
function MonComposant() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div>
      <h1>{t("page.title")}</h1>
      <p>{t("page.description")}</p>

      {/* Changer de langue */}
      <button onClick={() => setLanguage("fr")}>Français</button>
    </div>
  );
}
```

### Ajouter une nouvelle traduction

Pour ajouter une nouvelle phrase à traduire:
1. Ouvrir `src/lib/language-context.tsx`
2. Ajouter une nouvelle entrée dans chaque langue avec la même clé
3. Utiliser cette clé dans votre composant avec la fonction `t()`

## Thèmes clair/sombre

Le site prend en charge le thème clair et sombre via le contexte React:

### Fonctionnement
1. Le contexte `ThemeContext` défini dans `src/lib/theme-context.tsx` gère l'état du thème
2. Le thème est automatiquement détecté à partir des préférences système
3. L'utilisateur peut basculer manuellement entre les modes
4. Le choix est mémorisé dans le localStorage

### Utilisation dans les composants

```tsx
import { useTheme } from "@/lib/theme-context";

function MonComposant() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <p>Thème actuel: {theme}</p>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Changer de thème
      </button>
    </div>
  );
}
```

## Animations et interactions

Le portfolio utilise plusieurs types d'animations pour améliorer l'expérience utilisateur:

### Framer Motion
Les animations de transition entre les sections et les éléments sont gérées par Framer Motion:

```tsx
import { motion } from "framer-motion";

// Animation simple
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Contenu
</motion.div>

// Animation séquentielle
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

<motion.div variants={container} initial="hidden" animate="show">
  <motion.div variants={item}>Item 1</motion.div>
  <motion.div variants={item}>Item 2</motion.div>
</motion.div>
```

### Effets de confetti
Les effets de confetti sont gérés par la bibliothèque Canvas Confetti, avec des emojis personnalisés:

```tsx
import { playConfetti, getRandomEmoji } from "@/lib/confetti";

// Dans un gestionnaire d'événements
const handleClick = () => {
  // Effet de confetti simple
  playConfetti();

  // Effet avec emoji personnalisé
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

### Interactions avec les réseaux sociaux
Les icônes de réseaux sociaux ont des effets au survol et au clic:

- Effet de survol: Rotation légère et mise à l'échelle
- Effet de clic: Léger rétrécissement et explosion de confetti avec emojis
- Ouverture dans un nouvel onglet avec indication visuelle

## Déploiement

Le projet est prêt à être déployé sur diverses plateformes:

### Netlify (recommandé)
1. Créez un compte sur Netlify
2. Connectez votre dépôt GitHub
3. Configurez les paramètres de build:
   - Build command: `bun run build`
   - Publish directory: `out` ou `.next` selon la configuration

### Vercel (alternative)
1. Créez un compte sur Vercel
2. Importez votre dépôt GitHub
3. Vercel détectera automatiquement la configuration Next.js

### Export statique (option)
Pour générer une version statique du site:
1. Modifiez `next.config.js` en ajoutant `output: 'export'`
2. Exécutez `bun run build`
3. Le site statique sera généré dans le dossier `out/`

## Maintenance et contribution

### Mise à jour des dépendances
```bash
# Vérifier les mises à jour disponibles
bun outdated

# Mettre à jour les dépendances
bun update
```

### Ajout de nouveaux composants UI
Le projet utilise shadcn/ui. Pour ajouter un nouveau composant:
```bash
npx shadcn@latest add -y -o button
```

### Ajout de nouveaux réseaux sociaux
Pour ajouter un nouveau réseau social dans la section SocialLinks:
1. Ajouter une entrée dans la liste `socialLinks` dans `src/components/SocialLinks.tsx`
2. Spécifier le nom, l'URL, le chemin SVG de l'icône et les couleurs

### Bonnes pratiques
- Utilisez TypeScript pour tous les nouveaux composants
- Respectez les conventions de nommage existantes
- Testez sur différents appareils et tailles d'écran
- Vérifiez les performances avec les outils de Chrome
