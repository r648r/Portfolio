/**
 * Script de chargement optimisé pour Asciinema Player
 * Résout les problèmes de chargement et initialise correctement les lecteurs
 */

// Fonction pour vérifier si Asciinema est déjà chargé
function isAsciinemaLoaded() {
  return typeof window.AsciinemaPlayer !== 'undefined';
}

// Fonction pour charger le script Asciinema s'il n'est pas déjà chargé
function loadAsciinemaScript() {
  return new Promise((resolve, reject) => {
    if (isAsciinemaLoaded()) {
      return resolve(window.AsciinemaPlayer);
    }

    // Vérifier si le script est déjà en cours de chargement
    const existingScript = document.querySelector('script[src*="asciinema-player.min.js"]');
    if (existingScript) {
      // Si le script est déjà en train de se charger, attendre qu'il soit prêt
      const checkInterval = setInterval(() => {
        if (isAsciinemaLoaded()) {
          clearInterval(checkInterval);
          resolve(window.AsciinemaPlayer);
        }
      }, 100);
      
      // Timeout après 5 secondes pour éviter une boucle infinie
      setTimeout(() => {
        clearInterval(checkInterval);
        reject(new Error("Timeout lors du chargement d'Asciinema Player"));
      }, 5000);
      
      return;
    }

    // Créer et charger le script
    const script = document.createElement('script');
    script.src = '/js/asciinema-player.min.js';
    script.async = true;
    
    script.onload = () => {
      // Vérifier si le chargement a réellement fonctionné
      if (isAsciinemaLoaded()) {
        resolve(window.AsciinemaPlayer);
      } else {
        reject(new Error("Asciinema Player n'a pas été correctement chargé"));
      }
    };
    
    script.onerror = (error) => {
      reject(new Error(`Erreur lors du chargement d'Asciinema Player: ${error}`));
    };
    
    document.head.appendChild(script);
  });
}

// Fonction pour charger les styles CSS d'Asciinema
function loadAsciinemaStyles() {
  return new Promise((resolve) => {
    // Vérifier si les styles sont déjà chargés
    const existingStyles = document.querySelector('link[href*="asciinema-consolidated.css"]');
    if (existingStyles) {
      return resolve();
    }
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/css/asciinema-consolidated.css';
    link.onload = resolve;
    
    document.head.appendChild(link);
  });
}

// Fonction principale pour initialiser un lecteur Asciinema
window.initializeAsciinemaPlayer = async function(container, castUrl, options = {}) {
  if (!container) {
    console.error("Conteneur non trouvé pour le lecteur Asciinema");
    return null;
  }
  
  try {
    // Charger les styles et le script
    await Promise.all([loadAsciinemaStyles(), loadAsciinemaScript()]);
    
    // Options par défaut
    const defaultOptions = {
      theme: 'monokai',
      autoPlay: false,
      idleTimeLimit: 2,
      fit: "width",
      fontSize: 'small',
      poster: 'npt:0:1'
    };
    
    // Fusionner avec les options fournies
    const mergedOptions = { ...defaultOptions, ...options };
    
    // Vider le conteneur avant l'initialisation pour éviter les doublons
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    // Initialiser le lecteur
    const player = window.AsciinemaPlayer.create(castUrl, container, mergedOptions);
    
    return player;
  } catch (error) {
    console.error("Erreur lors de l'initialisation du lecteur Asciinema:", error);
    
    // Afficher un message d'erreur dans le conteneur
    container.innerHTML = `
      <div class="flex items-center justify-center p-4 bg-red-900/20 text-red-400 font-mono text-sm rounded border border-red-800">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        Erreur de chargement du terminal
      </div>
    `;
    
    return null;
  }
};

// Initialiser automatiquement tous les éléments data-cast lors du chargement du document
document.addEventListener('DOMContentLoaded', function() {
  // Trouver tous les conteneurs avec l'attribut data-cast
  const containers = document.querySelectorAll('[data-cast]');
  
  containers.forEach(container => {
    const castUrl = container.getAttribute('data-cast');
    if (!castUrl) return;
    
    // Récupérer les options à partir des attributs data-*
    const options = {};
    
    if (container.hasAttribute('data-autoplay')) options.autoPlay = container.getAttribute('data-autoplay') !== 'false';
    if (container.hasAttribute('data-theme')) options.theme = container.getAttribute('data-theme');
    if (container.hasAttribute('data-idle-time-limit')) options.idleTimeLimit = parseFloat(container.getAttribute('data-idle-time-limit'));
    if (container.hasAttribute('data-speed')) options.speed = parseFloat(container.getAttribute('data-speed'));
    if (container.hasAttribute('data-fit')) options.fit = container.getAttribute('data-fit');
    if (container.hasAttribute('data-font-size')) options.fontSize = container.getAttribute('data-font-size');
    
    // Initialiser le lecteur
    window.initializeAsciinemaPlayer(container, castUrl, options);
  });
});

// Exposer une fonction pour réinitialiser les lecteurs Asciinema (utile pour les applications SPA)
window.refreshAsciinemaPlayers = function() {
  const containers = document.querySelectorAll('[data-cast]');
  containers.forEach(container => {
    const castUrl = container.getAttribute('data-cast');
    if (!castUrl) return;
    
    const options = {};
    if (container.hasAttribute('data-autoplay')) options.autoPlay = container.getAttribute('data-autoplay') !== 'false';
    if (container.hasAttribute('data-theme')) options.theme = container.getAttribute('data-theme');
    if (container.hasAttribute('data-idle-time-limit')) options.idleTimeLimit = parseFloat(container.getAttribute('data-idle-time-limit'));
    if (container.hasAttribute('data-speed')) options.speed = parseFloat(container.getAttribute('data-speed'));
    if (container.hasAttribute('data-fit')) options.fit = container.getAttribute('data-fit');
    if (container.hasAttribute('data-font-size')) options.fontSize = container.getAttribute('data-font-size');
    
    window.initializeAsciinemaPlayer(container, castUrl, options);
  });
};

// Étendre l'objet window pour les types TypeScript
if (typeof window !== 'undefined') {
  window.AsciinemaPlayer = window.AsciinemaPlayer || {};
  window.initializeAsciinemaPlayer = window.initializeAsciinemaPlayer || function() {};
  window.refreshAsciinemaPlayers = window.refreshAsciinemaPlayers || function() {};
}
