'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#2a2a2a]">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            <span className="text-[#c9a76f]">EXE</span>
            <span className="text-white ml-1">Vouches</span>
          </Link>
          
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === '/'
                  ? 'text-[#c9a76f]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              href="/vouches"
              className={`text-sm font-medium transition-colors ${
                pathname === '/vouches'
                  ? 'text-[#c9a76f]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Vouches
            </Link>
            <Link
              href="/proof"
              className={`text-sm font-medium transition-colors ${
                pathname === '/proof'
                  ? 'text-[#c9a76f]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Proof
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
