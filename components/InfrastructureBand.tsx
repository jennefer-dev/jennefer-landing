"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const partners = [
  {
    name: 'Anthropic',
    logo: 'https://cdn.simpleicons.org/anthropic/D97706',
    badge: 'Claude for Startups',
    description: 'Selected for the official startup program, powering next-generation autonomous AI orchestration.'
  },
  {
    name: 'Auth0 by Okta',
    logo: 'https://cdn.simpleicons.org/auth0/EB5424',
    badge: 'B2B Professional Tier',
    description: 'Enterprise identity infrastructure, multi-tenant B2B access, and autonomous AI agent security.'
  },
  {
    name: 'PostHog',
    logo: 'https://cdn.simpleicons.org/posthog/F54E00',
    badge: 'Scale Startup Cohort',
    description: 'Full product telemetry, user session recordings, and feature flag management at scale.'
  },
  {
    name: 'Neo4j',
    logo: 'https://cdn.simpleicons.org/neo4j/008CC1',
    badge: 'Aura Startup Partner',
    description: 'Graph database engine driving AST parsing, dependency mapping, and persistent agent memory.'
  },
  {
    name: 'Sentry',
    logo: 'https://cdn.simpleicons.org/sentry/white',
    badge: 'Developer Infrastructure Grant',
    description: 'Real-time error tracking, crash reporting, and system health monitoring across all runtimes.'
  },
  {
    name: 'Notion',
    logo: 'https://cdn.simpleicons.org/notion/white',
    badge: 'Notion for Startups',
    description: 'Business-tier centralized workspace, technical documentation, and ecosystem architecture.'
  },
  {
    name: 'Deepgram',
    logo: 'https://cdn.simpleicons.org/deepgram/white',
    badge: 'Deepgram for Startups',
    description: 'Ultra-low latency speech-to-text, text-to-speech, and voice agent infrastructure.'
  },
  {
    name: 'Mixpanel',
    logo: 'https://cdn.simpleicons.org/mixpanel/white',
    badge: 'Mixpanel for Startups',
    description: 'Event-based product analytics, session replay, and feature flag management for tracking agent performance.'
  },
  {
    name: 'BoldDesk',
    logo: 'https://storage.googleapis.com/cdn-website-bolddesk/2022/03/BoldDesk-Logo-Color.svg',
    badge: 'BoldDesk for Startups',
    description: 'Enterprise customer support, multi-channel ticketing, and AI-powered live chat integration.'
  },
];

