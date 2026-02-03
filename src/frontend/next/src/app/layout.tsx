import { HeadBar } from '@/components/page-elements';
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
      <body className={`${inter.className} md:max-w-[920] mx-auto sm:my-4 mb-4 bg-neutral-200`}>
        <HeadBar />
        <main className="px-4 mt-8 sm:mt-2">
          <MonoLayoutWrapper>{children}</MonoLayoutWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}
