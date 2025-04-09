// Configuration globale pour Asciinema Player

// Définir les options par défaut pour tous les lecteurs
window.ASCIINEMA_PLAYER_DEFAULT_OPTIONS = {
  theme: 'monokai',        // Thème de couleurs (monokai, solarized-dark, solarized-light, etc.)
  cols: 80,                // Largeur du terminal en caractères 
  rows: 24,                // Hauteur du terminal en lignes
  autoPlay: false,         // Ne pas démarrer automatiquement 
  loop: false,             // Ne pas boucler 
  fit: "width",            // Ajuster à la largeur
  fontSize: 'small',       // Petite taille de police pour plus de contenu visible
  terminalLineHeight: 1.2, // Hauteur de ligne compacte
  startAt: 0,              // Démarrer au début
  idleTimeLimit: 2         // Ignorer les pauses de plus de 2 secondes
};

// Fonction pour initialiser facilement un lecteur Asciinema
window.initAsciinemaPlayer = function(selector, castFile, options = {}) {
  if (!window.AsciinemaPlayer) {
    console.error('AsciinemaPlayer non disponible. Vérifiez le chargement du script.');
    return null;
  }
  
  const container = document.querySelector(selector);
  if (!container) {
    console.error(`Élément non trouvé: ${selector}`);
    return null;
  }
  
  // Fusionner les options par défaut avec les options spécifiques
  const mergedOptions = { 
    ...window.ASCIINEMA_PLAYER_DEFAULT_OPTIONS, 
    ...options 
  };
  
  try {
    return window.AsciinemaPlayer.create(castFile, container, mergedOptions);
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du lecteur Asciinema:', error);
    return null;
  }
};

// Événement de document prêt
document.addEventListener('DOMContentLoaded', function() {
  // Initialiser automatiquement tous les players avec l'attribut data-cast
  const players = document.querySelectorAll('[data-cast]');
  
  players.forEach(function(player) {
    const castFile = player.getAttribute('data-cast');
    const options = {};
    
    // Analyser les options depuis les attributs data-*
    if (player.hasAttribute('data-autoplay')) options.autoPlay = player.getAttribute('data-autoplay') !== 'false';
    if (player.hasAttribute('data-loop')) options.loop = player.getAttribute('data-loop') !== 'false';
    if (player.hasAttribute('data-idle-time-limit')) options.idleTimeLimit = parseFloat(player.getAttribute('data-idle-time-limit'));
    if (player.hasAttribute('data-speed')) options.speed = parseFloat(player.getAttribute('data-speed'));
    if (player.hasAttribute('data-fit')) {
      const fitValue = player.getAttribute('data-fit');
      if (['width', 'height', 'both'].includes(fitValue)) {
        options.fit = fitValue;
      } else if (fitValue === 'false') {
        options.fit = false;
      }
    }
    if (player.hasAttribute('data-theme')) options.theme = player.getAttribute('data-theme');
    if (player.hasAttribute('data-cols')) options.cols = parseInt(player.getAttribute('data-cols'));
    if (player.hasAttribute('data-rows')) options.rows = parseInt(player.getAttribute('data-rows'));
    if (player.hasAttribute('data-font-size')) options.fontSize = player.getAttribute('data-font-size');
    if (player.hasAttribute('data-start-at')) options.startAt = player.getAttribute('data-start-at');
    if (player.hasAttribute('data-poster')) options.poster = player.getAttribute('data-poster');
    
    window.initAsciinemaPlayer(player, castFile, options);
  });

  // Corriger les éléments asciinema déjà présents (correctifs de compatibilité)
  document.querySelectorAll('.asciinema-player').forEach(function(player) {
    // S'assurer que les dimensions sont correctes pour les petits écrans
    player.style.maxWidth = '100%';
    
    // Corriger les problèmes de débordement sur mobile
    const terminalElement = player.querySelector('.asciinema-terminal');
    if (terminalElement) {
      terminalElement.style.padding = '0.5em';
    }
  });
});

// Gérer globalement les raccourcis clavier
document.addEventListener('keydown', function(e) {
  // Si la touche est Espace et qu'on n'est pas sur un champ de saisie
  if (e.code === 'Space' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
    const activePlayers = document.querySelectorAll('.asciinema-player');
    let handled = false;
    
    // Parcourir tous les players visibles pour trouver celui qui est visible dans le viewport
    activePlayers.forEach(function(playerElement) {
      // Vérifier si le player est visible dans le viewport
      const rect = playerElement.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      
      if (isVisible) {
        // Trouver le contrôleur à l'intérieur du DOM
        const playButton = playerElement.querySelector('.control-bar .play-button');
        if (playButton && playButton instanceof HTMLElement) {
          playButton.click();
          handled = true;
        }
      }
    });
    
    // Éviter le défilement de la page si on a géré un player
    if (handled) {
      e.preventDefault();
    }
  }
});

// Intercepter les casts URL pour les traiter correctement si besoin
window.asciinemaProcessCastURL = function(url) {
  // Si l'URL est un ID asciinema.org, la convertir en URL complète
  if (/^\d+$/.test(url)) {
    return `https://asciinema.org/a/${url}.cast`;
  }
  
  // Si c'est une URL relative, ajouter le préfixe du chemin
  if (url.startsWith('/') && !url.startsWith('//')) {
    return `${window.location.origin}${url}`;
  }
  
  // Sinon retourner l'URL telle quelle
  return url;
};

// Corriger les bugs connus sur certains navigateurs
window.addEventListener('load', function() {
  // Corriger le redimensionnement sur Safari
  if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    document.querySelectorAll('.asciinema-player').forEach(function(player) {
      player.style.width = '100%';
    });
  }
});