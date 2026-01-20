import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Title } from "@/components/Title";
import { Nav } from "@/components/Nav";

const roboto = Roboto({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "jobhunter",
  description: "next client for the jobhunter app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} px-4 md:max-w-[784px] mx-auto my-4 min-h-screen `}
      >
        <Title />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
