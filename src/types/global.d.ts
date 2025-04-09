declare global {
  interface Window {
    AsciinemaPlayer: {
      create: (
        src: string,
        containerElement: HTMLElement,
        options?: {
          autoPlay?: boolean;
          loop?: boolean;
          fit?: string;
          theme?: string;
          controls?: boolean;
          startAt?: number;
          speed?: number;
          idleTimeLimit?: number;
          poster?: string;
          cols?: number;
          rows?: number;
          preload?: boolean;
          fontSize?: string;
          terminalFontFamily?: string;
          [key: string]: unknown;
        }
      ) => unknown;
    };

    // Make the confetti object available globally
    confetti: import('canvas-confetti').ConfettiObject;
  }
}

// Global types for the application

// Canvas Confetti types
declare module 'canvas-confetti' {
  export interface Options {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: { x: number; y: number };
    colors?: string[];
    shapes?: string[] | HTMLCanvasElement[];
    scalar?: number;
    zIndex?: number;
    flat?: boolean;
    disableForReducedMotion?: boolean;
  }

  export interface ShapeOptions {
    text: string;
    scalar: number;
  }

  export type ConfettiFunction = (options?: Options) => void;

  export interface ConfettiObject {
    (options?: Options): void;
    shapeFromText: (options: ShapeOptions) => CanvasPattern | HTMLCanvasElement;
    reset: () => void;
  }

  const confetti: ConfettiFunction;
  export default confetti;
}

export {};
