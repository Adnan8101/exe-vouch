'use client';

import { useEffect, useRef } from 'react';

interface AnimatedUsernameProps {
  username: string;
  role: 'founder' | 'owner' | 'girlOwner' | 'manager' | 'earlySupport' | 'default';
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  twinkle: number;
  twinkleSpeed: number;
  glowPhase: number;
  rotation: number;
  rotationSpeed: number;
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

    // Set canvas size with higher resolution
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

    // SPECTACULAR particle configuration with EXTREME VISIBILITY
    const particleConfigs = {
      founder: {
        count: 150,
        colors: ['#FFD700', '#FFA500', '#c9a76f', '#FFEC8B', '#FFD700', '#FF8C00'],
        size: [4, 8],
        speed: 1.5,
        twinkleSpeed: 0.12,
        glowIntensity: 4.0,
      },
      owner: {
        count: 120,
        colors: ['#FFD700', '#FFED4E', '#FFA500', '#c9a76f', '#FFEC8B'],
        size: [3.5, 7.5],
        speed: 1.3,
        twinkleSpeed: 0.11,
        glowIntensity: 3.5,
      },
      girlOwner: {
        count: 120,
        colors: ['#ff69b4', '#ff1493', '#ff85c1', '#ffc0cb', '#ff00ff', '#ff69b4'],
        size: [3.5, 7.5],
        speed: 1.3,
        twinkleSpeed: 0.11,
        glowIntensity: 3.8,
      },
      manager: {
        count: 100,
        colors: ['#ffffff', '#f0f0f0', '#e0e0e0', '#f5f5f5', '#ffffff'],
        size: [3, 7],
        speed: 1.2,
        twinkleSpeed: 0.1,
        glowIntensity: 3.0,
      },
      earlySupport: {
        count: 80,
        colors: ['#c9a76f', '#d4b786', '#ffffff', '#c9a76f'],
        size: [2.5, 6],
        speed: 1.0,
        twinkleSpeed: 0.09,
        glowIntensity: 2.5,
      },
      default: {
        count: 90,
        colors: ['#ffffff', '#c9a76f', '#e0e0e0'],
        size: [3, 7],
        speed: 1.1,
        twinkleSpeed: 0.1,
        glowIntensity: 2.8,
      },
    };

    const config = particleConfigs[role] || particleConfigs.default;

    // Create SPECTACULAR particles with electric properties
    const particles: Particle[] = Array.from({ length: config.count }, () => ({
      x: Math.random() * container.offsetWidth,
      y: Math.random() * container.offsetHeight,
      vx: (Math.random() - 0.5) * config.speed,
      vy: (Math.random() - 0.5) * config.speed,
      size: Math.random() * (config.size[1] - config.size[0]) + config.size[0],
      opacity: Math.random() * 0.6 + 0.4,
      color: config.colors[Math.floor(Math.random() * config.colors.length)],
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: config.twinkleSpeed + Math.random() * 0.03,
      glowPhase: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.05,
    }));

