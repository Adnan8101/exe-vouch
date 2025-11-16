'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import useSWR from 'swr';
import { StatCardSkeleton } from '@/components/Skeletons';
import { FaCheckCircle, FaGift } from 'react-icons/fa';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface TeamMember {
  userId: string;
  username: string;
  avatarUrl: string | null;
  role: string;
  order: number;
}

interface TeamData {
  founder: TeamMember[];
  owners: TeamMember[];
  managers: TeamMember[];
  earlySupport: TeamMember[];
}

export default function AboutPage() {
  const { data: team } = useSWR<TeamData>('/api/team', fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
  });
  
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
              EXE
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed mb-6 font-light"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
            >
              EXE is back — louder, richer, and vibing harder than ever. Once a powerhouse in the Indian gaming scene with 22k members, the server was nuked and went silent for 3 years. But now, it's reborn as a pure chill community: daily VCs, music, memes, movie nights, crazy giveaways, and nonstop good vibes. No toxicity, no pressure—just a place where people remember your name and treat you like family. EXE isn't trying to be the biggest; just the best place to vibe, chat, and enjoy real company. Welcome home.
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
                {[...Array(6)].map((_, i) => (
                  <StatCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto items-stretch">
                {/* Total Vouches - Premium Golden Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.12,
                    y: -8,
                    transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
                  }}
                  className="relative group overflow-hidden bg-gradient-to-br from-[#c9a76f]/30 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#c9a76f]/60 rounded-2xl p-6 hover:border-[#c9a76f] transition-all duration-500 hover:shadow-[0_0_40px_rgba(201,167,111,0.6)] flex flex-col items-center justify-center h-full backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c9a76f]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    animate={{
                      background: [
                        'radial-gradient(circle at 0% 0%, rgba(201,167,111,0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 100% 100%, rgba(201,167,111,0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 0% 0%, rgba(201,167,111,0.1) 0%, transparent 50%)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <FaCheckCircle className="text-[#c9a76f] text-4xl mb-3 drop-shadow-[0_0_12px_rgba(201,167,111,0.8)]" />
                  </motion.div>
                  <p className="text-sm mb-2 font-black tracking-wider uppercase bg-gradient-to-r from-[#c9a76f] via-[#f4e5c3] to-[#c9a76f] bg-clip-text text-transparent text-center" style={{ textShadow: '0 0 20px rgba(201,167,111,0.5)', letterSpacing: '0.1em' }}>Total Vouches</p>
                  <motion.p 
                    className="text-3xl font-black text-white tracking-tight text-center"
                    animate={{ 
                      textShadow: [
                        "0 0 20px rgba(201,167,111,0.5)",
                        "0 0 30px rgba(201,167,111,0.8)",
                        "0 0 20px rgba(201,167,111,0.5)",
                      ],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {summary?.totalVouches || 0}
                  </motion.p>
                </motion.div>

                {/* Total INR - Money Green Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  whileHover={{ 
                    scale: 1.12,
                    y: -8,
                    rotate: [0, -2, 2, 0],
                    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
                  }}
                  className="relative group overflow-hidden bg-gradient-to-br from-[#22c55e]/30 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#22c55e]/60 rounded-2xl p-6 hover:border-[#22c55e] transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] flex flex-col items-center justify-center h-full backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    animate={{
                      background: [
                        'radial-gradient(circle at 0% 0%, rgba(34,197,94,0.15) 0%, transparent 50%)',
                        'radial-gradient(circle at 100% 100%, rgba(34,197,94,0.15) 0%, transparent 50%)',
                        'radial-gradient(circle at 0% 0%, rgba(34,197,94,0.15) 0%, transparent 50%)',
                      ],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    animate={{ 
                      scale: [1, 1.15, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ 
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-5xl mb-3 drop-shadow-[0_0_12px_rgba(34,197,94,0.8)]"
                  >
                    ₹
                  </motion.div>
                  <p className="text-sm mb-2 font-black tracking-wider uppercase bg-gradient-to-r from-[#22c55e] via-[#4ade80] to-[#22c55e] bg-clip-text text-transparent text-center" style={{ textShadow: '0 0 20px rgba(34,197,94,0.5)', letterSpacing: '0.1em' }}>Total INR</p>
                  <motion.p 
                    className="text-2xl font-black bg-gradient-to-r from-[#22c55e] via-[#4ade80] to-[#22c55e] bg-clip-text text-transparent text-center"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{ backgroundSize: "200% auto" }}
                  >
                    ₹{summary?.totalINR?.toLocaleString('en-IN') || 0}
                  </motion.p>
                </motion.div>

                {/* Nitro - Pink Premium Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ 
                    scale: 1.12,
                    y: -8,
                    transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }
                  }}
                  className="relative group overflow-hidden bg-gradient-to-br from-[#ff6bde]/30 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#ff6bde]/60 rounded-2xl p-6 hover:border-[#ff6bde] transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,107,222,0.7)] flex flex-col items-center justify-center h-full backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff6bde]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    animate={{
                      background: [
                        'radial-gradient(circle at 50% 50%, rgba(255,107,222,0.15) 0%, transparent 60%)',
                        'radial-gradient(circle at 50% 50%, rgba(255,107,222,0.25) 0%, transparent 60%)',
                        'radial-gradient(circle at 50% 50%, rgba(255,107,222,0.15) 0%, transparent 60%)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.img 
                    src="https://media.discordapp.net/attachments/1415272793788121248/1439346779136069883/Unknown-removebg-preview.png?ex=691a2fa5&is=6918de25&hm=9cb68d076911e5e72d0869ab7535d4b17147f30500c6c0dba3c991c23c520afd&=&format=webp&quality=lossless&width=450&height=450" 
                    alt="Nitro" 
                    className="w-12 h-12 mb-3 object-contain"
                    animate={{ 
                      y: [0, -8, 0],
                      filter: [
                        "drop-shadow(0 0 8px rgba(255,107,222,0.6))",
                        "drop-shadow(0 0 16px rgba(255,107,222,1))",
                        "drop-shadow(0 0 8px rgba(255,107,222,0.6))",
                      ],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <p className="text-sm mb-2 font-black tracking-wider uppercase bg-gradient-to-r from-[#ff6bde] via-[#ffa3e8] to-[#ff6bde] bg-clip-text text-transparent text-center" style={{ textShadow: '0 0 20px rgba(255,107,222,0.5)', letterSpacing: '0.1em' }}>Nitro Boosters</p>
                  <motion.p 
                    className="text-3xl font-black text-[#ff6bde] text-center"
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {summary?.nitro || 0}
                  </motion.p>
                </motion.div>

                {/* Decor - Purple Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ 
                    scale: 1.08,
                    y: -5,
                  }}
                  className="relative group overflow-hidden bg-gradient-to-br from-[#8a67ff]/20 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#8a67ff]/40 rounded-2xl p-6 hover:border-[#8a67ff] transition-all duration-500 hover:shadow-2xl hover:shadow-[#8a67ff]/50 flex flex-col items-center justify-center h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8a67ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div
                    animate={{ 
                      rotate: [0, -10, 10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <FaGift className="text-[#8a67ff] text-4xl mb-3 drop-shadow-[0_0_12px_rgba(138,103,255,0.8)]" />
                  </motion.div>
                  <p className="text-sm mb-2 font-black tracking-wider uppercase bg-gradient-to-r from-[#8a67ff] via-[#b494ff] to-[#8a67ff] bg-clip-text text-transparent text-center" style={{ textShadow: '0 0 20px rgba(138,103,255,0.5)', letterSpacing: '0.08em' }}>Profile Decorations</p>
                  <motion.p 
                    className="text-3xl font-black text-[#8a67ff] text-center"
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {summary?.decors || 0}
                  </motion.p>
                </motion.div>

                {/* OWO - Light Pink Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ 
                    scale: 1.12,
                    y: -8,
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
                  }}
                  className="relative group overflow-hidden bg-gradient-to-br from-[#ffb6c1]/30 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#ffb6c1]/60 rounded-2xl p-6 hover:border-[#ffb6c1] transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,182,193,0.7)] flex flex-col items-center justify-center h-full backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ffb6c1]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    animate={{
                      background: [
                        'radial-gradient(circle at 20% 20%, rgba(255,182,193,0.2) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 80%, rgba(255,182,193,0.2) 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 20%, rgba(255,182,193,0.2) 0%, transparent 50%)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.img 
                    src="https://i.imgur.com/zNBBkdl.png" 
                    alt="OWO" 
                    className="w-12 h-12 mb-3 object-contain rounded-full"
                    animate={{ 
                      rotate: [0, 360],
                      filter: [
                        "drop-shadow(0 0 8px rgba(255,182,193,0.6))",
                        "drop-shadow(0 0 16px rgba(255,182,193,1))",
                        "drop-shadow(0 0 8px rgba(255,182,193,0.6))",
                      ],
                    }}
                    transition={{ 
                      rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                      filter: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    }}
                  />
                  <p className="text-sm mb-2 font-black tracking-wider uppercase bg-gradient-to-r from-[#ffb6c1] via-[#ffd6db] to-[#ffb6c1] bg-clip-text text-transparent text-center" style={{ textShadow: '0 0 20px rgba(255,182,193,0.5)', letterSpacing: '0.1em' }}>Owo Currency</p>
                  <motion.p 
                    className="text-3xl font-black text-[#ffb6c1] text-center"
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {summary?.owo ? (
                      summary.owo >= 1000000 ? 
                        `${(summary.owo / 1000000).toFixed(1)}M` : 
                        summary.owo >= 1000 ? 
                          `${(summary.owo / 1000).toFixed(1)}K` : 
                          summary.owo.toLocaleString()
                    ) : 0}
                  </motion.p>
                </motion.div>

                {/* Crypto - Bitcoin Orange Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ 
                    scale: 1.08,
                    y: -5,
                  }}
                  className="relative group overflow-hidden bg-gradient-to-br from-[#f7931a]/20 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#f7931a]/40 rounded-2xl p-6 hover:border-[#f7931a] transition-all duration-500 hover:shadow-2xl hover:shadow-[#f7931a]/50 flex flex-col items-center justify-center h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f7931a]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.img 
                    src="https://cdn-icons-png.flaticon.com/512/7048/7048906.png" 
                    alt="Crypto" 
                    className="w-12 h-12 mb-3 object-contain"
                    animate={{ 
                      y: [0, -8, 0],
                      filter: [
                        "drop-shadow(0 0 8px rgba(247,147,26,0.6))",
                        "drop-shadow(0 0 16px rgba(247,147,26,1))",
                        "drop-shadow(0 0 8px rgba(247,147,26,0.6))",
                      ],
                    }}
                    transition={{ 
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <p className="text-sm mb-2 font-black tracking-wider uppercase bg-gradient-to-r from-[#f7931a] via-[#ffb347] to-[#f7931a] bg-clip-text text-transparent text-center" style={{ textShadow: '0 0 20px rgba(247,147,26,0.5)', letterSpacing: '0.08em' }}>Crypto Giveaways</p>
                  <motion.p 
                    className="text-3xl font-black text-[#f7931a] text-center"
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {summary?.cryptoGiveaways || 0}
                  </motion.p>
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* Team Members Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-center mb-8">
              <span className="text-[#c9a76f]">Our</span> Team
            </h2>

            {/* Founder */}
            <div className="mb-16">
              <div className="flex items-center justify-center gap-3 mb-8">
                <img 
                  src="https://cdn.discordapp.com/attachments/1358403022106918936/1439626275458252895/st_small_845x845-pad_1000x1000_f8f8f8.u2-removebg-preview.png?ex=691b33f3&is=6919e273&hm=5efee5d4cd3779650b303ef55946f8f0fea5db01ca144abea03e78842f5d323c&"
                  alt="Founder Badge"
                  className="w-12 h-12 object-contain drop-shadow-[0_0_20px_rgba(201,167,111,1)]"
                />
                <h3 className="text-3xl font-black text-center bg-gradient-to-r from-[#c9a76f] via-[#d4b786] to-[#c9a76f] bg-clip-text text-transparent tracking-tight" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>FOUNDER</h3>
              </div>
              <div className="flex justify-center">
                {team?.founder?.[0] ? (
                  <motion.a 
                    href={`https://discord.com/users/${team.founder[0].userId}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="relative group overflow-hidden bg-gradient-to-br from-[#c9a76f]/40 via-[#1a1a1a] to-[#0a0a0a] border-4 border-[#c9a76f] rounded-3xl p-10 text-center transition-all duration-500 hover:shadow-[0_0_60px_rgba(201,167,111,0.8)] max-w-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#c9a76f]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <motion.div 
                      className="absolute -top-20 -right-20 w-40 h-40 bg-[#c9a76f]/20 rounded-full blur-3xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div 
                      className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#d4b786]/20 rounded-full blur-3xl"
                      animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.6, 0.3, 0.6],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <div className="relative z-10">
                      {team.founder[0].avatarUrl ? (
                        <div className="relative inline-block">
                          <img 
                            src={team.founder[0].avatarUrl}
                            alt={team.founder[0].username}
                            className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-[#c9a76f] shadow-2xl shadow-[#c9a76f]/50 ring-4 ring-[#c9a76f]/30"
                          />
                          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#c9a76f]/40 to-transparent animate-pulse" />
                        </div>
                      ) : (
                        <div className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-[#c9a76f] shadow-2xl shadow-[#c9a76f]/50 bg-gradient-to-br from-[#c9a76f] to-[#d4b786] flex items-center justify-center ring-4 ring-[#c9a76f]/30">
                          <span className="text-5xl font-black text-black">{team.founder[0].username.charAt(0).toUpperCase()}</span>
                        </div>
                      )}
                      <motion.p 
                        className="text-2xl font-black mb-2 bg-gradient-to-r from-[#c9a76f] via-[#f4e5c3] to-[#c9a76f] bg-clip-text text-transparent"
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        style={{ backgroundSize: "200% auto" }}
                      >
                        {team.founder[0].username}
                      </motion.p>
                      <p className="text-sm text-[#c9a76f]/80 mb-3 font-bold uppercase tracking-wider">{team.founder[0].role}</p>
                      <p className="text-gray-400 text-sm font-mono bg-black/30 rounded-lg px-4 py-2 inline-block">{team.founder[0].userId}</p>
                    </div>
                  </motion.a>
                ) : (
                  <motion.a 
                    href="https://discord.com/users/959653911923396629" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="relative group overflow-hidden bg-gradient-to-br from-[#c9a76f]/40 via-[#1a1a1a] to-[#0a0a0a] border-4 border-[#c9a76f] rounded-3xl p-10 text-center transition-all duration-500 hover:shadow-[0_0_60px_rgba(201,167,111,0.8)] max-w-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#c9a76f]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <motion.div 
                      className="absolute -top-20 -right-20 w-40 h-40 bg-[#c9a76f]/20 rounded-full blur-3xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div 
                      className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#d4b786]/20 rounded-full blur-3xl"
                      animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.6, 0.3, 0.6],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <div className="relative z-10">
                      <div className="relative inline-block">
                        <img 
                          src="https://cdn.discordapp.com/avatars/959653911923396629/1a829abb7020436cbca22765be4e331b.png?size=1024" 
                          alt="imunknown69" 
                          className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-[#c9a76f] shadow-2xl shadow-[#c9a76f]/50 ring-4 ring-[#c9a76f]/30"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#c9a76f]/40 to-transparent animate-pulse" />
                      </div>
                      <motion.p 
                        className="text-2xl font-black mb-2 bg-gradient-to-r from-[#c9a76f] via-[#f4e5c3] to-[#c9a76f] bg-clip-text text-transparent"
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        style={{ backgroundSize: "200% auto" }}
                      >
                        imunknown69
                      </motion.p>
                      <p className="text-sm text-[#c9a76f]/80 mb-3 font-bold uppercase tracking-wider">Founder</p>
                      <p className="text-gray-400 text-sm font-mono bg-black/30 rounded-lg px-4 py-2 inline-block">959653911923396629</p>
                    </div>
                  </motion.a>
                )}
              </div>
            </div>

            {/* Owners */}
            <div className="mb-16">
              <div className="flex items-center justify-center gap-3 mb-8">
                <img 
                  src="https://cdn.discordapp.com/attachments/1358403022106918936/1439625956984750141/Partner-removebg-preview.png?ex=691b33a7&is=6919e227&hm=86053a51d73f71f0c6368e88159b77dddbfb8fc3157852f775a58fd64affa5c7&"
                  alt="Owner Badge"
                  className="w-10 h-10 object-contain drop-shadow-[0_0_18px_rgba(201,167,111,0.9)]"
                />
                <h3 className="text-2xl font-extrabold text-center text-[#c9a76f] tracking-tight" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>OWNERS</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {team?.owners && team.owners.length > 0 ? (
                  team.owners.map((owner) => (
                    <motion.a 
                      key={owner.userId}
                      href={`https://discord.com/users/${owner.userId}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, y: -5 }}
                      className="relative group overflow-hidden bg-gradient-to-br from-[#1f1f1f] via-[#1a1a1a] to-[#0a0a0a] border-3 border-[#c9a76f]/60 rounded-2xl p-8 text-center transition-all duration-300 hover:border-[#c9a76f] hover:shadow-[0_0_40px_rgba(201,167,111,0.4)]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#c9a76f]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <motion.div 
                        className="absolute top-0 right-0 w-32 h-32 bg-[#c9a76f]/10 rounded-full blur-2xl"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <div className="relative z-10">
                        {owner.avatarUrl ? (
                          <img 
                            src={owner.avatarUrl}
                            alt={owner.username}
                            className="w-28 h-28 rounded-full mx-auto mb-4 border-3 border-[#c9a76f]/60 shadow-xl shadow-[#c9a76f]/30 ring-2 ring-[#c9a76f]/20"
                          />
                        ) : (
                          <div className="w-28 h-28 rounded-full mx-auto mb-4 border-3 border-[#c9a76f]/60 shadow-xl shadow-[#c9a76f]/30 bg-gradient-to-br from-[#c9a76f]/80 to-[#d4b786]/80 flex items-center justify-center ring-2 ring-[#c9a76f]/20">
                            <span className="text-4xl font-bold text-black">{owner.username.charAt(0).toUpperCase()}</span>
                          </div>
                        )}
                        <p className="text-[#c9a76f] font-bold text-xl mb-2">{owner.username}</p>
                        <p className="text-sm text-[#c9a76f]/70 mb-2 font-semibold uppercase tracking-wide">{owner.role}</p>
                        <p className="text-gray-400 text-xs font-mono bg-black/20 rounded-md px-3 py-1.5 inline-block">{owner.userId}</p>
                      </div>
                    </motion.a>
                  ))
                ) : (
                  <>
                    <motion.a 
                      href="https://discord.com/users/643480211421265930" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, y: -5 }}
                      className="relative group overflow-hidden bg-gradient-to-br from-[#1f1f1f] via-[#1a1a1a] to-[#0a0a0a] border-3 border-[#c9a76f]/60 rounded-2xl p-8 text-center transition-all duration-300 hover:border-[#c9a76f] hover:shadow-[0_0_40px_rgba(201,167,111,0.4)]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#c9a76f]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <motion.div 
                        className="absolute top-0 right-0 w-32 h-32 bg-[#c9a76f]/10 rounded-full blur-2xl"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <div className="relative z-10">
                        <img 
                          src="https://cdn.discordapp.com/avatars/643480211421265930/0ccf29cf250013d91b12dd21a149ca9c.png?size=1024" 
                          alt="rex.f" 
                          className="w-28 h-28 rounded-full mx-auto mb-4 border-3 border-[#c9a76f]/60 shadow-xl shadow-[#c9a76f]/30 ring-2 ring-[#c9a76f]/20"
                        />
                        <p className="text-[#c9a76f] font-bold text-xl mb-2">rex.f</p>
                        <p className="text-sm text-[#c9a76f]/70 mb-2 font-semibold uppercase tracking-wide">Owner</p>
                        <p className="text-gray-400 text-xs font-mono bg-black/20 rounded-md px-3 py-1.5 inline-block">643480211421265930</p>
                      </div>
                    </motion.a>
                    
                    <motion.a 
                      href="https://discord.com/users/283127777383809024" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, y: -5 }}
                      className="relative group overflow-hidden bg-gradient-to-br from-[#1f1f1f] via-[#1a1a1a] to-[#0a0a0a] border-3 border-[#c9a76f]/60 rounded-2xl p-8 text-center transition-all duration-300 hover:border-[#c9a76f] hover:shadow-[0_0_40px_rgba(201,167,111,0.4)]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#c9a76f]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <motion.div 
                        className="absolute top-0 right-0 w-32 h-32 bg-[#c9a76f]/10 rounded-full blur-2xl"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <div className="relative z-10">
                        <img 
                          src="https://images-ext-1.discordapp.net/external/qUqtBKynxouMP3cfozPnjZFJ4kbxSPAv4H4ajaGABjY/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/283127777383809024/1b7166306a4eada744b9f5bc910b2f81.png?format=webp&quality=lossless&width=512&height=512" 
                          alt="Alexx" 
                          className="w-28 h-28 rounded-full mx-auto mb-4 border-3 border-[#c9a76f]/60 shadow-xl shadow-[#c9a76f]/30 ring-2 ring-[#c9a76f]/20"
                        />
                        <p className="text-[#c9a76f] font-bold text-xl mb-2">Alexx</p>
                        <p className="text-sm text-[#c9a76f]/70 mb-2 font-semibold uppercase tracking-wide">Owner</p>
                        <p className="text-gray-400 text-xs font-mono bg-black/20 rounded-md px-3 py-1.5 inline-block">283127777383809024</p>
                      </div>
                    </motion.a>
                  </>
                )}
              </div>
            </div>

            {/* Managers */}
            <div className="mb-16">
              <div className="flex items-center justify-center gap-3 mb-8">
                <img 
                  src="https://cdn.discordapp.com/attachments/1358403022106918936/1439626680649125969/52962-moderator-removebg-preview.png?ex=691b3453&is=6919e2d3&hm=bbcb431bce5f5c8a857f179b055d4415bc0bcc9885be6da12314e851377974ce&"
                  alt="Manager Badge"
                  className="w-9 h-9 object-contain drop-shadow-[0_0_15px_rgba(201,167,111,0.8)]"
                />
                <h3 className="text-xl font-bold text-center text-white/90" style={{ fontFamily: 'Inter, sans-serif' }}>MANAGERS</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {team?.managers && team.managers.length > 0 ? (
                  team.managers.map((manager) => (
                    <motion.a 
                      key={manager.userId}
                      href={`https://discord.com/users/${manager.userId}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -6 }}
                      className="relative overflow-hidden bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#0f0f0f] border-2 border-[#3a3a3a] rounded-xl p-6 text-center transition-all duration-300 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                      <div className="relative z-10">
                        {manager.avatarUrl ? (
                          <img 
                            src={manager.avatarUrl}
                            alt={manager.username}
                            className="w-24 h-24 rounded-xl mx-auto mb-3 border-2 border-white/30 shadow-lg"
                          />
                        ) : (
                          <div className="w-24 h-24 rounded-xl mx-auto mb-3 border-2 border-white/30 shadow-lg bg-gradient-to-br from-[#3a3a3a] to-[#1a1a1a] flex items-center justify-center">
                            <span className="text-3xl font-bold text-white">{manager.username.charAt(0).toUpperCase()}</span>
                          </div>
                        )}
                        <p className="text-white font-bold text-lg mb-1">{manager.username}</p>
                        <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">{manager.role}</p>
                        <p className="text-gray-500 text-xs font-mono bg-black/30 rounded px-2 py-1 inline-block">{manager.userId}</p>
                      </div>
                    </motion.a>
                  ))
                ) : (
                  <>
                    <motion.a 
                      href="https://discord.com/users/785398118095126570" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -6 }}
                      className="relative overflow-hidden bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#0f0f0f] border-2 border-[#3a3a3a] rounded-xl p-6 text-center transition-all duration-300 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                      <div className="relative z-10">
                        <div className="w-24 h-24 rounded-xl mx-auto mb-3 border-2 border-white/30 shadow-lg bg-gradient-to-br from-[#3a3a3a] to-[#1a1a1a] flex items-center justify-center">
                          <span className="text-3xl font-bold text-white">D</span>
                        </div>
                        <p className="text-white font-bold text-lg mb-1">Damon</p>
                        <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">Manager</p>
                        <p className="text-gray-500 text-xs font-mono bg-black/30 rounded px-2 py-1 inline-block">785398118095126570</p>
                      </div>
                    </motion.a>

                    <motion.a 
                      href="https://discord.com/users/1255565188829155388" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -6 }}
                      className="relative overflow-hidden bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#0f0f0f] border-2 border-[#3a3a3a] rounded-xl p-6 text-center transition-all duration-300 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                      <div className="relative z-10">
                        <div className="w-24 h-24 rounded-xl mx-auto mb-3 border-2 border-white/30 shadow-lg bg-gradient-to-br from-[#3a3a3a] to-[#1a1a1a] flex items-center justify-center">
                          <span className="text-3xl font-bold text-white">D</span>
                        </div>
                        <p className="text-white font-bold text-lg mb-1">Devo</p>
                        <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">Manager</p>
                        <p className="text-gray-500 text-xs font-mono bg-black/30 rounded px-2 py-1 inline-block">1255565188829155388</p>
                      </div>
                    </motion.a>

                    <motion.a 
                      href="https://discord.com/users/1391157574958710835" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -6 }}
                      className="relative overflow-hidden bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#0f0f0f] border-2 border-[#3a3a3a] rounded-xl p-6 text-center transition-all duration-300 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                      <div className="relative z-10">
                        <div className="w-24 h-24 rounded-xl mx-auto mb-3 border-2 border-white/30 shadow-lg bg-gradient-to-br from-[#3a3a3a] to-[#1a1a1a] flex items-center justify-center">
                          <span className="text-3xl font-bold text-white">M</span>
                        </div>
                        <p className="text-white font-bold text-lg mb-1">Mahad</p>
                        <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">Manager</p>
                        <p className="text-gray-500 text-xs font-mono bg-black/30 rounded px-2 py-1 inline-block">1391157574958710835</p>
                      </div>
                    </motion.a>

                    <motion.a 
                      href="https://discord.com/users/930109353137176586" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -6 }}
                      className="relative overflow-hidden bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#0f0f0f] border-2 border-[#3a3a3a] rounded-xl p-6 text-center transition-all duration-300 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                      <div className="relative z-10">
                        <div className="w-24 h-24 rounded-xl mx-auto mb-3 border-2 border-white/30 shadow-lg bg-gradient-to-br from-[#3a3a3a] to-[#1a1a1a] flex items-center justify-center">
                          <span className="text-3xl font-bold text-white">K</span>
                        </div>
                        <p className="text-white font-bold text-lg mb-1">Kuchu</p>
                        <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">Manager</p>
                        <p className="text-gray-500 text-xs font-mono bg-black/30 rounded px-2 py-1 inline-block">930109353137176586</p>
                      </div>
                    </motion.a>
                  </>
                )}
              </div>
            </div>

            {/* Early Supporter */}
            <div className="mb-16">
              <div className="flex items-center justify-center gap-2 mb-8">
                <img 
                  src="https://cdn.discordapp.com/attachments/1358403022106918936/1439627122409869312/lf_discord_early_supporter_acc_1753602131_3641eb14_progressive-removebg-preview.png?ex=691b34bc&is=6919e33c&hm=9af2d6cb3b44b809007399a3967fa83c0884ffa864c5ec486c3a07dea9800f9f&"
                  alt="Early Supporter Badge"
                  className="w-8 h-8 object-contain drop-shadow-[0_0_12px_rgba(201,167,111,0.7)]"
                />
                <h3 className="text-lg font-semibold text-center text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>EARLY SUPPORTERS</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-6xl mx-auto">
                {team?.earlySupport && team.earlySupport.length > 0 ? (
                  team.earlySupport.map((supporter) => (
                    <motion.a 
                      key={supporter.userId}
                      href={`https://discord.com/users/${supporter.userId}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.08, y: -4 }}
                      className="relative bg-gradient-to-br from-[#1a1a1a]/80 to-[#0a0a0a] border border-[#2a2a2a]/50 rounded-lg p-4 text-center transition-all duration-300 hover:border-[#c9a76f]/40 hover:shadow-lg hover:shadow-[#c9a76f]/10 backdrop-blur-sm"
                    >
                      <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#c9a76f]/5 rounded-full blur-xl" />
                      <div className="relative z-10">
                        {supporter.avatarUrl ? (
                          <img 
                            src={supporter.avatarUrl}
                            alt={supporter.username}
                            className="w-16 h-16 rounded-lg mx-auto mb-2 border border-[#c9a76f]/20 shadow-md"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-lg mx-auto mb-2 border border-[#c9a76f]/20 shadow-md bg-gradient-to-br from-[#c9a76f]/20 to-[#c9a76f]/5 flex items-center justify-center">
                            <span className="text-2xl font-bold text-[#c9a76f]/80">{supporter.username.charAt(0).toUpperCase()}</span>
                          </div>
                        )}
                        <p className="text-white/90 font-medium text-sm mb-1 truncate">{supporter.username}</p>
                        <p className="text-[10px] text-[#c9a76f]/60 uppercase tracking-wider font-semibold mb-1">Supporter</p>
                        <p className="text-gray-500 text-[10px] font-mono bg-black/20 rounded px-1.5 py-0.5 inline-block">{supporter.userId}</p>
                      </div>
                    </motion.a>
                  ))
                ) : (
                  <div className="col-span-full flex justify-center">
                    <motion.a 
                      href="https://discord.com/users/1395736628793839646" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.08, y: -4 }}
                      className="relative bg-gradient-to-br from-[#1a1a1a]/80 to-[#0a0a0a] border border-[#2a2a2a]/50 rounded-lg p-6 text-center transition-all duration-300 hover:border-[#c9a76f]/40 hover:shadow-lg hover:shadow-[#c9a76f]/10 backdrop-blur-sm max-w-xs"
                    >
                      <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#c9a76f]/5 rounded-full blur-xl" />
                      <div className="relative z-10">
                        <div className="w-20 h-20 rounded-lg mx-auto mb-3 border border-[#c9a76f]/20 shadow-md bg-gradient-to-br from-[#c9a76f]/20 to-[#c9a76f]/5 flex items-center justify-center">
                          <span className="text-3xl font-bold text-[#c9a76f]/80">E</span>
                        </div>
                        <p className="text-white/90 font-medium mb-1">Early Supporter</p>
                        <p className="text-xs text-[#c9a76f]/60 uppercase tracking-wider font-semibold">Supporter</p>
                        <p className="text-gray-500 text-xs font-mono mt-2">1395736628793839646</p>
                      </div>
                    </motion.a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
