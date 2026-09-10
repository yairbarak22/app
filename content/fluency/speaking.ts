import type { SpeakingPrompt, QASet, RetellStory, ReadAloudScript } from "@/lib/types";

// ---------------------------------------------------------------------------
// 4/3/2 monologue prompts. The learner speaks for 4 minutes, then 3, then 2,
// on the same topic. Keywords and chunks are scaffolding; the model answer
// shows one natural way to do it (spoken register, first person).
// ---------------------------------------------------------------------------

export const SPEAKING_PROMPTS: SpeakingPrompt[] = [
  {
    id: "sp-my-job",
    topicHe: "העבודה שלי",
    prompt: "Describe your job. What do you actually do all day? What's the best part, and what's the most annoying part?",
    keywords: ["responsible for", "deadline", "colleagues", "meeting", "stressful", "rewarding"],
    chunks: ["to be honest,", "the thing is,", "on the other hand,"],
    model:
      "So, I work in a small tech company, and I'm responsible for the customer side of the product. Most of my day is meetings, emails, and checking that we don't miss a deadline. To be honest, it's more stressful than it sounds. The thing is, every customer thinks their problem is the most important one, so I spend a lot of time calming people down. On the other hand, my colleagues are great, and when we finally fix something for a client, it feels really rewarding. The most annoying part? Probably the meetings that could have been an email. But overall, I like it. I've been there three years now, and I'm still learning something new every week.",
    band: 2,
  },
  {
    id: "sp-morning-routine",
    topicHe: "שגרת הבוקר שלי",
    prompt: "Talk about your morning routine. What do you do first? Is there anything you'd like to change about it?",
    keywords: ["alarm", "snooze", "in a hurry", "get ready", "commute", "energy"],
    chunks: ["the main thing is", "these days,", "sooner or later,"],
    model:
      "My alarm goes off at six thirty, and I press snooze at least twice. That's my first mistake of the day. Then I'm always in a hurry: quick shower, coffee, and I get ready in about fifteen minutes. These days, I eat breakfast in the car during my commute, which isn't great. The main thing is that I don't check my phone before I leave the house. When I do, I lose twenty minutes reading nonsense. What would I change? I'd love to wake up earlier and do some exercise, because I have much more energy on the days I move a bit. Sooner or later, I'll fix it. I keep saying that, though.",
    band: 1,
  },
  {
    id: "sp-place-you-love",
    topicHe: "מקום שאני אוהב",
    prompt: "Describe a place you love. Where is it, and what does it look like? Why is it special to you?",
    keywords: ["peaceful", "view", "crowded", "remind", "atmosphere", "escape"],
    chunks: ["I'd say", "apart from that,", "what I mean is"],
    model:
      "There's a small beach in the north that I love. It's about an hour's drive from my house, and it's never crowded, even in August. I'd say the best thing is the view: you sit on the rocks, and you see the whole coast. It's really peaceful. There's one little café there, and apart from that, nothing. No music, no shops. The atmosphere is completely different from the city. It reminds me of family trips when I was a kid, because we used to go there every summer. What I mean is, it's not just a beautiful place, it's also full of memories. When I need to escape from everything, that's where I go.",
    band: 1,
  },
  {
    id: "sp-trip-went-wrong",
    topicHe: "טיול שהשתבש",
    prompt: "Tell me about a trip that went wrong. What happened? How did you deal with it, and what did you learn?",
    keywords: ["book", "delayed", "luggage", "panic", "manage", "lesson"],
    chunks: ["long story short,", "at first,", "it turned out that"],
    model:
      "A couple of years ago, my wife and I flew to Rome for a long weekend. We'd booked everything months before, so we thought nothing could go wrong. Well. The flight was delayed by four hours, and when we finally landed, my luggage wasn't there. At first, I started to panic, because all my clothes were in that bag. It turned out that the bag had gone to Milan. Long story short, we spent the first day buying cheap T-shirts and arguing with the airline on the phone. We managed to enjoy the rest of the trip, but I learned an important lesson: always put a change of clothes in your hand luggage. Always.",
    band: 2,
  },
  {
    id: "sp-person-admire",
    topicHe: "אדם שאני מעריך",
    prompt: "Talk about a person you admire. Who are they, and what have they done? What have you learned from them?",
    keywords: ["role model", "patient", "give up", "influence", "determined", "respect"],
    chunks: ["in my opinion,", "for example,", "the main thing is"],
    model:
      "The person I admire most is probably my grandmother. She came to this country with nothing, didn't speak the language, and built a whole life here. In my opinion, she's a real role model, not because she's famous, but because she never gives up. For example, she started learning to use a smartphone at eighty-two, and now she sends me voice messages every day. She's incredibly patient with people, and very determined when she wants something. She had a big influence on the way I treat others. The main thing is that she taught me to respect people no matter what they do. I still call her every Friday, and she always has advice for me.",
    band: 2,
  },
  {
    id: "sp-habit-to-change",
    topicHe: "הרגל שאני רוצה לשנות",
    prompt: "Talk about a habit you'd like to change. What is it, and why is it a problem? What have you tried so far?",
    keywords: ["addicted", "waste", "willpower", "cut down", "distract", "routine"],
    chunks: ["I'm fed up with", "the thing is,", "sooner or later,"],
    model:
      "The habit I really want to change is scrolling on my phone before bed. I'm fed up with it, honestly. I go to bed at eleven, and suddenly it's one in the morning and I'm watching videos about people fixing old cars. The thing is, I'm kind of addicted to it, and it's a huge waste of time. I've tried a few things. I put the phone in another room, which worked for two days. I tried an app that blocks everything after ten, but I just turned it off. I think the real problem is willpower, and also that I need a different routine, like reading a book instead. Sooner or later, I'll have to be serious about it, because I'm tired all the time.",
    band: 2,
  },
  {
    id: "sp-favorite-food",
    topicHe: "האוכל האהוב עליי",
    prompt: "Describe your favorite food. What is it, and how is it made? When do you usually eat it, and who makes it best?",
    keywords: ["dish", "ingredients", "spicy", "homemade", "recipe", "comfort food"],
    chunks: ["I'm really into", "to be honest,", "for example,"],
    model:
      "I'm really into Middle Eastern food, and my favorite dish is definitely shakshuka. It's simple: tomatoes, peppers, onions, a lot of garlic, and then you break the eggs on top. The ingredients are cheap, but the result is amazing. I like it spicy, so I add a lot of chili. To be honest, nobody makes it better than my dad. He has a secret recipe, and he refuses to tell anyone what's in it. For example, I know he adds something sweet, but I've never found out what. It's my comfort food. When I'm tired or sad, I make a homemade version on a Friday morning, and I eat it straight from the pan with fresh bread.",
    band: 1,
  },
  {
    id: "sp-decision-regret",
    topicHe: "החלטה שאני מתחרט עליה",
    prompt: "Tell me about a decision you regret. What did you decide, and why? What would you do differently now?",
    keywords: ["turn down", "opportunity", "afraid", "risk", "hindsight", "mistake"],
    chunks: ["looking back,", "at first,", "I'd say"],
    model:
      "A few years ago, I turned down a job in another city. It was a great opportunity, better salary, more interesting work, but I was afraid to move away from my friends and family. At first, I felt relieved, because moving is a big risk and I didn't want to start from zero. But looking back, I think it was a mistake. The company grew, and the guy who took the job instead of me is now a manager there. In hindsight, I was worried about the wrong things. My friends would still have been my friends. I'd say now that if an opportunity scares you a bit, that's usually a sign you should take it. Next time, I will.",
    band: 3,
  },
  {
    id: "sp-technology-life",
    topicHe: "טכנולוגיה בחיים שלי",
    prompt: "Talk about the role of technology in your life. What devices or apps do you rely on? Does technology make your life better or worse?",
    keywords: ["rely on", "convenient", "distraction", "connected", "switch off", "balance"],
    chunks: ["these days,", "on the other hand,", "it depends on"],
    model:
      "These days, I rely on my phone for almost everything: directions, banking, shopping, even the shopping list on the fridge. It's incredibly convenient. I can't remember the last time I used a paper map. My laptop is my office, and my watch tells me when I haven't moved for an hour, which is annoying but useful. On the other hand, technology is also my biggest distraction. I'm always connected, so I never really switch off, and my boss can reach me at ten at night. Is it better or worse? I think it depends on how you use it. I'm trying to find a balance, like no screens at dinner and no email on Saturdays. Some weeks I even manage it.",
    band: 2,
  },
  {
    id: "sp-skill-to-learn",
    topicHe: "מיומנות שאני רוצה ללמוד",
    prompt: "Talk about a skill you'd like to learn. Why does it interest you? What's stopping you, and how would you start?",
    keywords: ["pick up", "practice", "beginner", "frustrating", "progress", "commit"],
    chunks: ["I'm looking forward to", "the thing is,", "in the end,"],
    model:
      "I'd really like to learn to play the guitar. My uncle plays, and at every family dinner he picks up the guitar and everyone sings. I want to be that person. The thing is, I bought a guitar two years ago, and it's still in the corner of my bedroom. I practiced for about a month, and as a beginner, it was frustrating: my fingers hurt, and everything sounded terrible. I didn't see any progress, so I stopped. Now I think the answer is to commit to lessons with a real teacher, maybe once a week, instead of watching videos. I'm looking forward to playing my first full song. In the end, it's about being patient, not talented.",
    band: 2,
  },
  {
    id: "sp-city-vs-countryside",
    topicHe: "עיר מול כפר",
    prompt: "City or countryside: where would you rather live? What are the advantages of each? Has your opinion changed over time?",
    keywords: ["convenient", "noisy", "nature", "commute", "community", "pace of life"],
    chunks: ["it depends on", "on the other hand,", "I'd say"],
    model:
      "That's a hard one. I've lived in the city my whole life, and I love how convenient it is. Everything is close: work, restaurants, friends, the doctor. On the other hand, it's noisy, expensive, and my commute is an hour each way. My sister moved to a small village in the north, and every time I visit, I'm jealous. She has nature outside her window, a real community, and a much slower pace of life. But she also drives forty minutes to buy good coffee. I'd say it depends on your stage in life. When I was twenty-five, I needed the city. Now, with kids, the countryside sounds better every year. Ask me again in five years.",
    band: 2,
  },
  {
    id: "sp-working-from-home",
    topicHe: "עבודה מהבית",
    prompt: "What do you think about working from home? What are the pros and cons for you personally? What's your ideal arrangement?",
    keywords: ["productive", "flexible", "isolated", "distractions", "boundaries", "hybrid"],
    chunks: ["to be honest,", "apart from that,", "in my opinion,"],
    model:
      "To be honest, I was against working from home before it happened, and now I can't imagine going back to five days in the office. At home, I'm much more productive in the morning, and the flexible hours mean I can pick up my daughter from school. Apart from that, I save two hours of driving a day. But there are cons. Sometimes I feel isolated, especially in winter, and there are a lot of distractions: the fridge, the washing machine, the neighbor's dog. The hardest part is boundaries. When your office is your kitchen, you never really finish work. In my opinion, the ideal arrangement is hybrid: three days at home, two in the office for the meetings and the people.",
    band: 2,
  },
  {
    id: "sp-childhood-memory",
    topicHe: "זיכרון ילדות",
    prompt: "Describe a childhood memory. How old were you, and where were you? Why do you think you still remember it?",
    keywords: ["vivid", "used to", "excited", "neighborhood", "innocent", "smell"],
    chunks: ["the other day,", "I'd say", "looking back,"],
    model:
      "The other day, I smelled fresh bread and I was suddenly six years old again. When I was little, we used to live above a small bakery. Every morning, the smell came up through the floor, and I'd run downstairs in my pajamas. The baker, a big man with white hands, gave me a warm roll every single day. I was so excited every time, like it was a present. The whole neighborhood knew him. I'd say it's my most vivid memory from that time. Looking back, it was such an innocent period: no phone, no worries, just bread. The bakery closed years ago, and there's a phone shop there now. But when I pass it, I still smell bread.",
    band: 2,
  },
  {
    id: "sp-film-recommend",
    topicHe: "סרט או סדרה שאני ממליץ עליהם",
    prompt: "Recommend a film or series. What is it about, without spoilers? Why did you like it, and who would enjoy it?",
    keywords: ["plot", "character", "episode", "gripping", "twist", "worth"],
    chunks: ["I'm really into", "the main thing is", "what I mean is"],
    model:
      "If you're looking for something to watch, I'd recommend a series called Dark. I'm really into mysteries, and this one is on another level. The plot starts simply: a boy disappears in a small German town. But every episode adds another layer, and there's a twist at the end of nearly every one. The main thing is the characters; you really care about them, even the bad ones. It's gripping, but you have to pay attention. What I mean is, don't watch it while you're on your phone, because you'll get lost. It's perfect for people who like puzzles and don't mind reading subtitles. It's three seasons, and every minute is worth it.",
    band: 2,
  },
  {
    id: "sp-money-happiness",
    topicHe: "כסף ואושר",
    prompt: "Does money make people happy? How much is enough, in your opinion? Think of an example from your own life or someone you know.",
    keywords: ["afford", "security", "comfortable", "greedy", "priorities", "worry"],
    chunks: ["in my opinion,", "for example,", "the main thing is"],
    model:
      "In my opinion, money doesn't make you happy, but not having it definitely makes you unhappy. When I was a student, I couldn't afford anything, and I worried about rent every single month. That kind of stress is real. Now I'm comfortable, and the main thing is the security: I know that if the car breaks down, it's not a disaster. But more than that? I'm not sure it helps. For example, my neighbor earns three times what I earn, and he's always stressed and always working. He wants more, and he's become a bit greedy. So I think it's about priorities. Enough money is when you stop worrying about the basics and start enjoying your time.",
    band: 2,
  },
  {
    id: "sp-ideal-weekend",
    topicHe: "סוף השבוע האידיאלי שלי",
    prompt: "Describe your ideal weekend. Where would you be, and who would you be with? What would you definitely not do?",
    keywords: ["relax", "sleep in", "chores", "catch up", "outdoors", "recharge"],
    chunks: ["I'd say", "apart from that,", "I can't stand"],
    model:
      "My ideal weekend starts with sleeping in, which never happens with two kids, but let's dream. On Friday, I'd have a long breakfast with my wife, no phones, just coffee and the newspaper. Then something outdoors, maybe a hike in the hills with friends, and a big lunch after. Saturday would be for doing nothing: reading, a nap, catching up with my brother on the phone. Apart from that, no plans at all. I'd say the most important thing is to really relax and recharge, because the week is so busy. What would I not do? Chores. I can't stand spending my weekend cleaning and shopping. In my ideal weekend, somebody else does that.",
    band: 1,
  },
  {
    id: "sp-city-problem",
    topicHe: "בעיה בעיר שלי",
    prompt: "Talk about a problem in your city. What causes it? Who is affected, and what could be done about it?",
    keywords: ["traffic", "affordable", "local council", "invest", "complain", "solution"],
    chunks: ["the thing is,", "as a result,", "in my opinion,"],
    model:
      "The biggest problem in my city is traffic. It takes me forty-five minutes to drive six kilometers in the morning. The thing is, the city grew very fast, and nobody built enough roads or public transport. As a result, everyone drives, everyone is stuck, and everyone is angry. It also affects the air and the noise, especially for people living near the main roads. Everybody complains, but nothing changes. In my opinion, the local council needs to invest seriously in buses and bike lanes, and make parking in the center more expensive. The other solution is more affordable housing near the offices, so people don't have to travel so far. It won't happen quickly, though.",
    band: 3,
  },
  {
    id: "sp-learning-english",
    topicHe: "ללמוד אנגלית",
    prompt: "Talk about your experience of learning English. When did you start? What's the hardest part, and what helps you most?",
    keywords: ["fluent", "mistakes", "confidence", "vocabulary", "accent", "practice"],
    chunks: ["to be honest,", "the thing is,", "in the end,"],
    model:
      "I started learning English at school, like everyone, but to be honest, I didn't take it seriously until I needed it at work. Suddenly I had meetings with people in the US, and I realized that understanding a series is not the same as speaking. The thing is, my vocabulary is okay, but I translate from Hebrew in my head, so I make the same mistakes again and again. The hardest part is confidence. I know the words, and then someone asks a question and my mind goes blank. What helps most is practice: talking out loud, even alone in the car. And I've stopped worrying about my accent. In the end, people just want to understand you.",
    band: 2,
  },
  {
    id: "sp-time-late",
    topicHe: "פעם שאיחרתי",
    prompt: "Tell me about a time you were late for something important. What happened? How did people react, and what did you do afterward?",
    keywords: ["oversleep", "rush", "embarrassed", "apologize", "excuse", "traffic jam"],
    chunks: ["long story short,", "at first,", "it turned out that"],
    model:
      "Two years ago, I was late for my own job interview. I'd set two alarms, but I still overslept, because I'd been awake half the night worrying. I rushed out of the house without breakfast, and then, of course, there was a huge traffic jam on the highway. At first, I thought I'd just make it. Then I sat there for twenty minutes without moving. Long story short, I arrived thirty minutes late, sweating and embarrassed. I apologized about five times and didn't try to invent an excuse. It turned out that the manager had been stuck in the same traffic jam, so she was late too. I got the job. I still don't understand how.",
    band: 2,
  },
  {
    id: "sp-social-media",
    topicHe: "רשתות חברתיות",
    prompt: "What's your relationship with social media? Which platforms do you use, and why? Do you think it does more good or more harm?",
    keywords: ["scroll", "compare", "keep in touch", "addictive", "privacy", "fake"],
    chunks: ["these days,", "on the other hand,", "I'm fed up with"],
    model:
      "These days, I mainly use Instagram and WhatsApp, and I've deleted everything else. WhatsApp is how I keep in touch with my family, so that's not really a choice. Instagram is more complicated. I like seeing what my friends are doing, but I also scroll for an hour without noticing, and it's very addictive. On the other hand, it's where I find recipes, workout ideas, and news about my city. I'm fed up with the way it makes you compare yourself to people with perfect lives, most of which are fake anyway. And I don't love the privacy side of it. Does it do more good or more harm? For me, personally, I'd say it's about fifty-fifty.",
    band: 2,
  },
  {
    id: "sp-hobby",
    topicHe: "תחביב",
    prompt: "Talk about a hobby you have. How did you get into it? How often do you do it, and what do you get out of it?",
    keywords: ["get into", "take up", "equipment", "relaxing", "challenge", "improve"],
    chunks: ["I'm really into", "the other day,", "apart from that,"],
    model:
      "I'm really into photography, and I have been for about five years. I got into it by accident: a friend lent me an old camera for a trip, and I never gave it back. I mostly take pictures of streets and people, usually early in the morning when the light is soft. I try to go out at least once a week. Apart from that, I spend a lot of time editing at home, which my wife finds boring but I find relaxing. The equipment is expensive, so I buy everything second-hand. The other day, I sold my first print to a stranger, which felt amazing. It's a challenge, because there's always something to improve. That's why I love it.",
    band: 2,
  },
  {
    id: "sp-family",
    topicHe: "המשפחה שלי",
    prompt: "Tell me about your family. Who are the main people, and what are they like? How often do you see each other?",
    keywords: ["close", "get along", "sibling", "get together", "argue", "support"],
    chunks: ["I'd say", "on the other hand,", "the main thing is"],
    model:
      "I come from a fairly big family: my parents, two brothers and a sister, and now a lot of nieces and nephews. I'd say we're pretty close. We get together every Friday night at my parents' place, and it's loud, there's too much food, and everyone talks at the same time. I get along really well with my older brother; he's calm and practical, and he gives good advice. My sister, on the other hand, is the emotional one, and we argue a lot, mostly about politics. But when something happens, she's the first to call. The main thing is that we support each other. My mom holds everything together. Without her, I'm not sure we'd meet so often.",
    band: 1,
  },
  {
    id: "sp-argument",
    topicHe: "ויכוח שהיה לי",
    prompt: "Tell me about an argument you had with someone. What was it about? How did it end, and do you think you were right?",
    keywords: ["disagree", "lose your temper", "point of view", "calm down", "make up", "stubborn"],
    chunks: ["the other day,", "in the end,", "looking back,"],
    model:
      "The other day, I had a big argument with my flatmate about the dishes. It sounds stupid, but it had been building up for weeks. I came home late, the kitchen was a mess again, and I lost my temper. He said I was being dramatic, and I said he was lazy, and we both said things we didn't mean. I went to my room, and after an hour I calmed down. In the end, we sat down and made a simple plan: whoever cooks, the other one cleans. We made up the next morning over coffee. Looking back, we were both being stubborn. I was right about the dishes, but I was wrong about the way I said it.",
    band: 2,
  },
  {
    id: "sp-goal-next-year",
    topicHe: "מטרה לשנה הבאה",
    prompt: "Talk about a goal you have for next year. Why is it important to you? What steps will you take, and what might get in the way?",
    keywords: ["achieve", "step by step", "motivation", "give up", "realistic", "track"],
    chunks: ["I'm looking forward to", "the main thing is", "sooner or later,"],
    model:
      "My goal for next year is to run a half marathon. I've been running for a year, but only short distances, five or six kilometers. It's important to me because I want to prove to myself that I can finish something hard. The plan is to do it step by step: add one kilometer every two weeks, and track everything on an app. The main thing is to be realistic and not try to do too much too fast, because that's how I got injured last time. What might get in the way? Winter, mostly, and my motivation on rainy mornings. I know that sooner or later, I'll want to give up. But I've already signed up, so there's no way back. I'm looking forward to the finish line.",
    band: 2,
  },
  {
    id: "sp-health-exercise",
    topicHe: "בריאות וספורט",
    prompt: "How do you take care of your health? Do you exercise regularly? What do you eat well, and what do you eat badly?",
    keywords: ["work out", "in shape", "junk food", "balanced", "energy", "excuse"],
    chunks: ["to be honest,", "kind of", "it depends on"],
    model:
      "To be honest, I'm not the healthiest person, but I'm trying. I work out twice a week, usually a gym class on Monday and a swim on Thursday. I used to be in much better shape, before the kids, so I'm kind of rebuilding from zero. Food is my weak point. During the week, I eat a fairly balanced diet: salads, chicken, a lot of vegetables. But on the weekend, it's pizza, junk food, and beer, and I don't feel guilty about it. I sleep badly, though, and I think that's the real problem. When I sleep well, I have energy and I make good choices. It depends on the week. And yes, work is my main excuse for skipping the gym.",
    band: 2,
  },
  {
    id: "sp-purchase-regret",
    topicHe: "קנייה שאני מתחרט עליה",
    prompt: "Tell me about something you bought and later regretted. Why did you buy it? What went wrong, and what did you do with it?",
    keywords: ["impulse", "bargain", "waste of money", "refund", "useless", "tempting"],
    chunks: ["at first,", "it turned out that", "looking back,"],
    model:
      "Last year, I bought a very expensive coffee machine, the kind with a big screen and about fifty buttons. It was on sale, and it seemed like a bargain, so it was a total impulse buy. At first, I was so excited. I made coffee for everyone who came to the house, whether they wanted it or not. But it turned out that it was really difficult to clean, it took ten minutes every time, and after a month I went back to my old simple machine. Now it's sitting in a cupboard, completely useless. I tried to get a refund, but it was too late. Looking back, it was a waste of money, and I learned that a sale is only tempting until you use the product.",
    band: 2,
  },
  {
    id: "sp-teacher-remember",
    topicHe: "מורה שאני זוכר",
    prompt: "Describe a teacher you remember from school. What were they like? Why do you still remember them, for good or bad reasons?",
    keywords: ["strict", "encourage", "make a difference", "boring", "inspire", "grateful"],
    chunks: ["at first,", "in the end,", "for example,"],
    model:
      "The teacher I remember most is my history teacher in high school, Mr. Levi. At first, everyone hated him. He was extremely strict: no phones, no talking, homework every day. But he was the first teacher who actually made history interesting. For example, he'd tell us the story of a war as if he'd been there, with voices and everything. Nobody was bored in his class. He also encouraged me personally. I was a lazy student, and he told me I was wasting my brain, which nobody had said before. In the end, I got the best grade in the class. He made a real difference. I'm grateful to him, and I wish I'd told him that.",
    band: 2,
  },
  {
    id: "sp-free-month",
    topicHe: "מה הייתי עושה עם חודש חופשי",
    prompt: "Imagine you had a whole month off with no work and no responsibilities. What would you do? Would you travel, learn something, or just rest?",
    keywords: ["get away", "explore", "recharge", "afford", "make the most of", "bucket list"],
    chunks: ["I'd say", "on the other hand,", "the main thing is"],
    model:
      "If I had a whole free month, I'd say I'd spend the first week doing absolutely nothing. Sleep, read, walk, and recharge, because I'm always tired. Then I'd get away somewhere. Japan is at the top of my bucket list, so I'd probably spend two weeks there, exploring small towns rather than big cities, eating everything, and trying to learn a few words. On the other hand, a month in Japan isn't cheap, and I'm not sure I could afford it. If not, I'd stay home and finally take a proper cooking course. The main thing is to make the most of the time and not waste it watching TV. That's what usually happens to my holidays.",
    band: 2,
  },
  {
    id: "sp-celebration",
    topicHe: "מסיבה או חגיגה",
    prompt: "Tell me about a party or celebration you remember. What was the occasion? Who was there, and what made it memorable?",
    keywords: ["occasion", "surprise", "guests", "decorate", "toast", "unforgettable"],
    chunks: ["long story short,", "it turned out that", "in the end,"],
    model:
      "The party I remember best was my dad's sixtieth birthday. My mom decided to organize a surprise, and she made all of us keep the secret for two months. The occasion was big, so there were about fifty guests: family, old friends, even his boss from thirty years ago. We decorated the garden with lights and photos from his life. Long story short, he arrived thinking he was coming to a quiet dinner, and everyone jumped out. It turned out that he'd known for weeks. My little niece had told him. But he pretended to be shocked, and my brother gave a toast that made everyone cry. In the end, it was an unforgettable night, and my dad still talks about it.",
    band: 2,
  },
  {
    id: "sp-weather-mood",
    topicHe: "מזג אוויר ומצב רוח",
    prompt: "Does the weather affect your mood? What's your favorite kind of weather, and what kind do you hate? How do you deal with bad weather days?",
    keywords: ["gloomy", "heat wave", "cheerful", "cozy", "humid", "affect"],
    chunks: ["I can't stand", "to be honest,", "on the other hand,"],
    model:
      "The weather definitely affects my mood. My favorite kind is a cool, sunny day in spring, when it's warm but not hot. I feel cheerful and full of energy, and I want to be outside all day. I can't stand the summer here, though. During a heat wave, when it's humid and forty degrees, I become a different person: grumpy, tired, and I don't want to see anyone. To be honest, I'd rather have rain. Rainy days can be gloomy, but they're also cozy, and I love staying in with a book and a coffee. On the other hand, a whole week of gray sky makes me a bit sad. So I've learned to plan around it: exercise in the morning, meet friends, and never sit at home too long.",
    band: 2,
  },
  {
    id: "sp-pets",
    topicHe: "חיות מחמד",
    prompt: "Talk about pets. Do you have one, or did you have one as a child? What are the pros and cons of having a pet?",
    keywords: ["take care of", "companion", "responsibility", "mess", "loyal", "walk"],
    chunks: ["I'd say", "the thing is,", "kind of"],
    model:
      "We got a dog last year, a small brown one called Toffee, and it's changed our life, kind of in a good way. I'd say the biggest advantage is that she's a real companion. When I come home tired, she's so happy to see me that I forget my day. She's loyal, funny, and the kids adore her. The thing is, she's also a huge responsibility. Someone has to walk her three times a day, even when it's raining, and we can't just go away for the weekend anymore. There's also the mess: hair everywhere, and she ate my shoe. So yes, it's work. But we all take care of her together, and honestly, I can't imagine the house without her now.",
    band: 1,
  },
  {
    id: "sp-book",
    topicHe: "ספר",
    prompt: "Talk about a book you've read. What is it about? Why did you choose it, and would you recommend it?",
    keywords: ["novel", "chapter", "main character", "couldn't put it down", "message", "recommend"],
    chunks: ["at first,", "in the end,", "what I mean is"],
    model:
      "The last book I really enjoyed was a novel called The Alchemist. A friend gave it to me, and at first, I wasn't sure, because it looked like one of those books that tells you how to live. It's about a young shepherd who travels across the desert looking for a treasure, and the main character learns something in every chapter. It's short, and very simple language, so I read it in two days. I couldn't put it down. In the end, the message is that the journey matters more than the goal, which sounds a bit cheesy. What I mean is, it's not a deep book, but it makes you think. I'd recommend it if you want something light but meaningful.",
    band: 2,
  },
  {
    id: "sp-daily-app",
    topicHe: "אפליקציה שאני משתמש בה כל יום",
    prompt: "Talk about an app you use every day. What does it do? How has it changed the way you do things? Is there anything you'd improve?",
    keywords: ["feature", "notification", "handy", "keep track of", "user-friendly", "annoying"],
    chunks: ["these days,", "for example,", "apart from that,"],
    model:
      "The app I use most, apart from WhatsApp, is a to-do list app called Todoist. These days, my whole life is in there: work tasks, shopping, birthdays, even the reminder to call my mother. The main feature I like is that you can type things naturally, for example, \"dentist Tuesday at four,\" and it understands. It's really handy for keeping track of small things I'd otherwise forget, and it's very user-friendly. It has changed the way I work, because I don't have twenty sticky notes on my desk anymore. What would I improve? The notifications. Sometimes it reminds me about the same task five times, which is annoying. Apart from that, it's close to perfect.",
    band: 2,
  },
  {
    id: "sp-public-transport",
    topicHe: "תחבורה ציבורית",
    prompt: "Talk about public transport where you live. Do you use it? What works well, what doesn't, and how would you improve it?",
    keywords: ["reliable", "crowded", "fare", "on time", "route", "invest"],
    chunks: ["the thing is,", "as a result,", "in my opinion,"],
    model:
      "I use the train to get to work, and it's actually the best part of our public transport. It's usually on time, it's clean, and the fare is reasonable, especially with the monthly pass. Buses are a different story. The thing is, they're not reliable at all. The app says four minutes, and then the bus arrives twenty minutes later, completely crowded. As a result, most people I know drive, and the roads are full. My route home has three buses an hour in theory, and about one in practice. In my opinion, the city needs to invest in bus lanes so buses aren't stuck in the same traffic as cars. Do that, and people will leave the car at home.",
    band: 3,
  },
  {
    id: "sp-difficult-conversation",
    topicHe: "שיחה קשה",
    prompt: "Tell me about a difficult conversation you had to have. Who was it with, and what was it about? How did you prepare, and how did it go?",
    keywords: ["bring up", "honest", "awkward", "reaction", "relief", "put off"],
    chunks: ["to be honest,", "at first,", "in the end,"],
    model:
      "Last year, I had to tell my manager that I wanted to leave the team. To be honest, I'd put it off for months, because he'd been really good to me and I felt guilty. I prepared by writing down the main points, so I wouldn't forget them if I got nervous. I asked for a short meeting, and I brought it up right at the start, before I lost courage. At first, it was awkward. He went quiet, and I thought his reaction was going to be angry. But then he asked good questions, and I was honest about my reasons. In the end, he said he understood, and he even helped me find the new position. The relief afterward was huge.",
    band: 3,
  },
  {
    id: "sp-moving-house",
    topicHe: "מעבר דירה",
    prompt: "Talk about moving house. Have you moved recently, or are you planning to? What's the hardest part, and what do you look for in a new home?",
    keywords: ["pack", "landlord", "neighborhood", "stressful", "settle in", "rent"],
    chunks: ["long story short,", "the main thing is", "sooner or later,"],
    model:
      "We moved house six months ago, and I never want to do it again. The hardest part was packing. You don't realize how much stuff you have until you put it all in boxes. Then the landlord of the old flat wanted money for a scratch on the floor that had been there before us. Long story short, we spent a whole month arguing and carrying furniture. But the new place is great. The main thing for us was the neighborhood: quiet, close to a park, and near a good school. The rent is a bit higher, but it's worth it. It took us a while to settle in, but now it feels like home. Sooner or later, we'd like to buy, but not this year.",
    band: 2,
  },
];

