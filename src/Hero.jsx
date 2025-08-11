import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ChevronDown, BadgeCheck, Linkedin } from "lucide-react";

export default function Hero({
  onHireClick,
  PROFILE,
  CORE_SKILLS,
  Container,
  Button,
  SectionTitle,
}) {
  const [copied, setCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  const yearsOfExp = useMemo(() => {
    const start = new Date(2023, 8, 1);
    const now = new Date();
    const years = (now - start) / (1000 * 60 * 60 * 24 * 365.25);
    return Math.ceil(years);
  }, []);

  const copyToClipboard = async (text, setState) => {
    try {
      await navigator.clipboard.writeText(text);
      setState(true);
      setTimeout(() => setState(false), 1500);
    } catch {}
  };

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-50 via-white to-purple-50 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900" />

      <div className="absolute top-4 right-4 bg-black text-white dark:bg-white dark:text-black rounded-full px-4 py-1 text-sm font-semibold shadow">
        {yearsOfExp}+ years of experience
      </div>

      <Container>
        <div className="pt-24 md:pt-28 grid md:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-black text-white px-3 py-1 text-xs font-medium mb-4 dark:bg-white dark:text-black">
              <BadgeCheck className="h-3.5 w-3.5" /> Available for freelance in Belgium (remote/onsite)
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">
              {PROFILE.title}
            </h1>
            <p className="mt-4 text-lg text-gray-700 dark:text-neutral-300 max-w-2xl">
              {PROFILE.summary}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button className="bg-black text-white dark:bg-white dark:text-black" onClick={onHireClick}>
                Hire me
              </Button>
              <Button as="a" href="#projects" className="bg-white border dark:bg-neutral-900 dark:border-neutral-800">
                See projects
              </Button>
              <Button
                className="bg-white border dark:bg-neutral-900 dark:border-neutral-800"
                onClick={() => copyToClipboard(PROFILE.email, setCopied)}
              >
                <Mail className="h-4 w-4" /> {copied ? "Copied!" : "Copy email"}
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-neutral-300">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {PROFILE.location}
              </span>
              <button
                className="inline-flex items-center gap-2 hover:underline"
                onClick={() => copyToClipboard(PROFILE.phone, setPhoneCopied)}
              >
                <Phone className="h-4 w-4" /> {phoneCopied ? "Copied!" : PROFILE.phone}
              </button>
              <a className="inline-flex items-center gap-2 hover:underline" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5"
          >
            <div className="relative rounded-3xl border bg-white dark:bg-neutral-900 dark:border-neutral-800 p-6 shadow-sm">
              <SectionTitle
                eyebrow="Profile"
                title={PROFILE.name}
                subtitle="DevOps Engineer focused on platforms, delivery, and reliability."
              />
              <ul className="space-y-2 text-sm text-gray-700 dark:text-neutral-300">
                {CORE_SKILLS.slice(0, 4).map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-black dark:bg-white" /> {s}
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-xs text-gray-500 dark:text-neutral-400">
                French (Native) · English (B2) · Arabic (A1)
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <a
          href="#about"
          className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 dark:text-neutral-400 dark:hover:text-neutral-200"
        >
          <ChevronDown className="h-4 w-4" /> Scroll
        </a>
      </div>
    </section>
  );
}