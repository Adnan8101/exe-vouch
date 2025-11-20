'use client';

import { useEffect, useState } from 'react';

interface FounderUsernameProps {
  username: string;
  className?: string;
}

export default function FounderUsername({ username, className = '' }: FounderUsernameProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`relative inline-block ${className}`}>
        <p 
          className="text-2xl sm:text-3xl font-bold tracking-wide"
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
            fontWeight: 800,
            background: 'linear-gradient(135deg, #c78d4e 0%, #e6bb7f 50%, #c78d4e 100%)',
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
    <div className={`relative inline-block ${className}`}>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        
        .shimmer-text {
          animation: shimmer 3s ease-in-out infinite;
          background-size: 200% auto;
        }
      `}</style>
      
      <p 
        className="relative text-2xl sm:text-3xl font-bold tracking-wide shimmer-text"
        style={{
          fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
          fontWeight: 800,
          letterSpacing: '0.05em',
          background: 'linear-gradient(90deg, #c78d4e 0%, #e6bb7f 45%, #fff9e6 50%, #e6bb7f 55%, #c78d4e 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        {username}
      </p>
    </div>
  );
}
