import type { Particle, Mode, Vector2 } from "../types";

const random = (min: number, max: number): number =>
    Math.random() * (max - min) + min;

export function createParticle(
    width: number,
    height: number,
    speed: number
): Particle {
    return {
        x: random(0, width),
        y: random(0, height),
        vx: random(-1, 1) * speed,
        vy: random(-1, 1) * speed,
        radius: random(1, 3),
        life: 1,
    };
}

export function createParticles(
    count: number,
    width: number,
    height: number,
    speed: number
): Particle[] {
    return Array.from({ length: count }, () =>
        createParticle(width, height, speed)
    );
}

export function updateParticle(
    p: Particle,
    width: number,
    height: number
): void {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx); }
    if (p.x > width) { p.x = width; p.vx = -Math.abs(p.vx); }
    if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy); }
    if (p.y > height) { p.y = height; p.vy = -Math.abs(p.vy); }
}

const MOUSE_RADIUS = 150;

export function applyMouseForce(
    p: Particle,
    mouse: Vector2,
    mode: Mode
): void {
    const dx = p.x - mouse.x;
    const dy = p.y - mouse.y;
    const d = Math.hypot(dx, dy);

    if (d === 0 || d > MOUSE_RADIUS) return;

    const force = 1 - d / MOUSE_RADIUS;
    const nx = dx / d;
    const ny = dy / d;

    switch (mode) {
        case "repel":
            p.x += nx * force * 4;
            p.y += ny * force * 4;
            break;
        case "attract":
            p.x -= nx * force * 3;
            p.y -= ny * force * 3;
            break;
        case "orbit":
            p.x += -ny * force * 3 - nx * force * 0.5;
            p.y += nx * force * 3 - ny * force * 0.5;
            break;
    }
}

// NEW: a burst of particles flying outward from a click
export function createBurst(x: number, y: number, count: number): Particle[] {
    return Array.from({ length: count }, () => {
        const angle = random(0, Math.PI * 2); // random direction
        const speed = random(1, 5);
        return {
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: random(1, 3),
            life: 1,
        };
    });
}

// NEW: move a burst particle, slow it down, and fade it out
export function updateBurst(p: Particle): void {
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.96; // friction
    p.vy *= 0.96;
    p.life -= 0.02; // gone after about 50 frames
}