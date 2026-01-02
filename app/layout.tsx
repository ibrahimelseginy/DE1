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
  title: {
    default: "DE1 Academy | دورات لغة مفصلة على مقاسك",
    template: "%s | DE1 Academy"
  },
  description: "أكاديمية DE1 - دورات لغة ألمانية وإنجليزية مفصلة على مقاسك تماماً. تعلم مع معلمين محترفين بمرونة كاملة. ابدأ حصتك التجريبية المجانية الآن!",
  keywords: ["تعلم اللغة الألمانية", "تعلم الإنجليزية", "دورات لغة أونلاين", "معلم خاص", "DE1 Academy", "German courses", "English courses", "IELTS", "TOEFL", "Goethe"],
  authors: [{ name: "DE1 Academy" }],
  creator: "DE1 Academy",
  publisher: "DE1 Academy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    alternateLocale: ['en_US', 'de_DE'],
    url: 'https://de1academy.com',
    siteName: 'DE1 Academy',
    title: 'DE1 Academy | دورات لغة مفصلة على مقاسك',
    description: 'أكاديمية DE1 - دورات لغة ألمانية وإنجليزية مفصلة على مقاسك تماماً. تعلم مع معلمين محترفين بمرونة كاملة.',
    images: [
      {
        url: '/de1-logo.png',
        width: 1200,
        height: 630,
        alt: 'DE1 Academy Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DE1 Academy | دورات لغة مفصلة على مقاسك',
    description: 'أكاديمية DE1 - دورات لغة ألمانية وإنجليزية مفصلة على مقاسك تماماً',
    images: ['/de1-logo.png'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://de1academy.com',
    languages: {
      'ar': 'https://de1academy.com',
      'en': 'https://de1academy.com/en',
      'de': 'https://de1academy.com/de',
    },
  },
};

import { LanguageProvider } from "./context/LanguageContext";

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
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
