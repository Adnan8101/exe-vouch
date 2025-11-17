'use client';

import { useEffect, useRef } from 'react';

interface AnimatedUsernameProps {
  username: string;
  role: 'founder' | 'owner' | 'girlOwner' | 'manager' | 'earlySupport' | 'default';
  className?: string;
}

export default function AnimatedUsername({ username, role, className = '' }: AnimatedUsernameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    updateSize();

    // Particle configuration based on role - Minimal and basic
    const particleConfigs = {
      founder: {
        count: 12,
        colors: ['#FFD700', '#c9a76f', '#d4b786'],
        size: [1, 2],
        speed: 0.3,
      },
      owner: {
        count: 10,
        colors: ['#FFD700', '#c9a76f', '#d4b786'],
        size: [1, 2],
        speed: 0.25,
      },
      girlOwner: {
        count: 10,
        colors: ['#ff69b4', '#ff85c1', '#ffc0cb'],
        size: [1, 2],
        speed: 0.25,
      },
      manager: {
        count: 8,
        colors: ['#ffffff', '#e0e0e0', '#c0c0c0'],
        size: [0.8, 1.5],
        speed: 0.2,
      },
      earlySupport: {
        count: 6,
        colors: ['#c9a76f', '#ffffff', '#d4b786'],
        size: [0.6, 1.2],
        speed: 0.15,
      },
      default: {
        count: 8,
        colors: ['#ffffff', '#c9a76f', '#e0e0e0'],
        size: [0.8, 1.5],
        speed: 0.2,
      },
    };

    const config = particleConfigs[role] || particleConfigs.default;

    // Create particles
    const particles = Array.from({ length: config.count }, () => ({
      x: Math.random() * container.offsetWidth,
      y: Math.random() * container.offsetHeight,
      vx: (Math.random() - 0.5) * config.speed,
      vy: (Math.random() - 0.5) * config.speed,
      size: Math.random() * (config.size[1] - config.size[0]) + config.size[0],
      opacity: Math.random() * 0.5 + 0.3,
      color: config.colors[Math.floor(Math.random() * config.colors.length)],
    }));

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, container.offsetWidth, container.offsetHeight);

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = container.offsetWidth;
        if (particle.x > container.offsetWidth) particle.x = 0;
        if (particle.y < 0) particle.y = container.offsetHeight;
        if (particle.y > container.offsetHeight) particle.y = 0;

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2
        );

        gradient.addColorStop(0, `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.5, `${particle.color}40`);
        gradient.addColorStop(1, `${particle.color}00`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [role]);

  // Role-specific font styles - Simple and clean
  const fontStyles = {
    founder: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 700,
      fontSize: '1.1rem',
      background: 'linear-gradient(135deg, #FFD700 0%, #c9a76f 50%, #FFD700 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      backgroundSize: '200% auto',
      textShadow: '0 0 15px rgba(255, 215, 0, 0.4)',
      letterSpacing: '0.03em',
      textTransform: 'uppercase',
      animation: 'shimmer 4s linear infinite',
    },
    owner: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 700,
      fontSize: '1rem',
      background: 'linear-gradient(135deg, #FFD700 0%, #c9a76f 50%, #FFD700 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      backgroundSize: '200% auto',
      textShadow: '0 0 12px rgba(201, 167, 111, 0.4)',
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
      animation: 'shimmer 4s linear infinite',
    },
    girlOwner: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 700,
      fontSize: '1rem',
      background: 'linear-gradient(135deg, #ff69b4 0%, #ff1493 50%, #ff69b4 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      backgroundSize: '200% auto',
      textShadow: '0 0 12px rgba(255, 105, 180, 0.4)',
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
      animation: 'shimmer 4s linear infinite',
    },
    manager: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 600,
      fontSize: '0.95rem',
      background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 50%, #ffffff 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      backgroundSize: '200% auto',
      textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
      animation: 'shimmer 4s linear infinite',
    },
    earlySupport: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      fontSize: '0.8rem',
      background: 'linear-gradient(135deg, #c9a76f 0%, #ffffff 50%, #c9a76f 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      backgroundSize: '200% auto',
      textShadow: '0 0 8px rgba(201, 167, 111, 0.2)',
      letterSpacing: '0.01em',
      animation: 'shimmer 5s linear infinite',
    },
    default: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 600,
      fontSize: '1rem',
      background: 'linear-gradient(135deg, #ffffff 0%, #c9a76f 50%, #ffffff 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      backgroundSize: '200% auto',
      textShadow: '0 0 10px rgba(201, 167, 111, 0.3)',
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
      animation: 'shimmer 4s linear infinite',
    },
  };

  const style = fontStyles[role] || fontStyles.default;

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <span
        className="relative z-10 inline-block px-1 py-0.5"
        style={{
          ...style,
          filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5))',
        }}
      >
        {username}
      </span>
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
}
