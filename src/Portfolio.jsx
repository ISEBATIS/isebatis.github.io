import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Mail, Copy, Linkedin, Phone, MapPin, Filter, Search, ChevronDown, ExternalLink, BadgeCheck, Moon, Sun } from "lucide-react";
import Hero from "./Hero";


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

// ---- Data ----
const PROFILE = {
  name: "Ilias Sebati",
  title: "DevOps & Kubernetes Freelancer",
  location: "Liège, Belgium",
  email: "ilias.travail@outlook.be",
  phone: "+32 466 40 44 37",
  linkedin: "https://www.linkedin.com/in/ilias-sebati",
  summary:
    "Cloud/DevOps engineer helping teams ship faster and safer with Kubernetes, GitLab/Jenkins CI/CD, Terraform, and AWS. I build resilient platforms, streamline delivery, and automate everything end‑to‑end.",
};

const EXPERIENCES = [
  {
    company: "ARHS (part of Accenture)",
    role: "Cloud Engineer (Consultant)",
    period: "Sep 2023 – Present",
    location: "Brussels, Belgium",
    bullets: [
      "Automated VM provisioning with Ansible; built CI/CD pipelines with Jenkins & GitLab CI.",
      "Managed images & registries (Docker/Podman, Nexus, ECR, Harbor).",
      "Migrated legacy apps to Kubernetes (EKS, MKS, Tanzu); implemented Mutating Webhooks & custom Operators (Java/Go).",
      "Deployed Istio service mesh (mTLS, routing, observability) and used Gateway API; ingress via Istio and NGINX.",
      "Infra-as-code with Terraform/CloudFormation; designed AWS/OVH landing zones; multi-env mgmt.",
    ],
    stack: [
      "AWS",
      "OVH",
      "Terraform",
      "CloudFormation",
      "Kubernetes",
      "Helm",
      "EKS",
      "MKS",
      "Tanzu",
      "Ansible",
      "Jenkins",
      "GitLab CI",
      "GitLab Runners",
      "Nexus",
      "ECR",
      "Harbor",
      "Docker",
      "Podman",
      "Java",
      "Go",
      "Istio",
      "Gateway API",
      "Calico",
      "Cilium",
      "AWS VPC CNI",
      "Confluence",
      "Jira",
    ],
  },
  {
    company: "Cisco Systems (Master Thesis)",
    role: "Cloud Engineer Intern",
    period: "Oct 2022 – Jun 2023",
    location: "Brussels, Belgium",
    bullets: [
      "Built a multi-cloud visibility & observability app with microservices.",
      "Modeled AWS APIs/SDK data; computed cross-service reachability with networking/security understanding.",
    ],
    stack: ["AWS", "Networking", "Security", "Microservices"],
  },
  {
    company: "Amazon Web Services (ProServe)",
    role: "DevOps Intern",
    period: "Jul 2022 – Sep 2022",
    location: "Paris, France",
    bullets: [
      "Drafted a DevOps implementation guide aligned with AWS best practices.",
      "PoC: Terraform through GitLab CI proving code‑centric infra delivery.",
    ],
    stack: ["AWS", "Terraform", "GitLab CI", "DevOps"],
  },
];

const PROJECTS = [
  {
    id: "proj-a",
    title: "Project A — EU App Modernization",
    years: "2023–2024",
    summary:
      "Containerized legacy apps and migrated them onto managed Kubernetes (EKS/Tanzu). Automated delivery via GitLab CI and enforced policies using Kubernetes Mutating Webhooks.",
    highlights: [
      "Kubernetes migration (EKS/Tanzu)",
      "GitLab CI multi-stage pipelines",
      "Policy enforcement (Mutating Webhooks)",
    ],
    tags: ["Kubernetes", "DevOps", "Pipelines", "GitLab", "AWS"],
    links: [],
  },
  {
    id: "proj-b",
    title: "Project B — Service Mesh & Ingress at Scale",
    years: "2023–2024",
    summary:
      "Designed and rolled out an Istio service mesh with mutual TLS, traffic splitting, and observability. Adopted Gateway API; operated Istio & NGINX ingress for distinct workloads.",
    highlights: [
      "Istio rollout with mTLS",
      "K8s Gateway API",
      "Blue/green & canary routing",
    ],
    tags: ["Kubernetes", "Istio", "Platform", "Observability"],
    links: [],
  },
];

const SKILLS = [
  { name: "Kubernetes", level: 90, tags: ["Kubernetes", "Platform"], years: 2 },
  { name: "AWS", level: 85, tags: ["Cloud"], years: 3 },
  { name: "Terraform", level: 85, tags: ["IaC", "Pipelines"], years: 3 },
  { name: "GitLab CI", level: 80, tags: ["Pipelines", "GitLab"], years: 3 },
  { name: "Jenkins", level: 75, tags: ["Pipelines"], years: 2 },
  { name: "Istio", level: 80, tags: ["Kubernetes", "Mesh"], years: 2 },
  { name: "Helm", level: 80, tags: ["Kubernetes"], years: 2 },
  { name: "Ansible", level: 75, tags: ["Automation"], years: 2 },
  { name: "Docker/Podman", level: 85, tags: ["Containers"], years: 4 },
  { name: "Java", level: 65, tags: ["Languages"], years: 2 },
  { name: "Go", level: 60, tags: ["Languages"], years: 1 },
];

