import React from "react";
import Image from "next/image";
import { Globe } from "lucide-react";

export default function LeadershipSection() {
  return (
    <section className="relative w-full bg-[#07080c] py-24 sm:py-32 border-t border-white/[0.05] overflow-hidden" id="leadership">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Built by Engineers, <span className="text-cyan-400">for Engineers</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative group p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative bg-[#0b0c10] rounded-2xl p-8 sm:p-10 border border-white/[0.02] flex flex-col sm:flex-row items-center sm:items-start gap-8">
              
              <div className="shrink-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-white/10 flex items-center justify-center overflow-hidden relative shadow-xl">
                  <img 
                    src="https://avatars.githubusercontent.com/u/61010746?v=4" 
                    alt="Ahmet Enes Keçeci" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  Ahmet Enes Keçeci
                </h3>
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span className="text-xs font-mono text-cyan-300 font-medium">Founder & Lead Architect</span>
                </div>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Mathematical engineer & systems developer building autonomous multi-agent developer workflows and next-generation IDE runtimes.
                </p>

                <div className="flex items-center gap-4">
                  <a 
                    href="https://www.linkedin.com/in/ahmet-enes/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:border-white/[0.1] transition-all text-slate-300 hover:text-white"
                    title="LinkedIn"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a 
                    href="https://github.com/AhmetEnesKCC" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:border-white/[0.1] transition-all text-slate-300 hover:text-white"
                    title="GitHub"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  <a 
                    href="https://eneskececi.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:border-white/[0.1] transition-all text-slate-300 hover:text-white"
                    title="Personal Web"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
