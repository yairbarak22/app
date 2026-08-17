import type { Scenario } from "../types";

/**
 * YEAR 2 (age 23) — first real job, first real pain.
 * Pools: y2-bigtech-oncall (+3 variants), y2-startup-ramen (+3 variants).
 */
export const YEAR_02: Scenario[] = [
  // ---------------------------------------------------------------- Big Tech
  {
    id: "y2-bigtech-oncall",
    year: 2,
    age: 23,
    headline: "The Pager Never Sleeps",
    text:
      "You've been handed the on-call rotation for a legacy service written in 2011 by someone who now farms goats in Portugal. It pages at 3 AM. Every night. Your manager calls it 'a great growth opportunity.'",
    choices: [
      {
        id: "own-the-service",
        label: "Own it. Become the only person who understands the beast",
        outcome: {
          text:
            "You rewrite the runbook, tame the alerts, and become load-bearing infrastructure yourself. Promo to SWE II, a fat RSU refresher — and the creeping realization that you can never, ever quit.",
          effect: { netWorth: 60_000, burnout: 25, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
      {
        id: "quiet-quit",
        label: "Do the minimum. Protect your peace, king",
        outcome: {
          text:
            "You mute the pager, coast through sprint planning, and rediscover hobbies. Your RSUs still vest. Your manager writes 'meets some expectations' on your review, which is a sentence that will age poorly.",
          effect: { netWorth: 40_000, burnout: -5, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
    ],
  },
  {
    id: "y2-hackweek-hero",
    year: 2,
    age: 23,
    slot: "y2-bigtech-oncall",
    headline: "Hack Week Hero",
    text:
      "Your hack week project — a tool that auto-writes the weekly status reports nobody reads — goes company-viral. Three VPs want demos. Your actual manager finds out from someone else's newsletter and is doing a face about it.",
    choices: [
      {
        id: "pitch-the-vp",
        label: "Pitch it to the VPs — ride this all the way up",
        outcome: {
          text:
            "You demo to leadership in a room with real windows. The tool becomes a funded team of one (you), and your name starts appearing in decks you've never seen. Visibility: acquired. Target on back: also acquired.",
          effect: { netWorth: 55_000, burnout: 20, title: "SWE II (High Visibility)" },
          next: "y3-bigtech-efficiency",
        },
      },
      {
        id: "credit-the-team",
        label: "Share the credit with your whole team",
        outcome: {
          text:
            "You put four names on the demo slide and your teammates would now follow you into a production incident at 4 AM. The VPs remember the tool vaguely. Your team remembers exactly. Long game: engaged.",
          effect: { netWorth: 42_000, burnout: 5, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
      {
        id: "hoard-it",
        label: "Keep it as your secret personal productivity edge",
        outcome: {
          text:
            "You quietly automate a third of your own job and tell no one. Your output looks superhuman; your calendar stays empty. It's not a career strategy, exactly. It's better described as a heist.",
          effect: { netWorth: 48_000, burnout: -5, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
    ],
  },
  {
    id: "y2-rto-mandate",
    year: 2,
    age: 23,
    slot: "y2-bigtech-oncall",
    headline: "Return to Office",
    text:
      "A company-wide memo announces a 'return to our collaboration culture': three badge-ins a week, enforced by a dashboard. Your commute is 90 minutes. The memo was sent by an executive who lives on a ranch in Montana.",
    choices: [
      {
        id: "comply-commute",
        label: "Comply. The podcast backlog isn't going to listen to itself",
        outcome: {
          text:
            "You become a connoisseur of park-and-rides and pre-9AM parking spots. The office is half-empty anyway, but attendance is green on the dashboard, and the dashboard is what gets promoted.",
          effect: { netWorth: 45_000, burnout: 15, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
      {
        id: "coffee-badge",
        label: "Master the art of the coffee badge",
        outcome: {
          text:
            "Badge in, grab a cold brew, wave at a director, badge out. Your attendance metrics are impeccable and your productivity never left your home office. It's not lying. It's... metrics-driven presence.",
          effect: { netWorth: 42_000, burnout: 0, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
      {
        id: "quit-for-remote",
        label: "Quit for a remote-first startup on principle",
        outcome: {
          text:
            "You trade the badge dashboard for a startup that measures output instead of presence. The pay is a haircut; the equity is a lottery ticket; the commute is eleven steps. Principles: expensive, worth it.",
          effect: { netWorth: 20_000, burnout: 5, title: "Senior Eng @ Startup" },
          next: "y3-startup-seriesa",
        },
      },
    ],
  },
  {
    id: "y2-the-outage",
    year: 2,
    age: 23,
    slot: "y2-bigtech-oncall",
    headline: "You Caused The Outage",
    text:
      "Your Friday-afternoon config change takes down checkout for 43 minutes. The incident channel gains 400 members in real time. Somewhere, a status page is turning red because of you, personally.",
    choices: [
      {
        id: "own-it-publicly",
        label: "Own it — write the blameless postmortem yourself",
        outcome: {
          text:
            "Your postmortem is so honest and thorough it gets taught in onboarding. 'The engineer who owned it' becomes your origin story. Turns out integrity under fire is the rarest skill in the building.",
          effect: { netWorth: 50_000, burnout: 20, title: "SWE II (Battle-Tested)" },
          next: "y3-bigtech-efficiency",
        },
      },
      {
        id: "quiet-fix",
        label: "Fix it fast and let the incident report stay vague",
        outcome: {
          text:
            "The revert lands in minutes, the report says 'configuration drift,' and nobody digs deeper. You got away with it. You know you got away with it. The knowing is its own tax, paid nightly.",
          effect: { netWorth: 45_000, burnout: 15, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
      {
        id: "guardrails-crusade",
        label: "Turn your mistake into a crusade for deploy guardrails",
        outcome: {
          text:
            "You channel the shame into building the safety rails that would have stopped you. Six months later a teammate's bad config bounces harmlessly off your guardrail, and you feel something close to absolution.",
          effect: { netWorth: 48_000, burnout: 10, title: "SWE II (Platform)" },
          next: "y3-bigtech-efficiency",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Startup
  {
    id: "y2-startup-ramen",
    year: 2,
    age: 23,
    headline: "Ramen Profitability",
    text:
      "The startup has 7 months of runway and a burn rate the founder describes as 'aggressive but visionary.' He gathers the team (all four of you) and asks everyone to defer salary until the next round closes. It's definitely closing. Any week now.",
    choices: [
      {
        id: "defer-salary",
        label: "Believe. Defer salary for double the equity",
        outcome: {
          text:
            "You're now paid in vibes and stock options. Your diet is 40% instant noodles. But the product ships, users trickle in, and that equity stake is starting to look like it might actually mean something.",
          effect: { netWorth: -18_000, burnout: 20 },
          next: "y3-startup-seriesa",
        },
      },
      {
        id: "moonlight",
        label: "Keep the faith — but moonlight freelance gigs to pay rent",
        outcome: {
          text:
            "Days: startup. Nights: fixing WordPress sites for a dentist in Ohio. Weekends: a blur. Your bank account recovers. Your sleep schedule files for divorce.",
          effect: { netWorth: 25_000, burnout: 30 },
          next: "y3-startup-seriesa",
        },
      },
      {
        id: "jump-to-bigtech",
        label: "Jump ship to Big Tech before the money runs out",
        outcome: {
          text:
            "You quietly interview, land an SWE II offer, and tell the founder over coffee. He calls you a mercenary. Your new badge photo is great. Your old equity is now a PDF you keep for sentimental reasons.",
          effect: { netWorth: 50_000, burnout: 5, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
    ],
  },
  {
    id: "y2-pivot-hell",
    year: 2,
    age: 23,
    slot: "y2-startup-ramen",
    headline: "Pivot Number Three",
    text:
      "The founder calls an emergency all-hands (four people, one couch) to announce the third pivot this year: from 'Uber for laundry' to 'B2B laundry analytics' to, as of this morning, 'AI-powered logistics.' The codebase has commitment issues.",
    choices: [
      {
        id: "back-the-vision",
        label: "Back the founder — conviction is the whole job",
        outcome: {
          text:
            "You rebuild the backend for the third time, faster now — practice makes pivot. Weirdly, this one gets traction. The founder's 'I told you so' is insufferable and, annoyingly, earned.",
          effect: { netWorth: 5_000, burnout: 20 },
          next: "y3-startup-seriesa",
        },
      },
      {
        id: "push-your-idea",
        label: "Push YOUR idea — you've been watching the users, he hasn't",
        outcome: {
          text:
            "You show up with data, mockups, and the audacity of a 23-year-old who's right. The founder fights it for a week, then caves. The pivot becomes 'ours' in the retelling. Fine. Whatever ships.",
          effect: { netWorth: 12_000, burnout: 20, title: "Founding Engineer (De Facto PM)" },
          next: "y3-startup-seriesa",
        },
      },
      {
        id: "leave-the-carousel",
        label: "Step off the pivot carousel — take the Big Tech escape hatch",
        outcome: {
          text:
            "Three products in one year taught you more than any bootcamp, and the Big Tech interviewer eats the war stories up. You leave the chaos with references, stories, and a salary with commas in sensible places.",
          effect: { netWorth: 45_000, burnout: 5, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
    ],
  },
  {
    id: "y2-first-hires",
    year: 2,
    age: 23,
    slot: "y2-startup-ramen",
    headline: "The First Hires",
    text:
      "The seed round finally closed and the founder hands you a mandate: 'Build the engineering team.' You, who have never interviewed anyone, will now decide who builds this company. The pipeline is your college group chat and one guy from Reddit.",
    choices: [
      {
        id: "hire-friends",
        label: "Hire your college friends — known quantities, known chaos",
        outcome: {
          text:
            "The dorm-room chemistry translates: standups feel like game night and the team ships like it's finals week, permanently. HR (there is no HR) would flag the group chat. Velocity would defend it.",
          effect: { netWorth: 8_000, burnout: 15 },
          next: "y3-startup-seriesa",
        },
      },
      {
        id: "hire-graybeard",
        label: "Blow the budget on one expensive senior engineer",
        outcome: {
          text:
            "She's twice your age, thrice your salary, and worth every dollar: the codebase gets boring in the best way. You learn more code review by osmosis than four years of school taught. Payroll weeps.",
          effect: { netWorth: 2_000, burnout: 5 },
          next: "y3-startup-seriesa",
        },
      },
      {
        id: "hire-nobody",
        label: "Hire nobody — you ARE the engineering team",
        outcome: {
          text:
            "Why hire when you can just... not sleep? You ship the roadmap solo and the burn rate stays flat. The bus factor is one, the bus is circling, and you've started talking to the rubber duck in full sentences.",
          effect: { netWorth: 15_000, burnout: 30, title: "The Entire Eng Org" },
          next: "y3-startup-seriesa",
        },
      },
    ],
  },
  {
    id: "y2-hn-launch",
    year: 2,
    age: 23,
    slot: "y2-startup-ramen",
    headline: "#1 on Hacker News",
    text:
      "Your Show HN post hits #1 at 7 AM and the servers hit 100% CPU by 7:15. Sign-ups are pouring in, the founder is screenshotting the traffic graph for investors, and the database is making a sound databases shouldn't make.",
    choices: [
      {
        id: "allnighter-heroics",
        label: "All-nighter heroics — keep the site up by hand if you have to",
        outcome: {
          text:
            "Eighteen hours of caching, queueing, and prayer. The site survives, the sign-ups stick, and the story becomes company legend. You sleep for fourteen hours and wake up mildly famous in one specific subculture.",
          effect: { netWorth: 15_000, burnout: 25 },
          next: "y3-startup-seriesa",
        },
      },
      {
        id: "calm-scaling",
        label: "Put up a waitlist and scale calmly on Monday",
        outcome: {
          text:
            "A tasteful 'we're overwhelmed, join the waitlist' page converts better than the product did. Scarcity, it turns out, is a feature. You fix the architecture over a civilized week of normal-length days.",
          effect: { netWorth: 10_000, burnout: 5 },
          next: "y3-startup-seriesa",
        },
      },
      {
        id: "enjoy-the-moment",
        label: "Let it burn a little — you're reading every comment",
        outcome: {
          text:
            "The site limps but survives, and you spend launch day in the comments, taking feature requests and one unforgettable roast of your landing page font. The users who stayed through the outage become your evangelists.",
          effect: { netWorth: 6_000, burnout: -5 },
          next: "y3-startup-seriesa",
        },
      },
    ],
  },
];
