import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import VideoShowcase from "@/components/VideoShowcase";
import TokenBurnShowcase from "@/components/TokenBurnShowcase";
import AirGappedShowcase from "@/components/AirGappedShowcase";
import PrivacyLockShowcase from "@/components/PrivacyLockShowcase";
import AgentCircuitFlow from "@/components/AgentCircuitFlow";
import IdeFeaturesShowcase from "@/components/IdeFeaturesShowcase";
import CoreEngineArchitecture from "@/components/CoreEngineArchitecture";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";
import InfrastructureBand from "@/components/InfrastructureBand";
import AgentSquadGrid from "@/components/AgentSquadGrid";
import JevAgentShowcase from "@/components/JevAgentShowcase";
import ProductAnatomy from "@/components/ProductAnatomy";
import { Resend } from "resend";

export const revalidate = 3600; // Cache for 1 hour

async function getWishlistCount() {
  try {
    if (!process.env.RESEND_API_KEY || !process.env.RESEND_SEGMENT_ID) return 0;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const list = await resend.contacts.list({ audienceId: process.env.RESEND_SEGMENT_ID });
    return list.data ? list.data.data.length : 0;
  } catch (error) {
    console.error("Failed to fetch wishlist count", error);
    return 0;
  }
}

export default async function Home() {
  const baseCount = await getWishlistCount();
  const seatsLeft = Math.max(0, 100 - baseCount);

  return (
    <main className="min-h-screen bg-[#07080c] text-white relative selection:bg-blue-600/30 selection:text-cyan-200">
      <Header seatsLeft={seatsLeft} />
      <Hero />
      
      {/* Product Anatomy / What is Jennefer */}
      <SectionHeading title="What is Jennefer" id="anatomy" />
      <VideoShowcase />

      {/* 2.5 Agent Choosing System / How Agents Choose */}
      <SectionHeading title="Agent Choosing System" id="routing" />
      <JevAgentShowcase />

      <SectionHeading title="Ecosystem & Security" heightClass="h-[150vh]" id="ecosystem" />
      <InfrastructureBand />

      {/* 1. Features & Benefits Bölümü: A Living Loop -> Token Burn -> Wi-Fi/Air-Gapped -> Privacy Lock */}
      <SectionHeading title="Features & Benefits" id="features" />
      <AgentCircuitFlow />
      <TokenBurnShowcase />
      <AirGappedShowcase />
      <PrivacyLockShowcase />

      {/* 2. Agent Squad (Ecosystem tarzı grid yapısı) */}
      <SectionHeading title="Autonomous Engineering Squad" id="squad" heightClass="h-[150vh]" />
      <AgentSquadGrid />

      {/* 3. Resim / Arayüz Kanıtı: Showcase */}
      <SectionHeading title="Showcase" id="showcase" />
      <ProductAnatomy />

      {/* NEW: Core Engine Architecture Scrollytelling - HIDDEN FOR NOW */}
      {/* <SectionHeading title="Core Engine Architecture" /> */}
      {/* <CoreEngineArchitecture /> */}

      {/* 4. IDE Özellikleri / In Short */}
      <div className="md:snap-start md:scroll-mt-16">
        <SectionHeading title="In Short" />
        <IdeFeaturesShowcase />
      </div>

      {/* 5. Early Access / Waitlist */}
      <SectionHeading title="Early Access" />
      <WaitlistSection isLocked={seatsLeft === 0} />
      
      <Footer />
    </main>
  );
}
