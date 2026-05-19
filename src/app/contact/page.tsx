"use client";

import ContactLayout from "@/components/layout/ContactLayout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function ContactContent() {
  return <ContactLayout />;
}

export default function ContactPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/en/contact");
  }, [router]);

  return null;
}
