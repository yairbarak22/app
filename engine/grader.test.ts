import { describe, it, expect } from "vitest";
import { grade, normalize, contractionVariants, gradeOrder } from "./grader";

describe("normalize", () => {
  it("strips case, punctuation, spacing, UK spelling", () => {
    expect(normalize("  I  Love Colour!! ")).toBe("i love color");
    expect(normalize("She’s here.")).toBe("she's here");
  });
});

describe("contractions", () => {
  it("expands unambiguous contractions", () => {
    expect(contractionVariants("i don't know")).toContain("i do not know");
    expect(contractionVariants("we'll go")).toContain("we will go");
  });
  it("branches on 's and 'd", () => {
    const v = contractionVariants("she's gone");
    expect(v).toContain("she is gone");
    expect(v).toContain("she has gone");
  });
});

describe("grade", () => {
  it("accepts contraction variants both ways", () => {
    expect(grade("has not seen", "hasn't seen").ok).toBe(true);
    expect(grade("hasn't seen", "has not seen").ok).toBe(true);
    expect(grade("I have been living", "I've been living").ok).toBe(true);
  });
  it("accepts alternates", () => {
    expect(grade("is going to rain", "will rain", ["is going to rain"]).ok).toBe(true);
  });
  it("rejects grammar differences in endings", () => {
    expect(grade("go", "goes").ok).toBe(false);
    expect(grade("walks", "walked").ok).toBe(false);
    expect(grade("advise", "advice").ok).toBe(false);
    expect(grade("has been", "had been").ok).toBe(false);
  });
  it("tolerates a stem typo in long words", () => {
    const r = grade("I have alrady eaten", "I have already eaten");
    expect(r.ok).toBe(true);
    expect(r.typo).toBe(true);
  });
  it("vocab mode tolerates one-letter typos", () => {
    const r = grade("neighbour", "neighbor", [], { mode: "vocab" });
    expect(r.ok).toBe(true);
    expect(grade("recieve", "receive", [], { mode: "vocab" }).typo).toBe(true);
    expect(grade("recieve", "receive", [], { mode: "strict" }).ok).toBe(false);
  });
  it("handles zero article convention", () => {
    expect(grade("", "-").ok).toBe(true);
    expect(grade("x", "-").ok).toBe(true);
    expect(grade("the", "-").ok).toBe(false);
  });
});

describe("gradeOrder", () => {
  it("compares joined words", () => {
    expect(gradeOrder(["Where", "do", "you", "live?"], "Where do you live?")).toBe(true);
    expect(gradeOrder(["Where", "you", "do", "live?"], "Where do you live?")).toBe(false);
  });
});
