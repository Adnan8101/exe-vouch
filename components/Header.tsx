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
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0a0a0a]/95 via-[#1a1a1a]/95 to-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#c9a76f]/20 shadow-lg shadow-[#c9a76f]/5">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img 
                  src="https://cdn.discordapp.com/attachments/1411591288666456084/1439201034848436326/Extreme_Official.gif?ex=6919a7e9&is=69185669&hm=5740bc6c6182bee0f1d0401e22660dd334cf1cdba20b77dd65a3ccf7557a420f&" 
                  alt="EXE" 
                  className="h-10 w-10 rounded-full ring-2 ring-[#c9a76f]/30 group-hover:ring-[#c9a76f]/60 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-[#c9a76f]/20 blur-md group-hover:bg-[#c9a76f]/40 transition-all duration-300" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#c9a76f] via-[#d4b786] to-[#c9a76f] bg-clip-text text-transparent tracking-tight group-hover:from-[#d4b786] group-hover:to-[#c9a76f] transition-all duration-300">
                Vouches
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/"
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  pathname === '/'
                    ? 'bg-gradient-to-r from-[#c9a76f] to-[#d4b786] text-black shadow-lg shadow-[#c9a76f]/30'
                    : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]/50'
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  pathname === '/about'
                    ? 'bg-gradient-to-r from-[#c9a76f] to-[#d4b786] text-black shadow-lg shadow-[#c9a76f]/30'
                    : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]/50'
                }`}
              >
                About
              </Link>
            </div>

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-[#1a1a1a]/50 border border-[#c9a76f]/20 hover:border-[#c9a76f]/40 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-[#c9a76f] transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-[#c9a76f] transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-[#c9a76f] transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                />
              </div>
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
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={closeMenu}
        />
        
        {/* Sidebar */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] border-l border-[#c9a76f]/20 shadow-2xl shadow-[#c9a76f]/10 transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col p-6 pt-24 gap-3">
            <Link
              href="/"
              onClick={closeMenu}
              className={`text-lg font-semibold py-4 px-6 rounded-xl transition-all duration-300 ${
                pathname === '/'
                  ? 'bg-gradient-to-r from-[#c9a76f] to-[#d4b786] text-black shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a] border border-transparent hover:border-[#c9a76f]/20'
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className={`text-lg font-semibold py-4 px-6 rounded-xl transition-all duration-300 ${
                pathname === '/about'
                  ? 'bg-gradient-to-r from-[#c9a76f] to-[#d4b786] text-black shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a] border border-transparent hover:border-[#c9a76f]/20'
              }`}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
