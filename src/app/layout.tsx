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
  title: "Site Under Maintenance",
  description: "We'll be back shortly.",
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
      <body
        suppressHydrationWarning
        className="min-h-screen bg-black text-white"
      >
        <main className="flex min-h-screen items-center justify-center px-6 text-center">
          <div className="max-w-xl space-y-4">
            <h1 className="text-3xl font-medium tracking-[0.2em] uppercase sm:text-5xl">
              Site Under Maintenance
            </h1>
            <p className="text-sm font-light tracking-[0.28em] text-white/70 sm:text-base">
              We'll be back shortly.
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}