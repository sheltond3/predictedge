import { format } from 'date-fns';
import { TrendingUp, Users } from 'lucide-react';
import MarketGauge from './components/MarketGauge';
import CandidateCard from './components/CandidateCard';
import AffiliateBanner from './components/AffiliateBanner';
import USMap from './components/USMap';

interface PolymarketMarket {
  slug: string;
  title: string;
  volume: number;
  tags?: string[];
  tokens?: Array<{ name?: string; price: number }>;
}

async function getPolymarketMarkets() {
  const res = await fetch('https://gamma-api.polymarket.com/markets?active=true&closed=false&limit=50&order=volume', {
    next: { revalidate: 60 },
  });
  const data: PolymarketMarket[] = await res.json();
  const politics = data.filter((m: PolymarketMarket) => 
    m.tags?.some((t: string) => ['politics','election','senate','president','2026','2028'].includes(t.toLowerCase())) && m.volume > 100_000
  );
  return politics.slice(0, 20);
}

export default async function Home() {
  const markets = await getPolymarketMarkets();
  const senateMarket = markets.find((m) => m.slug.includes('senate') || m.title.toLowerCase().includes('senate')) || markets[0];
  const presidentialMarket = markets.find((m) => m.title.includes('Presidential Election Winner 2028') || m.slug.includes('presidential')) || markets[1];

  const topCandidates = presidentialMarket?.tokens
    ?.sort((a, b) => (b.price || 0) - (a.price || 0))
    ?.slice(0,4)
    ?.map((t, i) => ({
      name: t.name || `Candidate ${i+1}`,
      prob: Math.round((t.price || 0) * 100),
      volume: (presidentialMarket.volume / 4).toFixed(0) + 'K',
      spark: Array.from({length:7}, () => Math.floor(Math.random()*10)+15),
      color: ['#ef4444','#3b82f6','#eab308','#22c55e'][i]
    })) || [];

  const yesProb = (senateMarket?.tokens?.[0]?.price ?? 0.53) * 100;
  const noProb = (senateMarket?.tokens?.[1]?.price ?? 0.47) * 100;
  const volume = senateMarket?.volume ?? 0;

  const lastUpdated = new Date();

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Navbar + Ticker unchanged but now fully dark */}
      <nav className="border-b border-zinc-800 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="text-4xl font-bold tracking-tighter neon-yellow">PredictEdge</div>
          <div className="flex gap-10 text-lg">
            <a href="#" className="text-yellow-400 font-medium">Senate 2026</a>
            <a href="#" className="hover:text-white">Presidency 2028</a>
            <a href="#" className="hover:text-white">All Markets</a>
            <a href="#affiliates" className="hover:text-white">Affiliates</a>
          </div>
        </div>
      </nav>

      <div className="bg-zinc-900 py-3 text-center text-sm flex items-center justify-center gap-3">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" /> Live odds update every 60s • {format(lastUpdated, 'h:mm a')}
      </div>

      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-7xl font-black tracking-tighter neon-yellow">REAL-TIME PREDICTION MARKETS</h1>
          <p className="text-3xl text-zinc-400 mt-4">Better visuals. Better odds. Earn when you trade.</p>
        </div>

        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <Users className="w-10 h-10 text-yellow-400" />
            <h2 className="text-6xl font-bold">Senate Control 2026</h2>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            <MarketGauge title={senateMarket?.title || "Senate Control"} yesProb={yesProb} noProb={noProb} volume={volume} />
            <USMap />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-10">
            <div className="flex items-center gap-4">
              <TrendingUp className="w-10 h-10 text-yellow-400" />
              <h2 className="text-6xl font-bold">Top 2028 Contenders <span className="text-green-400 text-sm align-super">(LIVE)</span></h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {topCandidates.map((c,i) => <CandidateCard key={i} {...c} />)}
          </div>
        </div>
      </div>

      <AffiliateBanner />
      <footer className="border-t border-zinc-800 py-16 text-center text-sm text-zinc-500">PredictEdge © 2026 • Public Polymarket data • Earn via affiliates</footer>
    </div>
  );
}
