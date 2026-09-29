import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight, ArrowLeft, Check } from "lucide-react";
import Footer from "@/components/Footer";
import JenneferLogo from "@/components/JenneferLogo";
import { getRoadmapIssues, type RoadmapIssue } from "@/lib/linear";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Roadmap | Jennefer",
  description: "A dated timeline of what Jennefer is building and what has shipped.",
};

type TimelineDay = { date: string; issues: RoadmapIssue[] };
type TimelineMonth = { key: string; days: TimelineDay[] };

function utcDate(date: string) {
  return new Date(`${date}T12:00:00Z`);
}

function validDay(value: string | null): string | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const parsed = utcDate(value);
  return Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value ? null : value;
}

function timelineDate(issue: RoadmapIssue) {
  const completionDate = issue.state?.type === "completed" ? issue.completedAt?.slice(0, 10) ?? null : null;
  return validDay(completionDate) ?? validDay(issue.dueDate);
}

function formatDate(date: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(utcDate(date));
}

function plainSummary(description: string | null) {
  if (!description) return null;
  return description
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_#>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function groupTimeline(issues: RoadmapIssue[]) {
  const byDate = new Map<string, RoadmapIssue[]>();
  const unscheduled: RoadmapIssue[] = [];

  for (const issue of issues) {
    const date = timelineDate(issue);
    if (!date) {
      unscheduled.push(issue);
      continue;
    }
    byDate.set(date, [...(byDate.get(date) ?? []), issue]);
  }

  const months: TimelineMonth[] = [];
  for (const [date, dayIssues] of [...byDate.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const key = date.slice(0, 7);
    const month = months.at(-1);
    if (month?.key === key) month.days.push({ date, issues: dayIssues });
    else months.push({ key, days: [{ date, issues: dayIssues }] });
  }

  return { months, unscheduled };
}

function statusLabel(issue: RoadmapIssue) {
  if (issue.state?.type === "completed") return "Shipped";
  if (issue.state?.type === "started") return "In progress";
  return "Planned";
}

function TimelineItem({ issue }: { issue: RoadmapIssue }) {
  const summary = plainSummary(issue.description);
  const status = statusLabel(issue);
  const isShipped = issue.state?.type === "completed";

  return (
    <article className={`group border-b border-white/10 py-6 last:border-b-0 sm:py-7 ${isShipped ? "relative -ml-4 border-l-2 border-l-[#a6d8bd] bg-[linear-gradient(90deg,rgba(166,216,189,0.10),rgba(166,216,189,0.025)_55%,transparent)] pl-[14px] pr-4 sm:-ml-5 sm:pl-[18px]" : ""}`}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em]">
        <span className="text-[#9b9da5]">{issue.identifier}</span>
        <span className="h-1 w-1 rounded-full bg-[#72757d]" aria-hidden="true" />
        <span className={`inline-flex items-center gap-2 ${isShipped ? "font-semibold text-[#b7e4c9]" : status === "In progress" ? "text-[#e3e4e7]" : "text-[#9b9da5]"}`}>
          {isShipped && <span className="flex h-4 w-4 items-center justify-center rounded-[3px] bg-[#a6d8bd] text-[#102018]" aria-hidden="true"><Check className="h-3 w-3" strokeWidth={2.5} /></span>}
          {status}
        </span>
      </div>
      <h3 className="mt-3 max-w-[36ch] text-[clamp(1.35rem,2.1vw,2rem)] font-semibold leading-[1.18] tracking-[-0.04em] text-[#f0f0f1]">{issue.title}</h3>
      {summary && <p className="mt-3 line-clamp-3 max-w-[68ch] text-sm leading-6 text-[#b8bac1] sm:text-[15px]">{summary}</p>}
    </article>
  );
}

function DayRow({ day, today }: { day: TimelineDay; today: string }) {
  const isToday = day.date === today;
  const isPast = day.date < today;
  return (
    <div id={`date-${day.date}`} className="grid scroll-mt-28 grid-cols-[74px_26px_minmax(0,1fr)] sm:grid-cols-[122px_42px_minmax(0,1fr)]">
      <div className="pt-6 pr-2 sm:pt-7">
        <time dateTime={day.date} aria-label={formatDate(day.date, { weekday: "long", day: "numeric", month: "long", year: "numeric" })} className="block">
          <span className={`block text-[clamp(2.3rem,4vw,4rem)] font-semibold leading-none tracking-[-0.07em] ${isPast ? "text-[#a4a6ae]" : "text-[#f0f0f1]"}`}>{day.date.slice(8, 10)}</span>
          <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.13em] text-[#a6a8b0]">{formatDate(day.date, { month: "short" })}</span>
          <span className="mt-1 block text-xs text-[#81838c]">{formatDate(day.date, { weekday: "long" })}</span>
        </time>
      </div>
      <div className="relative" aria-hidden="true">
        <div className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-white/12" />
        <div className={`absolute top-[35px] left-1/2 h-[9px] w-[9px] -translate-x-1/2 rounded-full border ${isToday ? "border-[#f0f0f1] bg-[#f0f0f1] shadow-[0_0_0_6px_rgba(240,240,241,0.08)]" : isPast ? "border-[#8a8c94] bg-[#8a8c94]" : "border-[#b1b3bb] bg-[#090a0c]"}`} />
      </div>
      <div className="min-w-0 border-t border-white/10">
        {isToday && <p className="pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#e5e5e7]">Today</p>}
        {day.issues.map((issue) => <TimelineItem key={issue.id} issue={issue} />)}
      </div>
    </div>
  );
}

