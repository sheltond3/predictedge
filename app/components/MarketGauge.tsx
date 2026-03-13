'use client';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

export default function MarketGauge({ title, yesProb, noProb, volume }: { title: string; yesProb: number; noProb: number; volume: number }) {
  return (
    <div className="glass rounded-3xl p-12 gauge-container">
      <div className="text-3xl font-bold text-center mb-10 neon-yellow">{title}</div>
      <div className="flex justify-center gap-20">
        <div className="text-center">
          <ResponsiveContainer width={260} height={260}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="95%" data={[{value: yesProb, fill: '#ef4444'}]} startAngle={180} endAngle={0}>
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar dataKey="value" cornerRadius={20} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="text-8xl font-bold neon-red mt-[-110px]">{Math.round(yesProb)}%</div>
          <div className="text-2xl text-red-500 tracking-[4px]">REPUBLICANS</div>
        </div>
        <div className="text-center">
          <ResponsiveContainer width={260} height={260}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="95%" data={[{value: noProb, fill: '#3b82f6'}]} startAngle={180} endAngle={0}>
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar dataKey="value" cornerRadius={20} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="text-8xl font-bold neon-blue mt-[-110px]">{Math.round(noProb)}%</div>
          <div className="text-2xl text-blue-500 tracking-[4px]">DEMOCRATS</div>
        </div>
      </div>
      <div className="text-center mt-12 text-4xl font-mono text-green-400">VOLUME: ${Number(volume).toLocaleString()}</div>
    </div>
  );
}
