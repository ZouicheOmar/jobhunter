import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Title } from "@/components/Title";
import Link from "next/link";
import { Nav } from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "jobhunter",
	description: "next client for the jobhunter app",
};

const myFont = localFont({
	src: "../../public/gothica1.ttf",
	src: "../../public/Venus+Plomb.otf",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				// className={`${roboto.className}
				// flex flex-col md:max-w-[800px] mx-auto my-4
				// items-center justify-items-center min-h-screen gap-2 `}
				className={`${roboto.className}
        md:max-w-[800px] mx-auto my-4 min-h-screen `}
			>
				<Title />
				<Nav />
				{children}
				<Footer />
			</body>
		</html>
	);
}
