'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  hue: number;
}

export default function OptimizedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
      willReadFrequently: false,
    });
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particleCount = 150; // Reduced for performance
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      opacity: Math.random(),
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      twinkleOffset: Math.random() * Math.PI * 2,
      hue: Math.random() * 30 + 30, // Gold hues (30-60)
    }));

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.016; // ~60fps

      // Clear canvas
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges (seamless loop)
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        if (particle.y > window.innerHeight) particle.y = 0;

        // Twinkle effect
        particle.opacity = Math.abs(Math.sin(time * particle.twinkleSpeed + particle.twinkleOffset));

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        );

        const color = `hsl(${particle.hue}, 70%, 65%)`;
        gradient.addColorStop(0, color.replace(')', `, ${particle.opacity})`));
        gradient.addColorStop(0.5, color.replace(')', `, ${particle.opacity * 0.5})`));
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
        style={{
          transform: 'translateZ(0)',
          willChange: 'auto',
        }}
      />
      
      {/* Gradient Overlays */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/80 pointer-events-none" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
    </>
  );
}
