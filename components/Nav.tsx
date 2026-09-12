"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "היום" },
  { href: "/units/", label: "יחידות" },
  { href: "/progress/", label: "התקדמות" },
  { href: "/library/", label: "מילון" },
  { href: "/settings/", label: "הגדרות" },
];

export function Nav() {
  const path = usePathname();
  return (
    <header className="bg-card border-b border-line">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-base sm:text-lg text-brand whitespace-nowrap shrink-0">
          אנגלית יומית
        </Link>
        <nav className="flex gap-0.5 sm:gap-1 text-[0.8rem] sm:text-sm">
          {LINKS.map((l) => {
            const active = l.href === "/" ? path === "/" : path.startsWith(l.href.replace(/\/$/, ""));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-2 sm:px-3 py-1.5 rounded-full transition whitespace-nowrap ${active ? "bg-brand-soft text-brand font-semibold" : "text-muted hover:bg-paper"}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
