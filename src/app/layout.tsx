import { Providers } from '@/contexts';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Geist_Mono, Inter } from 'next/font/google';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GitScope - Explore GitHub Projects',
  description:
    'GitScope allows you to search GitHub users and view their repositories with beautifully formatted README files.',
  openGraph: {
    title: 'GitScope - Explore GitHub Projects',
    description:
      'Search GitHub users, view their repositories, and explore README files in a clean format.',
    siteName: 'GitScope',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
