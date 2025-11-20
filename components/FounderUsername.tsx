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
            background-position: -250% center;
          }
          100% {
            background-position: 250% center;
          }
        }
        
        .shimmer-text {
          animation: shimmer 3s linear infinite;
          background-size: 250% 100%;
        }
      `}</style>
      
      <p 
        className="relative text-2xl sm:text-3xl font-bold tracking-wide shimmer-text"
        style={{
          fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
          fontWeight: 800,
          letterSpacing: '0.05em',
          background: 'linear-gradient(90deg, #a67439 0%, #c78d4e 15%, #d4a46a 30%, #e6bb7f 40%, #ffffff 50%, #e6bb7f 60%, #d4a46a 70%, #c78d4e 85%, #a67439 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          display: 'inline-block',
        }}
      >
        {username}
      </p>
    </div>
  );
}
