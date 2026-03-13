'use client';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

export default function MarketGauge({ title, yesProb, noProb, volume }: { title: string; yesProb: number; noProb: number; volume: number }) {
  const data = [{ name: 'REP', value: yesProb, fill: '#ef4444' }];
  
  return (
    <div className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800">
      <div className="text-2xl font-bold mb-8 text-center">{title}</div>
      <div className="flex justify-center gap-16">
        <div className="text-center">
          <ResponsiveContainer width={220} height={220}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="90%" data={data} startAngle={180} endAngle={0}>
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar dataKey="value" cornerRadius={10} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="text-6xl font-bold neon-red mt-[-80px]">{Math.round(yesProb)}%</div>
          <div className="text-red-500 text-xl">REPUBLICANS</div>
        </div>
        <div className="text-center">
          <ResponsiveContainer width={220} height={220}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="90%" data={[{value: noProb, fill: '#3b82f6'}]} startAngle={180} endAngle={0}>
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar dataKey="value" cornerRadius={10} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="text-6xl font-bold neon-blue mt-[-80px]">{Math.round(noProb)}%</div>
          <div className="text-blue-500 text-xl">DEMOCRATS</div>
        </div>
      </div>
      <div className="text-center mt-8 text-2xl font-mono text-green-400">
        Volume: ${Number(volume).toLocaleString()}
      </div>
    </div>
  );
}
