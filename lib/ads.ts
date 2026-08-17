/**
 * Rewarded-ads adapter.
 *
 * Today this is a MOCK so the rewarded-choice game paths are fully testable.
 * When we integrate a real ad network, only this file changes: swap the body
 * of `showRewardedAd()` for the network SDK call and keep the same contract.
 */

export type AdResult = "completed" | "skipped" | "unavailable";

/** Milliseconds the fake ad "plays" — long enough to see the modal, short enough to test fast. */
export const MOCK_AD_DURATION_MS = 3_000;

export interface RewardedAdHandlers {
  /** Called every ~100ms with progress 0–1 so the UI can render a countdown. */
  onProgress?: (progress: number) => void;
}

let cancelCurrentAd: (() => void) | null = null;

/**
 * Plays a rewarded ad and resolves with the result.
 * Contract (identical to real SDKs): grant the reward ONLY on "completed".
 */
export function showRewardedAd(handlers: RewardedAdHandlers = {}): Promise<AdResult> {
  return new Promise((resolve) => {
    const startedAt = Date.now();
    const timer = setInterval(() => {
      const progress = Math.min(1, (Date.now() - startedAt) / MOCK_AD_DURATION_MS);
      handlers.onProgress?.(progress);
      if (progress >= 1) {
        clearInterval(timer);
        cancelCurrentAd = null;
        resolve("completed");
      }
    }, 100);

    cancelCurrentAd = () => {
      clearInterval(timer);
      cancelCurrentAd = null;
      resolve("skipped");
    };
  });
}

/** User closed the ad early (maps to the choice's `adFallback` path). */
export function skipRewardedAd(): void {
  cancelCurrentAd?.();
}
