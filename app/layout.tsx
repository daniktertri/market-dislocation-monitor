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
                Crypto News Monitor
              </Link>
              <div className="flex gap-6">
                <Link href="/" className="uppercase text-sm hover:underline">
                  Home
                </Link>
                <Link href="/demo" className="uppercase text-sm hover:underline">
                  Demo
                </Link>
                <Link href="/performance" className="uppercase text-sm hover:underline">
                  Performance
                </Link>
                <Link href="/methodology" className="uppercase text-sm hover:underline">
                  Methodology
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
