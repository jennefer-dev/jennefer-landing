import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LiveChatWrapper } from "@/components/LiveChat";
import { PostHogProvider } from "@/components/PostHogProvider";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://jennefer.dev"),
  title: "Jennefer — Private development with specialist agents",
  description: "Plan, build, and review with local models and specialist agents in one private engineering workspace.",
  authors: [{ name: "Ahmet Enes LLC", url: "https://jennefer.dev" }],
  openGraph: {
    title: "Jennefer — Private development with specialist agents",
    description: "Plan, build, and review with local models and specialist agents in one private engineering workspace.",
    url: "https://jennefer.dev",
    siteName: "Jennefer",
    images: [{ url: "/shots/dashboard.png", width: 1200, height: 630, alt: "Jennefer development workspace" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jennefer — Private development with specialist agents",
    description: "A private engineering workspace with local models and specialist agents.",
    images: ["/shots/dashboard.png"],
  },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }], apple: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${jetbrainsMono.variable} dark bg-[#090a0c] text-[#f0f0f1] antialiased`}>
      <body className="min-h-screen overflow-x-hidden bg-[#090a0c] font-sans">
        <PostHogProvider>
          <LiveChatWrapper />
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
