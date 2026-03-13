'use client';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { ExternalLink } from 'lucide-react';

export default function CandidateCard({ name, prob, volume, spark, color }: { name: string; prob: number; volume: string; spark: number[]; color: string }) {
  return (
    <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 hover:border-yellow-400 transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="text-3xl font-bold">{name}</div>
          <div className="text-5xl font-mono text-yellow-400 mt-2">{prob}%</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-zinc-500">7-DAY MOMENTUM</div>
          <ResponsiveContainer width={120} height={60}>
            <LineChart data={spark.map((v, i) => ({ day: i, val: v }))}>
              <Line type="natural" dataKey="val" stroke={color} strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="text-sm text-zinc-400 mb-6">Volume: ${volume}</div>
      <a 
        href="https://polymarket.com?ref=YOUR_AFFILIATE_ID_HERE" 
        target="_blank"
        className="block w-full bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all group-hover:scale-105"
      >
        Trade Now on Polymarket <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}
