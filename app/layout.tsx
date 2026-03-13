import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PredictEdge – Live Election & Prediction Market Odds',
  description: 'Real-time odds from Polymarket & Kalshi. Better charts, better insights, earn when you trade via our links.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-white">{children}</body>
    </html>
  );
}
