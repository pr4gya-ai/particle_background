// A 2D point or direction
export interface Vector2 {
  x: number;
  y: number;
}

// One dot on the screen
export interface Particle {
  x: number;      // position
  y: number;
  vx: number;     // velocity (how far it moves per frame)
  vy: number;
  radius: number;
  life: number;   // 1 = fully visible, 0 = gone (used for click bursts)
}

// The behaviors the mouse can trigger
export type Mode = "repel" | "attract" | "orbit";

// Settings controlled by the sliders
export interface Settings {
  count: number;
  speed: number;
  mode: Mode;
}