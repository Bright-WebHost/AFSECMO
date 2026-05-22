"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

const easeExp = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function ContactLayout() {
  const { t } = useTranslation("content");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const details = (t("contact.details", { returnObjects: true }) || {}) as {
    label: string;
    title: string;
    officeLabel: string;
    office: string;
    emailLabel: string;
    phoneLabel: string;
    findUs: string;
    whatsapp: string;
  };

  const form = (t("contact.form", { returnObjects: true }) || {}) as {
    label: string;
    title: string;
    step: string;
    company: string;
    companyPlaceholder: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    projectType: string;
    projectTypePlaceholder: string;
    timeline: string;
    timelinePlaceholder: string;
    budget: string;
    budgetPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    back: string;
    continue: string;
    submit: string;
    serviceOptions?: string[];
    success?: string;
    error?: string;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setSubmitStatus("success");
        (event.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-400 flex-col font-sans text-gray-900 lg:min-h-screen lg:flex-row">
      
      {/* ─── LEFT: Corporate Details (Pristine Light Theme) ─── */}
      <aside className="relative flex w-full flex-col bg-[#f4f4f4] px-6 py-12 sm:px-12 lg:w-1/2 lg:px-16 lg:py-24">
        
        <div className="relative z-10 flex flex-1 flex-col justify-between gap-16">
          <div className="space-y-12">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeExp }}
              className="space-y-4"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF6B00]">
                {details.label || "GLOBAL CONTACTS"}
              </p>
              <h1 className="text-4xl font-light tracking-tight text-[#111] sm:text-5xl lg:text-6xl">
                {details.title || "Let's build together."}
              </h1>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: easeExp }}
              className="grid gap-10 border-t border-black/10 pt-10"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#777]">
                  {details.officeLabel || "HEADQUARTERS"}
                </p>
                <p className="mt-2 text-lg font-light text-[#111]">{details.office}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#777]">
                  {details.emailLabel || "EMAIL"}
                </p>
                <a href="mailto:contact@afsecmo.com" className="mt-2 block text-lg font-light text-[#111] transition-colors hover:text-[#FF6B00]">
                  contact@afsecmo.com
                </a>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#777]">
                  {details.phoneLabel || "PHONE"}
                </p>
                <a href="tel:+2250700070077" className="mt-2 block text-lg font-light text-[#111] transition-colors hover:text-[#FF6B00]">
                  +225 07 00 07 00 77
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: easeExp }}
            className="space-y-8 border-t border-black/10 pt-10"
          >
            <a
              href="https://wa.me/2250700070077"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex w-fit items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#111] transition-colors duration-300 hover:text-[#FF6B00]"
            >
              <span>{details.whatsapp || "CONNECT ON WHATSAPP"}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 transition-all duration-300 group-hover:border-[#FF6B00] group-hover:bg-[rgba(255,107,0,0.08)]">
                <ArrowRight className="h-3.5 w-3.5 stroke-[#111] transition-colors duration-300 group-hover:stroke-[#FF6B00]" strokeWidth={2} />
              </span>
            </a>
          </motion.div>
        </div>
      </aside>

      {/* ─── RIGHT: The Single-Page Form (Matches Screenshot Layout) ─── */}
      <main className="w-full bg-white px-5 py-12 sm:px-12 lg:w-1/2 lg:px-20 lg:py-24">
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: easeExp }}
          className="relative mx-auto w-full max-w-2xl"
        >
          {/* Form Container */}
            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] sm:p-10">
            
            <form onSubmit={handleSubmit} name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" className="space-y-6">
              
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="bot-field" className="hidden" />

              {/* Row 1: Name & Company */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-[13px] font-bold text-[#1a2b49]">{form.name || "Name"}</span>
                  <input
                    type="text"
                    name="name"
                      placeholder={form.namePlaceholder || "Your name"}
                    required
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-[#111] placeholder:text-gray-400 outline-none transition-colors focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                  />
                </label>

                <label className="block">
                    <span className="mb-2 block text-[13px] font-bold text-[#1a2b49]">{form.company || "Company"}</span>
                  <input
                    type="text"
                    name="company"
                      placeholder={form.companyPlaceholder || "Company name"}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-[#111] placeholder:text-gray-400 outline-none transition-colors focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                  />
                </label>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-[13px] font-bold text-[#1a2b49]">{form.email || "Email"}</span>
                  <input
                    type="email"
                    name="email"
                    placeholder={form.emailPlaceholder || "name@company.com"}
                    required
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-[#111] placeholder:text-gray-400 outline-none transition-colors focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-[13px] font-bold text-[#1a2b49]">{form.phoneLabel || "Phone / WhatsApp"}</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder={form.phonePlaceholder || "+225 07 00 07 00 77"}
                    required
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-[#111] placeholder:text-gray-400 outline-none transition-colors focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                  />
                </label>
              </div>

              {/* Row 3: Service Dropdown */}
              <label className="block">
                <span className="mb-2 block text-[13px] font-bold text-[#1a2b49]">{form.projectType || "Service needed"}</span>
                <select
                  name="service"
                  required
                  defaultValue=""
                  className="w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-[#111] outline-none transition-colors focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                  style={{ backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem top 50%", backgroundSize: "0.65rem auto" }}
                >
                  <option value="" disabled hidden>{form.projectTypePlaceholder || "Select a service"}</option>
                  {(form.serviceOptions || [
                    "Mining support",
                    "Oil & gas / industrial services",
                    "Construction / BTP",
                    "Procurement / import-export",
                    "Equipment rental / fleet support",
                    "Maintenance / utilities",
                    "Other",
                  ]).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              {/* Row 4: Message */}
              <label className="block">
                <span className="mb-2 block text-[13px] font-bold text-[#1a2b49]">{form.message || "Message"}</span>
                <textarea
                  name="message"
                  placeholder={form.messagePlaceholder || "Tell us what you need, where the project is located, and the timeline."}
                  rows={4}
                  required
                    className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-[#111] placeholder:text-gray-400 outline-none transition-colors focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                />
              </label>

              {/* Submit Button (Uses the golden color from your screenshot) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 flex w-full items-center justify-center rounded-lg bg-[#FF6B00] px-6 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-[#E65C00] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (t("contact.form.sending", "Sending...") as string) : (form.submit || "Send inquiry")}
              </button>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <p className="mt-4 text-center text-sm font-medium text-green-600">
                  {t("contact.form.success", "Message sent successfully! We will get back to you soon.")}
                </p>
              )}
              {submitStatus === "error" && (
                <p className="mt-4 text-center text-sm font-medium text-red-600">
                  {t("contact.form.error", "Something went wrong. Please try again or email us directly.")}
                </p>
              )}

            </form>
          </div>
        </motion.div>

      </main>
    </div>
  );
}