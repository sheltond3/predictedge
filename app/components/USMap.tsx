'use client';
import { useState } from 'react';

export default function USMap() {
  const [hover, setHover] = useState<string | null>(null);
  const states = [
    {code:'CA', name:'California', party:'DEM', prob:92},
    {code:'TX', name:'Texas', party:'REP', prob:78},
    {code:'FL', name:'Florida', party:'REP', prob:72},
    {code:'NY', name:'New York', party:'DEM', prob:95},
    // More states can be added later
  ];

  return (
    <div className="glass rounded-3xl p-10">
      <div className="text-2xl font-bold mb-6 neon-yellow text-center">Pollivity • Senate 2026</div>
      <svg viewBox="0 0 800 500" className="w-full">
        {/* Simplified colored states */}
        <g>
          {states.map((s,i) => (
            <g key={i} onMouseEnter={() => setHover(s.name)} onMouseLeave={() => setHover(null)}>
              <rect x={80 + i*110} y="120" width="90" height="80" rx="8"
                fill={s.party === 'REP' ? '#ef4444' : '#3b82f6'}
                className="map-state cursor-pointer" />
              <text x={80 + i*110 + 45} y="165" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold">{s.code}</text>
            </g>
          ))}
        </g>
      </svg>
      {hover && <div className="text-center mt-6 text-lg bg-zinc-900 px-8 py-3 rounded-2xl inline-block">{hover} • {states.find(s=>s.name===hover)?.prob}% {states.find(s=>s.name===hover)?.party}</div>}
    </div>
  );
}
