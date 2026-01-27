import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Crypto News Monitor',
  description: 'Continuous monitoring and structured analysis of crypto-relevant news.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="border-b-2 border-black bg-white">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-lg font-bold uppercase tracking-wider">
                Market Dislocation Monitor
              </Link>
              <div className="flex gap-6">
                <Link href="/" className="uppercase text-sm hover:underline">
                  Accueil
                </Link>
                <Link href="/register" className="uppercase text-sm hover:underline">
                  Inscription
                </Link>
                <Link href="/ranking" className="uppercase text-sm hover:underline">
                  Classement
                </Link>
                <Link href="/matches" className="uppercase text-sm hover:underline">
                  Matchs
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-white">
          {children}
        </main>
      </body>
    </html>
  );
}
