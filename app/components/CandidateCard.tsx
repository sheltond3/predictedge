'use client';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { ExternalLink } from 'lucide-react';

export default function CandidateCard({ name, prob, volume, spark, color }: { name: string; prob: number; volume: string; spark: number[]; color: string }) {
  const photoMap: Record<string, string> = {
    'JD Vance': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/JD_Vance_official_portrait.jpg/400px-JD_Vance_official_portrait.jpg',
    'Kamala Harris': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Kamala_Harris_official_VP_portrait.jpg/400px-Kamala_Harris_official_VP_portrait.jpg',
    'Ron DeSantis': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Ron_DeSantis_official_portrait.jpg/400px-Ron_DeSantis_official_portrait.jpg',
    'Gavin Newsom': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gavin_Newsom_official_photo.jpg/400px-Gavin_Newsom_official_photo.jpg',
  };

  return (
    <div className="glass rounded-3xl p-8 border border-zinc-700 hover:border-yellow-400 transition-all group overflow-hidden">
      <img src={photoMap[name] || ''} alt={name} className="w-20 h-20 rounded-2xl mx-auto mb-4 object-cover shadow-2xl" />
      <div className="text-3xl font-bold text-center mb-1">{name}</div>
      <div className="text-6xl font-mono text-yellow-400 text-center mb-6">{prob}%</div>
      
      <div className="text-xs text-zinc-400 text-center mb-2">7-DAY MOMENTUM</div>
      <ResponsiveContainer width="100%" height={60}>
        <LineChart data={spark.map((v, i) => ({ day: i, val: v }))}>
          <Line type="natural" dataKey="val" stroke={color} strokeWidth={4} dot={false} />
        </LineChart>
      </ResponsiveContainer>

      <div className="text-sm text-green-400 text-center mt-4">Volume: ${volume}</div>

      <a href="https://polymarket.com?ref=YOUR_AFFILIATE_ID_HERE" target="_blank" 
         className="block mt-6 w-full bg-gradient-to-r from-yellow-400 to-amber-400 hover:brightness-110 text-zinc-950 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all group-hover:scale-105">
        Trade Now <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}
