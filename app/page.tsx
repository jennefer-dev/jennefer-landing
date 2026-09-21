import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import VideoShowcase from "@/components/VideoShowcase";
import TokenBurnShowcase from "@/components/TokenBurnShowcase";
import AirGappedShowcase from "@/components/AirGappedShowcase";
import PrivacyLockShowcase from "@/components/PrivacyLockShowcase";
import AgentCircuitFlow from "@/components/AgentCircuitFlow";
import IdeFeaturesShowcase from "@/components/IdeFeaturesShowcase";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";
import InfrastructureBand from "@/components/InfrastructureBand";
import AgentSquadGrid from "@/components/AgentSquadGrid";
import JevAgentShowcase from "@/components/JevAgentShowcase";
import ProductAnatomy from "@/components/ProductAnatomy";

export const revalidate = 3600; // Cache for 1 hour

export async function getWishlistCount(): Promise<number> {
  try {
    const segmentId = process.env.CUSTOMERIO_WAITLIST_SEGMENT_ID;
    const appApiKey = process.env.CUSTOMERIO_APP_API_KEY;

    if (!segmentId || !appApiKey) return 0;

    const res = await fetch(`https://api.customer.io/v1/segments/${segmentId}/customer_count`, {
      headers: {
        Authorization: `Bearer ${appApiKey}`,
      },
      next: { revalidate: 60 }, // 60 saniyede bir önbelleği tazeler
    });

    if (!res.ok) {
      console.error("Customer.io Segment Count API error:", res.status);
      return 0;
    }

    const data = await res.json();
    return typeof data.count === "number" ? data.count : 0;
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
