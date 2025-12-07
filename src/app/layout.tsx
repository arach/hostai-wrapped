import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HostAI Wrapped 2025",
  description: "Your year in hospitality - a personalized recap of your hosting journey",
  metadataBase: new URL('https://arach.github.io'),
  openGraph: {
    title: "HostAI Wrapped 2025",
    description: "Your year in hospitality - a personalized recap of your hosting journey",
    type: "website",
    images: [
      {
        url: '/hostai-wrapped/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HostAI Wrapped 2025 - What a year.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HostAI Wrapped 2025',
    description: 'Your year in hospitality - a personalized recap of your hosting journey',
    images: ['/hostai-wrapped/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
