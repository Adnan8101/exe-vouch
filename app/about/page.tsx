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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
                {/* Total Vouches - Premium Golden Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.08,
                    y: -5,
                  }}
                  className="relative group overflow-hidden bg-gradient-to-br from-[#c9a76f]/20 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#c9a76f]/40 rounded-2xl p-5 hover:border-[#c9a76f] transition-all duration-500 hover:shadow-2xl hover:shadow-[#c9a76f]/40 flex flex-col items-center justify-center min-h-[140px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c9a76f]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                  <p className="text-xs text-gray-400 mb-2 font-semibold tracking-wide uppercase">Total Vouches</p>
                  <motion.p 
                    className="text-3xl font-black text-white tracking-tight"
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
                    scale: 1.08,
                    y: -5,
                  }}
                  className="relative group overflow-hidden bg-gradient-to-br from-[#22c55e]/20 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#22c55e]/40 rounded-2xl p-5 hover:border-[#22c55e] transition-all duration-500 hover:shadow-2xl hover:shadow-[#22c55e]/40 flex flex-col items-center justify-center min-h-[140px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                  <p className="text-xs text-gray-400 mb-2 font-semibold tracking-wide uppercase">Total INR</p>
                  <motion.p 
                    className="text-2xl font-black bg-gradient-to-r from-[#22c55e] via-[#4ade80] to-[#22c55e] bg-clip-text text-transparent"
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
                    scale: 1.08,
                    y: -5,
                  }}
                  className="relative group overflow-hidden bg-gradient-to-br from-[#ff6bde]/20 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#ff6bde]/40 rounded-2xl p-5 hover:border-[#ff6bde] transition-all duration-500 hover:shadow-2xl hover:shadow-[#ff6bde]/50 flex flex-col items-center justify-center min-h-[140px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff6bde]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                  <p className="text-xs text-gray-400 mb-2 font-semibold tracking-wide uppercase">Nitro</p>
                  <motion.p 
                    className="text-3xl font-black text-[#ff6bde]"
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
                  className="relative group overflow-hidden bg-gradient-to-br from-[#8a67ff]/20 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#8a67ff]/40 rounded-2xl p-5 hover:border-[#8a67ff] transition-all duration-500 hover:shadow-2xl hover:shadow-[#8a67ff]/50 flex flex-col items-center justify-center min-h-[140px]"
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
                  <p className="text-xs text-gray-400 mb-2 font-semibold tracking-wide uppercase">Decor</p>
                  <motion.p 
                    className="text-3xl font-black text-[#8a67ff]"
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
                    scale: 1.08,
                    y: -5,
                  }}
                  className="relative group overflow-hidden bg-gradient-to-br from-[#ffb6c1]/20 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#ffb6c1]/40 rounded-2xl p-5 hover:border-[#ffb6c1] transition-all duration-500 hover:shadow-2xl hover:shadow-[#ffb6c1]/50 flex flex-col items-center justify-center min-h-[140px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ffb6c1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                  <p className="text-xs text-gray-400 mb-2 font-semibold tracking-wide uppercase">OWO</p>
                  <motion.p 
                    className="text-3xl font-black text-[#ffb6c1]"
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
                  className="relative group overflow-hidden bg-gradient-to-br from-[#f7931a]/20 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#f7931a]/40 rounded-2xl p-5 hover:border-[#f7931a] transition-all duration-500 hover:shadow-2xl hover:shadow-[#f7931a]/50 flex flex-col items-center justify-center min-h-[140px]"
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
                  <p className="text-xs text-gray-400 mb-2 font-semibold tracking-wide uppercase">Crypto Giveaways</p>
                  <motion.p 
                    className="text-3xl font-black text-[#f7931a]"
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
              <h3 className="text-3xl font-black text-center mb-8 bg-gradient-to-r from-[#c9a76f] via-[#d4b786] to-[#c9a76f] bg-clip-text text-transparent tracking-tight" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>👑 FOUNDER</h3>
              <div className="flex justify-center">
                {team?.founder?.[0] ? (
                  <a 
                    href={`https://discord.com/users/${team.founder[0].userId}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-8 text-center hover:border-[#c9a76f] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#c9a76f]/20 max-w-xs"
                  >
                    {team.founder[0].avatarUrl ? (
                      <img 
                        src={team.founder[0].avatarUrl}
                        alt={team.founder[0].username}
                        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#c9a76f]/50 shadow-lg"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#c9a76f]/50 shadow-lg bg-[#c9a76f]/10 flex items-center justify-center">
                        <span className="text-4xl font-bold text-[#c9a76f]">{team.founder[0].username.charAt(0).toUpperCase()}</span>
                      </div>
                    )}
                    <p className="text-[#c9a76f] font-semibold text-lg mb-1">{team.founder[0].username}</p>
                    <p className="text-xs text-gray-400 mb-1">{team.founder[0].role}</p>
                    <p className="text-gray-500 text-xs font-mono">{team.founder[0].userId}</p>
                  </a>
                ) : (
                  <a 
                    href="https://discord.com/users/959653911923396629" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-8 text-center hover:border-[#c9a76f] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#c9a76f]/20 max-w-xs"
                  >
                    <img 
                      src="https://cdn.discordapp.com/avatars/959653911923396629/1a829abb7020436cbca22765be4e331b.png?size=1024" 
                      alt="imunknown69" 
                      className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#c9a76f]/50 shadow-lg"
                    />
                    <p className="text-[#c9a76f] font-semibold text-lg mb-1">imunknown69</p>
                    <p className="text-xs text-gray-400 mb-1">Founder</p>
                    <p className="text-gray-500 text-xs font-mono">959653911923396629</p>
                  </a>
                )}
              </div>
            </div>

            {/* Owners */}
            <div className="mb-16">
              <h3 className="text-2xl font-extrabold text-center mb-8 text-[#c9a76f] tracking-tight" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>⭐ OWNERS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {team?.owners && team.owners.length > 0 ? (
                  team.owners.map((owner) => (
                    <a 
                      key={owner.userId}
                      href={`https://discord.com/users/${owner.userId}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-8 text-center hover:border-[#c9a76f] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#c9a76f]/20"
                    >
                      {owner.avatarUrl ? (
                        <img 
                          src={owner.avatarUrl}
                          alt={owner.username}
                          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#c9a76f]/50 shadow-lg"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#c9a76f]/50 shadow-lg bg-[#c9a76f]/10 flex items-center justify-center">
                          <span className="text-4xl font-bold text-[#c9a76f]">{owner.username.charAt(0).toUpperCase()}</span>
                        </div>
                      )}
                      <p className="text-[#c9a76f] font-semibold text-lg mb-1">{owner.username}</p>
                      <p className="text-xs text-gray-400 mb-1">{owner.role}</p>
                      <p className="text-gray-500 text-xs font-mono">{owner.userId}</p>
                    </a>
                  ))
                ) : (
                  <>
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
                      <p className="text-[#c9a76f] font-semibold text-lg mb-1">rex.f</p>
                      <p className="text-xs text-gray-400 mb-1">Owner</p>
                      <p className="text-gray-500 text-xs font-mono">643480211421265930</p>
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
                      <p className="text-[#c9a76f] font-semibold text-lg mb-1">Alexx</p>
                      <p className="text-xs text-gray-400 mb-1">Owner</p>
                      <p className="text-gray-500 text-xs font-mono">283127777383809024</p>
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Managers */}
            <div className="mb-16">
              <h3 className="text-xl font-bold text-center mb-8 text-white/90" style={{ fontFamily: 'Inter, sans-serif' }}> MANAGERS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {team?.managers && team.managers.length > 0 ? (
                  team.managers.map((manager) => (
                    <a 
                      key={manager.userId}
                      href={`https://discord.com/users/${manager.userId}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-6 text-center hover:border-[#c9a76f] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#c9a76f]/20"
                    >
                      {manager.avatarUrl ? (
                        <img 
                          src={manager.avatarUrl}
                          alt={manager.username}
                          className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-[#c9a76f]/30 shadow-lg"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-[#c9a76f]/30 shadow-lg bg-[#c9a76f]/10 flex items-center justify-center">
                          <span className="text-3xl font-bold text-[#c9a76f]">{manager.username.charAt(0).toUpperCase()}</span>
                        </div>
                      )}
                      <p className="text-white font-semibold mb-1">{manager.username}</p>
                      <p className="text-xs text-gray-400 mb-1">{manager.role}</p>
                      <p className="text-gray-500 text-xs font-mono">{manager.userId}</p>
                    </a>
                  ))
                ) : (
                  <>
                    <a 
                      href="https://discord.com/users/785398118095126570" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-6 text-center hover:border-[#c9a76f] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#c9a76f]/20"
                    >
                      <div className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-[#c9a76f]/30 shadow-lg bg-[#c9a76f]/10 flex items-center justify-center">
                        <span className="text-3xl font-bold text-[#c9a76f]">D</span>
                      </div>
                      <p className="text-white font-semibold mb-1">Damon</p>
                      <p className="text-xs text-gray-400 mb-1">Manager</p>
                      <p className="text-gray-500 text-xs font-mono">785398118095126570</p>
                    </a>

                    <a 
                      href="https://discord.com/users/1255565188829155388" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-6 text-center hover:border-[#c9a76f] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#c9a76f]/20"
                    >
                      <div className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-[#c9a76f]/30 shadow-lg bg-[#c9a76f]/10 flex items-center justify-center">
                        <span className="text-3xl font-bold text-[#c9a76f]">D</span>
                      </div>
                      <p className="text-white font-semibold mb-1">Devo</p>
                      <p className="text-xs text-gray-400 mb-1">Manager</p>
                      <p className="text-gray-500 text-xs font-mono">1255565188829155388</p>
                    </a>

                    <a 
                      href="https://discord.com/users/1391157574958710835" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-6 text-center hover:border-[#c9a76f] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#c9a76f]/20"
                    >
                      <div className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-[#c9a76f]/30 shadow-lg bg-[#c9a76f]/10 flex items-center justify-center">
                        <span className="text-3xl font-bold text-[#c9a76f]">M</span>
                      </div>
                      <p className="text-white font-semibold mb-1">Mahad</p>
                      <p className="text-xs text-gray-400 mb-1">Manager</p>
                      <p className="text-gray-500 text-xs font-mono">1391157574958710835</p>
                    </a>

                    <a 
                      href="https://discord.com/users/930109353137176586" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-6 text-center hover:border-[#c9a76f] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#c9a76f]/20"
                    >
                      <div className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-[#c9a76f]/30 shadow-lg bg-[#c9a76f]/10 flex items-center justify-center">
                        <span className="text-3xl font-bold text-[#c9a76f]">K</span>
                      </div>
                      <p className="text-white font-semibold mb-1">Kuchu</p>
                      <p className="text-xs text-gray-400 mb-1">Manager</p>
                      <p className="text-gray-500 text-xs font-mono">930109353137176586</p>
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Early Supporter */}
            <div className="mb-16">
              <h3 className="text-lg font-semibold text-center mb-8 text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}> EARLY SUPPORTERS</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 max-w-6xl mx-auto">
                {team?.earlySupport && team.earlySupport.length > 0 ? (
                  team.earlySupport.map((supporter) => (
                    <a 
                      key={supporter.userId}
                      href={`https://discord.com/users/${supporter.userId}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-4 text-center hover:border-[#c9a76f] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#c9a76f]/20"
                    >
                      {supporter.avatarUrl ? (
                        <img 
                          src={supporter.avatarUrl}
                          alt={supporter.username}
                          className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-[#c9a76f]/30 shadow-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-[#c9a76f]/30 shadow-lg bg-[#c9a76f]/10 flex items-center justify-center">
                          <span className="text-2xl font-bold text-[#c9a76f]">{supporter.username.charAt(0).toUpperCase()}</span>
                        </div>
                      )}
                      <p className="text-white font-semibold text-sm mb-1 truncate">{supporter.username}</p>
                      <p className="text-xs text-gray-400 mb-1">Early Supporter</p>
                      <p className="text-gray-500 text-xs font-mono truncate">{supporter.userId}</p>
                    </a>
                  ))
                ) : (
                  <div className="col-span-full flex justify-center">
                    <a 
                      href="https://discord.com/users/1395736628793839646" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-6 text-center hover:border-[#c9a76f] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#c9a76f]/20 max-w-xs"
                    >
                      <div className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-[#c9a76f]/30 shadow-lg bg-[#c9a76f]/10 flex items-center justify-center">
                        <span className="text-3xl font-bold text-[#c9a76f]">E</span>
                      </div>
                      <p className="text-white font-semibold mb-1">Early Supporter</p>
                      <p className="text-xs text-gray-400 mb-1">Early Supporter</p>
                      <p className="text-gray-500 text-xs font-mono">1395736628793839646</p>
                    </a>
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
