import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import { Roboto } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "jobhunter",
  description: "next client for the jobhunter app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={roboto.className}
      >
        {children}
      </body>
    </html>
  );
}
