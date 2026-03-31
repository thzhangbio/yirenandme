import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

// Optimize font loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AI亦仁对话展示',
  description: '展示我与AI亦仁的对话记录',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <NuqsAdapter>
          {children}
        </NuqsAdapter>
      </body>
    </html>
  );
}