import React from "react";

export default function JenneferLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`inline-block shrink-0 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="100%"
        height="100%"
      >
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#12151f" />
            <stop offset="100%" stopColor="#08090d" />
          </linearGradient>

          <filter id="electricGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#3b82f6" floodOpacity="0.6"/>
          </filter>

          <linearGradient id="neuralStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        {/* Squircle Base */}
        <rect x="16" y="16" width="480" height="480" rx="108" fill="url(#bgGrad)" stroke="#1e293b" strokeWidth="2"/>

        {/* Subtle Inner Grid Line Accent */}
        <rect x="32" y="32" width="448" height="448" rx="92" fill="none" stroke="#ffffff" strokeOpacity="0.03" strokeWidth="1.5"/>

        {/* Neural J Glyph */}
        <path d="M220 120 L330 120" stroke="#ffffff" strokeWidth="24" strokeLinecap="round"/>
        <path d="M300 120 L300 280" stroke="#ffffff" strokeWidth="24" strokeLinecap="round"/>

        <path d="M300 280 Q300 360 220 360 L180 360" 
              stroke="url(#neuralStroke)" 
              strokeWidth="16" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              fill="none" 
              filter="url(#electricGlow)"/>

        <path d="M280 310 L230 360 L180 310" 
              stroke="#3b82f6" 
              strokeWidth="4" 
              strokeDasharray="6 6" 
              strokeOpacity="0.7"
              fill="none"/>

        {/* NODE 1: Supervisor Node */}
        <circle cx="288" cy="304" r="10" fill="#3b82f6" />
        <circle cx="288" cy="304" r="5" fill="#ffffff" />

        {/* NODE 2: Architect Node */}
        <circle cx="230" cy="360" r="13" fill="#2563eb" filter="url(#electricGlow)" />
        <circle cx="230" cy="360" r="6" fill="#ffffff" />

        {/* NODE 3: Coder Node */}
        <circle cx="170" cy="330" r="11" fill="#3b82f6" />
        <circle cx="170" cy="330" r="5" fill="#ffffff" />

        <circle cx="170" cy="330" r="18" fill="none" stroke="#60a5fa" strokeWidth="2" strokeOpacity="0.5"/>
      </svg>
    </div>
  );
}
