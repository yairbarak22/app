import { describe, it, expect } from "vitest";
import { CONTENT } from "@/content";

describe("content inventory", () => {
  it("reports what the trainer ships with", () => {
    const grammarItems = CONTENT.topics.reduce((a, t) => a + t.items.length, 0);
    const trapDrills = CONTENT.traps.reduce((a, t) => a + t.drills.length, 0);
    const inventory = {
      words: CONTENT.vocab.length,
      topics: CONTENT.topics.length,
      grammarItems,
      chunks: CONTENT.chunks.length,
      traps: CONTENT.traps.length,
      trapDrills,
      oral: CONTENT.oral.length,
      prompts: CONTENT.prompts.length,
      qaSets: CONTENT.qaSets.length,
      stories: CONTENT.stories.length,
      scripts: CONTENT.scripts.length,
      placement: CONTENT.placement.length,
    };
    // eslint-disable-next-line no-console
    console.log(inventory);
    expect(inventory.words).toBeGreaterThan(800);
    expect(inventory.topics).toBe(44);
    expect(inventory.grammarItems).toBeGreaterThan(1000);
    expect(inventory.traps).toBe(40);
    expect(inventory.oral).toBeGreaterThan(250);
  });
});
