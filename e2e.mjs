import { chromium } from "playwright";
const B = "http://localhost:4173";
const shots = "/tmp/shots";
const log = [];
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const ctx = await browser.newContext({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
page.on("console", (m) => { if (m.type() === "error" && !m.text().includes("404")) errors.push("console: " + m.text()); });
const shot = (n) => page.screenshot({ path: `${shots}/${n}.png`, fullPage: true });

await page.goto(B, { waitUntil: "networkidle" });
await page.waitForTimeout(400);
await shot("01-placement");
await page.getByRole("button", { name: "מתחילים" }).click();
for (let i = 0; i < 60 && page.url().includes("placement"); i++) {
  const opts = page.locator("button:has(.keycap)");
  const n = await opts.count();
  if (!n) { await page.waitForTimeout(80); continue; }
  await opts.nth(i % n).click();
  await page.waitForTimeout(50);
}
await page.waitForTimeout(400);
await shot("02-today");
log.push("plan blocks: " + (await page.locator("ol li").count()));
log.push("plan: " + (await page.locator("ol li").allInnerTexts()).map(t=>t.replace(/\n/g," ")).join(" | "));

await page.getByRole("button", { name: /התחל תרגול/ }).click();
await page.waitForURL(/session/);
await page.waitForTimeout(300);

const blocks = new Set();
const kinds = new Set();
let steps = 0;
const capture = { 12: "03-grammar", 40: "04-oral", 75: "05-newword", 130: "06-review" };
for (; steps < 600 && page.url().includes("session"); steps++) {
  const main = page.locator("main");
  const txt = await main.innerText();
  blocks.add(txt.split("\n")[0].trim());
  const label = txt.split("\n").slice(3, 5).join(" ").trim();
  if (label) kinds.add(label.slice(0, 40));
  if (capture[steps]) await shot(capture[steps]);
  if (steps % 10 === 0) console.log(`  [${steps}] ${txt.split("\n")[0].trim()} :: ${txt.split("\n").slice(3,5).join(" ").slice(0,60)}`);

  const order = page.locator("main button:has-text('בטל מילה')");
  const textarea = main.locator("textarea");
  const input = main.locator('input[type="text"]');
  const next = page.getByRole("button", { name: /^(הבא|המשך|הבנתי|אמרתי|מתחילים לתרגל|קראתי|סיימתי|עניתי|לדירוג)/ });

  if (await next.first().isVisible().catch(() => false)) {
    await next.first().click();
  } else if (await order.isVisible().catch(() => false)) {
    // word-ordering: click every remaining word chip, then check
    for (let k = 0; k < 14; k++) {
      const chips = main.locator("div[dir=ltr] > button");
      if (!(await chips.count())) break;
      await chips.first().click();
      await page.waitForTimeout(25);
    }
    await page.getByRole("button", { name: "בדוק" }).first().click();
  } else if (await textarea.first().isVisible().catch(() => false)) {
    await textarea.first().fill("Yesterday I go to the beach. I have 30 years and I am agree it was very fun. My friend explain me the rules.");
    const c = page.getByRole("button", { name: "בדוק אותי" });
    if (await c.isVisible().catch(() => false)) await c.click();
  } else if (await input.first().isVisible().catch(() => false)) {
    await input.first().fill(steps % 3 === 0 ? "go" : "the");
    await page.getByRole("button", { name: "בדוק" }).first().click();
  } else {
    const grids = main.locator("div.grid.grid-cols-3");
    const gn = await grids.count();
    if (gn) {
      for (let g = 0; g < gn; g++) {
        const btns = grids.nth(g).locator("> button");
        const bn = await btns.count();
        if (bn) await btns.nth(bn - 1).click().catch(() => {});
        await page.waitForTimeout(30);
      }
      await page.waitForTimeout(80);
      const cont = page.getByRole("button", { name: /^(המשך|הבא)/ });
      if (await cont.first().isEnabled().catch(() => false)) await cont.first().click();
    } else {
      const b = main.locator("button:visible").first();
      if (await b.isVisible().catch(() => false)) await b.click();
      else break;
    }
  }
  await page.waitForTimeout(60);
}
log.push("steps: " + steps + " | still in session: " + page.url().includes("session"));
log.push("blocks seen: " + [...blocks].join(" | "));
await shot("07-after-session");

const st = await page.evaluate(() => JSON.parse(localStorage.getItem("edt.v1") || "{}"));
log.push(`vocab=${Object.keys(st.vocab||{}).length} chunks=${Object.keys(st.chunks||{}).length} topics=${Object.keys(st.topics||{}).length} history=${(st.history||[]).length} trapHits=${JSON.stringify(st.trapHits||{})}`);
log.push("session done per block: " + (st.session?.blocks||[]).map(b=>`${b.kind} ${b.done}/${b.queue.length}`).join(", "));
if ((st.history||[]).length) log.push("day log: " + JSON.stringify(st.history[st.history.length-1]));

await page.goto(B + "/progress/", { waitUntil: "networkidle" });
await page.waitForTimeout(400);
await shot("08-progress");
await page.goto(B + "/library/", { waitUntil: "networkidle" });
await page.waitForTimeout(300);
await page.locator("input[type=text]").fill("make");
await page.waitForTimeout(300);
await page.locator("div.bg-card > button").first().click();
await page.waitForTimeout(200);
await shot("09-library");
await page.goto(B + "/settings/", { waitUntil: "networkidle" });
await page.waitForTimeout(300);
await shot("10-settings");
await page.goto(B, { waitUntil: "networkidle" });
await page.waitForTimeout(400);
await shot("11-today-after");
log.push("today after reload: " + (await page.locator("main").innerText()).split("\n").slice(0,6).join(" / "));
console.log(log.join("\n"));
console.log("ERRORS: " + (errors.length ? errors.slice(0, 8).join("\n") : "none"));
await browser.close();
