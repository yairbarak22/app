"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppState, useHydrated } from "@/lib/store";
import { SessionRunner } from "@/components/SessionRunner";

export default function SessionPage() {
  const state = useAppState();
  const hydrated = useHydrated();
  const router = useRouter();
  const session = state.session;
  const noSession = hydrated && (!session || session.finished);

  useEffect(() => {
    if (!hydrated) return;
    if (!state.placementDone) router.replace("/placement/");
    // A session ends inside the runner (last exercise, or "finish now"); the summary
    // lives on the Today screen, so leave the session screen as soon as it is done.
    else if (noSession) router.replace(session?.finished ? "/?done=1" : "/");
  }, [hydrated, state.placementDone, noSession, session?.finished, router]);

  if (!hydrated) return <div className="text-muted">טוען…</div>;
  if (!session || session.finished) return <div className="text-muted">מסכם את הסשן…</div>;
  return <SessionRunner session={session} />;
}
