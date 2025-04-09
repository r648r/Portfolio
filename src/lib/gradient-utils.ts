import gradientsConfig from '../../public/data/gradients.json';

type GradientConfig = {
  from: string;
  to: string;
  hover?: {
    from: string;
    to: string;
  };
};

/**
 * Récupère une configuration de gradient depuis le fichier JSON
 * @param section - La section (hero, expertise, etc.)
 * @param key - La clé du gradient dans cette section
 * @returns La configuration du gradient ou une configuration par défaut
 */
export function getGradientConfig(section: string, key: string): GradientConfig {
  try {
    // @ts-ignore - Le système de types TypeScript ne connaît pas la structure exacte du JSON importé
    const config = gradientsConfig.gradients[section]?.[key];

    if (!config) {
      console.warn(`Gradient non trouvé pour section: ${section}, key: ${key}`);
      return {
        from: 'blue-600',
        to: 'blue-400',
        hover: {
          from: 'blue-500',
          to: 'blue-300'
        }
      };
    }

    return config;
  } catch (error) {
    console.error('Erreur lors du chargement des gradients:', error);
    return {
      from: 'blue-600',
      to: 'blue-400',
      hover: {
        from: 'blue-500',
        to: 'blue-300'
      }
    };
  }
}

/**
 * Génère les classes CSS Tailwind pour un gradient
 * @param section - La section (hero, expertise, etc.)
 * @param key - La clé du gradient dans cette section
 * @returns Les classes CSS pour le gradient normal et hover
 */
export function getGradientClasses(section: string, key: string): string {
  const config = getGradientConfig(section, key);

  const normalClasses = `bg-gradient-to-r from-${config.from} to-${config.to}`;

  let hoverClasses = '';
  if (config.hover) {
    hoverClasses = ` hover:from-${config.hover.from} hover:to-${config.hover.to}`;
  }

  return `${normalClasses}${hoverClasses}`;
}

/**
 * Génère les classes CSS complètes pour un bouton avec gradient
 * @param section - La section (hero, expertise, etc.)
 * @param key - La clé du gradient dans cette section
 * @param additionalClasses - Classes CSS supplémentaires
 * @returns Les classes CSS complètes pour le bouton
 */
export function getButtonClasses(section: string, key: string, additionalClasses: string = ''): string {
  const gradientClasses = getGradientClasses(section, key);
  const baseClasses = 'text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm font-medium';

  // Ajouter automatiquement flex-1 pour les boutons du hero
  const flexClass = section === 'hero' ? 'flex-1' : '';

  return `${gradientClasses} ${baseClasses} ${flexClass} ${additionalClasses}`;
}
