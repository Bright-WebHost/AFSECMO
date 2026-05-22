"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const openRoles = [
  {
    id: "role-01",
    title: "Senior Structural Engineer",
    department: "Engineering",
    location: "London, UK",
    type: "Full-time",
  },
  {
    id: "role-02",
    title: "Project Manager (Industrial)",
    department: "Delivery",
    location: "Rotterdam, NL",
    type: "Full-time",
  },
  {
    id: "role-03",
    title: "Strategy Consultant",
    department: "Strategy",
    location: "Dubai, UAE",
    type: "Full-time",
  },
  {
    id: "role-04",
    title: "HSE Officer",
    department: "Operations",
    location: "London, UK",
    type: "Full-time",
  },
  {
    id: "role-05",
    title: "Digital Systems Specialist",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
  },
];

const easing = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function CareersContent() {
  const [expandedRole, setExpandedRole] = useState<string | null>(null);
  const [applicationStep, setApplicationStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    experience: "",
    message: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleNext = () => setApplicationStep((prev) => Math.min(prev + 1, 2));
  const handleBack = () => setApplicationStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApplicationStep(2);
  };

  return (
    <main className="bg-primary text-white">
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-white/50">Careers</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Build your career with AFSECMO.
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/70 sm:text-xl">
            We are looking for talented engineers, strategists, and leaders who are passionate about industrial excellence.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 bg-secondary px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-white/50">Our Culture</p>
            <h2 className="mt-4 text-4xl font-black text-white sm:text-5xl">
              Excellence through collaboration and precision.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Expertise Matters",
                copy: "We hire the best in industrial engineering, strategy, and delivery. Deep technical knowledge is expected and celebrated.",
              },
              {
                title: "Real Impact",
                copy: "Work on projects that shape industrial landscapes. Your decisions matter and drive measurable outcomes for clients.",
              },
              {
                title: "Continuous Learning",
                copy: "Access to training, certifications, and conference attendance. We invest in your growth and professional development.",
              },
              {
                title: "Work-Life Balance",
                copy: "Competitive salaries, flexible working arrangements, and generous leave. We respect boundaries and personal time.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-tertiary/50 p-8 shadow-[0_28px_80px_rgba(0,0,0,0.2)]"
              >
                <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-white/70 leading-7">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-white/50">Open Roles</p>
            <h2 className="mt-4 text-4xl font-black text-white sm:text-5xl">
              {openRoles.length} positions available.
            </h2>
          </div>

          <div className="space-y-4">
            {openRoles.map((role) => (
              <motion.div
                key={role.id}
                layout
                className="overflow-hidden rounded-3xl border border-white/10 bg-secondary shadow-[0_28px_90px_rgba(0,0,0,0.24)]"
              >
                <button
                  type="button"
                  onClick={() => setExpandedRole(expandedRole === role.id ? null : role.id)}
                  className="w-full px-8 py-6 text-left transition hover:bg-white/5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{role.title}</h3>
                      <p className="mt-2 flex flex-wrap gap-3 text-sm text-white/60">
                        <span>{role.department}</span>
                        <span>•</span>
                        <span>{role.location}</span>
                        <span>•</span>
                        <span>{role.type}</span>
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedRole === role.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-white/60"
                    >
                      ▼
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedRole === role.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: (easing as any) }}
                      className="border-t border-white/10 bg-white/5 px-8 py-6"
                    >
                      <p className="text-white/70 leading-7">
                        Join our team and work on cutting-edge industrial projects. We are looking for experienced professionals who are passionate about delivering excellence.
                      </p>
                      <a
                        href="#apply"
                        className="mt-6 inline-flex items-center justify-center rounded-full bg-[#FF8C00] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#ffb033]"
                      >
                        Apply Now
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="border-t border-white/10 bg-secondary px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_28px_90px_rgba(0,0,0,0.18)]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/50">Application</p>
                <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                  Apply to join AFSECMO.
                </h2>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em] text-white/70">
                Step {applicationStep + 1} of 3
              </span>
            </div>

            <div className="mb-6 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#FF8C00]"
                style={{ width: `${((applicationStep + 1) / 3) * 100}%` }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={applicationStep}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.4, ease: (easing as any) }}
                className="space-y-6"
              >
                {applicationStep === 0 && (
                  <div className="space-y-5">
                    {[
                      { label: "Full name", name: "fullName", placeholder: "Jordan Smith" },
                      { label: "Email", name: "email", placeholder: "jordan@example.com" },
                      { label: "Phone", name: "phone", placeholder: "+225 07 00 07 00 77" },
                    ].map((field) => (
                      <label key={field.name} className="block">
                        <span className="mb-3 block text-sm font-semibold text-white">{field.label}</span>
                        <input
                          type={field.name === "email" ? "email" : "text"}
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

                {applicationStep === 1 && (
                  <div className="space-y-5">
                    <label className="block">
                      <span className="mb-3 block text-sm font-semibold text-white">Applying for</span>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full rounded-3xl border border-white/10 bg-tertiary/60 px-5 py-4 text-white outline-none transition focus:border-[#FF8C00] focus:ring-4 focus:ring-[#FF8C00]/40"
                        required
                      >
                        <option value="">Select a role</option>
                        {openRoles.map((role) => (
                          <option key={role.id} value={role.title}>
                            {role.title}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-3 block text-sm font-semibold text-white">Years of experience</span>
                      <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="8–10 years"
                        className="w-full rounded-3xl border border-white/10 bg-tertiary/60 px-5 py-4 text-white outline-none transition focus:border-[#FF8C00] focus:ring-4 focus:ring-[#FF8C00]/40"
                        required
                      />
                    </label>
                  </div>
                )}

                {applicationStep === 2 && (
                  <div className="space-y-5">
                    <label className="block">
                      <span className="mb-3 block text-sm font-semibold text-white">Cover letter</span>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us why you are interested in joining AFSECMO."
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
                    disabled={applicationStep === 0}
                    className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:text-[#FF8C00] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                  >
                    Back
                  </button>
                  <button
                    type={applicationStep === 2 ? "submit" : "button"}
                    onClick={applicationStep < 2 ? handleNext : undefined}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#FF8C00] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#ffb033] sm:w-auto"
                  >
                    {applicationStep === 2 ? "Submit application" : "Continue"}
                  </button>
                </div>
              </motion.form>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function CareersPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/en/careers");
  }, [router]);

  return null;
}
