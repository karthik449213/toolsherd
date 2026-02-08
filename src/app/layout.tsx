import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CookieProvider } from "@/components/cookies/CookieProvider";
import { CookieBanner } from "@/components/cookies/CookieBanner";
import { CookieAutoAccept } from "@/components/cookies/CookieAutoAccept";
import { GoogleAnalyticsScript } from "@/components/analytics/GoogleAnalyticsScript";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Viewport configuration for better mobile SEO
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

// Domain configuration
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://toolsherd.in";
const SITE_NAME = "Tools Herd AI";
const SITE_DESCRIPTION =
  "Tools Herd AI is a high-authority AI tools discovery and comparison platform for professionals, founders, and businesses. Discover, compare, evaluate, and adopt AI tools that deliver real business outcomes.";

// Keywords
const KEYWORDS = [
  "AI tools",
  "artificial intelligence",
  "machine learning",
  "productivity AI",
  "content creation AI",
  "coding AI",
  "marketing AI",
  "trading AI",
  "AI directory",
  "best AI tools",
  "2025 AI",
  "automation",
  "deep learning",
  "GPT",
  "AI for business",
  "AI for creators",
  "AI for developers",
  "AI software",
  "AI applications",
  "AI solutions",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | Tools Herd AI`,
    default: `Tools Herd AI - Ultimate AI Tools Directory`,
  },
  description: SITE_DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: "Tools Herd AI" }],
  creator: "Tools Herd AI",
  publisher: "Tools Herd AI",
  category: "Technology",
  classification: "AI Tools Directory",
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Tools Herd AI",
    title: `Tools Herd AI - Ultimate AI Tools Directory`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/logo-square.png`,
        width: 512,
        height: 512,
        alt: `Tools Herd AI Logo`,
        type: "image/png",
      },
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `Tools Herd AI - AI Tools Directory`,
        type: "image/png",
      },
      {
        url: `${SITE_URL}/og-image-twitter.png`,
        width: 1200,
        height: 630,
        alt: `Tools Herd AI`,
        type: "image/png",
      },
      {
        url: `${SITE_URL}/og-image-facebook.png`,
        width: 1200,
        height: 630,
        alt: `Tools Herd AI on Facebook`,
        type: "image/png",
      },
      {
        url: `${SITE_URL}/og-image-linkedin.png`,
        width: 1200,
        height: 627,
        alt: `Tools Herd AI on LinkedIn`,
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: `Tools Herd AI - Ultimate AI Tools Directory`,
    description: SITE_DESCRIPTION,
    creator: "@toolsherdai",
    images: [`${SITE_URL}/og-image-twitter.png`],
  },

  // Canonical URL
  alternates: {
    canonical: SITE_URL,
  },

  // Verification
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
    },
  },

  // robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // Favicon
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  
  // PWA Manifest
  manifest: "/site.webmanifest",
  
  // Apple Web App
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Tools Herd AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content={SITE_NAME} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="apple-mobile-web-app-title" content="Tools Herd AI" />
        <meta name="application-name" content="Tools Herd AI" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        <meta name="brand" content="Tools Herd AI" />
        
        {/* Favicon and manifest auto-generated by Next.js from metadata.icons and manifest */}
        
        {/* JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: SITE_URL,
              name: "Tools Herd AI",
              description: SITE_DESCRIPTION,
              publisher: {
                "@type": "Organization",
                name: "Tools Herd AI",
                logo: {
                  "@type": "ImageObject",
                  url: `${SITE_URL}/logo-square.png`,
                  width: 512,
                  height: 512,
                },
              },
              sameAs: [
                "https://twitter.com/toolsherdai",
                "https://www.linkedin.com/company/toolsherdai",
              ],
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Additional Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: SITE_URL,
                },
              ],
            }),
          }}
        />

        {/* Google Site Verification (replace with your code) */}
        {process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION}
          />
        )}

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://pkjgladwgxzyqamrwnds.supabase.co" />
        <link rel="dns-prefetch" href="https://pkjgladwgxzyqamrwnds.supabase.co" />

        {/* Critical CSS - Inline for faster initial render */}
        <style dangerouslySetInnerHTML={{__html: `
          :root {
            --bg-deep: #0a0e27;
            --bg-surface: #1a1f3a;
            --accent-cyan: #00d4ff;
            --text-primary: #e8f1ff;
            --text-secondary: #b0bcc4;
            --text-muted: #7a8a99;
            --background: var(--bg-deep);
            --foreground: var(--text-primary);
          }
          html {
            color-scheme: dark;
          }
          body {
            margin: 0;
            padding: 0;
            background: var(--background);
            color: var(--foreground);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background-image: 
              radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.02) 0%, transparent 50%);
            background-attachment: fixed;
          }
          * {
            transition-duration: 200ms;
          }
          button, a, input, textarea, select {
            transition-duration: 200ms;
          }
        `}} />

        {/* Load CSS immediately */}
        <link rel="stylesheet" href="/globals.css" />
        <noscript>
          <link rel="stylesheet" href="/globals.css" />
        </noscript>

        {/* Favicon variants */}
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-mono`}>
        <CookieProvider>
          <CookieAutoAccept />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
          
          {/* Google Analytics - Only loads after user consents to analytics cookies */}
          <GoogleAnalyticsScript />
        </CookieProvider>
      </body>
    </html>
  );
}
