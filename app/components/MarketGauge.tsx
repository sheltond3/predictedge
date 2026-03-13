'use client';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

export default function MarketGauge({ title, yesProb, noProb, volume }: { title: string; yesProb: number; noProb: number; volume: number }) {
  const dataYes = [{ name: 'REP', value: yesProb, fill: '#ef4444' }];
  const dataNo = [{ name: 'DEM', value: noProb, fill: '#3b82f6' }];

  return (
    <div className="glass rounded-3xl p-10 border border-yellow-400/30">
      <div className="text-2xl font-bold mb-8 text-center">{title}</div>
      <div className="flex justify-center gap-16">
        <div className="text-center">
          <ResponsiveContainer width={240} height={240}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="65%" outerRadius="95%" data={dataYes} startAngle={180} endAngle={0}>
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar dataKey="value" cornerRadius={15} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="text-7xl font-bold neon-red mt-[-100px]">{Math.round(yesProb)}%</div>
          <div className="text-red-500 text-2xl tracking-widest">REPUBLICANS</div>
        </div>
        <div className="text-center">
          <ResponsiveContainer width={240} height={240}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="65%" outerRadius="95%" data={dataNo} startAngle={180} endAngle={0}>
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar dataKey="value" cornerRadius={15} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="text-7xl font-bold neon-blue mt-[-100px]">{Math.round(noProb)}%</div>
          <div className="text-blue-500 text-2xl tracking-widest">DEMOCRATS</div>
        </div>
      </div>
      <div className="text-center mt-8 text-3xl font-mono text-green-400 tracking-widest">
        VOLUME: ${Number(volume).toLocaleString()}
      </div>
    </div>
  );
}