export default function InfrastructureBand() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const remainder = partners.length % 5;
  const ctaSpanClass = 
    remainder === 0 ? "md:col-span-5" :
    remainder === 1 ? "md:col-span-4" :
    remainder === 2 ? "md:col-span-3" :
    remainder === 3 ? "md:col-span-2" :
    "md:col-span-1";

  // Reusable card content rendering
  const renderCardContent = (partner: typeof partners[0]) => (
    <>
      {/* Logo */}
      <div className="h-8 w-8 relative mb-4">
        <Image 
          src={partner.logo} 
          alt={`${partner.name} logo`}
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      
      {/* Content */}
      <div className="flex flex-col">
        <h3 className="text-sm font-bold text-white tracking-tight uppercase mb-2">
          {partner.name}
        </h3>
        <span className="inline-flex items-center w-max bg-white/[0.03] px-2 py-1 text-[9px] font-mono text-zinc-400 border border-white/[0.1] mb-3">
          {partner.badge}
        </span>
        <p className="text-[11px] text-zinc-500 leading-relaxed min-h-[48px]">
          {partner.description}
        </p>
      </div>
    </>
  );

  const renderCTAContent = () => (
    <>
      {/* Icon */}
      <div className="h-8 w-8 relative mb-4 flex items-center justify-start">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 group-hover:text-amber-400 transition-colors">
          <path d="M5 12h14"/><path d="M12 5v14"/>
        </svg>
      </div>
      
      {/* Content */}
      <div className="flex flex-col">
        <h3 className="text-xs font-bold text-white tracking-wider font-mono uppercase mb-2">
          PARTNER WITH US
        </h3>
        <span className="inline-flex items-center w-max bg-transparent px-2 py-0.5 text-[10px] font-mono text-zinc-400 border border-white/10 rounded-sm my-2">
          Ecosystem Access
        </span>
        <p className="text-[11px] text-zinc-500 leading-relaxed">
          Building developer infrastructure or tooling? Integrate your stack directly into Jennefer.
        </p>
        <div className="text-[10px] font-mono text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1 mt-4">
          Get in touch &rarr;
        </div>
      </div>
    </>
  );

  return (
    <section className="w-full bg-[#07080c] relative">
      
      {/* ==================================== */}
      {/* DESKTOP VIEW (Pinned Scrollytelling) */}
      {/* ==================================== */}
      <div ref={containerRef} className="hidden md:block h-[300vh] w-full relative">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
            <motion.div 
              style={{ 
                opacity: useTransform(scrollYProgress, [0, 0.1, 0.92, 1], [0, 1, 1, 0], { clamp: true }) 
              }}
              className="grid grid-cols-2 md:grid-cols-5 bg-black/40 border border-white/[0.1] shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-sm"
            >
              {partners.map((partner, index) => {
                const totalItems = partners.length + 1;
                const staggerDelay = 0.70 / totalItems;
                const start = index * staggerDelay;
                const end = start + 0.15;
                
                const y = useTransform(scrollYProgress, [start, end, 0.92, 1], [50, 0, 0, -50], { clamp: true });
                const opacity = useTransform(scrollYProgress, [start, end, 0.92, 1], [0, 1, 1, 0], { clamp: true });
                
                return (
                  <motion.div 
                    key={index} 
                    style={{ y, opacity }}
                    className="flex flex-col bg-[#050505]/80 border border-white/[0.03] p-5 md:p-6 transition-colors hover:bg-[#080808]"
                  >
                    {renderCardContent(partner)}
                  </motion.div>
                );
              })}
              
              <motion.a 
                href="mailto:contact@jennefer.dev?subject=Ecosystem%20Partnership"
                style={{
                  y: useTransform(
                    scrollYProgress, 
                    [partners.length * (0.70 / (partners.length + 1)), (partners.length * (0.70 / (partners.length + 1))) + 0.15, 0.92, 1], 
                    [50, 0, 0, -50], 
                    { clamp: true }
                  ),
                  opacity: useTransform(
                    scrollYProgress, 
                    [partners.length * (0.70 / (partners.length + 1)), (partners.length * (0.70 / (partners.length + 1))) + 0.15, 0.92, 1], 
                    [0, 1, 1, 0], 
                    { clamp: true }
                  )
                }}
                className={`flex flex-col bg-[#0d0f12]/60 hover:bg-[#12151a] border border-dashed border-white/20 hover:border-amber-500/40 p-5 md:p-6 transition-all duration-300 justify-between group cursor-pointer ${ctaSpanClass}`}
              >
                {renderCTAContent()}
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ==================================== */}
      {/* MOBILE VIEW (Standard Flow Stack)    */}
      {/* ==================================== */}
      <div className="block md:hidden w-full px-4 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {partners.map((partner, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="flex flex-col bg-[#050505]/80 border border-white/[0.03] p-6 transition-colors"
            >
              {renderCardContent(partner)}
            </motion.div>
          ))}
          
          <motion.a 
            href="mailto:contact@jennefer.dev?subject=Ecosystem%20Partnership"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: partners.length * 0.05, duration: 0.5 }}
            className="flex flex-col bg-[#0d0f12]/60 border border-dashed border-white/20 p-6 transition-colors justify-between group"
          >
            {renderCTAContent()}
          </motion.a>
        </div>
      </div>

    </section>
  );
}
