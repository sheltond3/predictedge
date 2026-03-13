export default function AffiliateBanner() {
  const polyRef = process.env.NEXT_PUBLIC_POLY_REF || 'YOUR_POLY_REF';
  const kalshiRef = process.env.NEXT_PUBLIC_KALSHI_REF || 'YOUR_KALSHI_REF';

  return (
    <div id="affiliates" className="glass border-t border-yellow-400 py-16 mt-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="text-yellow-400 text-sm tracking-[4px] mb-4">MONETIZE WITH US</div>
        <h3 className="text-5xl font-bold mb-8 neon-yellow">Get paid every time someone signs up & trades</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <a href={`https://polymarket.com?ref=${polyRef}`} target="_blank" className="block glass p-10 rounded-3xl hover:border-yellow-400 transition-all">
            <div className="text-3xl font-bold mb-4">Polymarket</div>
            <div className="text-green-400 text-2xl">Up to $50 sign-up bonus via our link</div>
          </a>
          <a href={`https://kalshi.com?ref=${kalshiRef}`} target="_blank" className="block glass p-10 rounded-3xl hover:border-blue-400 transition-all">
            <div className="text-3xl font-bold mb-4">Kalshi (US-friendly)</div>
            <div className="text-green-400 text-2xl">$10+ trading credits</div>
          </a>
        </div>
        <div className="mt-8 text-xs text-zinc-500">Copy .env.example to .env.local and add your real referral IDs</div>
      </div>
    </div>
  );
}
