'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import Pagination from '@/components/Pagination';
import { VouchSkeleton } from '@/components/Skeletons';
import { getDiscordMessageUrl } from '@/lib/utils';
import { MessageWithMentions } from './MessageWithMentions';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Vouch {
  id: string;
  vouchNumber: number;
  messageId: string;
  authorName: string;
  authorAvatar: string | null;
  message: string;
  timestamp: string;
  channelId: string;
  proofUrl: string | null;
}

export default function VouchesClient() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset to first page on search
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, error, isLoading } = useSWR(
    `/api/vouches?page=${page}&limit=30${debouncedSearch ? `&search=${encodeURIComponent(debouncedSearch)}` : ''}`,
    fetcher,
    {
      refreshInterval: debouncedSearch ? 0 : 5000, // Don't auto-refresh during search
      revalidateOnFocus: true,
    }
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Failed to load vouches</p>
      </div>
    );
  }

  const vouches: Vouch[] = data?.vouches || [];
  const pagination = data?.pagination || { page: 1, totalPages: 1 };
  const totalCount = pagination.total || 0;

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Vouches</h2>
            <p className="text-xs text-gray-400">
              {totalCount} total {!searchQuery && `• Page ${pagination.page}/${pagination.totalPages}`}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search vouches by author or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#c9a76f] transition-colors"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Vouches Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <VouchSkeleton key={i} />
          ))}
        </div>
      ) : vouches.length === 0 ? (
        <div className="text-center py-20 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
          <p className="text-gray-400 text-lg">No vouches found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vouches.map((vouch, index) => (
            <motion.div
              key={vouch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#c9a76f] transition-all duration-300 hover:shadow-xl hover:shadow-[#c9a76f]/10 hover:scale-[1.02] flex flex-col h-full relative"
            >
              {/* Vouch Number Badge */}
              <div className="absolute top-3 right-3 bg-[#c9a76f]/10 border border-[#c9a76f]/30 rounded-full px-3 py-1 text-xs font-bold text-[#c9a76f]">
                #{vouch.vouchNumber}
              </div>
              
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  {vouch.authorAvatar ? (
                    <img
                      src={vouch.authorAvatar}
                      alt={vouch.authorName}
                      className="w-14 h-14 rounded-full border-2 border-[#c9a76f]/30"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-[#c9a76f] flex items-center justify-center text-black font-bold text-xl">
                      {vouch.authorName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-lg mb-1 truncate">
                    {vouch.authorName}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {new Date(vouch.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed flex-grow line-clamp-4 mb-3">
                <MessageWithMentions message={vouch.message} />
              </p>

              {/* Proof Link */}
              {vouch.proofUrl && (
                <motion.a
                  href={vouch.proofUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-block mt-auto text-[#c9a76f] font-semibold text-sm"
                  whileHover={{ 
                    x: 5,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span
                    className="relative inline-block"
                    whileHover={{
                      scale: 1.05,
                    }}
                    animate={{
                      color: ['#c9a76f', '#d4b786', '#c9a76f'],
                    }}
                    transition={{
                      color: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    Proof
                    {/* Animated underline */}
                    <motion.span
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#c9a76f] to-[#d4b786]"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Glow effect on hover */}
                    <motion.span
                      className="absolute inset-0 blur-sm bg-[#c9a76f] opacity-0"
                      whileHover={{ opacity: 0.4 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.span>
                  
                  {/* Arrow icon */}
                  <motion.span
                    className="inline-block ml-1"
                    animate={{
                      x: [0, 3, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    →
                  </motion.span>
                </motion.a>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
