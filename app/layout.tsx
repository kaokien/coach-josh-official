// app/layout.tsx
import type { Metadata } from "next";
import { Oswald, Courier_Prime } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

// Load fonts with Next.js optimization
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
  weight: ["400", "700"],
});

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  variable: "--font-courier",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Coach Josh Official | Boxing Training & Fight IQ",
    template: "%s | Coach Josh Official",
  },
  description: "Master the slip, the shift, and the science of striking. Technical drills from the 50M+ view TikTok coach. Online programs & 1-on-1 training in New Haven, CT.",
  keywords: ["boxing training", "boxing coach", "fight IQ", "boxing drills", "Coach Josh", "boxing techniques"],
  authors: [{ name: "Coach Josh" }],
  creator: "Coach Josh Official",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://coachjosh.com", // Replace with your domain
    siteName: "Coach Josh Official",
    title: "Coach Josh Official | Boxing Training & Fight IQ",
    description: "Stop throwing arm punches. Master the science of striking.",
    images: [
      {
        url: "/og-image.jpg", // Create this image (1200x630px)
        width: 1200,
        height: 630,
        alt: "Coach Josh Official - Boxing Training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coach Josh Official | Boxing Training",
    description: "Stop throwing arm punches. Master the science of striking.",
    images: ["/og-image.jpg"],
    creator: "@coachjosh", // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#4A6FA5",
          colorBackground: "#F2E8DC",
          colorText: "#1A1A1A",
          colorInputBackground: "#FFFFFF",
          borderRadius: "0px", // Brutalist style
        },
        elements: {
          card: "border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
          formButtonPrimary: "bg-[#4A6FA5] hover:bg-[#4A6FA5]/90 border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          formFieldInput: "border-2 border-[#1A1A1A] rounded-none",
          headerTitle: "font-display",
          headerSubtitle: "font-body",
        },
      }}
    >
      <html lang="en" className={`${oswald.variable} ${courierPrime.variable}`}>
        <body className="font-body antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