const CORE_SKILLS = [
  "Platform Engineering",
  "SRE Mindset & Observability",
  "CI/CD Design & Governance",
  "Security by Default (mTLS, policies)",
  "Cost‑aware Cloud Architectures",
  "Documentation & Enablement",
  "Agile ways of working",
];

const ACHIEVEMENTS = [
  {
    title: "Cyber Security Challenge Belgium — 2nd place (2023)",
    link: "https://www.cybersecuritychallenge.be/",
  },
  { title: "Organizer — Google Developer Student Clubs (tech talks)" },
];

const EDUCATION = [
  {
    title: "MSc. in Computer Science (Networking/Security)",
    org: "University of Liège",
    period: "2021 – 2023",
  },
  {
    title: "BSc. in Computer Science (Software Engineering)",
    org: "University of Liège",
    period: "2018 – 2021",
  },
];

const LANGUAGES = [
  { name: "French", level: "Native" },
  { name: "English", level: "B2" },
  { name: "Arabic", level: "A1" },
];

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

// ---- Components ----
function ThemeToggle({ theme, onToggle }) {
  return (
    <Button className="bg-white border dark:bg-neutral-900 dark:border-neutral-800" onClick={onToggle} title="Toggle theme">
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {theme === "dark" ? "Light" : "Dark"}
    </Button>
  );
}

function TopBar({ cvBlobUrl, theme, onToggleTheme }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 dark:supports-[backdrop-filter]:bg-neutral-900/60 dark:bg-neutral-900/80 border-b border-gray-100 dark:border-neutral-800">
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className="text-sm font-semibold">Ilias Sebati</a>
        <div className="flex items-center gap-2">
          <Button
            as="a"
            href={cvBlobUrl}
            download
            className="bg-black text-white dark:bg-white dark:text-black"
            title="Download my CV"
          >
            <Download className="h-4 w-4" /> Get my CV
          </Button>
          {/* Removed Upload CV per request */}
          <Button as="a" href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="bg-white border dark:bg-neutral-900 dark:border-neutral-800">
            <Linkedin className="h-4 w-4" /> LinkedIn
          </Button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </Container>
    </div>
  );
}

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

function Projects() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(new Set());
  const [sort, setSort] = useState("year-desc");

  const toggle = (t) => {
    const next = new Set(filters);
    next.has(t) ? next.delete(t) : next.add(t);
    setFilters(next);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PROJECTS.filter((p) => {
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q);
      const matchesFilter = filters.size === 0 || p.tags.some((t) => filters.has(t));
      return matchesQuery && matchesFilter;
    });
    if (sort === "year-desc") list.sort((a, b) => b.years.localeCompare(a.years));
    if (sort === "year-asc") list.sort((a, b) => a.years.localeCompare(b.years));
    if (sort === "title") list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [query, filters, sort]);

  return (
    <section id="projects" className="py-16 md:py-24">
      <Container>
        <SectionTitle eyebrow="Projects" title="Selected work" subtitle="Filter by tags, sort, or search to explore." />
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-2xl border px-9 py-2 text-sm outline-none focus:ring-2 bg-white dark:bg-neutral-900 dark:border-neutral-800"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-2xl border px-3 py-2 text-sm bg-white dark:bg-neutral-900 dark:border-neutral-800">
              <option value="year-desc">Newest</option>
              <option value="year-asc">Oldest</option>
              <option value="title">Title A→Z</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {allProjectTags.map((t) => (
            <Tag key={t} active={filters.has(t)} onClick={() => toggle(t)}>{t}</Tag>
          ))}
          {filters.size > 0 && (
            <button onClick={() => setFilters(new Set())} className="text-xs text-gray-600 dark:text-neutral-300 underline">Clear</button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((p) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border bg-white dark:bg-neutral-900 dark:border-neutral-800 p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <div className="text-sm text-gray-600 dark:text-neutral-300">{p.years}</div>
                </div>
                <div className="flex flex-wrap gap-2 justify-end">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full border px-2 py-1 text-xs text-gray-700 dark:text-neutral-300 dark:border-neutral-800">{t}</span>
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700 dark:text-neutral-300">{p.summary}</p>
              <ul className="mt-3 grid gap-2 text-sm text-gray-700 dark:text-neutral-300 list-disc list-inside">
                {p.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              {p.links?.length ? (
                <div className="mt-4 flex gap-2">
                  {p.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-gray-700 dark:text-neutral-300 hover:underline">
                      {l.label} <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              ) : null}
            </motion.div>
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

function Contact({ cvBlobUrl }) {
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
      <TopBar cvBlobUrl={cvBlobUrl ?? undefined} theme={theme} onToggleTheme={toggleTheme} />
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
        <Projects />
        <Skills />
        <Accents />
        <Contact cvBlobUrl={cvBlobUrl ?? undefined} />
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

