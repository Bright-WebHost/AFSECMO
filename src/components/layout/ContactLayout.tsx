"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

type FieldConfig = {
  label: string;
  name: string;
  placeholder: string;
  type: string;
};

export default function ContactLayout() {
  const [step, setStep] = useState(0);
  const { t } = useTranslation("content");
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    projectType: "",
    timeline: "",
    budget: "",
    message: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 2));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // placeholder for submit integration
    setStep(2);
  };

  const formFields = t("contact.formFields", { returnObjects: true }) as FieldConfig[];
  const projectFields = t("contact.projectFields", { returnObjects: true }) as FieldConfig[];
  const details = t("contact.details", { returnObjects: true }) as {
    label: string;
    title: string;
    officeLabel: string;
    office: string;
    emailLabel: string;
    phoneLabel: string;
    findUs: string;
    whatsapp: string;
  };
  const form = t("contact.form", { returnObjects: true }) as {
    label: string;
    title: string;
    step: string;
    company: string;
    companyPlaceholder: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
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
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col bg-primary text-white lg:min-h-screen lg:flex-row">
      <aside
        className="relative flex w-full flex-col bg-primary px-6 py-8 lg:w-1/2 lg:px-10 lg:py-12"
        style={{ backgroundImage: "radial-gradient(circle at top left, rgba(255,140,0,0.08), transparent 40%)" }}
      >
        <div className="absolute inset-x-0 top-0 h-24 pointer-events-none" />
        <div className="relative z-10 flex flex-1 flex-col justify-between gap-10">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.35em] text-white/50">{details.label}</p>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">{details.title}</h1>
            </div>

            <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-white/50">{details.officeLabel}</p>
                <p className="mt-3 text-base text-white/80">{details.office}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-white/50">{details.emailLabel}</p>
                <a href="mailto:contact@afsecmo.com" className="mt-3 block text-base text-white/90 hover:text-[#FF8C00]">
                  contact@afsecmo.com
                </a>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-white/50">{details.phoneLabel}</p>
                <a href="tel:+441234567890" className="mt-3 block text-base text-white/90 hover:text-[#FF8C00]">
                  +44 1234 567 890
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.32em] text-white/50">{details.findUs}</p>
              <div className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-primary">
                <iframe
                  title={details.findUs}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.8816688840747!2d-0.12775868410239587!3d51.50735017963515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b34061f40e7%3A0x65abbc6bb393fa3f!2sLondon!5e0!3m2!1sen!2suk!4v1700000000000"
                  className="h-56 w-full border-0"
                  loading="lazy"
                />
              </div>
            </div>

            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#FF8C00] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#ffb033]"
            >
              {details.whatsapp}
            </a>
          </div>
        </div>
      </aside>

      <main className="w-full bg-secondary px-6 py-8 lg:w-1/2 lg:px-10 lg:py-12">
        <div className="relative mx-auto max-w-2xl">
          <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_28px_90px_rgba(0,0,0,0.18)]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-white/50">{form.label}</p>
                  <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">{form.title}</h2>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em] text-white/70">
                {form.step.replace("{{step}}", String(step + 1))}
              </span>
            </div>

            <div className="mb-6 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#FF8C00]"
                style={{ width: `${((step + 1) / 3) * 100}%` }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={step}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {step === 0 && (
                  <div className="space-y-5">
                    {formFields.map((field) => (
                      <label key={field.name} className="block text-sm text-white/70">
                        <span className="mb-3 block text-sm font-semibold text-white">{field.label}</span>
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="w-full rounded-3xl border border-white/10 bg-tertiary/60 px-5 py-4 text-white outline-none transition focus:border-[#FF8C00] focus:ring-4 focus:ring-[#FF8C00]/40"
                          required
                        />
                      </label>
                    ))}
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-5">
                    {formFields.map((field) => (
                      <label key={field.name} className="block text-sm text-white/70">
                        <span className="mb-3 block text-sm font-semibold text-white">{field.label}</span>
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="w-full rounded-3xl border border-white/10 bg-tertiary/60 px-5 py-4 text-white outline-none transition focus:border-[#FF8C00] focus:ring-4 focus:ring-[#FF8C00]/40"
                          required
                        />
                      </label>
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <label className="block text-sm text-white/70">
                      <span className="mb-3 block text-sm font-semibold text-white">{form.message}</span>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={form.messagePlaceholder}
                        rows={6}
                        className="w-full rounded-3xl border border-white/10 bg-tertiary/60 px-5 py-4 text-white outline-none transition focus:border-[#FF8C00] focus:ring-4 focus:ring-[#FF8C00]/40"
                        required
                      />
                    </label>
                  </div>
                )}

                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={step === 0}
                    className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:text-[#FF8C00] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                  >
                    {form.back}
                  </button>
                  <button
                    type={step === 2 ? "submit" : "button"}
                    onClick={step < 2 ? handleNext : undefined}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#FF8C00] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#ffb033] sm:w-auto"
                  >
                    {step === 2 ? form.submit : form.continue}
                  </button>
                </div>
              </motion.form>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
