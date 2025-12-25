

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./markdown-content.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://toolsherd.ai/'),
  title: "Tools Herd AI - Ultimate AI Directory",
  description: "Discover the best AI tools for productivity, content creation, coding, marketing, trading, and more. Your go-to AI directory for 2025.",
  keywords: [
    "AI tools", "artificial intelligence", "machine learning", "productivity AI", "content creation AI", "coding AI", "marketing AI", "trading AI", "AI directory", "best AI tools", "2025 AI", "automation", "deep learning", "GPT", "AI for business", "AI for creators", "AI for developers"
  ],

  openGraph: {
    title: "Tools Herd AI - Ultimate AI Directory",
    description: "Discover the best AI tools for productivity, content creation, coding, marketing, trading, and more.",
    url: "https://toolsherd.ai/",
    siteName: "Tools Herd AI",
    images: [
      {
        url: "/file.svg",
        width: 1200,
        height: 630,
        alt: "Tools Herd AI Directory"
      }
    ],
    locale: "en_US",
    type: "website"
  },
   verification: {
    google: "32jTef7cOu1lJIDk_o2TUqQJpJvkxbF43uL4gbCmNrM", // replace with your actual code
  },
  twitter: {
    card: "summary_large_image",
    title: "Tools Herd AI - Ultimate AI Directory",
    description: "Discover the best AI tools for productivity, content creation, coding, marketing, trading, and more.",
    images: ["/file.svg"]
  },
  alternates: {
    canonical: "https://toolsherd.ai/"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Tools Herd AI" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Tools Herd AI",
            "url": "https://toolsherd.ai/",
            "description": "Discover the best AI tools for productivity, content creation, coding, marketing, trading, and more.",
            "keywords": "AI tools, artificial intelligence, machine learning, productivity AI, content creation AI, coding AI, marketing AI, trading AI, AI directory, best AI tools, 2025 AI, automation, deep learning, GPT, AI for business, AI for creators, AI for developers"
          })
        }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
