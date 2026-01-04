import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Live Market Dislocation Monitor',
  description: 'Detecting abnormal market behavior in real time.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

