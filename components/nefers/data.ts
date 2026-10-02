export type NeferId = "pixel" | "loop" | "byte" | "patch";

export type VoiceLine = { src: string; text: string };

export type Nefer = {
  id: NeferId;
  name: string;
  role: string;
  tagline: string;
  description: string;
  superpower: string;
  weakness: string;
  accent: string;
  stats: { label: string; value: string }[];
  intro: VoiceLine;
  team: VoiceLine;
  pokes: VoiceLine[];
};

const line = (id: NeferId, key: string, text: string): VoiceLine => ({ src: `/audio/nefers/${id}-${key}.mp3`, text });

// Order matters: this is the order of chapters and of the team pipeline.
export const NEFERS: Nefer[] = [
  {
    id: "pixel",
    name: "Pixel",
    role: "CEO · UX Designer",
    tagline: "Has strong opinions about your padding.",
    description:
      "Pixel sets the vision and owns the experience. Every task starts with the same two questions: who is this for, and does it feel right?",
    superpower: "Spots a 1px misalignment from across the room.",
    weakness: "Rewrote the button label 14 times. Still not sure.",
    accent: "#ff6b81",
    stats: [
      { label: "Pixels nudged", value: "1.2M" },
      { label: "Vision decks", value: "37" },
      { label: "Meetings with self", value: "Daily" },
    ],
    intro: line("pixel", "intro", "Hi! I'm Pixel. CEO, UX designer, and keeper of the vision. If it's off by one pixel… I will notice."),
    team: line("pixel", "team", "Team, we need a login page. Make it beautiful."),
    pokes: [
      line("pixel", "poke-1", "Careful! That's my good side."),
      line("pixel", "poke-2", "Ooh, nice click. Very intuitive."),
      line("pixel", "poke-3", "Hey! I'm in a meeting. With myself."),
    ],
  },
  {
    id: "loop",
    name: "Loop",
    role: "Planner",
    tagline: "Turns chaos into checklists.",
    description:
      "Loop breaks a big idea into a graph of small, ordered steps, then makes sure nobody starts step four before step two is done.",
    superpower: "Sees dependencies before they bite.",
    weakness: "Has a plan for planning the plan.",
    accent: "#ffb547",
    stats: [
      { label: "Tasks split", value: "48,210" },
      { label: "Steps out of order", value: "0" },
      { label: "Sticky notes", value: "∞" },
    ],
    intro: line("loop", "intro", "Hey, I'm Loop, the planner. Give me any big, scary idea, and I'll turn it into tiny, tidy steps."),
    team: line("loop", "team", "Planned! Four steps, zero chaos."),
    pokes: [
      line("loop", "poke-1", "Step one: stop poking. Step two: keep scrolling."),
      line("loop", "poke-2", "That wasn't in the plan… adding it now!"),
      line("loop", "poke-3", "Hmm. Dependencies detected."),
    ],
  },
  {
    id: "byte",
    name: "Byte",
    role: "Coder",
    tagline: "Headphones on. Ship mode.",
    description:
      "Byte writes the code, runs it, and keeps fixing it until every check is green. Fast, focused, slightly over-caffeinated.",
    superpower: "Types faster than you can say “refactor”.",
    weakness: "Names variables thing2.",
    accent: "#4d7cff",
    stats: [
      { label: "Lines written", value: "2.4M" },
      { label: "Coffees today", value: "7" },
      { label: "Tabs or spaces", value: "Yes" },
    ],
    intro: line("byte", "intro", "Yo! Byte here. I write the code. Headphones on, coffee in… ship it."),
    team: line("byte", "team", "Code's done. That was fast, right?"),
    pokes: [
      line("byte", "poke-1", "Shh! I'm in the zone!"),
      line("byte", "poke-2", "Compiling… compiling… okay, what's up?"),
      line("byte", "poke-3", "Did you just interrupt a for loop?"),
    ],
  },
  {
    id: "patch",
    name: "Patch",
    role: "Reviewer",
    tagline: "LGTM is earned, not given.",
    description:
      "Patch reads every diff line by line, runs the checks, and blocks anything risky before it ever reaches you.",
    superpower: "Finds the bug on line 1,847 of 2,000.",
    weakness: "Has never said “just a nit” and meant it.",
    accent: "#3ee6a8",
    stats: [
      { label: "Bugs caught", value: "12,408" },
      { label: "Approvals", value: "Rarely" },
      { label: "Diffs read", value: "All" },
    ],
    intro: line("patch", "intro", "Patch. Reviewer. I read every line… so you don't ship the scary ones."),
    team: line("patch", "team", "Approved. …This time."),
    pokes: [
      line("patch", "poke-1", "Requested changes: less poking."),
      line("patch", "poke-2", "Looks good to me. Mostly."),
      line("patch", "poke-3", "I found a bug. It's you."),
    ],
  },
];

export const NEFER_BY_ID = Object.fromEntries(NEFERS.map((nefer) => [nefer.id, nefer])) as Record<NeferId, Nefer>;

export const SFX = { pop: "/audio/nefers/sfx-pop.mp3", boing: "/audio/nefers/sfx-boing.mp3" };

// Sohbet formu (waitlist) replikleri.
export const JOIN = {
  nameAsk: line("pixel", "join-ask", "First things first. What should we call you?"),
  nameReact: line("pixel", "join-react", "Love that name. Very on brand."),
  welcome: line("pixel", "join-welcome", "Welcome to the squad! We're so happy you're here."),
  reasonAsk: line("loop", "join-ask", "So… what are we building together?"),
  reasonReact: line("loop", "join-react", "Ooh. I already have a plan for that."),
  emailAsk: line("byte", "join-ask", "Where should I send the build? Drop your email."),
  emailError: line("byte", "join-error", "Hmm, that doesn't compile. Try again?"),
  consentAsk: line("patch", "join-ask", "Reviewing your application… Looks clean. One last check: okay if we email you?"),
  fail: line("patch", "join-fail", "Something broke. Not my fault… try again?"),
  full: line("patch", "join-full", "Sorry, the squad is full right now. Check back soon."),
};

// Ana sayfa hero demosu replikleri (components/HeroApp.tsx). Sıra: brief, plan, code, review.
export const HERO = {
  team: [
    line("pixel", "hero-brief", "New task! A login page. I'll keep it simple: email, password, zero friction."),
    line("loop", "hero-plan", "Four steps. Layout, form, session, tests. Byte, you're up."),
    line("byte", "hero-code", "On it. And relax, it all runs locally. Your code never leaves this machine."),
    line("patch", "hero-review", "Tests pass. One nit: thing2 is not a name. Your call, boss."),
  ],
  fix: [
    line("byte", "hero-fix", "Fine. thing2 is now session. Happy?"),
    line("patch", "hero-fix", "Much better. Back to you."),
  ],
  bold: line("patch", "hero-bold", "Shipping thing2? Bold. Okay."),
  merged: line("pixel", "hero-merged", "Merged! We did the work, you made the call. That's Jennefer."),
};
