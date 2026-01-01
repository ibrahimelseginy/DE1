import type { Metadata } from "next";
import { Alexandria, Lalezar } from "next/font/google";
import "./globals.css";

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const lalezar = Lalezar({
  variable: "--font-lalezar",
  subsets: ["arabic", "latin"],
  weight: ["400"], // Lalezar only has 400
});

export const metadata: Metadata = {
  title: "DE1 Academy | لأن أهدافك ليست كغيرك",
  description: "دورات لغة مفصلة على مقاسك تماماً. في DE1، وقتك ملكك وحدك.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        suppressHydrationWarning
        className={`${alexandria.variable} ${lalezar.variable} antialiased bg-midnight text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
