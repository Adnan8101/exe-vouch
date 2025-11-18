'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedUsernameProps {
  username: string;
  role: 'founder' | 'owner' | 'girlOwner' | 'manager' | 'earlySupport' | 'default';
  className?: string;
}

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export default function AnimatedUsername({ username, role, className = '' }: AnimatedUsernameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Simple colors for each role
  const roleColors = {
    founder: '#FFD700',
    owner: '#FFD700', 
    girlOwner: '#ff69b4',
    manager: '#ffffff',
    earlySupport: '#c9a76f',
    default: '#c9a76f', // Changed from white to match vouch ID box color
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      // Small area around text for dots
      canvas.width = rect.width + 40;
      canvas.height = rect.height + 20;
      canvas.style.width = (rect.width + 40) + 'px';
      canvas.style.height = (rect.height + 20) + 'px';
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Create small dots moving in limited area around username
    const color = roleColors[role] || roleColors.default;
    const dots: Dot[] = Array.from({ length: 12 }, () => ({
      x: Math.random() * (canvas.width + 20) - 10,
      y: Math.random() * (canvas.height + 10) - 5,
      vx: (Math.random() - 0.5) * 0.4, // Slower movement
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.5 + 1, // 1-2.5px size (smaller)
      opacity: Math.random() * 0.3 + 0.6,
      color: color,
    }));

    let animationFrame: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot) => {
        // Move dots
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Wrap around edges in small area
        if (dot.x < -10) dot.x = canvas.width - 10;
        if (dot.x > canvas.width - 10) dot.x = -10;
        if (dot.y < -5) dot.y = canvas.height - 5;
        if (dot.y > canvas.height - 5) dot.y = -5;

        // Draw small dot with subtle glow
        ctx.shadowColor = dot.color;
        ctx.shadowBlur = 4;
        ctx.fillStyle = `${dot.color}${Math.floor(dot.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationFrame);
    };
  }, [role, mounted]);

  const color = roleColors[role] || roleColors.default;

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute pointer-events-none"
        style={{ zIndex: 0, left: '-20px', top: '-10px' }}
      />
      <span
        className="relative z-10 font-medium"
        style={{
          color: color,
          fontSize: '1rem',
        }}
      >
        {username}
      </span>
    </div>
  );
}
