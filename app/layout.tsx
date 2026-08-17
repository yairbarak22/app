import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech Career Simulator",
  description:
    "From graduation to exit. Maximize your net worth, dodge the layoffs, and retire before the burnout gets you. A free text-based career sim for tech workers.",
  openGraph: {
    title: "Tech Career Simulator",
    description:
      "I survived the layoffs. Can you? Play the free tech career sim — from CS grad to exited founder.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Career Simulator",
    description:
      "From graduation to exit. Maximize your net worth, dodge the layoffs, retire rich.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e14",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
