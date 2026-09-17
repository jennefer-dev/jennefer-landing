import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LiveChatWrapper } from "@/components/LiveChat";



const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jennefer.dev"),
  title: "Jennefer — Your Hardware. Local Agents. Zero Cloud Leakage.",
  description:
    "A standalone, from-scratch autonomous IDE orchestrating local LLMs (Ollama, vLLM, llama.cpp). Hierarchical agent swarms build, test, and plan codebases with zero API bills and zero telemetry.",
  keywords: [
    "autonomous IDE",
    "local LLM",
    "Ollama",
    "vLLM",
    "llama.cpp",
    "agent swarm",
    "zero telemetry",
    "private AI code editor",
  ],
  authors: [{ name: "Ahmet Enes LLC", url: "https://jennefer.dev" }],
  openGraph: {
    title: "Jennefer — Zero Cloud Leakage Autonomous IDE",
    description:
      "Orchestrate local LLMs and hierarchical agent swarms with zero API bills and sub-millisecond local IPC.",
    url: "https://jennefer.dev",
    siteName: "Jennefer",
    images: [
      {
        url: "/shots/dashboard.png",
        width: 1200,
        height: 630,
        alt: "Jennefer Autonomous IDE Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jennefer — Local Agents. Zero Cloud Leakage.",
    description:
      "A standalone autonomous IDE running Ollama, vLLM, and llama.cpp locally on client hardware.",
    images: ["/shots/dashboard.png"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" }
    ],
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

 

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark bg-[#07080c] text-[#f1f5f9] selection:bg-blue-600/30 selection:text-cyan-200 antialiased`}
    >
      <body className="min-h-screen bg-[#07080c] font-sans overflow-x-hidden">
     <LiveChatWrapper />

        {/* Ultra-fine blueprint grid with radial mask */}
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />

        {/* Ambient Hardware-Accelerated Glow Meshes */}
        <div
          className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-cyan-500/15 blur-[120px] rounded-full mix-blend-screen will-change-transform z-0"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none fixed top-1/3 -left-60 w-[600px] h-[500px] bg-cyan-600/10 blur-[140px] rounded-full mix-blend-screen will-change-transform z-0"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none fixed bottom-1/4 -right-40 w-[650px] h-[550px] bg-indigo-700/15 blur-[150px] rounded-full mix-blend-screen will-change-transform z-0"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
