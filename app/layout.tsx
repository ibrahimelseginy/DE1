import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import "./globals.css";

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"], // Added weights for variety
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
        className={`${alexandria.variable} antialiased bg-midnight text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
