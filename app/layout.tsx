import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "אנגלית יומית",
  description: "לומדה אישית לתרגול יומי של אוצר מילים, דקדוק ושטף דיבור באנגלית.",
};

export const viewport: Viewport = { themeColor: "#f7f8fb", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
