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
  messageId: string;
  authorName: string;
  authorAvatar: string | null;
  message: string;
  timestamp: string;
  channelId: string;
}

export default function VouchesClient() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const { data, error, isLoading } = useSWR(
    `/api/vouches?page=${page}&limit=30`,
    fetcher,
    {
      refreshInterval: 5000, // Auto-refresh every 5 seconds
      revalidateOnFocus: true,
    }
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  // Filter vouches based on search query
  const filteredVouches = (data?.vouches || []).filter((vouch: Vouch) => {
    const query = searchQuery.toLowerCase();
    return (
      vouch.authorName.toLowerCase().includes(query) ||
      vouch.message.toLowerCase().includes(query)
    );
  });

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Failed to load vouches</p>
      </div>
    );
  }

  const vouches: Vouch[] = searchQuery ? filteredVouches : (data?.vouches || []);
  const pagination = data?.pagination || { page: 1, totalPages: 1 };
  const totalCount = searchQuery ? filteredVouches.length : (pagination.total || 0);

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Vouches</h2>
            <p className="text-gray-400">
              {totalCount} total vouches {!searchQuery && `• Page ${pagination.page} of ${pagination.totalPages}`}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">Live Updates</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-green-500">Active</span>
            </div>
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
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#c9a76f] transition-all duration-300 hover:shadow-xl hover:shadow-[#c9a76f]/10 hover:scale-[1.02] flex flex-col h-full"
            >
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

              <p className="text-gray-300 text-sm mb-4 leading-relaxed flex-grow line-clamp-4">
                <MessageWithMentions message={vouch.message} />
              </p>

              <a
                href={getDiscordMessageUrl(vouch.messageId, '1306533976809185323', vouch.channelId)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#c9a76f]/10 border border-[#c9a76f]/30 rounded-lg text-[#c9a76f] text-sm font-medium hover:bg-[#c9a76f]/20 hover:border-[#c9a76f]/50 transition-all mt-auto"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z" />
                </svg>
                Check on Discord
              </a>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !searchQuery && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
