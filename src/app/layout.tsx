import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; 
import './globals.css';
import Layout from '@/components/layout/Layout';
import { Providers } from '@/components/layout/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Danal Admin - 사용자 관리리',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>
        <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}