import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AFSECMO Group | Industrial Services, Procurement & Logistics in West Africa",
  description: "AFSECMO supports mining, oil & gas, construction and industrial operations with procurement, logistics, equipment mobilisation, maintenance and field services from Abidjan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body suppressHydrationWarning className="min-h-screen bg-primary bg-[#0F1B2E] text-white">
        {children}
      </body>
    </html>
  );
}