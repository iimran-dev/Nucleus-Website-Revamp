import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
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
        className={`${inter.variable} ${display.variable} ${mono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