// ---------------------------------------------------------------------------
// Quick-fire Q&A sets. The learner answers each question out loud in 5-10
// seconds; the model shows a natural 1-2 sentence answer with the target form.
// ---------------------------------------------------------------------------

export const QA_SETS: QASet[] = [
  {
    id: "qa-small-talk",
    title: "Small talk",
    questions: [
      { q: "How's it going?", model: "Pretty good, thanks. It's been a busy week, but I can't complain." },
      { q: "Did you have a good weekend?", model: "Yeah, it was nice and quiet. We stayed home and watched a couple of movies." },
      { q: "What do you think of this weather?", model: "Honestly, I love it. It's finally cool enough to walk outside." },
      { q: "Have you been here before?", model: "No, this is my first time. It's bigger than I expected." },
      { q: "How was your trip in?", model: "Not bad, actually. The traffic was lighter than usual." },
      { q: "Are you doing anything nice this weekend?", model: "Nothing special. We might go to the beach if it's not too hot." },
      { q: "How do you know the host?", model: "We used to work together, years ago. We've stayed in touch since then." },
      { q: "Can I get you something to drink?", model: "A glass of water would be great, thanks. I'm driving." },
      { q: "Have you tried the food?", model: "Not yet, but it looks amazing. I'm going to get some in a minute." },
      { q: "Well, it was nice talking to you.", model: "You too. Let's grab a coffee sometime." },
    ],
  },
  {
    id: "qa-your-job",
    title: "Your job",
    questions: [
      { q: "What do you do for a living?", model: "I'm a project manager at a software company. Basically, I make sure things get finished on time." },
      { q: "How long have you been doing that?", model: "About four years now. Before that, I was a developer." },
      { q: "What's a typical day like?", model: "Lots of meetings in the morning, then emails and planning in the afternoon. No two days are the same, though." },
      { q: "What's the best thing about your job?", model: "The people, definitely. My team is great, and we actually enjoy working together." },
      { q: "And the worst thing?", model: "The pressure before a deadline. Everyone gets stressed, and I'm the one in the middle." },
      { q: "Do you work from home?", model: "Two days a week, usually. The other three I'm in the office." },
      { q: "How do you get on with your boss?", model: "Really well, actually. She's tough, but she's fair." },
      { q: "Would you like to change jobs?", model: "Not right now. Maybe in a couple of years, if something interesting comes up." },
      { q: "What did you want to be when you were a kid?", model: "A pilot, like every kid. Then I discovered I hate flying." },
      { q: "What skills do you need for your job?", model: "Mostly communication and organization. And a lot of patience." },
    ],
  },
  {
    id: "qa-weekend",
    title: "Weekend",
    questions: [
      { q: "What did you do last weekend?", model: "We drove up north and stayed with friends. It was really relaxing." },
      { q: "Did you go out on Friday night?", model: "No, we stayed in. I was exhausted after the week." },
      { q: "What time did you get up on Saturday?", model: "Around nine, which is late for me. The kids let me sleep for once." },
      { q: "Did you do any sport?", model: "I went for a run on Saturday morning. Only five kilometers, but it felt good." },
      { q: "Did you see anyone?", model: "Yeah, my sister came over for lunch. We hadn't seen each other for a month." },
      { q: "What are you doing this weekend?", model: "I'm meeting some old friends on Friday. We're going to that new place by the beach." },
      { q: "Are you going anywhere?", model: "Probably not. I've got too much to do at home." },
      { q: "What's your favorite thing to do on a Saturday?", model: "A long breakfast with the newspaper. No phone, no rush." },
      { q: "Do you usually cook at the weekend?", model: "Yes, that's when I have time. I made a huge lasagna last Saturday." },
      { q: "How do you feel on Sunday morning?", model: "A bit sad, to be honest. The week starts again, and I never feel ready." },
    ],
  },
  {
    id: "qa-food",
    title: "Food",
    questions: [
      { q: "What did you have for breakfast today?", model: "Just coffee and a piece of toast. I was in a hurry." },
      { q: "Do you like cooking?", model: "I do, but only when I have time. On weekdays it's just something quick." },
      { q: "What's your favorite dish?", model: "My mom's chicken soup. Nothing else comes close." },
      { q: "Is there any food you can't stand?", model: "Olives. I've tried them a hundred times, and I still hate them." },
      { q: "How often do you eat out?", model: "Maybe once a week. It's getting expensive, so we cook more at home." },
      { q: "Can you recommend a good restaurant?", model: "There's a little Italian place near my office. The pasta is homemade and really cheap." },
      { q: "Do you eat much meat?", model: "Less than I used to. We have two or three vegetarian days a week now." },
      { q: "What's a typical dinner in your house?", model: "Usually something simple, like rice with chicken and salad. The kids don't like anything complicated." },
      { q: "Do you drink a lot of coffee?", model: "Too much. I'm on my third cup, and it's only eleven." },
      { q: "What would you cook for a guest?", model: "Probably shakshuka. It's easy, it looks impressive, and everyone likes it." },
    ],
  },
  {
    id: "qa-travel",
    title: "Travel",
    questions: [
      { q: "Where did you go on your last holiday?", model: "We went to Greece for a week. It was hot, cheap, and beautiful." },
      { q: "What's the best place you've ever visited?", model: "Probably Lisbon. Great food, friendly people, and the light is amazing." },
      { q: "Do you prefer the beach or the mountains?", model: "The mountains, definitely. I get bored lying on a beach after an hour." },
      { q: "How do you usually travel?", model: "We fly if it's far, but I love a road trip when we can." },
      { q: "Have you ever lost your luggage?", model: "Once, in Rome. It arrived two days later, after I'd bought new clothes." },
      { q: "Where would you like to go next?", model: "Japan is at the top of my list. I've been saving for it for two years." },
      { q: "Do you like traveling alone?", model: "I've done it a couple of times, and I liked it. You do exactly what you want." },
      { q: "What do you always pack?", model: "A good book and headphones. And too many T-shirts." },
      { q: "What's the worst thing about flying?", model: "The waiting. Security, boarding, and then sitting on the plane for an hour before it moves." },
      { q: "Do you take a lot of photos when you travel?", model: "Way too many. I take five hundred and then never look at them." },
    ],
  },
  {
    id: "qa-opinions",
    title: "Opinions",
    questions: [
      { q: "Do you think people work too much these days?", model: "Absolutely. Everyone I know is tired, and nobody really switches off." },
      { q: "Is it better to rent or to buy a home?", model: "It depends on your situation, but I'd buy if I could. Rent just disappears every month." },
      { q: "Should kids have phones at school?", model: "No, I don't think so. They can't concentrate with a phone in their pocket." },
      { q: "What do you think about electric cars?", model: "I think they're the future, but they're still too expensive for most people." },
      { q: "Is it important to learn a second language?", model: "Definitely. It opens doors, and it changes the way you think." },
      { q: "Do you think money makes people happy?", model: "Up to a point. After that, it's about time and people, not money." },
      { q: "Is TV worse than it used to be?", model: "Not at all. There's more rubbish, but the good stuff is better than ever." },
      { q: "Should people retire earlier or later?", model: "Earlier, in my opinion. Sixty-seven is too old to start enjoying your life." },
      { q: "Do you agree that the city is too crowded?", model: "Yes and no. It's crowded, but that's also what makes it alive." },
      { q: "What's the biggest problem in the world right now?", model: "I'd say the climate. Everything else depends on it." },
    ],
  },
  {
    id: "qa-past-experiences",
    title: "Past experiences",
    questions: [
      { q: "Have you ever been to the US?", model: "Yes, twice. The first time was in 2015, for a friend's wedding." },
      { q: "Have you ever broken a bone?", model: "I broke my arm when I was ten. I fell off my bike on the way to school." },
      { q: "Have you ever met anyone famous?", model: "Once. I saw a well-known actor in a café, and I was too shy to say anything." },
      { q: "What's the most dangerous thing you've done?", model: "I went diving with sharks in Australia. It was terrifying and amazing at the same time." },
      { q: "Have you tried any new food recently?", model: "I had Ethiopian food last month. You eat with your hands, and it was delicious." },
      { q: "Have you ever lost something important?", model: "I lost my passport in Paris. I found it two hours later, in my own jacket." },
      { q: "Did you enjoy school?", model: "Not really. I liked my friends, but I was bored in most classes." },
      { q: "Have you ever been really scared?", model: "Yes, on a flight with terrible turbulence. I held the stranger next to me by the hand." },
      { q: "When did you last laugh really hard?", model: "Yesterday, actually. My daughter told a joke that made no sense, and I couldn't stop laughing." },
      { q: "Have you seen any good films lately?", model: "I saw a Korean thriller last week. I didn't understand everything, but I loved it." },
    ],
  },
  {
    id: "qa-future-plans",
    title: "Future plans",
    questions: [
      { q: "What are you doing tonight?", model: "I'm having dinner with my parents. It's my dad's birthday." },
      { q: "Any plans for the summer?", model: "We're going to rent a house by the sea for a week. Nothing fancy." },
      { q: "Where do you see yourself in five years?", model: "Hopefully in my own place, maybe with a bigger team at work. Who knows, though." },
      { q: "Are you going to learn anything new this year?", model: "I'm going to take a photography course. I've already signed up." },
      { q: "What will you do when you retire?", model: "I'll probably travel a lot and finally read all the books on my shelf." },
      { q: "Do you think you'll stay in this city?", model: "I think so, at least for now. My whole family is here." },
      { q: "What's the next big purchase you'll make?", model: "Probably a new car. Mine is fifteen years old and makes strange noises." },
      { q: "Are you going to the party on Saturday?", model: "Yes, I'll be there. I might be a bit late, though." },
      { q: "Will you have kids one day?", model: "I hope so, but not in the next couple of years. I'm not ready yet." },
      { q: "What are you looking forward to?", model: "The holidays, honestly. I'm counting the days." },
    ],
  },
  {
    id: "qa-hypotheticals",
    title: "What if...?",
    questions: [
      { q: "What would you do if you won the lottery?", model: "I'd pay off my mortgage first. Then I'd take a year off and travel." },
      { q: "If you could live anywhere, where would you live?", model: "I'd probably live in Barcelona. It has the sea, the food, and great weather." },
      { q: "What would you do if you lost your phone?", model: "I'd panic for about ten minutes. Then I'd block everything and buy a cheap one." },
      { q: "If you could have dinner with anyone, who would it be?", model: "My grandfather. He died before I was born, and I'd love to ask him a hundred questions." },
      { q: "What would you change about your job?", model: "If I could, I'd cut half of the meetings. We'd all get more done." },
      { q: "If you had an extra hour every day, what would you do with it?", model: "I'd read, definitely. I never have time for books anymore." },
      { q: "Would you move abroad if you got a great job offer?", model: "It would depend on the country, but I think I'd go. At least for a few years." },
      { q: "What would you do if you saw someone steal something?", model: "I'd probably tell the security guard. I wouldn't try to stop them myself." },
      { q: "If you could learn any skill instantly, what would it be?", model: "Playing the piano. It would be amazing to just sit down and play." },
      { q: "What would you say to your younger self?", model: "I'd tell him to worry less. Most of the things I worried about never happened." },
    ],
  },
  {
    id: "qa-preferences",
    title: "Preferences",
    questions: [
      { q: "Do you prefer mornings or evenings?", model: "Evenings, without a doubt. I'm useless before ten in the morning." },
      { q: "Would you rather have a big party or a small dinner?", model: "A small dinner, definitely. I like actually talking to people." },
      { q: "Tea or coffee?", model: "Coffee, always. I only drink tea when I'm sick." },
      { q: "Do you prefer reading or watching a film?", model: "I'd rather read, but I usually end up watching something because I'm tired." },
      { q: "Summer or winter?", model: "Winter, if I'm honest. I can't stand the heat here in August." },
      { q: "Would you rather work in a big company or a small one?", model: "A small one. You know everyone, and your work actually matters." },
      { q: "City break or beach holiday?", model: "City break. I get bored on the beach after a day." },
      { q: "Do you prefer texting or calling?", model: "Texting for small things, calling for anything important. My mom disagrees." },
      { q: "Cats or dogs?", model: "Dogs, easily. Cats don't care whether you exist." },
      { q: "Would you rather be famous or rich?", model: "Rich, please. Being famous sounds exhausting." },
    ],
  },
  {
    id: "qa-describing-people",
    title: "Describing people",
    questions: [
      { q: "What does your best friend look like?", model: "He's tall and thin, with short dark hair and glasses. He always looks like he needs a coffee." },
      { q: "What's your boss like?", model: "She's very direct, but fair. You always know where you stand with her." },
      { q: "Who's the funniest person you know?", model: "My cousin, easily. He can make a whole room laugh without trying." },
      { q: "Describe your mother in three words.", model: "Warm, stubborn, and organized. She runs the whole family." },
      { q: "What kind of people do you get along with?", model: "Honest people with a sense of humor. I don't have patience for drama." },
      { q: "Is your brother like you?", model: "Not at all. He's quiet and careful, and I'm the opposite." },
      { q: "What was your favorite teacher like?", model: "He was strict but really passionate about his subject. He made history feel like a story." },
      { q: "How would your friends describe you?", model: "Probably as loyal and a bit too talkative. Maybe a little impatient." },
      { q: "Who's the most generous person you know?", model: "My aunt. She'd give you her last shekel and then apologize that it wasn't more." },
      { q: "Describe someone you don't get along with.", model: "There's a guy at work who's arrogant and never listens. Every conversation with him is a competition." },
    ],
  },
  {
    id: "qa-problems-advice",
    title: "Problems and advice",
    questions: [
      { q: "My car won't start. What should I do?", model: "You should check the battery first. If it's dead, call someone to jump-start it." },
      { q: "I can't sleep at night. Any advice?", model: "You should stop looking at your phone in bed. And no coffee after lunch." },
      { q: "I've had a headache all day.", model: "You should drink some water and get some fresh air. If it doesn't go away, see a doctor." },
      { q: "My neighbor plays loud music every night.", model: "I'd talk to him first, politely. If that doesn't work, you could speak to the building manager." },
      { q: "I'm always late for everything.", model: "Try setting your clock ten minutes fast. And leave earlier than you think you need to." },
      { q: "I'm nervous about my interview tomorrow.", model: "That's normal. Prepare a few answers, get a good night's sleep, and remember they want you to succeed." },
      { q: "I've spent too much money this month.", model: "You'd better stop eating out for a while. Maybe write down everything you spend for a week." },
      { q: "I don't get along with my new colleague.", model: "Give it time. You could try having lunch together, just the two of you." },
      { q: "My phone battery dies by lunchtime.", model: "You should turn off the apps running in the background. If that doesn't help, the battery probably needs replacing." },
      { q: "I want to exercise more, but I have no time.", model: "Start small. Even a fifteen-minute walk every day makes a difference." },
    ],
  },
  {
    id: "qa-daily-habits",
    title: "Daily habits",
    questions: [
      { q: "What time do you usually get up?", model: "Around half past six on weekdays. On weekends, whenever the kids wake me." },
      { q: "How do you get to work?", model: "I take the train, usually. It takes about forty minutes door to door." },
      { q: "What do you do first thing in the morning?", model: "I make coffee before anything else. I can't function without it." },
      { q: "How often do you exercise?", model: "Two or three times a week, if I'm being good. Sometimes less." },
      { q: "Do you read the news every day?", model: "I check the headlines on my phone, but I try not to read too much. It just makes me stressed." },
      { q: "What time do you usually have dinner?", model: "About seven thirty, once everyone's home. It's the one meal we eat together." },
      { q: "How much time do you spend on your phone?", model: "Too much. My phone says about three hours a day, which is embarrassing." },
      { q: "Do you always eat lunch at the same time?", model: "More or less, around one. I usually bring something from home." },
      { q: "What do you do in the evening?", model: "After the kids are in bed, we watch something or I read. Nothing exciting." },
      { q: "What time do you go to bed?", model: "I try for eleven, but it's often closer to midnight." },
    ],
  },
  {
    id: "qa-getting-to-know-you",
    title: "Getting to know you",
    questions: [
      { q: "Where are you from originally?", model: "I'm from a small town in the north. I moved to the city for university and never left." },
      { q: "Do you have any brothers or sisters?", model: "Yes, two brothers and a sister. I'm the youngest." },
      { q: "What do you do in your free time?", model: "I play football with friends, and I've recently gotten into photography." },
      { q: "What kind of music do you like?", model: "A bit of everything, but mostly rock. I still listen to the bands I loved at sixteen." },
      { q: "Are you a morning person?", model: "Not at all. I'm useless before my second coffee." },
      { q: "What's something most people don't know about you?", model: "I used to play the drums in a band. We were terrible, but we had fun." },
      { q: "What are you passionate about?", model: "Cooking, mainly. I could talk about food for hours." },
      { q: "Have you always lived here?", model: "No, I lived abroad for two years after university. Then I came back." },
      { q: "What makes you laugh?", model: "My kids, mostly. And bad puns, the worse the better." },
      { q: "What's one thing you'd like to do before you're fifty?", model: "See the northern lights. It's been on my list forever." },
    ],
  },
];

