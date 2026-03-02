import { Footer } from '@/components/page-elements/Footer';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MonoLayoutWrapper } from '@/components/layout/Mono';

const inter = Inter();

export const metadata: Metadata = {
  title: 'jobhunter',
  description: 'next client for the jobhunter app',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} md:max-w-[920] mx-auto bg-neutral-200 flex flex-col h-dvh sm:p-6`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