export default async function RoadmapPage() {
  let issues: RoadmapIssue[] = [];
  let unavailable = false;
  try {
    issues = await getRoadmapIssues();
  } catch (error) {
    unavailable = true;
    console.error("Roadmap could not load from Linear:", error);
  }

  const today = new Date().toISOString().slice(0, 10);
  const { months, unscheduled } = groupTimeline(issues);
  const datedDays = months.flatMap((month) => month.days);
  const nextDay = datedDays.find((day) => day.date >= today);

  return (
    <main id="main" className="min-h-screen bg-[#090a0c] text-[#f0f0f1] selection:bg-white/25 selection:text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090a0c]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
          <Link href="/" className="flex shrink-0 items-center gap-3 text-white" aria-label="Jennefer home"><JenneferLogo className="h-8 w-8" /><span className="text-lg font-semibold tracking-[-0.055em]">Jennefer</span></Link>
          <Link href="/" className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-[#b8bac1] transition-colors hover:text-white"><ArrowLeft className="h-4 w-4" strokeWidth={1.7} /> Back to site</Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1380px] px-5 pb-28 sm:px-8 lg:px-12">
        <section className="border-b border-white/15 pb-14 pt-20 sm:pb-20 sm:pt-28" aria-labelledby="roadmap-title">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#a9abb2]">Jennefer / Public roadmap</p>
          <div className="mt-7 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,390px)] lg:items-end">
            <h1 id="roadmap-title" className="max-w-[850px] text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-[0.96] tracking-[-0.075em]">The road<br /><span className="text-[#8f9199]">ahead.</span></h1>
            <div>
              <p className="max-w-[390px] text-base leading-7 text-[#b8bac1] sm:text-lg">Follow the work by date, from what we have shipped to what we are building next.</p>
              {nextDay && <a href={`#date-${nextDay.date}`} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#f0f0f1] transition-colors hover:text-white">Explore the timeline <ArrowDownRight className="h-4 w-4" strokeWidth={1.6} /></a>}
            </div>
          </div>
        </section>

        {unavailable ? (
          <div className="border-b border-white/10 py-20">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#9b9da5]">Roadmap unavailable</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">We couldn&apos;t load the latest updates.</h2>
            <p className="mt-3 text-sm text-[#b8bac1]">Please check back shortly.</p>
          </div>
        ) : issues.length === 0 ? (
          <div className="border-b border-white/10 py-20">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#9b9da5]">Roadmap</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">No updates to show yet.</h2>
            <p className="mt-3 text-sm text-[#b8bac1]">Updates will appear here as issues are labeled public-roadmap in Linear.</p>
          </div>
        ) : (
          <div id="timeline" className="mx-auto max-w-[980px] pt-14 lg:pt-20">
            <div className="min-w-0">
              {months.map((month, index) => (
                <section key={month.key} className="mb-14 last:mb-0" aria-labelledby={`month-${month.key}`}>
                  <div className="mb-7 flex items-end justify-between gap-4 border-b border-white/15 pb-5">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#898b94]">{String(index + 1).padStart(2, "0")} / {month.key.slice(0, 4)}</p>
                      <h2 id={`month-${month.key}`} className="mt-2 text-[clamp(2rem,4vw,3.75rem)] font-semibold leading-none tracking-[-0.065em]">{formatDate(`${month.key}-01`, { month: "long", year: "numeric" })}</h2>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#898b94]">{month.days.length} {month.days.length === 1 ? "date" : "dates"}</span>
                  </div>
                  {month.days.map((day) => <DayRow key={day.date} day={day} today={today} />)}
                </section>
              ))}

              {unscheduled.length > 0 && (
                <section className="border-t border-white/15 pt-8" aria-labelledby="unscheduled-title">
                  <div className="grid grid-cols-[74px_26px_minmax(0,1fr)] sm:grid-cols-[122px_42px_minmax(0,1fr)]">
                    <div className="pt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#898b94]">TBA</div>
                    <div className="relative" aria-hidden="true"><div className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-white/12" /><div className="absolute top-3 left-1/2 h-[9px] w-[9px] -translate-x-1/2 rotate-45 border border-[#8a8c94] bg-[#090a0c]" /></div>
                    <div className="min-w-0">
                      <h2 id="unscheduled-title" className="mb-4 text-xl font-semibold tracking-[-0.04em]">Date to be announced</h2>
                      {unscheduled.map((issue) => <TimelineItem key={issue.id} issue={issue} />)}
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer homeLinks />
    </main>
  );
}
