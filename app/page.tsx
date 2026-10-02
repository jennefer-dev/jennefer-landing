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
import NefersCallout from "@/components/NefersCallout";
import ProductAnatomy from "@/components/ProductAnatomy";
import IdeFeaturesShowcase from "@/components/IdeFeaturesShowcase";
import LeadershipSection from "@/components/LeadershipSection";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";
import { getClosedBetaLaunchDate } from "@/lib/linear";
import { getWishlistCount, WAITLIST_SEATS } from "@/lib/waitlist";

export const revalidate = 3600;

export default async function Home() {
  const [wishlistCount, launchDate] = await Promise.all([
    getWishlistCount(),
    getClosedBetaLaunchDate().catch((error) => {
      console.error("Closed beta launch date could not load from Linear:", error);
      return null;
    }),
  ]);
  const seatsLeft = Math.max(0, WAITLIST_SEATS - wishlistCount);
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
      <NefersCallout />

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
