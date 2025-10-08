
import type { Metadata } from "next";
import Providers from "./providers";
import StoreProvider from "./StoreProvider";
import { BoundStoreProvider } from "./boundStoreProvider";

import { Inter } from 'next/font/google'
import "./globals.css";
import { MainStoreProvider } from "../back/mainStoreProvider";

const inter = Inter({ subsets: ['latin'] })

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
        className={inter.className}
      >
        {children}
      </body>
    </html>
  );
}

{/* <MainStoreProvider>{children}</MainStoreProvider> */ }
{/* <StoreProviders> */ }
{/* </StoreProviders> */ }
{/* <Providers> */ }
{/* </Providers> */ }
