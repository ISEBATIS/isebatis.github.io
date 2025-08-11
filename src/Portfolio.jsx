import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Mail, Copy, Linkedin, Phone, MapPin, Filter, Search, ChevronDown, ExternalLink, BadgeCheck, Moon, Sun } from "lucide-react";
import Hero from "./Hero";
import Contact from "./Contact";
import Projects from "./Projects";
import TopBar from "./TopBar";

// Portfolio.jsx (and wherever else)
import {
  PROFILE,
  EXPERIENCES,
  PROJECTS,
  SKILLS,
  CORE_SKILLS,
  ACHIEVEMENTS,
  EDUCATION,
  LANGUAGES,
} from "./Data";

// ---- Theme hook (system-aware dark mode with toggle) ----
function useTheme() {
  const [theme, setTheme] = useState(/** @type {"light"|"dark"} */("light"));
  const [systemPref, setSystemPref] = useState(/** @type {"light"|"dark"} */("light"));

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => setSystemPref(media.matches ? "dark" : "light");
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  // initialise from system on first mount
  useEffect(() => {
    setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }, []);

  // apply to <html> for Tailwind's `dark` selector
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  return { theme, systemPref, setTheme };
}

// ---- Utility components ----
const Container = ({ className = "", children }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Button = ({ as: As = "button", className = "", children, ...props }) => (
  <As
    className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent ${className}`}
    {...props}
  >
    {children}
  </As>
);

function ThemeToggle({ theme, onToggle }) {
  return (
    <Button className="bg-white border dark:bg-neutral-900 dark:border-neutral-800" onClick={onToggle} title="Toggle theme">
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {theme === "dark" ? "Light" : "Dark"}
    </Button>
  );
}

const Tag = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`rounded-full px-3 py-1 text-xs font-medium border transition ${
      active
        ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
        : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-800 dark:hover:border-neutral-700"
    }`}
  >
    {children}
  </button>
);

const SectionTitle = ({ eyebrow, title, subtitle, className = "" }) => (
  <div className={`mb-8 ${className}`}>
    {eyebrow && (
      <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-neutral-400 mb-2">{eyebrow}</div>
    )}
    <h2 className="text-2xl md:text-3xl font-bold leading-tight">{title}</h2>
    {subtitle && <p className="text-gray-600 dark:text-neutral-300 mt-2 max-w-2xl">{subtitle}</p>}
  </div>
);

// ---- Helpers ----
const copyToClipboard = async (text, setCopied) => {
  try {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  } catch (e) {
    console.error(e);
  }
};

const skillMatches = (skill, q, filters) => {
  const matchesQuery = !q || skill.name.toLowerCase().includes(q.toLowerCase());
  const matchesFilter = filters.size === 0 || skill.tags.some((t) => filters.has(t));
  return matchesQuery && matchesFilter;
};

const allSkillTags = Array.from(new Set(SKILLS.flatMap((s) => s.tags)));
const allProjectTags = Array.from(new Set(PROJECTS.flatMap((p) => p.tags)));

function About() {
  return (
    <section id="about" className="py-16 md:py-24">
      <Container>
        <SectionTitle eyebrow="About" title="What I do" subtitle="I partner with teams to design, build, and operate modern cloud platforms, with a strong focus on Kubernetes, automation, and developer experience." />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Platform Engineering",
              text: "Production‑grade clusters, service mesh, ingress, observability, and RBAC/policies that keep teams safe and fast.",
            },
            {
              title: "Delivery at scale",
              text: "Repeatable CI/CD with GitLab/Jenkins, infrastructure as code, and paved‑paths that remove friction.",
            },
            {
              title: "Cloud foundations",
              text: "Secure landing zones on AWS/OVH, multi‑environment setups, and governance aligned to standards.",
            },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border bg-white dark:bg-neutral-900 dark:border-neutral-800 p-6 shadow-sm">
              <h3 className="font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-neutral-300">{c.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 dark:from-neutral-950 dark:to-neutral-950">
      <Container>
        <SectionTitle eyebrow="Experience" title="Where I've worked" />
        <div className="space-y-6">
          {EXPERIENCES.map((e) => (
            <div key={e.company} className="rounded-2xl border bg-white dark:bg-neutral-900 dark:border-neutral-800 p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{e.role} · {e.company}</h3>
                  <div className="text-sm text-gray-600 dark:text-neutral-300">{e.period} · {e.location}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {e.stack.slice(0, 6).map((s) => (
                    <span key={s} className="rounded-full border px-2 py-1 text-xs text-gray-700 dark:text-neutral-300 dark:border-neutral-800">{s}</span>
                  ))}
                  {e.stack.length > 6 && (
                    <span className="rounded-full border px-2 py-1 text-xs text-gray-500 dark:text-neutral-400 dark:border-neutral-800">+{e.stack.length - 6}</span>
                  )}
                </div>
              </div>
              <ul className="mt-4 grid gap-2 text-sm text-gray-700 dark:text-neutral-300 list-disc list-inside">
                {e.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}


function Skills() {
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState(new Set());
  const visible = useMemo(() => SKILLS.filter((s) => skillMatches(s, q, filters)), [q, filters]);
  const toggle = (t) => {
    const next = new Set(filters);
    next.has(t) ? next.delete(t) : next.add(t);
    setFilters(next);
  };

  return (
    <section id="skills" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-neutral-950 dark:to-neutral-950">
      <Container>
        <SectionTitle eyebrow="Skills" title="Toolbox & proficiency" subtitle="Search or filter by category. Bars indicate relative proficiency." />
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search skills…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-2xl border px-9 py-2 text-sm outline-none focus:ring-2 bg-white dark:bg-neutral-900 dark:border-neutral-800"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {allSkillTags.map((t) => (
            <Tag key={t} active={filters.has(t)} onClick={() => toggle(t)}>{t}</Tag>
          ))}
          {filters.size > 0 && (
            <button onClick={() => setFilters(new Set())} className="text-xs text-gray-600 dark:text-neutral-300 underline">Clear</button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {visible.map((s) => (
            <div key={s.name} className="rounded-2xl border bg-white dark:bg-neutral-900 dark:border-neutral-800 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{s.name}</span>
                <span className="text-gray-500 dark:text-neutral-400">{s.level}%</span>
              </div>
              <div className="mt-2 h-2.5 w-full rounded-full bg-gray-100 dark:bg-neutral-800">
                <div
                  className="h-2.5 rounded-full bg-black dark:bg-white"
                  style={{ width: `${s.level}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-600 dark:text-neutral-300">{s.years} yr(s) · {s.tags.join(" · ")}</div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <SectionTitle eyebrow="Core skills" title="What I’m known for" className="mb-4" />
          <div className="grid md:grid-cols-3 gap-4">
            {CORE_SKILLS.map((s) => (
              <div key={s} className="rounded-2xl border bg-white dark:bg-neutral-900 dark:border-neutral-800 p-4 text-sm">{s}</div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Accents() {
  return (
    <section id="extras" className="py-16">
      <Container>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border bg-white dark:bg-neutral-900 dark:border-neutral-800 p-6 shadow-sm">
            <SectionTitle eyebrow="Achievements" title="A few highlights" />
            <ul className="space-y-3 text-sm text-gray-700 dark:text-neutral-300 list-disc list-inside">
              {ACHIEVEMENTS.map((a) => (
                <li key={a.title}>
                  {a.link ? (
                    <a href={a.link} target="_blank" rel="noreferrer" className="hover:underline inline-flex items-center gap-1">{a.title} <ExternalLink className="h-3.5 w-3.5" /></a>
                  ) : (
                    a.title
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border bg-white dark:bg-neutral-900 dark:border-neutral-800 p-6 shadow-sm">
            <SectionTitle eyebrow="Education" title="Background" />
            <ul className="space-y-3 text-sm text-gray-700 dark:text-neutral-300 list-disc list-inside">
              {EDUCATION.map((e) => (
                <li key={e.title}>
                  <span className="font-medium">{e.title}</span> — {e.org} · {e.period}
                </li>
              ))}
            </ul>
            <div className="mt-4 text-xs text-gray-600 dark:text-neutral-400">Languages: {LANGUAGES.map((l) => `${l.name} (${l.level})`).join(" · ")}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function Portfolio() {
  const [cvBlobUrl, setCvBlobUrl] = useState(null);
  const initialisedRef = useRef(false);
  const { theme, setTheme } = useTheme();

  // Build a very small default CV file so the Download button works out-of-the-box.
  useEffect(() => {
    if (initialisedRef.current) return;
    initialisedRef.current = true;
    const defaultCv = new Blob([
      `Ilias Sebati — DevOps & Kubernetes Freelancer
Email: ${PROFILE.email} — LinkedIn: ${PROFILE.linkedin}`,
    ], { type: "text/plain" });
    setCvBlobUrl(URL.createObjectURL(defaultCv));
    return () => {
      if (cvBlobUrl) URL.revokeObjectURL(cvBlobUrl);
    };
  }, []);

  const onHireClick = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-neutral-950 dark:text-neutral-100">
        <TopBar cvBlobUrl={cvBlobUrl ?? undefined} theme={theme} onToggleTheme={toggleTheme} PROFILE={PROFILE} Container={Container} ThemeToggle={ThemeToggle} Button={Button} />
        <main className="pt-16">
        <Hero
        onHireClick={onHireClick}
        PROFILE={PROFILE}
        CORE_SKILLS={CORE_SKILLS}
        Container={Container}
        Button={Button}
        SectionTitle={SectionTitle}
        />
        <About />
        <Experience />
        <Projects PROJECTS={PROJECTS} allProjectTags={allProjectTags} Container={Container} SectionTitle={SectionTitle} Tag={Tag} />
        <Skills />
        <Accents />
        <Contact
          cvBlobUrl={cvBlobUrl ?? undefined}
          PROFILE={PROFILE}
          Container={Container}
          SectionTitle={SectionTitle}
          Button={Button}
          copyToClipboard={copyToClipboard}
        />
      </main>
      <footer className="border-t border-gray-100 dark:border-neutral-800">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between py-6 text-sm text-gray-600 dark:text-neutral-400 gap-2">
            <div>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</div>
            <div className="flex items-center gap-3">
              <a href="#home" className="hover:underline">Back to top</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