// ---------------------------------------------------------------------------
// Retell stories. The learner reads (or hears) the story once, then retells it
// from the keywords. Past narrative: past simple + past continuous + past perfect.
// ---------------------------------------------------------------------------

export const RETELL_STORIES: RetellStory[] = [
  {
    id: "rt-missed-flight",
    title: "The missed flight",
    text:
      "Last March, Dana was flying to Berlin for a work conference. She had packed the night before, so she felt relaxed. On the way to the airport, she was listening to a podcast when she realized her passport was still on the kitchen table. She told the taxi driver to turn around. By the time they got back to the airport, the gate had already closed. Dana sat on the floor and almost cried. Then a woman at the desk found her a seat on the next flight, three hours later. She arrived in Berlin late, but just in time for the opening dinner. Nobody noticed she had almost missed everything.",
    keywords: ["conference", "passport", "turn around", "gate", "next flight"],
    points: [
      "Dana was flying to Berlin for a work conference.",
      "In the taxi, she realized she had left her passport at home.",
      "They went back, and the gate had closed when she returned.",
      "A woman at the desk found her a seat on the next flight.",
      "She arrived late but in time for the opening dinner.",
    ],
  },
  {
    id: "rt-wrong-number",
    title: "Wrong number",
    text:
      "One evening, Tom was cooking dinner when his phone rang. He didn't know the number, but he answered anyway. A woman started talking very fast about a birthday cake she had ordered for Saturday. Tom tried to explain that he wasn't a bakery, but she wasn't listening. Finally, he said, \"Madam, I'm making pasta, not cakes.\" There was a long silence. Then she started laughing, and so did he. They talked for almost twenty minutes. It turned out that she lived two streets away. A week later, they met for coffee. That was three years ago. Last month, they got married, and yes, there was a very big cake.",
    keywords: ["phone rang", "birthday cake", "bakery", "laughing", "coffee"],
    points: [
      "Tom was cooking when an unknown number called.",
      "A woman talked about a cake she had ordered; she thought he was a bakery.",
      "He said he was making pasta, not cakes, and they both laughed.",
      "She lived nearby, and they met for coffee a week later.",
      "Three years later, they got married.",
    ],
  },
  {
    id: "rt-surprise-party",
    title: "The surprise party",
    text:
      "Maya's friends had been planning her thirtieth birthday party for weeks. On Friday evening, they were hiding in her living room with balloons and cake. Her flatmate had promised to bring her home at eight. At eight fifteen, the door opened, and everyone shouted, \"Surprise!\" But it wasn't Maya. It was the neighbor, who had come to complain about the noise. He stood there holding a bag of rubbish, looking very confused. Ten minutes later, Maya finally arrived. By then, the neighbor was sitting on the sofa with a piece of cake. Maya laughed so much that she cried. It was, she said later, the best birthday she had ever had.",
    keywords: ["planning", "hiding", "Surprise!", "neighbor", "cake"],
    points: [
      "Maya's friends were hiding in her living room for a surprise party.",
      "The flatmate had promised to bring her home at eight.",
      "When the door opened, everyone shouted, but it was the neighbor.",
      "The neighbor had come to complain about the noise.",
      "When Maya arrived, the neighbor was eating cake, and she laughed a lot.",
    ],
  },
  {
    id: "rt-lost-dog",
    title: "The lost dog",
    text:
      "On Sunday morning, Ben was walking his dog, Max, in the park when a cat ran across the path. Max pulled so hard that the lead broke, and he disappeared into the trees. Ben ran after him, shouting his name, but Max had gone. For two hours, Ben walked around the park, asking everyone he saw. He was starting to panic. Then his phone rang. It was his mother. \"Are you looking for something?\" she asked. Max was sitting in her kitchen, eating chicken. The dog had run all the way across town to her house, which he had visited only twice before. Ben still doesn't understand how he found it.",
    keywords: ["park", "cat", "lead broke", "phone rang", "kitchen"],
    points: [
      "Ben was walking his dog Max in the park on Sunday morning.",
      "A cat ran past, the lead broke, and Max ran away.",
      "Ben searched the park for two hours and started to panic.",
      "His mother called: Max was in her kitchen eating chicken.",
      "The dog had run across town to a house he had only visited twice.",
    ],
  },
  {
    id: "rt-interview-mishap",
    title: "The interview",
    text:
      "Noa had prepared for the job interview for a week. She had read about the company, practiced her answers, and bought a new jacket. On the morning of the interview, she was waiting in the lobby when she noticed a man next to her struggling with a coffee machine. She helped him, and they chatted for a few minutes about how bad the coffee was. Then she went upstairs. When she walked into the interview room, the same man was sitting at the table. He was the company's director. Noa's face went red. But he smiled and said, \"So, you already know our biggest problem.\" She got the job. Her first project was choosing a new coffee machine.",
    keywords: ["prepared", "lobby", "coffee machine", "director", "got the job"],
    points: [
      "Noa had prepared for the interview for a week.",
      "In the lobby, she helped a man with the coffee machine and chatted with him.",
      "The man turned out to be the company's director.",
      "He joked that she already knew their biggest problem.",
      "She got the job, and her first project was a new coffee machine.",
    ],
  },
  {
    id: "rt-cooking-disaster",
    title: "The cooking disaster",
    text:
      "Last Friday, Omer decided to cook dinner for his girlfriend's parents for the first time. He had found a recipe online for roast chicken, and it looked easy. While the chicken was cooking, he was preparing a salad and talking to his brother on the phone. He didn't notice the smoke until the alarm went off. The chicken was completely black. The guests were arriving in twenty minutes. Omer ran to the small restaurant on the corner and bought four portions of chicken and rice. He put everything on nice plates and opened the windows. The parents said it was delicious. Two months later, his girlfriend told him that they had known from the first bite.",
    keywords: ["recipe", "smoke", "alarm", "restaurant", "first bite"],
    points: [
      "Omer was cooking roast chicken for his girlfriend's parents for the first time.",
      "He was on the phone and didn't notice the smoke until the alarm went off.",
      "The chicken was burned and the guests were arriving in twenty minutes.",
      "He bought food from a restaurant and served it on nice plates.",
      "The parents said it was delicious, but they had known from the first bite.",
    ],
  },
  {
    id: "rt-neighbor-dispute",
    title: "The neighbors",
    text:
      "For months, Sara and her upstairs neighbor had been fighting about noise. He played the piano late at night, and she banged on the ceiling with a broom. They had never actually spoken. One evening, Sara was coming home when she saw an old man sitting on the stairs, looking upset. He had locked himself out. She invited him in for tea while they waited for the locksmith. They talked for an hour about music, and she told him she loved the piano but hated the noise at night. He went quiet. Then he said, \"That's me.\" Now he plays at six in the evening, and Sara sometimes goes upstairs to listen.",
    keywords: ["noise", "broom", "locked out", "tea", "six in the evening"],
    points: [
      "Sara and her upstairs neighbor had been fighting about piano noise for months.",
      "They had never actually spoken to each other.",
      "One evening, she found an old man locked out and invited him in for tea.",
      "During the conversation, it turned out that he was the piano player.",
      "Now he plays at six, and she sometimes goes to listen.",
    ],
  },
  {
    id: "rt-found-wallet",
    title: "The wallet",
    text:
      "Eli was riding his bike home from work when he saw a wallet lying on the road. He stopped and picked it up. Inside, there was some cash, a few cards, and a photo of two little girls. There was no phone number. Eli was tired, and it was getting dark, but he decided to find the owner. The address on the ID card was only ten minutes away. When he knocked on the door, a woman opened it with tears in her eyes. She had been searching for the wallet all afternoon. Her daughters had made the photo for her birthday. She tried to give Eli the cash, but he refused. He accepted a cup of coffee instead.",
    keywords: ["bike", "wallet", "photo", "address", "coffee"],
    points: [
      "Eli was cycling home when he found a wallet on the road.",
      "Inside were cash, cards, and a photo of two little girls, but no phone number.",
      "He decided to go to the address on the ID card.",
      "The woman had been searching all afternoon and was very emotional.",
      "She offered him the cash, but he only accepted a coffee.",
    ],
  },
  {
    id: "rt-first-day-work",
    title: "First day at work",
    text:
      "On her first day at the new company, Lia arrived forty minutes early. She wanted to make a good impression. The office was empty, so she sat down at a desk by the window and started reading the welcome documents. At nine, a man walked in, looked at her, and said, \"Sorry, that's my desk.\" Lia jumped up and apologized. Then she sat at another desk. Ten minutes later, a woman told her the same thing. It happened three times. Finally, her manager arrived and explained that nobody had prepared a desk for her yet. She spent her first morning in the kitchen, drinking coffee. By lunchtime, everyone in the office knew her name.",
    keywords: ["early", "empty office", "my desk", "three times", "kitchen"],
    points: [
      "Lia arrived forty minutes early on her first day to make a good impression.",
      "She sat at a desk by the window and started reading.",
      "Three different people told her she was sitting at their desk.",
      "Her manager explained that nobody had prepared a desk for her.",
      "She spent the morning in the kitchen, and by lunch everyone knew her.",
    ],
  },
  {
    id: "rt-car-breakdown",
    title: "The breakdown",
    text:
      "Yoav was driving to his sister's wedding in the north when the car started making a strange noise. He turned up the music and kept going. Twenty minutes later, smoke was coming from under the hood, and the engine died. He was standing on the side of the highway in a suit, and the wedding was starting in two hours. He had forgotten to charge his phone, so he couldn't call anyone. After fifteen minutes, a truck stopped. The driver was going to the same town. He was, in fact, delivering the flowers for the wedding. Yoav arrived on time, sitting between three hundred roses. His sister still tells the story at every family dinner.",
    keywords: ["strange noise", "smoke", "highway", "truck", "roses"],
    points: [
      "Yoav was driving to his sister's wedding when the car made a strange noise.",
      "He ignored it, and twenty minutes later the engine died on the highway.",
      "His phone had no battery, so he couldn't call for help.",
      "A truck driver stopped, and he was delivering the wedding flowers.",
      "Yoav arrived on time, sitting among the roses.",
    ],
  },
  {
    id: "rt-online-order",
    title: "The online order",
    text:
      "Rina ordered a small blue lamp online for her bedroom. It cost thirty shekels, and she forgot about it. A week later, she was working from home when the doorbell rang. Two men were standing outside with an enormous box. Inside was a sofa. A big, blue sofa. Rina explained that she had ordered a lamp, but the men said it wasn't their problem and left. She called the company, and the woman on the phone was very confused, because somebody in Haifa had received a very small package and was also complaining. It took three weeks to fix. In the end, the company let her keep the sofa. She's still waiting for the lamp.",
    keywords: ["lamp", "doorbell", "sofa", "Haifa", "keep"],
    points: [
      "Rina ordered a small blue lamp online for thirty shekels.",
      "A week later, two men delivered a huge box with a blue sofa.",
      "The delivery men left, saying it wasn't their problem.",
      "Someone in Haifa had received the tiny package instead.",
      "The company let her keep the sofa, but the lamp never came.",
    ],
  },
  {
    id: "rt-rainy-hike",
    title: "The hike",
    text:
      "Last winter, four friends went hiking in the Galilee. The forecast had said sunny, so nobody brought a jacket. They were walking along the river, taking photos and eating sandwiches, when the sky suddenly turned dark. Within minutes, it was raining hard. The path became a small river, and one of them, Guy, slipped and fell in the mud. He was fine, but his phone wasn't. They ran to a small building they had seen from the path. It was a farm, and the farmer's wife gave them towels and hot soup. They stayed for two hours, talking about her cows. When the rain stopped, the sun came out. Guy says it was the best hike of his life.",
    keywords: ["forecast", "river", "rain", "mud", "hot soup"],
    points: [
      "Four friends went hiking in the Galilee without jackets because the forecast said sunny.",
      "While they were walking by the river, it suddenly started raining hard.",
      "Guy slipped in the mud and broke his phone.",
      "They ran to a farm, where the farmer's wife gave them towels and soup.",
      "The sun came out later, and Guy calls it his best hike ever.",
    ],
  },
  {
    id: "rt-forgotten-birthday",
    title: "The forgotten birthday",
    text:
      "It was a normal Tuesday. Adam went to work, had lunch at his desk, and came home at seven. His wife, Tali, was sitting in the dark living room. She wasn't watching TV or reading; she was just sitting. \"Is everything okay?\" he asked. She said yes in a voice that clearly meant no. Adam checked his phone, and then he understood. It was her birthday. He had forgotten completely, and so had her sister, apparently. He took her out for dinner immediately, still in his work clothes. On the way, he stopped at a petrol station and bought flowers. Tali laughed at the flowers, but she kept them for a week. He hasn't forgotten since.",
    keywords: ["Tuesday", "dark", "phone", "birthday", "petrol station"],
    points: [
      "Adam had a normal day and came home at seven.",
      "Tali was sitting in the dark living room and said everything was okay, but it wasn't.",
      "He checked his phone and realized it was her birthday.",
      "He had forgotten, and so had her sister.",
      "He took her out for dinner and bought flowers at a petrol station.",
    ],
  },
  {
    id: "rt-abroad-misunderstanding",
    title: "Lost in translation",
    text:
      "Dan was on holiday in Italy, and his Italian was limited to about ten words. One evening, he walked into a small restaurant and pointed at something on the menu. The waiter looked surprised but nodded. Dan was enjoying the view and drinking his wine when the food arrived. It was a plate of small fried fish, complete with heads and eyes. Dan had wanted pasta. He tried to explain with his hands, and the waiter thought he was asking for more. Soon, there were two plates of fish. In the end, Dan ate everything, because he was too embarrassed to leave it. He later found out that he had ordered the most expensive dish on the menu.",
    keywords: ["ten words", "pointed", "fried fish", "hands", "most expensive"],
    points: [
      "Dan was in Italy and spoke almost no Italian.",
      "He pointed at something on the menu without knowing what it was.",
      "He received a plate of fried fish with heads, when he had wanted pasta.",
      "His hand gestures made the waiter bring a second plate.",
      "He ate everything, and it was the most expensive dish on the menu.",
    ],
  },
  {
    id: "rt-gym-mistake",
    title: "The gym",
    text:
      "In January, Michal joined a gym for the first time in her life. On her first visit, she was nervous, so she copied a man who was lifting weights next to her. He was very fit, and he was lifting a lot. Michal picked up the same weights and tried to do the same exercise. She managed two repetitions. Then she dropped the weight on her foot. Nothing was broken, but she sat on the floor for ten minutes with ice on her toes. A trainer came over and asked why she hadn't booked an introduction session. She hadn't known there was one. Now she goes three times a week, and she starts with the lightest weights in the room.",
    keywords: ["January", "copied", "weights", "foot", "introduction session"],
    points: [
      "Michal joined a gym for the first time in January.",
      "On her first visit, she copied a very fit man lifting heavy weights.",
      "She dropped the weight on her foot after two repetitions.",
      "A trainer asked why she hadn't booked an introduction session, which she didn't know existed.",
      "Now she goes three times a week and starts with light weights.",
    ],
  },
  {
    id: "rt-late-wedding",
    title: "Late for the wedding",
    text:
      "Roy and Shira were going to a wedding on Thursday night. Roy had told Shira it started at seven, so at six thirty they were still getting dressed. Then Shira looked at the invitation. The ceremony was at six. They ran to the car, and Roy drove faster than he ever had. They arrived at the venue at seven fifteen, out of breath, and walked quietly to the back. Nobody was looking at them. In fact, nobody was there at all. Roy checked the invitation again. The wedding was on Thursday, but next Thursday. They had come a week early. They went out for dinner instead, and the following week, they were the first guests to arrive.",
    keywords: ["seven", "invitation", "drove fast", "nobody", "week early"],
    points: [
      "Roy and Shira thought the wedding started at seven, but it started at six.",
      "They drove very fast and arrived at seven fifteen.",
      "The venue was completely empty.",
      "They had come a week early.",
      "The following week, they were the first guests to arrive.",
    ],
  },
];

