'use client';

import { useState, useEffect, memo } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import Pagination from '@/components/Pagination';
import { VouchSkeleton } from '@/components/Skeletons';
import { getDiscordMessageUrl } from '@/lib/utils';
import { MessageWithMentions } from './MessageWithMentions';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Vouch {
  id: string;
  vouchNumber: number;
  messageId: string;
  authorId: string;
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
            <div
              key={vouch.id}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-2.5 hover:border-[#c9a76f] transition-all duration-200 hover:shadow-lg hover:shadow-[#c9a76f]/10 flex flex-col h-full relative group"
              style={{ contain: 'layout style paint', minHeight: '120px' }}
            >
              {/* Vouch Number Badge */}
              <div className="absolute top-1.5 right-1.5 bg-[#c9a76f]/10 border border-[#c9a76f]/30 rounded-full px-2 py-0.5 text-xs font-bold text-[#c9a76f]">
                #{vouch.vouchNumber}
              </div>
              
              {/* Header with Avatar and Username */}
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-shrink-0">
                  {vouch.authorAvatar ? (
                    <Image
                      src={vouch.authorAvatar}
                      alt={vouch.authorName}
                      width={48}
                      height={48}
                      quality={80}
                      unoptimized={vouch.authorAvatar.includes('.gif')}
                      className="w-12 h-12 rounded-full border border-[#c9a76f]/20"
                    />
                  ) : (
                    <div 
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a76f] to-[#d4b786] flex items-center justify-center text-black font-bold text-base"
                    >
                      {vouch.authorName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <a
                    href={`https://id.rappytv.com/${vouch.authorId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-block group/username relative"
                  >
                    <span className="text-[#c9a76f] font-semibold text-base hover:text-[#d4b786] transition-colors truncate block relative">
                      {vouch.authorName}
                    </span>
                    <span className="absolute left-0 top-full w-0 group-hover/username:w-full h-[1px] bg-[#c9a76f] transition-all duration-300" />
                  </a>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(vouch.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <p className="text-gray-300 text-xs leading-relaxed flex-grow line-clamp-2 mb-1">
                <MessageWithMentions message={vouch.message} />
              </p>

              {/* Proof Link */}
              {vouch.proofUrl && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (vouch.proofUrl) {
                      window.open(vouch.proofUrl, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  className="inline-flex items-center gap-1 mt-auto text-[#c9a76f] hover:text-[#d4b786] font-medium text-xs transition-colors duration-200 cursor-pointer group/proof self-start"
                >
                  <span className="relative">
                    Proof
                    <span className="absolute bottom-0 left-0 w-0 group-hover/proof:w-full h-[1px] bg-current transition-all duration-200" />
                  </span>
                  <span className="transform group-hover/proof:translate-x-0.5 transition-transform duration-200 text-xs">→</span>
                </button>
              )}
            </div>
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
