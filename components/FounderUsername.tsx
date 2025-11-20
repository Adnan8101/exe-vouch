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
    <>
      <style jsx global>{`
        @keyframes founderShimmer {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}</style>
      <div className={`relative inline-block ${className}`}>
        <p 
          className="text-2xl sm:text-3xl font-bold tracking-wide"
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
            fontWeight: 800,
            letterSpacing: '0.05em',
            background: 'linear-gradient(110deg, #a67439 0%, #c78d4e 20%, #d4a46a 35%, #e6bb7f 45%, #ffffff 50%, #e6bb7f 55%, #d4a46a 65%, #c78d4e 80%, #a67439 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            backgroundSize: '200% 100%',
            animation: 'founderShimmer 5s ease-in-out infinite',
            display: 'inline-block',
          }}
        >
          {username}
        </p>
      </div>
    </>
  );
}
