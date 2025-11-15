export function VouchSkeleton() {
  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-6 animate-pulse h-full flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 bg-[#2a2a2a] rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-[#2a2a2a] rounded w-32" />
          <div className="h-3 bg-[#2a2a2a] rounded w-24" />
        </div>
      </div>
      <div className="space-y-2 mb-4 flex-grow">
        <div className="h-4 bg-[#2a2a2a] rounded w-full" />
        <div className="h-4 bg-[#2a2a2a] rounded w-4/5" />
        <div className="h-4 bg-[#2a2a2a] rounded w-3/4" />
      </div>
      <div className="h-10 bg-[#2a2a2a] rounded-lg w-full" />
    </div>
  );
}

export function ProofSkeleton() {
  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-6 animate-pulse flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 bg-[#2a2a2a] rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-[#2a2a2a] rounded w-32" />
          <div className="h-3 bg-[#2a2a2a] rounded w-24" />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-[#2a2a2a] rounded w-full" />
        <div className="h-4 bg-[#2a2a2a] rounded w-3/4" />
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="aspect-square bg-[#2a2a2a] rounded-lg" />
        <div className="aspect-square bg-[#2a2a2a] rounded-lg" />
        <div className="aspect-square bg-[#2a2a2a] rounded-lg" />
        <div className="aspect-square bg-[#2a2a2a] rounded-lg" />
      </div>
      <div className="h-10 bg-[#2a2a2a] rounded-lg w-full" />
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 animate-pulse">
      <div className="h-4 bg-[#2a2a2a] rounded w-24 mb-3" />
      <div className="h-8 bg-[#2a2a2a] rounded w-32" />
    </div>
  );
}
