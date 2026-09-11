import { describe, it, expect } from "vitest";
import { pickVoice, scoreVoice, englishVoices, speakableText, fillBlank, sentenceFromGapPrompt, type VoiceInfo } from "./speech";

const v = (name: string, lang: string, localService = true, isDefault = false): VoiceInfo => ({
  name,
  lang,
  voiceURI: `${name}:${lang}`,
  localService,
  default: isDefault,
});

const VOICES = [
  v("Hebrew Carmit", "he-IL"),
  v("Eddy (English (US))", "en-US"),
  v("Samantha", "en-US"),
  v("Daniel", "en-GB"),
  v("Rishi", "en-IN"),
  v("Albert", "en-US"),
  v("Google Deutsch", "de-DE", false),
];

describe("voice selection", () => {
  it("ignores non-English voices", () => {
    expect(scoreVoice(v("Carmit", "he-IL"))).toBe(0);
    expect(englishVoices(VOICES).some((x) => x.lang === "he-IL")).toBe(false);
  });
  it("prefers a natural American voice", () => {
    expect(pickVoice(VOICES)?.name).toBe("Samantha");
  });
  it("prefers British over Indian English when nothing else stands out", () => {
    const list = [v("Rishi", "en-IN"), v("Kate", "en-GB")];
    expect(pickVoice(list)?.name).toBe("Kate");
  });
  it("avoids novelty and low-quality voices", () => {
    const list = [v("Albert", "en-US"), v("Zarvox", "en-US"), v("Kate", "en-GB")];
    expect(pickVoice(list)?.name).toBe("Kate");
  });
  it("honors a saved choice while it is still installed", () => {
    expect(pickVoice(VOICES, "Daniel:en-GB")?.name).toBe("Daniel");
    expect(pickVoice(VOICES, "Uninstalled:en-AU")?.name).toBe("Samantha");
  });
  it("returns null when the device has no English voice", () => {
    expect(pickVoice([v("Carmit", "he-IL")])).toBeNull();
    expect(pickVoice([])).toBeNull();
  });
});

describe("text preparation", () => {
  it("turns read-aloud markers into natural pauses", () => {
    expect(speakableText("*Hi* there, | it's *Dana* | from the office.")).toBe("Hi there, it's Dana, from the office.");
  });
  it("fills a cloze blank so the learner hears a whole sentence", () => {
    expect(fillBlank("I ___ to work by bus.", "go")).toBe("I go to work by bus.");
    expect(fillBlank("She has ___ here since May.", "lived")).toBe("She has lived here since May.");
  });
  it("reads a gap-fill item as a finished sentence", () => {
    expect(sentenceFromGapPrompt("She ___ (go) to work every day.", "goes")).toBe("She goes to work every day.");
    expect(sentenceFromGapPrompt("I ___ (not/see) him since May.", "haven't seen")).toBe("I haven't seen him since May.");
    expect(sentenceFromGapPrompt("How often ___ to the gym?", "do you go")).toBe("How often do you go to the gym?");
  });
  it("leaves ordinary sentences alone", () => {
    expect(speakableText("How long have you been here?")).toBe("How long have you been here?");
  });
});
