import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import AppSliderShowcase from "@/components/AppSliderShowcase";
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

import ProductAnatomy from "@/components/ProductAnatomy";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07080c] text-white relative selection:bg-blue-600/30 selection:text-cyan-200">
      <Header />
      <Hero />
      
      {/* Product Anatomy / What is Jennefer */}
    
      
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
      <AppSliderShowcase />

      {/* NEW: Core Engine Architecture Scrollytelling - HIDDEN FOR NOW */}
      {/* <SectionHeading title="Core Engine Architecture" /> */}
      {/* <CoreEngineArchitecture /> */}

      {/* 4. IDE Özellikleri / In Short */}
      <SectionHeading title="In Short" />
      <IdeFeaturesShowcase />

  <SectionHeading title="What is Jennefer" id="anatomy" />
      <ProductAnatomy />
      {/* 5. Early Access / Waitlist */}
      <SectionHeading title="Early Access" />
      <WaitlistSection />
      
      <Footer />
    </main>
  );
}
