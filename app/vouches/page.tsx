'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import useSWR from 'swr';
import { StatCardSkeleton } from '@/components/Skeletons';
import { FaCheckCircle } from 'react-icons/fa';
import { FaGift } from 'react-icons/fa6';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function VouchesPage() {
  const { data: summary, isLoading } = useSWR('/api/summary', fetcher, {
    refreshInterval: 5000,
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-8 px-6 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://media.discordapp.net/attachments/1330153501258678395/1439227722646814750/image.png?ex=6919c0c4&is=69186f44&hm=2c3b9200c740c37c11ba6b40cf6b752b783e33d2910abbd03d269be53afc5968&=&format=webp&quality=lossless&width=1470&height=790)',
            }}
          />
          {/* Sophisticated Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#c9a76f]/5 via-transparent to-transparent" />
          {/* Subtle Vignette Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 flex justify-center"
            >
              <img 
                src="https://cdn.discordapp.com/attachments/1411591288666456084/1439201034848436326/Extreme_Official.gif?ex=6919a7e9&is=69185669&hm=5740bc6c6182bee0f1d0401e22660dd334cf1cdba20b77dd65a3ccf7557a420f&" 
                alt="EXE Logo" 
                className="h-20 w-20 rounded-full border-4 border-white/20 shadow-2xl shadow-[#c9a76f]/50 backdrop-blur-sm"
              />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent tracking-tight"
              style={{ fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              Stats
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed mb-6 font-light"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
            >
              Track all giveaways, nitro gifts, and community contributions in real-time.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center justify-center gap-4 mt-6"
            >
              <Link
                href="/"
                className="group px-8 py-3 bg-[#c9a76f] text-black font-semibold rounded-full hover:bg-[#d4b786] transition-all duration-500 hover:shadow-2xl hover:shadow-[#c9a76f]/40 hover:scale-105 backdrop-blur-sm text-sm"
              >
                <span className="relative z-10">View Vouches</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-center mb-6">
              <span className="text-[#c9a76f]">Live</span> Status
            </h2>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-7xl mx-auto">
                {[...Array(6)].map((_, i) => (
                  <StatCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-7xl mx-auto">
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(201, 167, 111, 0.05)',
                  }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4 hover:border-[#c9a76f] transition-all duration-300 hover:shadow-lg hover:shadow-[#c9a76f]/20 flex flex-col items-center justify-center min-h-[120px]"
                >
                  <FaCheckCircle className="text-[#c9a76f] text-3xl mb-2" />
                  <p className="text-xs text-gray-500 mb-2 font-medium whitespace-nowrap">Total Vouches</p>
                  <p className="text-2xl font-bold text-white">
                    {summary?.totalVouches || 0}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(34, 197, 94, 0.05)',
                  }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4 hover:border-[#22c55e] transition-all duration-300 hover:shadow-lg hover:shadow-[#22c55e]/20 flex flex-col items-center justify-center min-h-[120px]"
                >
                  <div className="text-3xl mb-2">₹</div>
                  <p className="text-xs text-gray-500 mb-2 font-medium whitespace-nowrap">Total INR</p>
                  <p className="text-lg font-bold text-[#22c55e]">
                    ₹{summary?.totalINR?.toLocaleString('en-IN') || 0}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(255, 107, 222, 0.08)',
                  }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4 hover:border-[#ff6bde] transition-all duration-300 hover:shadow-lg hover:shadow-[#ff6bde]/30 flex flex-col items-center justify-center min-h-[120px]"
                >
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/5968/5968898.png" 
                    alt="Nitro" 
                    className="w-10 h-10 mb-2 object-contain drop-shadow-[0_0_8px_rgba(255,107,222,0.6)]"
                  />
                  <p className="text-xs text-gray-500 mb-2 font-medium whitespace-nowrap">Nitro</p>
                  <p className="text-2xl font-bold text-[#ff6bde]">
                    {summary?.nitro || 0}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(138, 103, 255, 0.08)',
                  }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4 hover:border-[#8a67ff] transition-all duration-300 hover:shadow-lg hover:shadow-[#8a67ff]/30 flex flex-col items-center justify-center min-h-[120px]"
                >
                  <FaGift className="text-[#8a67ff] text-3xl mb-2 drop-shadow-[0_0_8px_rgba(138,103,255,0.6)]" />
                  <p className="text-xs text-gray-500 mb-2 font-medium whitespace-nowrap">Decor</p>
                  <p className="text-2xl font-bold text-[#8a67ff]">
                    {summary?.decors || 0}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(255, 182, 193, 0.08)',
                  }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4 hover:border-[#ffb6c1] transition-all duration-300 hover:shadow-lg hover:shadow-[#ffb6c1]/30 flex flex-col items-center justify-center min-h-[120px]"
                >
                  <img 
                    src="https://i.imgur.com/zNBBkdl.png" 
                    alt="OWO" 
                    className="w-10 h-10 mb-2 object-contain rounded-full drop-shadow-[0_0_8px_rgba(255,182,193,0.6)]"
                  />
                  <p className="text-xs text-gray-500 mb-2 font-medium whitespace-nowrap">OWO</p>
                  <p className="text-2xl font-bold text-[#ffb6c1]">
                    {summary?.owo ? (
                      summary.owo >= 1000000 ? 
                        `${(summary.owo / 1000000).toFixed(1)}M` : 
                        summary.owo >= 1000 ? 
                          `${(summary.owo / 1000).toFixed(1)}K` : 
                          summary.owo.toLocaleString()
                    ) : 0}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(247, 147, 26, 0.08)',
                  }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4 hover:border-[#f7931a] transition-all duration-300 hover:shadow-lg hover:shadow-[#f7931a]/30 flex flex-col items-center justify-center min-h-[120px]"
                >
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/7048/7048906.png" 
                    alt="Crypto" 
                    className="w-10 h-10 mb-2 object-contain drop-shadow-[0_0_8px_rgba(247,147,26,0.6)]"
                  />
                  <p className="text-xs text-gray-500 mb-2 font-medium whitespace-nowrap">Crypto Giveaways</p>
                  <p className="text-2xl font-bold text-[#f7931a]">
                    {summary?.cryptoGiveaways || 0}
                  </p>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
