/**
 * Text-to-speech through the browser's built-in speech synthesis.
 *
 * No network, no keys: the voices come from the operating system. Everything that
 * touches `window` lives inside a function, so this module is safe to import from
 * the server render and from tests.
 */

export interface VoiceInfo {
  name: string;
  lang: string;
  voiceURI: string;
  localService: boolean;
  default: boolean;
}

const EN = /^en([-_]|$)/i;

/** Voices that actually sound like a person rather than a 1998 answering machine. */
const PREFERRED_NAMES = [
  /natural/i,
  /neural/i,
  /google (us|uk) english/i,
  /\bsamantha\b/i,
  /\bava\b/i,
  /\ballison\b/i,
  /\bjenny\b/i,
  /\baria\b/i,
  /\bguy\b/i,
  /\bdaniel\b/i,
  /\bkaren\b/i,
  /\bserena\b/i,
  /\bsonia\b/i,
  /\bryan\b/i,
];

const POOR_NAMES = [/compact/i, /espeak/i, /\bfred\b/i, /\balbert\b/i, /novelty/i, /whisper/i, /organ/i, /bells/i, /zarvox/i, /trinoids/i];

/** Higher is better. Only English voices score above zero. */
export function scoreVoice(v: VoiceInfo): number {
  if (!EN.test(v.lang)) return 0;
  let score = 10;
  const lang = v.lang.replace("_", "-").toLowerCase();
  if (lang.startsWith("en-us")) score += 6;
  else if (lang.startsWith("en-gb")) score += 4;
  else score += 1;
  if (PREFERRED_NAMES.some((re) => re.test(v.name))) score += 8;
  if (POOR_NAMES.some((re) => re.test(v.name))) score -= 9;
  if (v.localService) score += 2;
  if (v.default) score += 1;
  return score;
}

/** Choose the voice to speak with: the saved one if it is still installed, else the best English voice. */
export function pickVoice(voices: readonly VoiceInfo[], preferredURI?: string): VoiceInfo | null {
  if (!voices.length) return null;
  if (preferredURI) {
    const saved = voices.find((v) => v.voiceURI === preferredURI);
    if (saved) return saved;
  }
  const best = voices
    .map((v) => ({ v, s: scoreVoice(v) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)[0];
  return best ? best.v : null;
}

/** English voices, best first — what the settings screen offers. */
export function englishVoices(voices: readonly VoiceInfo[]): VoiceInfo[] {
  return voices
    .map((v) => ({ v, s: scoreVoice(v) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.v);
}

/** Strip the read-aloud markers (" | " pause bars and *stress* stars) before speaking. */
export function speakableText(text: string): string {
  const chunks = text
    .replace(/\*/g, "")
    .split("|")
    .map((c) => c.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  // A pause bar becomes a comma, unless the chunk already ends in punctuation.
  const joined = chunks.reduce((acc, c, i) => {
    if (i === 0) return c;
    return /[.,!?;:—-]$/.test(acc) ? `${acc} ${c}` : `${acc}, ${c}`;
  }, "");
  return joined
    .replace(/\s+([.,!?;:])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/** Replace the blank in a cloze sentence with the answer, so the learner hears a real sentence. */
export function fillBlank(sentence: string, answer: string): string {
  return sentence.replace(/_{2,}/g, answer);
}

/**
 * Turn a gap-fill prompt into the sentence the learner should hear: the blank is
 * filled and the bracketed hint ("(go)", "(not/see)") is dropped.
 */
export function sentenceFromGapPrompt(prompt: string, answer: string): string {
  return fillBlank(prompt, answer)
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s+([.,!?;:])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

export function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function";
}

export function getVoices(): VoiceInfo[] {
  if (!speechSupported()) return [];
  return window.speechSynthesis.getVoices().map((v) => ({
    name: v.name,
    lang: v.lang,
    voiceURI: v.voiceURI,
    localService: v.localService,
    default: v.default,
  }));
}

/** Voices load asynchronously in most browsers; call back whenever the list changes. */
export function onVoicesChanged(fn: () => void): () => void {
  if (!speechSupported()) return () => {};
  const synth = window.speechSynthesis;
  synth.addEventListener("voiceschanged", fn);
  return () => synth.removeEventListener("voiceschanged", fn);
}

export interface SpeakOptions {
  rate?: number;
  voiceURI?: string;
  onEnd?: () => void;
  onStart?: () => void;
}

/** Speak an English sentence. Cancels whatever is currently playing. */
export function speak(text: string, opts: SpeakOptions = {}): void {
  if (!speechSupported()) return;
  const clean = speakableText(text);
  if (!clean) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(clean);
  const voice = pickVoice(getVoices(), opts.voiceURI);
  if (voice) {
    const match = synth.getVoices().find((v) => v.voiceURI === voice.voiceURI);
    if (match) u.voice = match;
    u.lang = voice.lang;
  } else {
    u.lang = "en-US";
  }
  u.rate = Math.min(1.4, Math.max(0.5, opts.rate ?? 1));
  u.pitch = 1;
  if (opts.onStart) u.onstart = opts.onStart;
  if (opts.onEnd) {
    u.onend = opts.onEnd;
    u.onerror = opts.onEnd;
  }
  // Chrome drops utterances queued while the engine is "paused" after a cancel.
  synth.resume();
  synth.speak(u);
}

export function stopSpeaking(): void {
  if (!speechSupported()) return;
  window.speechSynthesis.cancel();
}
