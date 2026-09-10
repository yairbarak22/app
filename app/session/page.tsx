"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppState, useHydrated } from "@/lib/store";
import { SessionRunner, NoSession } from "@/components/SessionRunner";

export default function SessionPage() {
  const state = useAppState();
  const hydrated = useHydrated();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !state.placementDone) router.replace("/placement/");
  }, [hydrated, state.placementDone, router]);

  if (!hydrated) return <div className="text-muted">טוען…</div>;
  if (!state.session || state.session.finished) return <NoSession />;
  return <SessionRunner session={state.session} />;
}
