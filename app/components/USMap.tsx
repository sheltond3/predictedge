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
