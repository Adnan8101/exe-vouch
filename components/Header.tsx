'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#2a2a2a]">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              <span className="text-[#c9a76f]">EXE</span>
              <span className="text-white ml-1">Vouches</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
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

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center items-center"
              aria-label="Toggle menu"
            >
              <span
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={closeMenu}
        />
        
        {/* Sidebar */}
        <div
          className={`absolute top-0 right-0 h-full w-64 bg-[#0a0a0a] border-l border-[#2a2a2a] shadow-2xl transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col p-6 pt-20">
            <Link
              href="/"
              onClick={closeMenu}
              className={`text-lg font-medium py-4 px-4 rounded-lg transition-colors ${
                pathname === '/'
                  ? 'text-[#c9a76f] bg-[#c9a76f]/10'
                  : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
              }`}
            >
              Home
            </Link>
            <Link
              href="/vouches"
              onClick={closeMenu}
              className={`text-lg font-medium py-4 px-4 rounded-lg transition-colors ${
                pathname === '/vouches'
                  ? 'text-[#c9a76f] bg-[#c9a76f]/10'
                  : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
              }`}
            >
              Vouches
            </Link>
            <Link
              href="/proof"
              onClick={closeMenu}
              className={`text-lg font-medium py-4 px-4 rounded-lg transition-colors ${
                pathname === '/proof'
                  ? 'text-[#c9a76f] bg-[#c9a76f]/10'
                  : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
              }`}
            >
              Proof
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
