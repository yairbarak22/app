"use client";
import { useSyncExternalStore } from "react";
import type { AppState } from "./types";

export const STORAGE_KEY = "edt.v1";

export function defaultState(): AppState {
  return {
    version: 1,
    createdAt: new Date().toISOString(),
    settings: { minutes: 60, newWordsPerDay: 15, speech: { enabled: true, rate: 0.95, slowRate: 0.7, autoplay: true } },
    placementDone: false,
    band: 1,
    vocab: {},
    chunks: {},
    topics: {},
    known: [],
    trapHits: {},
    units: {},
    used: {},
    history: [],
    session: null,
  };
}

const SERVER_STATE: AppState = { ...defaultState(), createdAt: "server" };

let state: AppState | null = null;
const listeners = new Set<() => void>();

function load(): AppState {
  if (typeof window === "undefined") return SERVER_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AppState>;
      return migrate(parsed);
    }
  } catch {
    /* ignore corrupt storage */
  }
  return defaultState();
}

export function migrate(parsed: Partial<AppState>): AppState {
  const base = defaultState();
  const s: AppState = {
    ...base,
    ...parsed,
    settings: { ...base.settings, ...(parsed.settings ?? {}), speech: { ...base.settings.speech, ...(parsed.settings?.speech ?? {}) } },
  };
  s.version = 1;
  return s;
}

function save() {
  if (typeof window === "undefined" || !state) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota or private mode: keep going in memory */
  }
}

export function getState(): AppState {
  if (!state) state = load();
  return state;
}

function getServerSnapshot(): AppState {
  return SERVER_STATE;
}

export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Apply a mutation to a fresh copy of the state, persist, notify. */
export function update(fn: (s: AppState) => void): void {
  const next = structuredClone(getState());
  fn(next);
  state = next;
  save();
  for (const l of listeners) l();
}

export function replaceState(next: AppState): void {
  state = migrate(next);
  save();
  for (const l of listeners) l();
}

export function useAppState(): AppState {
  return useSyncExternalStore(subscribe, getState, getServerSnapshot);
}

/** True once we are on the client with real localStorage state (avoids hydration mismatch). */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