    let animationId: number;
    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, container.offsetWidth, container.offsetHeight);
      frame++;

      // Draw HIGHLY VISIBLE electric connections between nearby particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120 && distance > 0) {
            const opacity = (1 - distance / 120) * 0.6;
            ctx.strokeStyle = `${p1.color}${Math.floor(opacity * 180).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 2.5;
            ctx.shadowBlur = 15;
            ctx.shadowColor = p1.color;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        });
      });

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < -10) particle.x = container.offsetWidth + 10;
        if (particle.x > container.offsetWidth + 10) particle.x = -10;
        if (particle.y < -10) particle.y = container.offsetHeight + 10;
        if (particle.y > container.offsetHeight + 10) particle.y = -10;

        // Update effects
        particle.twinkle += particle.twinkleSpeed;
        particle.glowPhase += 0.04;
        particle.rotation += particle.rotationSpeed;
        
        const twinkleValue = (Math.sin(particle.twinkle) + 1) / 2;
        const glowValue = (Math.sin(particle.glowPhase) + 1) / 2;
        const currentOpacity = particle.opacity * (0.5 + twinkleValue * 0.5) * (0.7 + glowValue * 0.3);

        // Draw MASSIVE glow layers for MAXIMUM VISIBILITY
        for (let i = 1; i <= 5; i++) {
          const glowRadius = particle.size * (15 - i * 2) * config.glowIntensity;
          const glowGradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            glowRadius
          );

          const baseOpacity = currentOpacity * (0.9 / i);
          glowGradient.addColorStop(0, `${particle.color}${Math.floor(baseOpacity * 255).toString(16).padStart(2, '0')}`);
          glowGradient.addColorStop(0.3, `${particle.color}${Math.floor(baseOpacity * 200).toString(16).padStart(2, '0')}`);
          glowGradient.addColorStop(0.6, `${particle.color}${Math.floor(baseOpacity * 120).toString(16).padStart(2, '0')}`);
          glowGradient.addColorStop(0.8, `${particle.color}${Math.floor(baseOpacity * 50).toString(16).padStart(2, '0')}`);
          glowGradient.addColorStop(1, `${particle.color}00`);

          ctx.fillStyle = glowGradient;
          ctx.shadowBlur = 20;
          ctx.shadowColor = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Draw main particle with STAR shape for sparkle effect
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);

        // Star core - MUCH LARGER
        const spikes = 8;
        const outerRadius = particle.size * 5;
        const innerRadius = particle.size * 2.5;

        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (Math.PI * i) / spikes;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();

        const starGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, outerRadius);
        starGradient.addColorStop(0, `#ffffff`);
        starGradient.addColorStop(0.3, `${particle.color}ff`);
        starGradient.addColorStop(0.6, `${particle.color}${Math.floor(currentOpacity * 230).toString(16).padStart(2, '0')}`);
        starGradient.addColorStop(1, `${particle.color}${Math.floor(currentOpacity * 80).toString(16).padStart(2, '0')}`);

        ctx.fillStyle = starGradient;
        ctx.shadowBlur = 25;
        ctx.shadowColor = particle.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.restore();

        // Draw EXTREMELY BRIGHT core sparkle when twinkling
        if (twinkleValue > 0.5) {
          const coreSize = particle.size * (2 + (twinkleValue - 0.5) * 3);
          ctx.fillStyle = `${particle.color}ff`;
          ctx.shadowBlur = 30;
          ctx.shadowColor = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, coreSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Extra bright white center with bloom
          if (twinkleValue > 0.7) {
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 40;
            ctx.shadowColor = '#ffffff';
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, coreSize * 0.6, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [role]);

  // SPECTACULAR font styles with HEAVY effects
  const fontStyles = {
    founder: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 900,
      fontSize: '1.2rem',
      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 20%, #c9a76f 40%, #FFD700 60%, #FFA500 80%, #c9a76f 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      backgroundSize: '300% auto',
      textShadow: '0 0 30px rgba(255, 215, 0, 0.9), 0 0 50px rgba(255, 165, 0, 0.7), 0 0 70px rgba(201, 167, 111, 0.5), 0 0 90px rgba(255, 215, 0, 0.3)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
      filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 20px rgba(255, 165, 0, 0.6))',
    },
    owner: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 900,
      fontSize: '1.1rem',
      background: 'linear-gradient(135deg, #FFD700 0%, #FFED4E 20%, #FFA500 40%, #c9a76f 60%, #FFD700 80%, #FFED4E 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      backgroundSize: '300% auto',
      textShadow: '0 0 25px rgba(255, 215, 0, 0.85), 0 0 45px rgba(255, 237, 78, 0.65), 0 0 65px rgba(255, 165, 0, 0.45)',
      letterSpacing: '0.07em',
      textTransform: 'uppercase' as const,
      filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.7)) drop-shadow(0 0 18px rgba(255, 165, 0, 0.5))',
    },
    girlOwner: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 900,
      fontSize: '1.1rem',
      background: 'linear-gradient(135deg, #ff69b4 0%, #ff1493 20%, #ff85c1 40%, #ffc0cb 60%, #ff69b4 80%, #ff1493 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      backgroundSize: '300% auto',
      textShadow: '0 0 28px rgba(255, 105, 180, 0.9), 0 0 48px rgba(255, 20, 147, 0.7), 0 0 68px rgba(255, 192, 203, 0.5), 0 0 88px rgba(255, 105, 180, 0.3)',
      letterSpacing: '0.07em',
      textTransform: 'uppercase' as const,
      filter: 'drop-shadow(0 0 9px rgba(255, 105, 180, 0.8)) drop-shadow(0 0 19px rgba(255, 20, 147, 0.6))',
    },
    manager: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 800,
      fontSize: '1rem',
      background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 20%, #e0e0e0 40%, #f0f0f0 60%, #ffffff 80%, #f5f5f5 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      backgroundSize: '300% auto',
      textShadow: '0 0 22px rgba(255, 255, 255, 0.8), 0 0 42px rgba(245, 245, 245, 0.6), 0 0 62px rgba(224, 224, 224, 0.4)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase' as const,
      filter: 'drop-shadow(0 0 7px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 16px rgba(240, 240, 240, 0.5))',
    },
    earlySupport: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 700,
      fontSize: '0.9rem',
      background: 'linear-gradient(135deg, #c9a76f 0%, #d4b786 25%, #ffffff 50%, #d4b786 75%, #c9a76f 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      backgroundSize: '300% auto',
      textShadow: '0 0 18px rgba(201, 167, 111, 0.7), 0 0 35px rgba(212, 183, 134, 0.5)',
      letterSpacing: '0.05em',
      textTransform: 'uppercase' as const,
      filter: 'drop-shadow(0 0 6px rgba(201, 167, 111, 0.6))',
    },
    default: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 800,
      fontSize: '1rem',
      background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 25%, #c9a76f 50%, #e0e0e0 75%, #ffffff 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      backgroundSize: '300% auto',
      textShadow: '0 0 20px rgba(255, 255, 255, 0.7), 0 0 40px rgba(201, 167, 111, 0.5)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase' as const,
      filter: 'drop-shadow(0 0 7px rgba(255, 255, 255, 0.6))',
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
        className="relative z-10 inline-block px-3 py-1.5"
        style={style}
      >
        {username}
      </span>
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        span {
          animation: shimmer 2.5s linear infinite;
        }
      `}</style>
    </div>
  );
}
