"use client";

import Link from "next/link";

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with AFSECMO on WhatsApp"
        className="inline-flex h-14 min-w-14 items-center justify-center rounded-full bg-[#FF8C00] px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black shadow-[0_24px_64px_rgba(255,140,0,0.24)] transition duration-200 hover:shadow-[0_28px_76px_rgba(255,140,0,0.28)]"
      >
        WhatsApp
      </Link>
    </div>
  );
}
