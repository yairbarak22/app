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
      "Fifteen years of layoffs, winters, gold rushes, and at least one open-plan office — and for the first time, the next move is entirely, terrifyingly yours. What's it going to be?",
    choices: [
      {
        id: "actually-retire",
        label: "Log off. Actually retire — for real this time",
        outcome: {
          text:
            "You archive the Slack, donate the conference swag, and set an out-of-office that just says 'No.' The first Monday feels illegal; the tenth feels like the point.",
          effect: { burnout: -40, title: "Retired" },
          ending: "retired",
        },
      },
      {
        id: "lifer-energy",
        label: "Keep building. You love this, God help you",
        outcome: {
          text:
            "Retirement lasted one spreadsheet. You'll be in a design review at 70 telling children about the Great Migration™, and honestly? Respect.",
          effect: { netWorth: 100_000, burnout: 10, title: "Tech Lifer (Voluntary)" },
          ending: "retired",
        },
      },
      {
        id: "give-back",
        label: "Teach. Hand over your scar tissue",
        outcome: {
          text:
            "You teach students who will build the thing that replaces everything you made. Someone has to tell them about the winters first.",
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
      "The garage crew reassembles: same pizza order, better wine, wildly divergent net worths. Around midnight the question lands on you, the way it always was going to: 'So... what's next?'",
    choices: [
      {
        id: "toast-and-retire",
        label: "Raise the glass — 'nothing, and I mean it'",
        outcome: {
          text:
            "You say it out loud for the first time and the table goes quiet, then erupts. Best retirement party ever held in a taqueria.",
          effect: { burnout: -35, title: "Retired (Among Friends)" },
          ending: "retired",
        },
      },
      {
        id: "fund-the-deck",
        label: "Point at the pitch deck — 'I'm in'",
        outcome: {
          text:
            "You back the old crew's new thing on a napkin term sheet, becoming the investor you always wished you'd had: patient money, honest advice, zero vibe checks.",
          effect: { netWorth: -100_000, burnout: -10, title: "Angel (Garage Crew Capital)" },
          ending: "retired",
        },
      },
      {
        id: "one-more-ride",
        label: "'One more ride. All of us. One last company'",
        outcome: {
          text:
            "The table goes silent, then someone opens a laptop. Older, richer, slower to panic — you already know how this memory files itself: the best one.",
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
      "Your last Friday brings the largest package anyone has ever offered you, for a role built around your exact skills. It's the offer 22-year-old you would have framed — and, this is new, refusable.",
    choices: [
      {
        id: "refuse-and-retire",
        label: "Refuse — the number was never the answer",
        outcome: {
          text:
            "You write the most gracious 'no' of your career and feel fifteen years of momentum come gently to rest. The industry, notably, keeps shipping.",
          effect: { burnout: -35, title: "Retired (Undefeated)" },
          ending: "retired",
        },
      },
      {
        id: "one-year-cameo",
        label: "Counter: one year, one project, then out",
        outcome: {
          text:
            "Twelve months, one hard problem, no meetings before ten. You ship, collect the absurd check, and leave exactly on schedule — the rarest move in tech.",
          effect: { netWorth: 250_000, burnout: 10, title: "Retired (After One Last Job)" },
          ending: "retired",
        },
      },
      {
        id: "advisor-forever",
        label: "Convert it — ten hours a month, forever",
        outcome: {
          text:
            "Ten hours a month of the work you love, none of the calendar you don't. You mentor staff engineers from a porch; everyone wins, especially the porch.",
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
      "It was supposed to be six months; it's month eleven, somewhere with good light and slow mornings. At some point, not deciding becomes the decision.",
    choices: [
      {
        id: "make-it-official",
        label: "Stop pretending — sign the retirement",
        outcome: {
          text:
            "You send the resignation from a kitchen table with flour on it. It turns out you retired eleven months ago; today you just filed the paperwork.",
          effect: { burnout: -40, title: "Retired (Effective Months Ago)" },
          ending: "retired",
        },
      },
      {
        id: "tiny-consultancy",
        label: "Keep the life, add a tiny consultancy",
        outcome: {
          text:
            "You, four clients you like, and a rate that keeps the calendar honest. Work becomes a spice instead of a diet; the flour stays on the table.",
          effect: { netWorth: 90_000, burnout: -25, title: "Consultant (By Appointment Only)" },
          ending: "retired",
        },
      },
      {
        id: "return-changed",
        label: "Go back — as the person it built",
        outcome: {
          text:
            "You return with non-negotiables in writing, and the company agrees to all of it. Three more good years, then out on a high note you chose.",
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
      "The university offers an endowed chair: your name on a door, a lab two floors above where you first saw a compiler. The dean's pitch is one sentence: 'Teach them what the industry can't.'",
    choices: [
      {
        id: "take-the-chair",
        label: "Take the chair — teach who you were at 19",
        outcome: {
          text:
            "You teach the war stories with the bugs left in, and your first cohort ships things that scare you — which was always the metric.",
          effect: { netWorth: 40_000, burnout: -25, title: "Professor of Practice" },
          ending: "retired",
        },
      },
      {
        id: "fund-it-instead",
        label: "Endow a scholarship instead",
        outcome: {
          text:
            "Teaching isn't your gift; the check is. Every year, four kids you'll never meet skip the loans that started your whole story.",
          effect: { netWorth: -250_000, burnout: -20, title: "Retired (Benefactor)" },
          ending: "retired",
        },
      },
      {
        id: "one-semester-deal",
        label: "One semester a year — autumn only",
        outcome: {
          text:
            "One intense fall semester, then eight months of porch. Autumn becomes your favorite deploy window.",
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
      "With nothing left to prove, you notice what actually mattered: the small library you've maintained nine years, used by half the internet and thanked by almost none of it. 340 open issues wait.",
    choices: [
      {
        id: "fulltime-maintainer",
        label: "Go full-time maintainer — plumbing, paid",
        outcome: {
          text:
            "You close 200 issues in a heroic quarter and become that rarest creature: a maintainer with health insurance. Infrastructure is immortality, minus the applause.",
          effect: { netWorth: 30_000, burnout: -15, title: "Maintainer (Full-Time)" },
          ending: "retired",
        },
      },
      {
        id: "endow-the-project",
        label: "Endow it — fund maintainers, step back",
        outcome: {
          text:
            "You fund two maintainers for five years and hand over the keys with a commit that just says 'thank you.' It thrives without you — that was the design.",
          effect: { netWorth: -150_000, burnout: -25, title: "Retired (Project Patron)" },
          ending: "retired",
        },
      },
      {
        id: "final-major-version",
        label: "Ship v10, then archive it at its peak",
        outcome: {
          text:
            "One glorious breaking release — every dream feature shipped, documentation like literature — then you archive it at its peak. The internet forks it in hours.",
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
      "Your niece — sixteen, sharp, better at math than you were — corners you at Thanksgiving: 'Should I go into tech?' Whatever you say next is the real retrospective.",
    choices: [
      {
        id: "honest-yes",
        label: "'Yes — but here's what it actually costs'",
        outcome: {
          text:
            "You give her the whole truth over pie: the winters, the gold rushes, the burnout math. She goes in anyway — but with her eyes open, which was the real ask.",
          effect: { burnout: -30, title: "Retired (Honest Uncle Energy)" },
          ending: "retired",
        },
      },
      {
        id: "teach-her-yourself",
        label: "'Grab your laptop. Lesson one starts now'",
        outcome: {
          text:
            "Recursion, then git, then her first deployed app by spring. Fifteen years of scar tissue, finally read by exactly the right person.",
          effect: { netWorth: 10_000, burnout: -25, title: "Retired (Mentor-in-Chief)" },
          ending: "retired",
        },
      },
      {
        id: "its-your-call-kid",
        label: "'Wrong question. What do you want to build?'",
        outcome: {
          text:
            "She talks for twenty unbroken minutes about her robotics team's app, and you just listen — the skill that took fifteen years to learn. Pass the pie.",
          effect: { burnout: -35, title: "Retired (The Good Question)" },
          ending: "retired",
        },
      },
    ],
  },
  {
    id: "y15-double-or-nothing",
    year: 15,
    age: 36,
    slot: "y15-laststandup",
    headline: "Double or Nothing",
    text:
      "Your last week, and the best founder you've ever met offers an allocation that needs a $400K check — a quarter of your liquid pile. It's your retirement money, asking to go one more round.",
    choices: [
      {
        id: "keep-it-boring",
        label: "Decline — the pile's job is staying a pile",
        outcome: {
          text:
            "You pass on the best deal you've ever seen because the money already won its game. She raises without you in a week, of course.",
          effect: { burnout: -30, title: "Retired (Disciplined)" },
          ending: "retired",
        },
      },
      {
        id: "one-last-check",
        label: "Write the $400K — one last bet",
        gamble: [
          {
            chance: 0.25,
            label: "Generational — the check returns 3x",
            text:
              "Three years into retirement, her company becomes the one everyone pretends they saw coming. Your last check returns 3x while you're literally gardening.",
            effect: { netWorth: 800_000, burnout: -20, title: "Retired (The Last Bet Legend)" },
            ending: "retired",
          },
          {
            chance: 0.75,
            label: "An expensive goodbye present",
            text:
              "The best risk/reward you ever saw performs like most of them: bravely, then not. The pile is smaller; the retirement survives; the story costs what it's worth.",
            effect: { netWorth: -400_000, burnout: -15, title: "Retired (It Was Worth a Shot)" },
            ending: "retired",
          },
        ],
      },
    ],
  },
  {
    id: "y15-hold-the-rocket",
    year: 15,
    age: 36,
    slot: "y15-laststandup",
    headline: "One More Earnings Call",
    text:
      "Your biggest position reports earnings the week you plan to cash out and retire. One last spin of a wheel that doesn't know it's your last — wheels never do.",
    choices: [
      {
        id: "sell-before-print",
        label: "Sell before earnings — a known number",
        outcome: {
          text:
            "You liquidate at Tuesday's price and turn off the ticker forever. Retirement begins with a number you chose, not one you survived.",
          effect: { netWorth: 100_000, burnout: -25, title: "Retired (Clean Exit)" },
          ending: "retired",
        },
      },
      {
        id: "hold-through-print",
        label: "Hold through the print — one last spin",
        gamble: [
          {
            chance: 0.5,
            label: "Blowout quarter — you time the exact top",
            text:
              "The stock gaps up 30% and you sell into the euphoria — fifteen years of watching the wheel, and the final spin lands on your number. Tell everyone, forever.",
            effect: { netWorth: 400_000, burnout: -20, title: "Retired (Timed the Top)" },
            ending: "retired",
          },
          {
            chance: 0.5,
            label: "Guidance cut — the farewell haircut",
            text:
              "The quarter's fine; the guidance isn't. Your retirement number takes a haircut on its way out the door — still enough, but a lesson, not a gift.",
            effect: { netWorth: -200_000, burnout: -10, title: "Retired (Almost Timed It)" },
            ending: "retired",
          },
        ],
      },
    ],
  },
  {
    id: "y15-legacy-bet",
    year: 15,
    age: 36,
    slot: "y15-laststandup",
    headline: "The Chairman's Gamble",
    text:
      "Two operators want to build 'the company you always talked about' with your money and your name as chairman. Retirement with a lottery ticket stapled to it — or the reverse, depending who's asking.",
    choices: [
      {
        id: "patron-small",
        label: "Small check only — patron, not partner",
        outcome: {
          text:
            "A modest angel check, no chairman seat, straight to the porch. The company gets built a little slower; your retirement gets built exactly on schedule.",
          effect: { netWorth: -50_000, burnout: -25, title: "Retired (Patron)" },
          ending: "retired",
        },
      },
      {
        id: "fund-and-chair",
        label: "Fund it — founding chairman, hands off",
        gamble: [
          {
            chance: 0.3,
            label: "Unicorn — without you sweating once",
            text:
              "They run your playbook annoyingly, gloriously better than you did, and the company crosses a billion while you're on the porch. The last laugh, compounding.",
            effect: { netWorth: 600_000, burnout: -15, title: "Chairman (Lucky Last Act)" },
            ending: "retired",
          },
          {
            chance: 0.7,
            label: "Fizzles — the dream cost a check",
            text:
              "Four good years, then a soft acquihire — everyone employed, nobody rich. The dream got funded, and the porch remains excellent.",
            effect: { netWorth: -150_000, burnout: -20, title: "Retired (Funded the Dream)" },
            ending: "retired",
          },
        ],
      },
    ],
  },
];
