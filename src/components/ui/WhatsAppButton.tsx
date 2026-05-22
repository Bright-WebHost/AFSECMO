"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function WhatsAppButton() {
  const phoneNumber = "2250700070077";
  const { t } = useTranslation("common");
  const message = t("whatsapp.message");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("whatsapp.ariaLabel")}
        className="inline-flex items-center justify-center transition duration-200 active:scale-95"
      >
        <Image src="/whatsapp.png" alt="WhatsApp" width={64} height={64} className="h-16 w-16 object-contain" />
      </Link>
    </div>
  );
}