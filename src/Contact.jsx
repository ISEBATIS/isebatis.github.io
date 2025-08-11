import React, { useState } from "react";
import { Download, Mail, Copy, Linkedin, Phone, MapPin } from "lucide-react";

export default function Contact({ cvBlobUrl, PROFILE, Container, SectionTitle, Button, copyToClipboard }) {
  const [copied, setCopied] = useState(false);

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-white to-sky-50 dark:from-neutral-950 dark:to-neutral-900">
      <Container>
        <SectionTitle eyebrow="Contact" title="Let’s build something great" subtitle="Tell me about your goals — I’ll reply within 1 business day." />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 rounded-2xl border bg-white dark:bg-neutral-900 dark:border-neutral-800 p-6 shadow-sm">
            <form onSubmit={(e) => e.preventDefault()} className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required placeholder="Your name" className="rounded-2xl border px-3 py-2 text-sm bg-white dark:bg-neutral-900 dark:border-neutral-800" />
                <input required type="email" placeholder="Your email" className="rounded-2xl border px-3 py-2 text-sm bg-white dark:bg-neutral-900 dark:border-neutral-800" />
              </div>
              <input placeholder="Company (optional)" className="rounded-2xl border px-3 py-2 text-sm bg-white dark:bg-neutral-900 dark:border-neutral-800" />
              <textarea required placeholder="Project details" rows={5} className="rounded-2xl border px-3 py-2 text-sm bg-white dark:bg-neutral-900 dark:border-neutral-800" />
              <div className="flex items-center gap-2">
                <Button className="bg-black text-white dark:bg-white dark:text-black">Send message</Button>
                <Button as="a" href={cvBlobUrl} download className="bg-white border dark:bg-neutral-900 dark:border-neutral-800"><Download className="h-4 w-4" /> Get my CV</Button>
              </div>
              <p className="text-xs text-gray-500 dark:text-neutral-400">*This demo form does not submit; wire it to your endpoint or a service like Formspree.</p>
            </form>
          </div>
          <div className="rounded-2xl border bg-white dark:bg-neutral-900 dark:border-neutral-800 p-6 shadow-sm">
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> {PROFILE.email}</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> {PROFILE.phone}</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {PROFILE.location}</div>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:underline"><Linkedin className="h-4 w-4" /> LinkedIn</a>
              <Button className="bg-white border dark:bg-neutral-900 dark:border-neutral-800" onClick={() => copyToClipboard(PROFILE.email, setCopied)}>
                <Copy className="h-4 w-4" /> {copied ? "Copied!" : "Copy email"}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}