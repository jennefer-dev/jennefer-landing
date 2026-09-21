"use client";

import React, { useState } from "react";
import { CheckCircle2, Loader2, Send, Sparkles, Check } from "lucide-react";

export default function WaitlistSection({ isLocked = false }: { isLocked?: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEntertainmentChecked, setIsEntertainmentChecked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, reason }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to join waitlist. Please try again.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="waitlist"
      className="relative py-24 sm:py-32 bg-[#000000] overflow-hidden"
    >
      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge: borderless, white text */}
        <div className="inline-flex items-center gap-2 text-xs font-mono text-white mb-6">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Closed Alpha Access</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-white leading-[1.1] mb-4">
          Join the waitlist.
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-12 max-w-md mx-auto">
          We're onboarding engineering teams in batches to ensure maximum local performance and hardware tuning.
        </p>

        {isLocked ? (
          <div className="p-4 text-center mt-8">
            <h3 className="text-lg font-semibold text-amber-400 mb-2">Waitlist is Full</h3>
            <p className="text-xs sm:text-sm text-slate-400 font-mono leading-relaxed">
              We have reached our maximum capacity for the current batch. Please check back later as we expand the list soon.
            </p>
          </div>
        ) : submitted ? (
          <div className="p-4 text-center mt-8 animate-in fade-in zoom-in-95 duration-300">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-1">Request Received</h3>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              A confirmation email has been dispatched to <span className="text-white">{email}</span> from <span className="text-cyan-400">team@jennefer.dev</span>.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setName("");
                setEmail("");
                setReason("");
              }}
              className="mt-6 text-xs text-cyan-400 hover:underline font-mono"
            >
              Submit another response
            </button>
          </div>
        ) : (
          <div className="mt-8 w-full max-w-xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="text-left space-y-6"
            >
              <div>
                <label className="block text-xs font-mono text-white font-bold uppercase tracking-wider mb-2">
                  Name / Organization
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace / Acme Corp"
                  required
                  className="w-full px-5 py-3.5 rounded-none bg-[#111] hover:bg-[#161616] text-white placeholder:text-zinc-600 text-sm font-sans focus:outline-none focus:bg-[#1a1a1a] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white font-bold uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ada@example.com"
                  required
                  className="w-full px-5 py-3.5 rounded-none bg-[#111] hover:bg-[#161616] text-white placeholder:text-zinc-600 text-sm font-sans focus:outline-none focus:bg-[#1a1a1a] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white font-bold uppercase tracking-wider mb-2">
                  Why do you want to use Jennefer?
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  placeholder="e.g. Air-gapped proprietary codebase, zero cloud token bills, autonomous agent swarm testing..."
                  required
                  className="w-full px-5 py-3.5 rounded-none bg-[#111] hover:bg-[#161616] text-white placeholder:text-zinc-600 text-sm font-sans focus:outline-none focus:bg-[#1a1a1a] transition-colors resize-none"
                />
              </div>

              {errorMessage && (
                <p className="text-xs font-mono text-rose-400">
                  {errorMessage}
                </p>
              )}

              <button
                type="button"
                role="checkbox"
                aria-checked={isEntertainmentChecked}
                onClick={() => setIsEntertainmentChecked(!isEntertainmentChecked)}
                className="flex items-start gap-3 mt-4 mb-2 text-left group w-full focus:outline-none"
              >
                <div className={`mt-0.5 sm:mt-1 w-5 h-5 sm:w-6 sm:h-6 shrink-0 flex items-center justify-center border transition-all duration-200 ${
                  isEntertainmentChecked 
                    ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_10px_rgba(34,211,238,0.2)]' 
                    : 'border-zinc-700 bg-[#111] group-hover:border-zinc-500'
                }`}>
                  <Check strokeWidth={3} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 transition-transform duration-200 ${isEntertainmentChecked ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
                </div>
                <span className="text-xs sm:text-sm font-mono text-slate-400 leading-relaxed select-none group-hover:text-slate-300 transition-colors">
                  I agree to the processing of my information for early access. Jennefer never trains on or shares your personal data.
                </span>
              </button>

              <button
                type="submit"
                disabled={loading || !isEntertainmentChecked}
                className="w-full h-12 mt-2 rounded-none bg-white text-black font-bold text-sm hover:bg-neutral-200 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#07080c]" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Request Early Access</span>
                    <Send className="w-4 h-4 text-[#07080c]" />
                  </>
                )}
              </button>
                
              <p className="text-center text-[10px] font-mono text-slate-500 mt-6">
                Confirmation email sent directly from <span className="text-white">team@jennefer.dev</span>.
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
