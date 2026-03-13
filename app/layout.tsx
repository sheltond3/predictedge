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
