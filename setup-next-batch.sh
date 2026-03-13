#!/bin/bash
echo "=== PredictEdge NEXT BATCH — Dark Theme Fix + Real Map + Affiliates ==="
echo "Folder: $(pwd)"
read -p "Press Enter to start (this fixes the white background forever)..."

echo "=== Step 1: Force full dark mode in layout.tsx ==="
cat > app/layout.tsx << 'EOL'
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PredictEdge – Live Election & Prediction Market Odds',
  description: 'Real-time Polymarket & Kalshi odds with neon visuals. Earn when you trade via our links.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#09090b] text-white antialiased">{children}</body>
    </html>
  );
}
EOL
echo "✓ Dark mode locked in"

echo "=== Step 2: Aggressive dark CSS (white background impossible now) ==="
cat > app/globals.css << 'EOL'
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body {
  background: #09090b !important;
  color: white !important;
}

.glass {
  background: rgba(9, 9, 11, 0.98) !important;
  backdrop-filter: blur(24px);
  border: 1px solid rgba(234, 179, 8, 0.25);
}

.neon-red { text-shadow: 0 0 20px #ef4444, 0 0 40px #ef4444, 0 0 80px #ef4444; }
.neon-blue { text-shadow: 0 0 20px #3b82f6, 0 0 40px #3b82f6; }
.neon-yellow { text-shadow: 0 0 20px #eab308, 0 0 40px #eab308; }
EOL
echo "✓ White background killed"

echo "=== Step 3: Better interactive Senate map (realistic states) ==="
cat > app/components/USMap.tsx << 'EOL'
'use client';
import { useState } from 'react';

const stateData = [
  {code: 'CA', name: 'California', party: 'DEM', prob: 94},
  {code: 'TX', name: 'Texas', party: 'REP', prob: 81},
  {code: 'FL', name: 'Florida', party: 'REP', prob: 74},
  {code: 'NY', name: 'New York', party: 'DEM', prob: 96},
  {code: 'PA', name: 'Pennsylvania', party: 'REP', prob: 62},
  {code: 'OH', name: 'Ohio', party: 'REP', prob: 68},
  {code: 'GA', name: 'Georgia', party: 'REP', prob: 59},
  {code: 'NC', name: 'North Carolina', party: 'REP', prob: 65},
];

export default function USMap() {
  const [hover, setHover] = useState<any>(null);

  return (
    <div className="glass rounded-3xl p-8">
      <div className="text-3xl font-bold neon-yellow mb-6 text-center">Senate 2026 • State by State</div>
      <svg viewBox="0 0 900 500" className="w-full h-auto">
        {stateData.map((s, i) => (
          <g key={i} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(null)}>
            <rect 
              x={50 + (i % 4) * 180} 
              y={60 + Math.floor(i/4) * 160} 
              width="140" 
              height="100" 
              rx="12"
              fill={s.party === 'REP' ? '#ef4444' : '#3b82f6'} 
              className="map-state cursor-pointer" 
            />
            <text x={120 + (i % 4) * 180} y={115 + Math.floor(i/4) * 160} textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">{s.code}</text>
          </g>
        ))}
      </svg>
      {hover && (
        <div className="mt-6 text-center text-xl bg-zinc-900 px-10 py-4 rounded-2xl inline-block">
          {hover.name} leaning <span className={hover.party === 'REP' ? 'text-red-500' : 'text-blue-500'}>{hover.party}</span> • {hover.prob}%
        </div>
      )}
      <p className="text-center text-xs text-zinc-500 mt-6">Hover states • Real odds coming next batch</p>
    </div>
  );
}
EOL
echo "✓ Much better interactive map added"

echo "=== Step 4: Easy affiliate config (.env) + Kalshi ==="
cat > .env.example << 'EOL'
NEXT_PUBLIC_POLY_REF=your_polymarket_affiliate_id_here
NEXT_PUBLIC_KALSHI_REF=your_kalshi_affiliate_id_here
EOL

cat > app/components/AffiliateBanner.tsx << 'EOL'
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
EOL
echo "✓ Affiliate system now uses .env (super easy)"

echo "=== Step 5: Commit & push ==="
git add .
git commit -m "feat: next batch — white background fixed forever + better map + env affiliates + Kalshi"
git push
echo "=== NEXT BATCH COMPLETE! ==="
echo "✅ White background is now impossible"
echo "Go to Vercel → Redeploy (or wait for auto-deploy)"
echo "After deploy: copy .env.example → .env.local and fill your affiliate IDs"
echo "Hard refresh your browser (Ctrl + Shift + R) to clear any old cache"
echo "Reply with “Next batch” when it looks perfect and I’ll give you: real state-by-state Senate odds + search bar + volume sorting"
