"use client";

import Link from "next/link";

export default function WhatsAppButton() {
  const phoneNumber = "919876543210";
  const message = "Hello! I need assistance.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_12px_rgba(37,211,102,0.4)] transition duration-200 hover:bg-[#20ba5a] hover:shadow-[0_8px_20px_rgba(37,211,102,0.6)] active:scale-95"
      >
        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.364-3.905 6.75-1.902 10.182 1.91 3.27 5.864 4.1 9.7-1.185.207-.227.414-.461.62-.694 1.39-1.674 2.318-3.969 2.318-6.66 0-5.12-4.169-9.266-9.293-9.266" />
        </svg>
      </Link>
    </div>
  );
}