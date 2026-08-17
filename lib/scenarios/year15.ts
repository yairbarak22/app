import type { Scenario } from "../types";

/**
 * YEAR 15 (age 36) — THE FINALE. Every choice ends the run.
 * Pool: y15-laststandup (hub) + 6 variants.
 */
export const YEAR_15: Scenario[] = [
  {
    id: "y15-laststandup",
    year: 15,
    age: 36,
    headline: "The Last Standup",
    text:
      "Fifteen years. You've survived layoffs, winters, gold rushes, reorgs, and at least one open-plan office. The loans are ancient history, the spreadsheet says what it says, and for the first time the next move is entirely, terrifyingly yours. The industry will keep spinning either way — it always does. What's it going to be?",
    choices: [
      {
        id: "actually-retire",
        label: "Log off. Actually retire — for real this time",
        outcome: {
          text:
            "You archive the Slack, donate the conference swag, and set an out-of-office that just says 'No.' The first Monday feels illegal. The tenth feels like the whole point. You made it out with your health, your money, and most of your hairline. GG.",
          effect: { burnout: -40, title: "Retired" },
          ending: "retired",
        },
      },
      {
        id: "lifer-energy",
        label: "Keep building. You love this, God help you",
        outcome: {
          text:
            "Retirement lasted one spreadsheet. The truth is you'd do this for free, and now that you effectively can, the work finally feels like play. You'll be in a design review at 70 telling children about the Great Migration™, and honestly? Respect.",
          effect: { netWorth: 100_000, burnout: 10, title: "Tech Lifer (Voluntary)" },
          ending: "retired",
        },
      },
      {
        id: "give-back",
        label: "Teach. Give the next generation your scar tissue",
        outcome: {
          text:
            "You take an adjunct gig and a mentorship roster, teaching systems design to students who will absolutely build the thing that replaces everything you made. Someone has to tell them about the winters before they meet one. It might as well be you.",
          effect: { netWorth: 20_000, burnout: -20, title: "Professor of Practice" },
          ending: "retired",
        },
      },
    ],
  },
  {
    id: "y15-the-reunion",
    year: 15,
    age: 36,
    slot: "y15-laststandup",
    headline: "The Reunion Dinner",
    text:
      "The garage crew reassembles for the first time in years: same pizza order, better wine, wildly divergent net worths. Someone brings the original whiteboard photo. Someone else brings a pitch deck, because of course they do. Around midnight the question lands on you, the way it always was going to: 'So... what's next for you?'",
    choices: [
      {
        id: "toast-and-retire",
        label: "Raise the glass — 'next for me is nothing, and I mean it'",
        outcome: {
          text:
            "You say it out loud for the first time and the table goes quiet, then erupts. The people who watched you grind fifteen years are the only audience that understands what 'nothing' costs and what it's worth. Best retirement party ever held in a taqueria.",
          effect: { burnout: -35, title: "Retired (Among Friends)" },
          ending: "retired",
        },
      },
      {
        id: "fund-the-deck",
        label: "Point at the pitch deck — 'I'm in. Angel check, board seat, let's go'",
        outcome: {
          text:
            "You back the old crew's new thing on a napkin term sheet, becoming the investor you always wished you'd had: patient money, honest advice, zero vibe checks. Your career's final form: the person who makes other people's year-ones survivable.",
          effect: { netWorth: -100_000, burnout: -10, title: "Angel (Garage Crew Capital)" },
          ending: "retired",
        },
      },
      {
        id: "one-more-ride",
        label: "'One more ride. All of us. One last company'",
        outcome: {
          text:
            "The table goes silent, then someone opens a laptop. The band reunites for one final company — older, richer, slower to panic, faster to laugh. Win or lose, you already know how this memory files itself: the best one. The wine was a Tuesday. The decision was forever.",
          effect: { netWorth: 50_000, burnout: 15, title: "Founder (The Last Ride)" },
          ending: "retired",
        },
      },
    ],
  },
  {
    id: "y15-offer-you-refuse",
    year: 15,
    age: 36,
    slot: "y15-laststandup",
    headline: "The Offer You Can Refuse",
    text:
      "It arrives on your last scheduled Friday: the largest package anyone has ever offered you, for a role designed around your exact skills, at a company you genuinely admire. Fifteen years of leverage, distilled into one PDF. It's the offer 22-year-old you would have framed. It's also, and this is new, refusable.",
    choices: [
      {
        id: "refuse-and-retire",
        label: "Refuse it — the number was never going to be the answer",
        outcome: {
          text:
            "You write the most gracious 'no' of your career and feel fifteen years of momentum come gently to rest. The recruiter calls it 'a loss for the industry.' The industry, notably, keeps shipping. So do you — just not for money anymore.",
          effect: { burnout: -35, title: "Retired (Undefeated)" },
          ending: "retired",
        },
      },
      {
        id: "one-year-cameo",
        label: "Counter: one year, one project, then out",
        outcome: {
          text:
            "You negotiate the cameo of a lifetime: twelve months, one hard problem, no meetings before ten. You ship the thing, collect the absurd check, and leave exactly on schedule — the rarest move in tech, executed flawlessly. The door stays open forever. You never use it.",
          effect: { netWorth: 250_000, burnout: 10, title: "Retired (After One Last Job)" },
          ending: "retired",
        },
      },
      {
        id: "advisor-forever",
        label: "Convert it — advisor terms, ten hours a month, in perpetuity",
        outcome: {
          text:
            "You turn the full-time offer into the perfect part-time arrangement: ten hours a month of the work you love, none of the calendar you don't. The comp per hour is frankly embarrassing. You mentor their staff engineers from a porch. Everyone wins, especially the porch.",
          effect: { netWorth: 120_000, burnout: -20, title: "Advisor Emeritus" },
          ending: "retired",
        },
      },
    ],
  },
  {
    id: "y15-endless-sabbatical",
    year: 15,
    age: 36,
    slot: "y15-laststandup",
    headline: "The Sabbatical That Won't End",
    text:
      "It was supposed to be six months. It's month eleven, you're somewhere with good light and slow mornings, and the return date has been rescheduled three times by a calendar that increasingly feels like it belongs to someone else. Your old life keeps emailing. Your current life keeps not caring. At some point, not deciding becomes the decision.",
    choices: [
      {
        id: "make-it-official",
        label: "Stop pretending — the sabbatical is retirement. Sign it",
        outcome: {
          text:
            "You send the resignation from a kitchen table with flour on it, and the only surprise is how little changes. The mornings stay slow. The light stays good. It turns out you retired eleven months ago; today you just filed the paperwork.",
          effect: { burnout: -40, title: "Retired (Effective Months Ago)" },
          ending: "retired",
        },
      },
      {
        id: "tiny-consultancy",
        label: "Keep the life, add a tiny consultancy — four clients, forever",
        outcome: {
          text:
            "You build the smallest possible company: you, four clients you like, and a rate that keeps the calendar honest. Work becomes a spice instead of a diet. The 'return date' email thread dies of natural causes. The flour stays on the table.",
          effect: { netWorth: 90_000, burnout: -25, title: "Consultant (By Appointment Only)" },
          ending: "retired",
        },
      },
      {
        id: "return-changed",
        label: "Go back — but as the person the sabbatical built",
        outcome: {
          text:
            "You return with non-negotiables in writing: the scope you love, the hours you'll give, the rest belongs to the mornings. The company, needing you more than the old terms, agrees to all of it. You work three more good years and leave on a high note you chose.",
          effect: { netWorth: 150_000, burnout: -10, title: "Senior Fellow (On Own Terms)" },
          ending: "retired",
        },
      },
    ],
  },
  {
    id: "y15-the-classroom",
    year: 15,
    age: 36,
    slot: "y15-laststandup",
    headline: "The Endowed Chair",
    text:
      "The university calls with the strangest offer of your career: an endowed practitioner's chair — your name on a door, a systems lab to run, and a salary that would have insulted you at 25 and somehow honors you at 36. The dean's pitch is one sentence: 'Teach them what the industry can't.' The lab is two floors above the lecture hall where you first saw a compiler.",
    choices: [
      {
        id: "take-the-chair",
        label: "Take the chair — become the teacher you needed at 19",
        outcome: {
          text:
            "You teach the war stories with the bugs left in and fill the lab with hardware students can break. Your first cohort ships things that scare you, which was always the metric. The industry title fades. 'Professor' sticks in a way 'Distinguished' never did.",
          effect: { netWorth: 40_000, burnout: -25, title: "Professor of Practice" },
          ending: "retired",
        },
      },
      {
        id: "fund-it-instead",
        label: "Decline the chair — endow a scholarship instead",
        outcome: {
          text:
            "Teaching isn't your gift, but the check is: you endow the scholarship that would have changed your own freshman year — full ride, laptop included, no essay about 'passion' required. Every year, four kids you'll never meet skip the loans that started your whole story.",
          effect: { netWorth: -250_000, burnout: -20, title: "Retired (Benefactor)" },
          ending: "retired",
        },
      },
      {
        id: "one-semester-deal",
        label: "One semester a year — professor in autumn, free the rest",
        outcome: {
          text:
            "You negotiate the academic's dream schedule from the practitioner's side: one intense fall semester, then eight months of porch. The students get you at full wattage; you get a rhythm that finally makes sense. Autumn becomes your favorite deploy window.",
          effect: { netWorth: 70_000, burnout: -20, title: "Adjunct (Autumn Only)" },
          ending: "retired",
        },
      },
    ],
  },
  {
    id: "y15-maintainer-life",
    year: 15,
    age: 36,
    slot: "y15-laststandup",
    headline: "The Maintainer's Path",
    text:
      "With nothing left to prove, you look at your GitHub and notice what actually mattered: the small library you've maintained for nine years, used by half the internet and thanked by almost none of it. There's a backlog of 340 issues, a burned-out co-maintainer, and a quiet truth — this unglamorous thing might be your most durable work.",
    choices: [
      {
        id: "fulltime-maintainer",
        label: "Go full-time maintainer — the internet's unpaid plumbing, paid",
        outcome: {
          text:
            "You set up sponsorships, close 200 issues in a heroic quarter, and become that rarest creature: a maintainer with health insurance. The library outlives three of the companies that depended on it. Infrastructure is immortality, minus the applause.",
          effect: { netWorth: 30_000, burnout: -15, title: "Maintainer (Full-Time)" },
          ending: "retired",
        },
      },
      {
        id: "endow-the-project",
        label: "Endow it — fund two maintainers and step back gracefully",
        outcome: {
          text:
            "You fund two full-time maintainers for five years out of pocket, write the governance doc, and hand over the keys with a commit message that just says 'thank you.' The project thrives without you, which was the entire design. You keep read access and pride.",
          effect: { netWorth: -150_000, burnout: -25, title: "Retired (Project Patron)" },
          ending: "retired",
        },
      },
      {
        id: "final-major-version",
        label: "Ship v10 yourself — one last major version, then archive",
        outcome: {
          text:
            "One year, one glorious breaking release: every deprecated API removed, every dream feature shipped, documentation like literature. Then you archive it at its peak, like a band breaking up after the best album. The internet forks it within hours. Perfect.",
          effect: { netWorth: 20_000, burnout: -10, title: "Retired (Shipped v10)" },
          ending: "retired",
        },
      },
    ],
  },
  {
    id: "y15-next-generation",
    year: 15,
    age: 36,
    slot: "y15-laststandup",
    headline: "The Question at Thanksgiving",
    text:
      "Your niece — sixteen, sharp, already better at math than you were — corners you at Thanksgiving with the question: 'Should I go into tech?' The table goes quiet. Fifteen years of layoffs, winters, gold rushes, IPOs, 3 AM pagers, and one very good career all compress into the pause before you answer. Whatever you say next is the real retrospective.",
    choices: [
      {
        id: "honest-yes",
        label: "'Yes — but let me tell you what it actually costs'",
        outcome: {
          text:
            "You give her the whole truth over pie: the winters and the gold rushes, the burnout math, the compound interest of showing up. She goes into tech anyway — they always do — but she goes in with her eyes open, which is the only gift the question was really asking for.",
          effect: { burnout: -30, title: "Retired (Honest Uncle Energy)" },
          ending: "retired",
        },
      },
      {
        id: "teach-her-yourself",
        label: "'Grab your laptop. Lesson one starts now'",
        outcome: {
          text:
            "Thanksgiving becomes a standing Sunday call: recursion, then git, then her first deployed app by spring. Teaching one kid properly turns out to be the most satisfying system you've ever built. Fifteen years of scar tissue, finally read by exactly the right person.",
          effect: { netWorth: 10_000, burnout: -25, title: "Retired (Mentor-in-Chief)" },
          ending: "retired",
        },
      },
      {
        id: "its-your-call-kid",
        label: "'Wrong question. What do you want to build?'",
        outcome: {
          text:
            "She blinks, then talks for twenty unbroken minutes about an app for her robotics team. You just listen — the skill that took you fifteen years to learn. Tech was never the question. The building was. She'll figure out the rest, same as you did. Pass the pie.",
          effect: { burnout: -35, title: "Retired (The Good Question)" },
          ending: "retired",
        },
      },
    ],
  },
];
