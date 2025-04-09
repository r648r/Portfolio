// @ts-ignore
import confetti from 'canvas-confetti';

// Fonction pour jouer des confettis améliorés (style feux d'artifice)
export const playConfetti = () => {
  if (typeof window !== 'undefined' && confetti) {
    // Première vague de confettis
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ffff00', '#00ff00', '#0000ff', '#ff00ff']
    });

    // Seconde vague de confettis après un délai (effet d'explosion multiple)
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.6 },
        colors: ['#ff9999', '#ffcc00', '#66ff66', '#6666ff', '#ff66ff']
      });

      confetti({
        particleCount: 100,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.6 },
        colors: ['#ff6666', '#ffdd00', '#33ff33', '#3333ff', '#ff33ff']
      });
    }, 150);

    // Troisième vague pour effet de feux d'artifice complet
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 120,
        startVelocity: 35,
        gravity: 0.9,
        decay: 0.95,
        origin: { y: 0.5 },
        scalar: 0.8
      });
    }, 300);
  }
};

// Fonction pour générer un emoji aléatoire
export const getRandomEmoji = () => {
  const emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇',
    '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑',
    '🤓', '😎', '🧐', '🤠', '🥳', '🦄', '🚀', '⭐', '✨', '💻', '🔥', '💯', '🏆',
    '🎯', '🎵', '🎮', '👾', '🎨', '🎭', '🧩', '🔐', '🔒', '🛡️', '⚔️', '🔍',
    // Ajout d'emojis liés à la cybersécurité
    '🔓', '🔑', '🔗', '📡', '📱', '💾', '💿', '🖥️', '🌐', '📊', '📈', '📉',
    '🕵️', '👨‍💻', '👩‍💻', '🦠', '🧠', '⚡', '🛠️', '🔧', '🔨', '🧰', '📦',
    '📁', '🗂️', '📋', '📝', '🧪', '⚠️', '🚨', '🚫', '⛔', '🔴', '🟢', '🔵',
    '🧲', '🌎', '🕸️', '📢', '🔐', '🔏', '🎓', '🎖️', '🏅', '🥇',
    // Ajout d'autres emojis liés à la cybersécurité
    '🧑‍💻', '👩‍🔧', '🛡️', '📲', '💻', '🖥️', '🛰', '🔌', '🔋', '🖱️', '🖨️'
  ];
  return emojis[Math.floor(Math.random() * emojis.length)];
};
