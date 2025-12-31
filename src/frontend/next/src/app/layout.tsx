import type { Metadata } from "next";
import localFont from 'next/font/local'
import { Inter } from 'next/font/google'
import { Roboto } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "jobhunter",
  description: "next client for the jobhunter app",
};
 
const myFont = localFont({
  // src: '../../public/gothica1.ttf',
  src: '../../public/Venus+Plomb.otf',
})

      // <body className={myFont.className} >
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className} >
        {children}
      </body>
    </html>
  );
}
