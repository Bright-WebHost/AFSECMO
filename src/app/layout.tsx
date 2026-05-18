import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
// NEW: Import the Preloader here in the layout
import Preloader from "@/components/ui/Preloader"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AFSECMO Group",
  description: "Premium industrial brand experience built with AFSECMO Group.",
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
      <body className="min-h-screen bg-primary bg-[#0F1B2E] text-white">
        <LanguageProvider>
          <LenisProvider>
            <div className="relative w-full max-w-[100vw] overflow-clip">
              {/* NEW: Place Preloader here so it fires globally on initial site visit */}
              <Preloader />
              <Navbar />
              {children}
              <Footer />
              <WhatsAppButton />
            </div>
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}