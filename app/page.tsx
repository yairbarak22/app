import type { Metadata } from "next";
import Game from "@/components/Game";
import { formatMoney } from "@/lib/gameLogic";
import { decodeShareParams, encodeShareParams } from "@/lib/share";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/**
 * Shared links carry the sender's run stats, so the page's OG card becomes
 * THEIR scorecard — the unfurled image on X/LinkedIn is the viral hook.
 */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const share = decodeShareParams(await searchParams);
  if (!share) {
    return { openGraph: { images: ["/api/og"] }, twitter: { images: ["/api/og"] } };
  }

  const ogUrl = `/api/og?${encodeShareParams(share)}`;
  const money = formatMoney(share.netWorth);
  const description =
    share.kind === "burnout"
      ? `They burned out at ${share.age} with ${money}. Survive longer.`
      : `They retired at ${share.age} with ${money} as "${share.title}". Beat that.`;

  return {
    title: "You've been challenged — Tech Career Simulator",
    description,
    openGraph: { title: "Think you can beat this run?", description, images: [ogUrl] },
    twitter: { card: "summary_large_image", description, images: [ogUrl] },
  };
}

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const challenge = decodeShareParams(await searchParams);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-4 py-6 sm:py-10">
      <Game challenge={challenge} />
    </main>
  );
}
