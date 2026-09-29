import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import VideoShowcase from "@/components/VideoShowcase";
import JevAgentShowcase from "@/components/JevAgentShowcase";
import InfrastructureBand from "@/components/InfrastructureBand";
import AgentCircuitFlow from "@/components/AgentCircuitFlow";
import TokenBurnShowcase from "@/components/TokenBurnShowcase";
import AirGappedShowcase from "@/components/AirGappedShowcase";
import PrivacyLockShowcase from "@/components/PrivacyLockShowcase";
import AgentSquadGrid from "@/components/AgentSquadGrid";
import ProductAnatomy from "@/components/ProductAnatomy";
import IdeFeaturesShowcase from "@/components/IdeFeaturesShowcase";
import LeadershipSection from "@/components/LeadershipSection";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";
import { getClosedBetaLaunchDate } from "@/lib/linear";

export const revalidate = 3600;

async function getWishlistCount(): Promise<number> {
  try {
    const segmentId = process.env.CUSTOMERIO_WAITLIST_SEGMENT_ID;
    const appApiKey = process.env.CUSTOMERIO_APP_API_KEY;
    if (!segmentId || !appApiKey) return 0;
    const res = await fetch(`https://api.customer.io/v1/segments/${segmentId}/customer_count`, {
      headers: { Authorization: `Bearer ${appApiKey}` }, next: { revalidate: 60 },
    });
    if (!res.ok) return 0;
    const data = await res.json();
    return typeof data.count === "number" ? data.count : 0;
  } catch { return 0; }
}

export default async function Home() {
  const [wishlistCount, launchDate] = await Promise.all([
    getWishlistCount(),
    getClosedBetaLaunchDate().catch((error) => {
      console.error("Closed beta launch date could not load from Linear:", error);
      return null;
    }),
  ]);
  const seatsLeft = Math.max(0, 100 - wishlistCount);
  const launchAt = launchDate ? `${launchDate}T00:00:00+03:00` : null;
  return (
    <main id="main" className="site-shell min-h-screen bg-[#090a0c] text-[#f0f0f1] selection:bg-white/25 selection:text-white">
      <Header seatsLeft={seatsLeft} />
      <Hero seatsLeft={seatsLeft} launchAt={launchAt} />
      <SectionHeading title="What is Jennefer" id="anatomy" />
      <VideoShowcase />

      <SectionHeading title="Agent Choosing System" id="routing" />
      <JevAgentShowcase />

      <SectionHeading title="Ecosystem & Security" heightClass="h-[150vh]" id="ecosystem" />
      <InfrastructureBand />

      <SectionHeading title="Features & Benefits" id="features" />
      <AgentCircuitFlow />
      <TokenBurnShowcase />
      <AirGappedShowcase />
      <div id="privacy"><PrivacyLockShowcase /></div>

      <SectionHeading title="Autonomous Engineering Squad" id="squad" heightClass="h-[150vh]" />
      <AgentSquadGrid />

      <SectionHeading title="Showcase" id="showcase" />
      <ProductAnatomy />

      <SectionHeading title="In Short" />
      <IdeFeaturesShowcase />
      <LeadershipSection />

      <SectionHeading title="Early Access" />
      <WaitlistSection isLocked={seatsLeft === 0} />
      <Footer />
    </main>
  );
}
