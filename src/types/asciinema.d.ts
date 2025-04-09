// Type declarations for Asciinema Player

interface AsciinemaPlayerOptions {
  /** Auto-play when the player loads */
  autoPlay?: boolean;
  /** Play again when playback ends */
  loop?: boolean;
  /** Play starting at given time */
  startAt?: number | string;
  /** Playback speed (e.g. 2 for 2x) */
  speed?: number;
  /** Skip pauses longer than given number of seconds */
  idleTimeLimit?: number;
  /** Terminal color theme */
  theme?: string;
  /** Dynamically adjust player size ('width', 'height', 'both', or false) */
  fit?: boolean | string;
  /** Number of terminal rows */
  rows?: number;
  /** Number of terminal columns */
  cols?: number;
  /** Play starting at first non-idle activity */
  preload?: boolean;
  /** Show a still frame at a given time */
  poster?: string;
  /** Font size ('small', 'medium', 'big') */
  fontSize?: string;
  /** Terminal font family */
  terminalFontFamily?: string;
  /** Terminal line height */
  terminalLineHeight?: number;
  /** Add time markers */
  markers?: Array<number | [number, string]>;
  /** Pause playback when a marker is reached */
  pauseOnMarkers?: boolean;
  /** Controls visibility */
  controls?: boolean;
}

interface AsciinemaPlayerInstance {
  /** Start playback */
  play: () => void;
  /** Pause playback */
  pause: () => void;
  /** Toggle play/pause */
  toggle: () => void;
  /** Seek to a specific time */
  seek: (time: number) => void;
  /** Step back one frame (when paused) */
  stepBack: () => void;
  /** Step forward one frame (when paused) */
  stepForward: () => void;
  /** Go to previous marker */
  prevMarker: () => void;
  /** Go to next marker */
  nextMarker: () => void;
  /** Set playback speed */
  setSpeed: (speed: number) => void;
  /** Toggle fullscreen */
  toggleFullscreen: () => void;
  /** Dispose and clean up the player */
  dispose: () => void;
  /** Get current playback time in seconds */
  getCurrentTime: () => number;
  /** Get total duration in seconds */
  getDuration: () => number;
  /** Current player state */
  state: 'playing' | 'paused';
}

interface AsciinemaPlayer {
  /** Create a new player */
  create: (
    src: string, 
    containerElement: HTMLElement, 
    options?: AsciinemaPlayerOptions
  ) => AsciinemaPlayerInstance;
}

interface AsciinemaPlayerDefaultOptions {
  theme: string;
  cols: number;
  rows: number;
  autoPlay: boolean;
  loop: boolean;
  fit: boolean | string;
  fontSize: string;
  terminalLineHeight: number;
  idleTimeLimit: number;
}

declare global {
  interface Window {
    AsciinemaPlayer: AsciinemaPlayer;
    ASCIINEMA_PLAYER_DEFAULT_OPTIONS: AsciinemaPlayerDefaultOptions;
    initAsciinemaPlayer: (selector: string | HTMLElement, castFile: string, options?: AsciinemaPlayerOptions) => AsciinemaPlayerInstance | null;
    asciinemaProcessCastURL: (url: string) => string;
  }
}

export {};