// ---------------------------------------------------------------------------
// Read-aloud scripts. " | " marks a thought group (pause); *stars* mark the
// stressed content words in each group. Spoken register, not written prose.
// ---------------------------------------------------------------------------

export const READ_ALOUD: ReadAloudScript[] = [
  {
    id: "ra-voicemail",
    title: "Leaving a voicemail",
    text:
      "Hi *Sarah*, | it's *Dan* from the *office*. | I'm calling about *tomorrow's* meeting. | The *client* just emailed | and they want to *move* it | to *two* o'clock instead of *ten*. | I *know* that's short notice, | so if it *doesn't* work for you, | just *let* me know | and I'll try to *push* it back. | *Also*, | could you bring the *printed* version of the report? | The *projector* in room three | is *broken* again. | *Anyway*, | give me a *call* when you get this, | or just send a *text*. | *Thanks* a lot. | *Bye*.",
    words: 94,
  },
  {
    id: "ra-toast",
    title: "A wedding toast",
    text:
      "Okay, *everyone*, | can I have your *attention* for a minute? | For those who *don't* know me, | I'm *Eli*, | the groom's *older* brother. | I've known *Tom* his *whole* life, | and I have to say, | he was a *terrible* roommate. | *Loud*, | *messy*, | and he *never* did the dishes. | But then he met *Maya*, | and *something* changed. | He started *cleaning*. | He started *cooking*. | He even started *listening*. | *Maya*, | I don't know *how* you did it, | but *thank* you. | So please raise your *glasses* | to the *happy* couple. | To *Tom* and *Maya*!",
    words: 98,
  },
  {
    id: "ra-directions",
    title: "Giving directions",
    text:
      "*Sure*, | it's not *far*. | Go *straight* down this street | until you get to the *big* pharmacy. | You *can't* miss it, | it's *green*. | Then turn *left* | and keep *going* | for about *two* minutes. | You'll pass a *school* on your right, | and then a small *park*. | The *café* is right *after* the park, | on the *corner*. | If you get to the *bridge*, | you've gone *too* far. | Just come *back* a bit. | It's got a *red* sign, | and there are usually *tables* outside. | You'll *find* it, | it's *easy*.",
    words: 92,
  },
  {
    id: "ra-complaint",
    title: "A customer service call",
    text:
      "Hi, | I'm calling about an *order* I placed | *two* weeks ago. | The order number is | *four*, | *seven*, | *three*, | *nine*. | It was supposed to *arrive* last Monday, | but I still *haven't* received it. | I've *checked* the tracking page, | and it just says *\"in transit\"*. | I've *also* sent two emails, | and *nobody* has replied. | *Honestly*, | I'm getting a bit *frustrated*. | So what I'd *like* to know is, | *where* is my package, | and *when* will it arrive? | And if you *can't* tell me, | I'd like a *refund*, | *please*.",
    words: 94,
  },
  {
    id: "ra-anecdote",
    title: "A funny story",
    text:
      "So this is *true*, | it happened to my *cousin*. | He's at the *airport*, | *super* early, | and he sits down next to this *old* lady. | She's *eating* cookies from a bag | on the seat *between* them. | And he thinks, | *why* not, | so he takes *one*. | She looks at him, | says *nothing*, | and takes one *too*. | This goes on until the bag is *empty*. | He's *furious*. | Then his flight is *called*, | he opens his *own* bag, | and there are his *cookies*. | *Unopened*. | He'd been eating *hers* the whole time.",
    words: 98,
  },
  {
    id: "ra-presentation",
    title: "Opening a presentation",
    text:
      "Good *morning*, everyone, | and thanks for *coming*. | My name is *Noa*, | and I'm the *product* manager | for the *mobile* app. | *Today*, | I'm going to talk about *three* things. | *First*, | what we *learned* from the last release. | *Second*, | what our *users* are actually asking for. | And *third*, | what we're *planning* for the next *six* months. | It should take about *twenty* minutes, | and then we'll have time for *questions*. | Feel free to *stop* me at any point. | *Okay*, | let's *start* with the numbers.",
    words: 90,
  },
  {
    id: "ra-interview-answer",
    title: "An interview answer",
    text:
      "That's a *good* question. | I'd say my biggest *strength* | is that I stay *calm* under pressure. | For *example*, | in my *last* job, | we had a *major* system failure | *two* days before a launch. | Everyone was *panicking*. | I sat the team *down*, | we made a *list* of what was broken, | and we fixed things *one* by one. | We launched *on time*. | As for *weaknesses*, | I can be *impatient* | when things move *slowly*. | I'm *working* on it, | mostly by *listening* more | and *talking* less.",
    words: 88,
  },
  {
    id: "ra-book-table",
    title: "Booking a table",
    text:
      "Hi, | I'd like to *book* a table for *Saturday* night, | *please*. | For *six* people. | Around *eight*, | if that's *possible*. | *Eight thirty*? | Yeah, | that's *fine*. | It's under the name *Levi*, | *L*, *E*, *V*, *I*. | Oh, and *one* more thing, | one of us is *vegetarian*. | Do you have *options* for that? | *Great*. | And is there *parking* nearby? | *Okay*, | the street *behind* you. | *Perfect*. | So that's *six* people, | *Saturday*, | *eight thirty*. | *Thanks* very much. | See you *then*.",
    words: 91,
  },
  {
    id: "ra-advice-friend",
    title: "Advice to a friend",
    text:
      "*Look*, | I know you're *upset*, | but *listen* to me for a second. | You've been at that company for *five* years, | and you're *still* doing the same job. | They keep *promising* you a promotion, | and it *never* happens. | So *honestly*? | I think you should *start* looking. | *Not* tomorrow, | *not* in a panic. | Just *update* your CV, | talk to a few *people*, | see what's *out* there. | You *don't* have to decide anything *now*. | But at *least* you'll have *options*. | And *whatever* you decide, | I'm *here*, | *okay*?",
    words: 92,
  },
  {
    id: "ra-weather-update",
    title: "Weather update",
    text:
      "And now, the *weather* for the *weekend*. | *Friday* is looking *good*: | *sunny* across the country, | with *highs* of around *twenty-eight* in the center | and a bit *cooler* in the north. | *Saturday*, | *however*, | is a different *story*. | *Clouds* will move in from the *west* during the morning, | and by the *afternoon* | we're expecting *rain*, | *heavy* at times, | especially along the *coast*. | *Temperatures* will drop to around *twenty*. | So if you're planning a *barbecue*, | *Friday's* your day. | On *Sunday*, | things should *clear* up | by the *evening*.",
    words: 95,
  },
  {
    id: "ra-podcast-intro",
    title: "Podcast intro",
    text:
      "Hey *everyone*, | and *welcome* back to the show. | I'm *Amir*, | and this is episode *forty-two*. | *Today*, | we're talking about something | *all* of us struggle with: | *sleep*. | Why we *don't* get enough, | why we *can't* switch off, | and what actually *works*. | My guest today is a *sleep* researcher | who's spent *fifteen* years studying this, | and she's got some *surprising* answers. | *Spoiler*: | your *phone* is part of the problem. | *Before* we start, | a quick *thank you* to everyone who left a *review*. | It really *helps*. | *Okay*, | let's get *into* it.",
    words: 98,
  },
  {
    id: "ra-apology-late",
    title: "Apologizing for being late",
    text:
      "I'm *so* sorry, | I know I'm *really* late. | There was an *accident* on the highway, | and *nothing* moved for *forty* minutes. | I *tried* to call you, | but my phone *died* | halfway *there*. | I *know* that's not an excuse, | and I *should* have left earlier. | You've been *waiting* for almost an hour, | and I feel *terrible* about it. | Can I *buy* you dinner | to make *up* for it? | And *next* time, | I'll leave *thirty* minutes early, | I *promise*. | *Again*, | I'm *really* sorry.",
    words: 84,
  },
  {
    id: "ra-describe-photo",
    title: "Describing a photo",
    text:
      "*Okay*, | so in this photo, | you can see a *beach* | early in the *morning*. | The *sun* is just coming up, | so the sky is *orange* and *pink*. | In the *foreground*, | there's an *old* man | sitting on a *rock*. | He's *fishing*, | and he looks *completely* relaxed. | *Behind* him, | on the *left*, | a couple are *walking* their dog | along the *water*. | And in the *background*, | you can just see a few *boats*. | I think it was taken in *Greece*, | but I'm *not* sure. | It feels *very* peaceful.",
    words: 96,
  },
  {
    id: "ra-ordering-restaurant",
    title: "Ordering in a restaurant",
    text:
      "*Hi*, | yes, | I think we're *ready*. | Can we start with the *hummus* | and the *grilled* vegetables | to *share*? | Then for the *main*, | I'll have the *sea bass*, | *please*. | Does it come with *rice* or *potatoes*? | *Potatoes*, then. | And she'll have the *pasta*, | but *without* the mushrooms, | if that's *okay*. | She's *allergic*. | To *drink*, | just a bottle of *sparkling* water | and *two* glasses of the *house* white. | Oh, and could we get some *bread* | while we *wait*? | *Great*, | *thank* you.",
    words: 93,
  },
  {
    id: "ra-party-small-talk",
    title: "Small talk at a party",
    text:
      "*Hey*, | I don't think we've *met*. | I'm *Dana*, | I work with *Yael*. | *Oh*, | you're her *neighbor*? | She *talks* about you all the time. | So how do you *like* the building? | *Really*? | We had the *same* problem with our *elevator*. | It took them *three* months to fix it. | *Anyway*, | have you *tried* the food? | The little *cheese* things are *amazing*. | I've had about *six*. | *Don't* tell anyone. | So what do you *do*, | if you *don't* mind me asking? | *Oh*, that's *interesting*. | My *brother's* a *teacher* too.",
    words: 99,
  },
  {
    id: "ra-commute-story",
    title: "A commute story",
    text:
      "So *every* morning, | I take the *seven forty* train, | and *every* morning, | the *same* guy sits *opposite* me. | *Suit*, | *coffee*, | *newspaper*. | We've *never* spoken. | *Yesterday*, | the train *stopped* between stations | for *forty* minutes. | *No* announcement, | *nothing*. | And *finally*, | he looks up and says, | \"Well, this is *fun*.\" | And we just *start* talking. | Turns out he lives *two* streets away, | he's got a *daughter* my son's age, | and he *hates* the train as much as I do. | *Ten* years. | *Same* train. | *Never* said a word.",
    words: 91,
  },
];
