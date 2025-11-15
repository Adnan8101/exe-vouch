'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import useSWR from 'swr';
import { StatCardSkeleton } from '@/components/Skeletons';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function HomePage() {
  const { data: summary, isLoading } = useSWR('/api/summary', fetcher, {
    refreshInterval: 5000,
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#c9a76f]/10 via-transparent to-transparent" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="mb-6 flex justify-center">
              <img 
                src="https://cdn.discordapp.com/attachments/1411591288666456084/1439201034848436326/Extreme_Official.gif?ex=6919a7e9&is=69185669&hm=5740bc6c6182bee0f1d0401e22660dd334cf1cdba20b77dd65a3ccf7557a420f&" 
                alt="EXE Logo" 
                className="h-28 w-28 rounded-full border-4 border-[#c9a76f]/50 shadow-lg shadow-[#c9a76f]/30"
              />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              EXE
            </h1>
            
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              EXE is back — louder, richer, and vibing harder than ever. Once a powerhouse in the Indian gaming scene with 22k members, the server was nuked and went silent for 3 years. But now, it's reborn as a pure chill community: daily VCs, music, memes, movie nights, crazy giveaways, and nonstop good vibes. No toxicity, no pressure—just a place where people remember your name and treat you like family. EXE isn't trying to be the biggest; just the best place to vibe, chat, and enjoy real company. Welcome home.
            </p>

            <div className="flex items-center justify-center gap-4 mt-8">
              <Link
                href="/vouches"
                className="px-8 py-4 bg-[#c9a76f] text-black font-semibold rounded-lg hover:bg-[#d4b786] transition-all duration-300 hover:shadow-lg hover:shadow-[#c9a76f]/50 hover:scale-105"
              >
                View Vouches
              </Link>
              <Link
                href="/proof"
                className="px-8 py-4 bg-[#1a1a1a] text-white font-semibold rounded-lg border border-[#2a2a2a] hover:border-[#c9a76f] transition-all duration-300 hover:scale-105"
              >
                View Proof
              </Link>
            </div>
          </motion.div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-center mb-8">
              <span className="text-[#c9a76f]">Total</span> Stats
            </h2>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
                {[...Array(6)].map((_, i) => (
                  <StatCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#c9a76f] transition-all duration-300 hover:shadow-lg hover:shadow-[#c9a76f]/10 flex flex-col items-center justify-center min-h-[140px]"
                >
                  <p className="text-sm text-gray-500 mb-3 font-medium whitespace-nowrap">Total Vouches</p>
                  <p className="text-3xl font-bold text-white">
                    {summary?.totalVouches || 0}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#22c55e] transition-all duration-300 hover:shadow-lg hover:shadow-[#22c55e]/10 flex flex-col items-center justify-center min-h-[140px]"
                >
                  <p className="text-sm text-gray-500 mb-3 font-medium whitespace-nowrap">Total INR Spent</p>
                  <p className="text-3xl font-bold text-[#22c55e]">
                    ₹{summary?.totalINR?.toLocaleString() || 0}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#5865f2] transition-all duration-300 hover:shadow-lg hover:shadow-[#5865f2]/10 flex flex-col items-center justify-center min-h-[140px]"
                >
                  <p className="text-sm text-gray-500 mb-3 font-medium whitespace-nowrap">Nitro Deals</p>
                  <p className="text-3xl font-bold text-[#5865f2]">
                    {summary?.nitro || 0}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#ff6b9d] transition-all duration-300 hover:shadow-lg hover:shadow-[#ff6b9d]/10 flex flex-col items-center justify-center min-h-[140px]"
                >
                  <p className="text-sm text-gray-500 mb-3 font-medium whitespace-nowrap">Decors</p>
                  <p className="text-3xl font-bold text-[#ff6b9d]">
                    {summary?.decors || 0}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#c9a76f] transition-all duration-300 hover:shadow-lg hover:shadow-[#c9a76f]/10 flex flex-col items-center justify-center min-h-[140px]"
                >
                  <p className="text-sm text-gray-500 mb-3 font-medium whitespace-nowrap">OWO Cash</p>
                  <p className="text-3xl font-bold text-[#c9a76f]">
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
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#345d9d] transition-all duration-300 hover:shadow-lg hover:shadow-[#345d9d]/10 flex flex-col items-center justify-center min-h-[140px]"
                >
                  <p className="text-sm text-gray-500 mb-3 font-medium whitespace-nowrap">LTC Giveaways</p>
                  <p className="text-3xl font-bold text-[#345d9d]">
                    {summary?.ltcGiveaways || 0}
                  </p>
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* Team Members */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-center mb-8">
              <span className="text-[#c9a76f]">Team</span> Leaders
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a 
                href="https://discord.com/users/959653911923396629" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-8 text-center hover:border-[#c9a76f] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#c9a76f]/20"
              >
                <img 
                  src="https://cdn.discordapp.com/avatars/959653911923396629/1a829abb7020436cbca22765be4e331b.png?size=1024" 
                  alt="imunknown69" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#c9a76f]/50 shadow-lg"
                />
                <h3 className="text-xl font-bold mb-2 text-white">Founder</h3>
                <p className="text-[#c9a76f] font-semibold text-lg mb-2">imunknown69</p>
                <p className="text-gray-500 text-sm font-mono">959653911923396629</p>
              </a>
              
              <a 
                href="https://discord.com/users/643480211421265930" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-8 text-center hover:border-[#c9a76f] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#c9a76f]/20"
              >
                <img 
                  src="https://cdn.discordapp.com/avatars/643480211421265930/0ccf29cf250013d91b12dd21a149ca9c.png?size=1024" 
                  alt="rex.f" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#c9a76f]/50 shadow-lg"
                />
                <h3 className="text-xl font-bold mb-2 text-white">Owner</h3>
                <p className="text-[#c9a76f] font-semibold text-lg mb-2">rex.f</p>
                <p className="text-gray-500 text-sm font-mono">643480211421265930</p>
              </a>
              
              <a 
                href="https://discord.com/users/283127777383809024" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-8 text-center hover:border-[#c9a76f] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#c9a76f]/20"
              >
                <img 
                  src="https://images-ext-1.discordapp.net/external/qUqtBKynxouMP3cfozPnjZFJ4kbxSPAv4H4ajaGABjY/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/283127777383809024/1b7166306a4eada744b9f5bc910b2f81.png?format=webp&quality=lossless&width=512&height=512" 
                  alt="Alexx" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#c9a76f]/50 shadow-lg"
                />
                <h3 className="text-xl font-bold mb-2 text-white">Owner</h3>
                <p className="text-[#c9a76f] font-semibold text-lg mb-2">Alexx</p>
                <p className="text-gray-500 text-sm font-mono">283127777383809024</p>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
