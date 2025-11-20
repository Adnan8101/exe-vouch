'use client';

import { useEffect, useRef, useState } from 'react';

interface FounderUsernameProps {
  username: string;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

export default function FounderUsername({ username, className = '' }: FounderUsernameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

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
      canvas.width = rect.width;
      canvas.height = rect.height;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Create golden sparkle particles for premium effect
    const particles: Particle[] = [];
    const particleCount = 25;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8 + 0.9, // 0.9-2.7px
        opacity: Math.random() * 0.5 + 0.35, // 0.35-0.85
        speed: Math.random() * 1.4 + 0.7, // 0.7-2.1 px/frame
      });
    }

    let animationFrame: number;
    let sweepX = -150; // Horizontal sweep position

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Animate particles (golden dust)
      particles.forEach((particle) => {
        particle.x += particle.speed;

        // Reset particle when it goes off screen
        if (particle.x > canvas.width + 10) {
          particle.x = -10;
          particle.y = Math.random() * canvas.height;
          particle.opacity = Math.random() * 0.5 + 0.35;
          particle.size = Math.random() * 1.8 + 0.9;
        }

        // Draw golden sparkle with gradient
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3.5
        );
        gradient.addColorStop(0, `rgba(244, 223, 160, ${particle.opacity})`); // #F4DFA0
        gradient.addColorStop(0.3, `rgba(234, 199, 124, ${particle.opacity * 0.7})`); // #EAC77C
        gradient.addColorStop(1, 'rgba(240, 199, 98, 0)'); // #F0C762 fade

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Bright center
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.75})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.45, 0, Math.PI * 2);
        ctx.fill();
      });

      // Animated horizontal golden light sweep
      sweepX += 2.2; // Sweep speed
      if (sweepX > canvas.width + 150) {
        sweepX = -150; // Reset sweep
      }

      // Draw the sweep with gradient
      const sweepGradient = ctx.createLinearGradient(
        sweepX - 80, 0,
        sweepX + 80, 0
      );
      sweepGradient.addColorStop(0, 'rgba(244, 223, 160, 0)');
      sweepGradient.addColorStop(0.3, 'rgba(244, 223, 160, 0.12)');
      sweepGradient.addColorStop(0.5, 'rgba(255, 245, 200, 0.2)'); // Bright center
      sweepGradient.addColorStop(0.7, 'rgba(244, 223, 160, 0.12)');
      sweepGradient.addColorStop(1, 'rgba(244, 223, 160, 0)');

      ctx.fillStyle = sweepGradient;
      ctx.fillRect(sweepX - 80, 0, 160, canvas.height);

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationFrame);
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <div className={`relative inline-block ${className}`}>
        <p 
          className="text-lg sm:text-xl font-bold tracking-wide"
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
            fontWeight: 800,
            background: 'linear-gradient(135deg, #EAC77C 0%, #F4DFA0 50%, #F0C762 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {username}
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />
      
      <p 
        className="relative text-lg sm:text-xl font-bold tracking-wide"
        style={{
          zIndex: 2,
          fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
          fontWeight: 800,
          letterSpacing: '0.05em',
          background: 'linear-gradient(to bottom, #EAC77C 0%, #F4DFA0 45%, #F0C762 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 6px rgba(240, 199, 98, 0.3)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))',
        }}
      >
        <span 
          className="relative inline-block"
          style={{
            background: 'linear-gradient(to bottom, #EAC77C 0%, #F4DFA0 45%, #F0C762 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {username}
          
          {/* Bottom edge golden shine */}
          <span 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(255, 235, 150, 0.6) 0%, rgba(255, 235, 150, 0) 30%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'blur(0.5px)',
            }}
          >
            {username}
          </span>
        </span>
      </p>
    </div>
  );
}
