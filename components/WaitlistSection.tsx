"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, CheckCircle2, Loader2 } from "lucide-react";

export default function WaitlistSection({ isLocked = false }: { isLocked?: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [hasConsent, setHasConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || loading || !hasConsent) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, reason }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to join waitlist. Please try again.");
      setSubmitted(true);
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setReason("");
    setHasConsent(false);
    setErrorMessage("");
  };

  return (
    <section id="waitlist" className="waitlist-stage relative overflow-hidden border-t border-white/10 px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <div className="relative mx-auto grid max-w-[1380px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="relative flex flex-col justify-between overflow-hidden pb-4 lg:min-h-[680px]">
          <div className="relative z-10">
            <div className="mb-12 flex items-center gap-4 text-sm font-medium text-[#b5b6bd]"><span className="h-px w-8 bg-white/50" /> Private preview</div>
            <h2 className="max-w-[720px] text-[clamp(3.5rem,6vw,7rem)] font-semibold leading-[0.98] tracking-[-0.075em] text-[#f1f1f1]">
              Build with<br />control.<br /><span className="text-[#9a9ca4]">Start here.</span>
            </h2>
            <p className="mt-9 max-w-md text-base leading-[1.75] text-[#b6b8bf] sm:text-lg">
              Tell us about your team. We will be in touch when access opens.
            </p>
          </div>
          <div className="relative z-10 mt-14 hidden items-center gap-4 border-t border-white/15 pt-6 text-sm text-[#94969e] lg:flex"><span className="h-2 w-2 bg-white" /> A private workspace for serious engineering.</div>
          <span className="waitlist-mark pointer-events-none absolute -bottom-24 left-0 hidden select-none lg:block" aria-hidden="true">J</span>
        </div>

        <div className="self-start border border-white/15 bg-[#151619] p-6 sm:p-10 lg:p-12">
          <div className="mb-10 flex items-start justify-between gap-6 border-b border-white/15 pb-7">
            <div><p className="mb-2 text-sm text-[#999ba3]">Jennefer / Early access</p><h3 className="text-2xl font-semibold tracking-[-0.045em] text-white sm:text-3xl">Request access</h3></div>
            <ArrowUpRight className="h-6 w-6 shrink-0 text-[#bfc0c6]" strokeWidth={1.5} aria-hidden="true" />
          </div>

          {isLocked ? (
            <div className="flex min-h-[400px] flex-col justify-center" role="status">
              <span className="mb-8 h-px w-14 bg-white/60" />
              <h4 className="text-[clamp(2.4rem,4vw,4rem)] font-semibold leading-tight tracking-[-0.06em] text-white">The waitlist<br />is full.</h4>
              <p className="mt-6 max-w-sm text-base leading-7 text-[#aeb0b8]">Please check back when more places open.</p>
            </div>
          ) : submitted ? (
            <div className="flex min-h-[400px] flex-col justify-center" role="status" aria-live="polite">
              <CheckCircle2 className="mb-8 h-10 w-10 text-white" strokeWidth={1.4} aria-hidden="true" />
              <h4 className="text-[clamp(2.4rem,4vw,4rem)] font-semibold leading-tight tracking-[-0.06em] text-white">Request<br />received.</h4>
              <p className="mt-6 max-w-sm text-base leading-7 text-[#aeb0b8]">We sent a confirmation to <span className="text-white">{email}</span>.</p>
              <button type="button" onClick={resetForm} className="mt-9 w-fit border-b border-white/50 pb-2 text-sm font-semibold text-white transition-colors hover:border-white">Submit another response</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="border-b border-white/20 pb-2 transition-colors focus-within:border-white">
                  <label htmlFor="waitlist-name" className="block text-sm font-medium text-[#b8bac1]">Name or organization</label>
                  <input id="waitlist-name" type="text" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required className="mt-3 w-full border-0 bg-transparent py-2 text-base text-white placeholder:text-[#74767e] focus:outline-none" />
                </div>
                <div className="border-b border-white/20 pb-2 transition-colors focus-within:border-white">
                  <label htmlFor="waitlist-email" className="block text-sm font-medium text-[#b8bac1]">Work email</label>
                  <input id="waitlist-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" required className="mt-3 w-full border-0 bg-transparent py-2 text-base text-white placeholder:text-[#74767e] focus:outline-none" />
                </div>
              </div>

              <div className="border-b border-white/20 pb-2 transition-colors focus-within:border-white">
                <label htmlFor="waitlist-reason" className="block text-sm font-medium text-[#b8bac1]">What are you building?</label>
                <textarea id="waitlist-reason" value={reason} onChange={(event) => setReason(event.target.value)} rows={3} placeholder="A few words about your team or project" required className="mt-3 w-full resize-none border-0 bg-transparent py-2 text-base leading-7 text-white placeholder:text-[#74767e] focus:outline-none" />
              </div>

              <label className="flex cursor-pointer items-start gap-4 text-sm leading-6 text-[#b8bac1]">
                <input type="checkbox" checked={hasConsent} onChange={(event) => setHasConsent(event.target.checked)} required className="peer sr-only" />
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center border border-white/35 transition-colors peer-checked:border-white peer-checked:bg-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-white"><Check className={`h-3.5 w-3.5 text-[#121316] ${hasConsent ? "opacity-100" : "opacity-0"}`} strokeWidth={2.5} /></span>
                <span>I agree to the processing of my information for early access.</span>
              </label>

              {errorMessage && <p role="alert" className="text-sm text-[#f0a7a7]">{errorMessage}</p>}

              <button type="submit" disabled={loading || !hasConsent} className="flex min-h-14 w-full items-center justify-between bg-[#e7e7e9] px-5 text-sm font-semibold text-[#101114] transition-colors hover:bg-white active:bg-[#d5d5d8] disabled:cursor-not-allowed disabled:opacity-50">
                <span>{loading ? "Submitting..." : "Request early access"}</span>
                {loading ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <ArrowUpRight className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
