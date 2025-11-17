import VouchesClient from '@/components/VouchesClient';

export default function HomePage() {

  return (
    <div className="min-h-screen">
      {/* Compact Header with EXE Description */}
      <section className="relative py-6 px-6 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-b border-[#2a2a2a]">
        <div className="container mx-auto max-w-7xl text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img 
              src="https://cdn.discordapp.com/attachments/1411591288666456084/1439201034848436326/Extreme_Official.gif?ex=691c4ae9&is=691af969&hm=7e04c4e196526beb2ed147e70425145e8c6903cdf7b2def512cedaeb30c77f67&" 
              alt="EXE" 
              className="h-8 w-8 rounded-full"
            />
            <h1 className="text-2xl font-bold">
              <span className="text-[#c9a76f]">EXE</span>
              <span className="text-white"> Vouches</span>
            </h1>
          </div>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            Pure chill community with daily VCs, giveaways, and nonstop good vibes — no toxicity, just family.
          </p>
        </div>
      </section>

      {/* Vouches List */}
      <section className="py-6 px-6">
        <div className="container mx-auto max-w-7xl">
          <VouchesClient />
        </div>
      </section>
    </div>
  );
}
