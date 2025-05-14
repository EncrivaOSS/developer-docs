import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: {
		default: "Encriva for Developers",
		template: "%s — Encriva for Developers"
	},
	description: "A comprehensive guide to using Encriva for developers",
	icons: {
		icon: "/favicon.ico",
	},
	openGraph: {
		title: "Encriva for Developers",
		description: "A comprehensive guide to using Encriva for developers"
	},
	twitter: {
		card: "summary_large_image",
		title: "Encriva for Developers",
		description: "A comprehensive guide to using Encriva for developers"
	}
};

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" className={inter.className} suppressHydrationWarning>
			<head>
				<meta rel="theme-color" content="#000000" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</head>
			<body className="flex flex-col min-h-screen">
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	);
}
