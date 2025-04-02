import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { SanityLive } from '@/sanity/live';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Noble Okafor',
  description: "Noble Okafor's portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={montserrat.className}>
        <div className='container'>
          {children}
          <SanityLive />
        </div>
      </body>
    </html>
  );
}
