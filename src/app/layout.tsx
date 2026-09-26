import type { Metadata } from "next";
import { Google_Sans, Google_Sans_Flex, Google_Sans_Code } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Primary body and UI typography across the website
const googleSans = Google_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Editorial, high-impact display headlines, hero titles & stats
const googleSansDisplay = Google_Sans_Flex({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

// Technical monospace, compliance labels, badge tags, and ISO identifiers
const googleSansCode = Google_Sans_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nucleus — Compliance Transformation Partner | Global Certifications, Operational Excellence",
  description:
    "Nucleus is India's leading compliance transformation partner. We help organizations achieve global certifications — ISO 9001, AS9100, ISO 13485, NADCAP, IRIS, ISO 27001 — and embed operational excellence for sustainable growth.",
  keywords: [
    "Nucleus",
    "Compliance Transformation",
    "ISO 9001",
    "AS9100",
    "ISO 13485",
    "NADCAP",
    "IRIS",
    "ISO 27001",
    "Certification Consulting",
    "Quality Management",
    "Aerospace Compliance",
    "Medical Device Compliance",
  ],
  authors: [{ name: "Nucleus" }],
  openGraph: {
    title: "Nucleus — Compliance for a Better Tomorrow",
    description:
      "Helping organizations achieve global certifications, operational excellence, and sustainable growth.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nucleus — Compliance Transformation Partner",
    description:
      "Helping organizations achieve global certifications, operational excellence, and sustainable growth.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${googleSans.variable} ${googleSansDisplay.variable} ${googleSansCode.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
