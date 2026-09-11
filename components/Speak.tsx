"use client";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useAppState } from "@/lib/store";
import { speak, stopSpeaking, speechSupported, getVoices, onVoicesChanged, englishVoices, type VoiceInfo } from "@/lib/speech";

/** Live list of usable English voices; empty until the browser loads them. */
export function useVoices(): VoiceInfo[] {
  const [voices, setVoices] = useState<VoiceInfo[]>([]);
  useEffect(() => {
    const load = () => setVoices(englishVoices(getVoices()));
    load();
    const off = onVoicesChanged(load);
    // Some browsers populate the list a beat after the first call.
    const t = setTimeout(load, 400);
    return () => {
      off();
      clearTimeout(t);
    };
  }, []);
  return voices;
}

/** Speak English text with the learner's saved voice and speed. */
export function useSpeaker() {
  const { speech } = useAppState().settings;
  const supported = typeof window !== "undefined" && speechSupported();
  const say = useCallback(
    (text: string, opts: { slow?: boolean; onEnd?: () => void; onStart?: () => void } = {}) => {
      if (!supported || !speech.enabled) return;
      speak(text, {
        rate: opts.slow ? speech.slowRate : speech.rate,
        voiceURI: speech.voiceURI,
        onEnd: opts.onEnd,
        onStart: opts.onStart,
      });
    },
    [supported, speech.enabled, speech.rate, speech.slowRate, speech.voiceURI],
  );
  return { say, stop: stopSpeaking, supported, enabled: supported && speech.enabled, autoplay: speech.autoplay };
}

function SpeakerIcon({ playing }: { playing: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H3v6h3l5 4V5z" />
      {playing ? <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" /> : <path d="M15.5 9.5a3.5 3.5 0 0 1 0 5" />}
    </svg>
  );
}

/**
 * Speaker button. Click to hear the sentence; the small "0.7×" sibling plays it
 * slowly, which is what you want for a phrase you cannot make out.
 */
export function Speak({
  text, slow = false, label, className = "", size = "md",
}: {
  text: string; slow?: boolean; label?: string; className?: string; size?: "sm" | "md";
}) {
  const { say, enabled } = useSpeaker();
  const [playing, setPlaying] = useState(false);
  const alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);
  if (!enabled || !text.trim()) return null;
  const pad = size === "sm" ? "p-1" : "p-1.5";
  return (
    <button
      type="button"
      aria-label={label ?? (slow ? "השמע לאט" : "השמע")}
      title={label ?? (slow ? "השמע לאט" : "השמע")}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setPlaying(true);
        say(text, {
          slow,
          onEnd: () => {
            if (alive.current) setPlaying(false);
          },
        });
      }}
      className={`inline-flex items-center gap-1 rounded-lg ${pad} text-muted hover:text-brand hover:bg-brand-soft transition align-middle ${playing ? "text-brand" : ""} ${className}`}
    >
      <SpeakerIcon playing={playing} />
      {slow && <span className="text-[0.65rem] font-bold leading-none">0.7×</span>}
    </button>
  );
}

/** Normal-speed and slow buttons together, for a sentence worth studying. */
export function SpeakPair({ text, className = "" }: { text: string; className?: string }) {
  const { enabled } = useSpeaker();
  if (!enabled) return null;
  return (
    <span className={`inline-flex items-center ${className}`}>
      <Speak text={text} />
      <Speak text={text} slow />
    </span>
  );
}

/**
 * An English line with a speaker button after it. Keeps the English isolated as
 * left-to-right while the button stays glued to the end of the line.
 */
export function SpeakLine({
  text, children, big, slow = true, className = "",
}: {
  text: string; children?: ReactNode; big?: boolean; slow?: boolean; className?: string;
}) {
  return (
    <div className={`flex items-start gap-1 ${className}`}>
      <div className={`en flex-1 ${big ? "text-2xl leading-relaxed" : "text-lg leading-relaxed"}`}>{children ?? text}</div>
      <span className="flex items-center shrink-0 pt-0.5">
        <Speak text={text} size={big ? "md" : "sm"} />
        {slow && <Speak text={text} slow size="sm" />}
      </span>
    </div>
  );
}

/** Speak a revealed model answer once, when the learner has autoplay on. */
export function useAutoSpeak(text: string | null | undefined, when = true) {
  const { say, autoplay, enabled } = useSpeaker();
  const spoken = useRef<string | null>(null);
  useEffect(() => {
    if (!when || !text || !enabled || !autoplay) return;
    if (spoken.current === text) return;
    spoken.current = text;
    say(text);
  }, [text, when, enabled, autoplay, say]);
}
