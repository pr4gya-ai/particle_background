import { useEffect, useRef } from "react";
import { distance } from "../utils/helpers";
import {
    applyMouseForce,
    createBurst,
    createParticles,
    updateBurst,
    updateParticle,
} from "../utils/particle";
import type { Mode, Particle, Vector2 } from "../types";

interface Props {
    count: number;
    speed: number;
    mode: Mode;
}

const MAX_DIST = 120;

export default function ParticleCanvas({ count, speed, mode }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef<Vector2 | null>(null);
    const modeRef = useRef<Mode>(mode);

    modeRef.current = mode;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const particles = createParticles(count, canvas.width, canvas.height, speed);
        const bursts: Particle[] = [];

        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        const onMouseLeave = () => {
            mouseRef.current = null;
        };
        const onClick = (e: MouseEvent) => {
            bursts.push(...createBurst(e.clientX, e.clientY, 25));
        };
        window.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseleave", onMouseLeave);
        canvas.addEventListener("click", onClick);

        const drawLines = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i];
                    const b = particles[j];
                    const d = distance(a.x, a.y, b.x, b.y);

                    if (d < MAX_DIST) {
                        const opacity = 1 - d / MAX_DIST;
                        ctx.strokeStyle = `rgba(108, 99, 255, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }
        };

        let frameId = 0;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const mouse = mouseRef.current;

            for (const p of particles) {
                updateParticle(p, canvas.width, canvas.height);
                if (mouse) applyMouseForce(p, mouse, modeRef.current);

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                ctx.fill();
            }

            drawLines();

            // Burst particles: loop backwards so removing items is safe
            for (let i = bursts.length - 1; i >= 0; i--) {
                const b = bursts[i];
                updateBurst(b);

                if (b.life <= 0) {
                    bursts.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(180, 170, 255, ${b.life})`;
                ctx.fill();
            }

            frameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseleave", onMouseLeave);
            canvas.removeEventListener("click", onClick);
        };
    }, [count, speed]);

    return <canvas ref={canvasRef} />;
}