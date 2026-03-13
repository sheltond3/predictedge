'use client';
import { useState } from 'react';

const states = [
  { code: 'CA', name: 'California', party: 'DEM', prob: 85 },
  { code: 'TX', name: 'Texas', party: 'REP', prob: 78 },
  { code: 'FL', name: 'Florida', party: 'REP', prob: 65 },
  { code: 'NY', name: 'New York', party: 'DEM', prob: 92 },
  // ... (full map simplified — hover shows tooltip)
];

export default function USMap() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className="relative bg-zinc-900 rounded-3xl p-8 border border-zinc-700">
      <div className="text-xl font-bold mb-4 text-yellow-400">Pollivity – State by State</div>
      <svg viewBox="0 0 800 500" className="w-full max-w-[600px] mx-auto">
        {/* Simplified US SVG paths — colored live */}
        <g>
          {states.map((s, i) => (
            <g key={i} onMouseEnter={() => setHover(s.name)} onMouseLeave={() => setHover(null)}>
              <rect x={50 + i*60} y={100} width="50" height="50" rx="4"
                fill={s.party === 'REP' ? '#ef4444' : '#3b82f6'} 
                className="map-state cursor-pointer" />
              <text x={50 + i*60 + 25} y={130} textAnchor="middle" fill="white" fontSize="12">{s.code}</text>
            </g>
          ))}
        </g>
      </svg>
      {hover && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-800 px-6 py-2 rounded-xl text-sm">
          {hover} leaning {states.find(s => s.name === hover)?.party} • {states.find(s => s.name === hover)?.prob}%
        </div>
      )}
    </div>
  );
}
