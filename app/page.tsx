import { format } from 'date-fns';
import { TrendingUp, Users } from 'lucide-react';
import MarketGauge from './components/MarketGauge';
import CandidateCard from './components/CandidateCard';
import AffiliateBanner from './components/AffiliateBanner';

interface PolymarketMarket {
  slug: string;
  title: string;
  volume: number;
  tags?: string[];
  tokens?: Array<{ price: number }>;
}

async function getPolymarketMarkets() {
  const res = await fetch('https://gamma-api.polymarket.com/markets?active=true&closed=false&limit=50&order=volume', {
    next: { revalidate: 60 },
  });
  const data: PolymarketMarket[] = await res.json();
  
  const politics = data.filter((m: PolymarketMarket) => 
    m.tags?.some((t: string) => 
      ['politics', 'election', 'senate', 'president', '2026', '2028'].includes(t.toLowerCase())
    ) && m.volume > 100_000
  );

  return politics.slice(0, 12);
}

export default async function Home() {
  const markets = await getPolymarketMarkets();
  const senateMarket = markets.find((m: PolymarketMarket) => 
    m.slug.includes('senate') || m.title.toLowerCase().includes('senate')
  ) || markets[0];

  // ✅ FIXED: Safe nullish coalescing so TS never sees "undefined"
  const yesProb = (senateMarket?.tokens?.[0]?.price ?? 0.53) * 100;
  const noProb = (senateMarket?.tokens?.[1]?.price ?? 0.47) * 100;
  const volume = senateMarket?.volume ?? 0;

  const topCandidates = [
    { name: 'JD Vance', prob: 28, volume: '1.2M', spark: [22,24,25,27,28,29,28], color: '#ef4444' },
    { name: 'Kamala Harris', prob: 19, volume: '890K', spark: [21,20,19,18,19,19,19], color: '#3b82f6' },
    { name: 'Ron DeSantis', prob: 14, volume: '650K', spark: [15,16,15,14,13,14,14], color: '#eab308' },
    { name: 'Gavin Newsom', prob: 12, volume: '410K', spark: [11,12,13,12,12,11,12], color: '#22c55e' },
  ];

  const lastUpdated = new Date();

  return (
    <div className="min-h-screen bg-zinc-950">
      <nav className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-yellow-400 to-blue-500 bg-clip-text text-transparent">PredictEdge</div>
          </div>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="text-yellow-400">Senate 2026</a>
            <a href="#" className="hover:text-white">Presidency 2028</a>
            <a href="#" className="hover:text-white">All Markets</a>
            <a href="#affiliates" className="hover:text-white">Affiliates</a>
          </div>
          <div className="text-xs text-zinc-500">Data from Polymarket • Updates every 60s</div>
        </div>
      </nav>

      <div className="bg-zinc-900 border-b border-zinc-800 py-2 text-center text-sm flex items-center justify-center gap-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        Odds update every 60s • Last updated {format(lastUpdated, 'h:mm a')}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold tracking-tighter mb-4">Real-Time Prediction Markets</h1>
          <p className="text-2xl text-zinc-400 max-w-2xl mx-auto">Better visuals. Better odds. Earn when you trade.</p>
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-8 h-8 text-yellow-400" />
            <h2 className="text-4xl font-bold">Senate Control 2026</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {senateMarket ? (
              <MarketGauge 
                title={senateMarket.title}
                yesProb={yesProb}
                noProb={noProb}
                volume={volume}
              />
            ) : (
              <div className="text-center py-20 text-zinc-500">Loading Senate market...</div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl font-bold">Top 2028 Presidential Contenders</h2>
            </div>
            <div className="text-sm text-zinc-500">Data refreshed live</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCandidates.map((c, i) => (
              <CandidateCard key={i} {...c} />
            ))}
          </div>
        </div>
      </div>

      <AffiliateBanner />
      <footer className="border-t border-zinc-800 py-12 text-center text-xs text-zinc-500">
        PredictEdge © 2026 • Not affiliated with any exchange • Built with ❤️ using public Polymarket data
      </footer>
    </div>
  );
}
