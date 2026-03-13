export default function AffiliateBanner() {
  return (
    <div id="affiliates" className="bg-zinc-900 border-t border-b border-yellow-400 py-12 mt-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="text-yellow-400 text-sm tracking-[4px] mb-4">MONETIZE WITH US</div>
        <h3 className="text-4xl font-bold mb-8">Get paid every time someone signs up & trades</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <a href="https://polymarket.com?ref=YOUR_POLY_REF" target="_blank" className="block bg-zinc-950 border border-yellow-400 hover:bg-zinc-800 p-8 rounded-3xl transition-all">
            <div className="text-2xl font-bold mb-3">Polymarket</div>
            <div className="text-green-400 text-xl">Up to $50 sign-up bonus via our link</div>
          </a>
          <a href="https://kalshi.com?ref=YOUR_KALSHI_REF" target="_blank" className="block bg-zinc-950 border border-blue-400 hover:bg-zinc-800 p-8 rounded-3xl transition-all">
            <div className="text-2xl font-bold mb-3">Kalshi (US-friendly)</div>
            <div className="text-green-400 text-xl">$10+ trading credits</div>
          </a>
        </div>
        <div className="mt-10 text-xs text-zinc-500">Replace YOUR_POLY_REF and YOUR_KALSHI_REF with your actual affiliate codes</div>
      </div>
    </div>
  );
}
