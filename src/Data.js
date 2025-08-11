import { b64decode } from "./utils/secrets";

// --- Obfuscated pieces (Base64) ---
const OBFUSCATED = {
  email_b64: "aWxpYXMudHJhdmFpbEBvdXRsb29rLmJl",
  phone_b64: "KzMyIDQ2NiA0MCA0NCAzNw==",
  linkedin_b64: "aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2lsaWFzLXNlYmF0aQ==",
};

// --- Decoded on access ---
export const PROFILE = {
  name: "Ilias Sebati",
  title: "DevOps & Kubernetes Freelancer",
  location: "Liège, Belgium",
  get email() { return b64decode(OBFUSCATED.email_b64); },
  get phone() { return b64decode(OBFUSCATED.phone_b64); },
  get linkedin() { return b64decode(OBFUSCATED.linkedin_b64); },
  summary:
    "Cloud/DevOps engineer helping teams ship faster and safer with Kubernetes, GitLab/Jenkins CI/CD, Terraform, and AWS. I build resilient platforms, streamline delivery, and automate everything end-to-end.",
};

// Keeping the rest as plain data (no real reason to obfuscate)
export const EXPERIENCES = [
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
      "AWS","OVH","Terraform","CloudFormation","Kubernetes","Helm","EKS","MKS","Tanzu",
      "Ansible","Jenkins","GitLab CI","GitLab Runners","Nexus","ECR","Harbor","Docker",
      "Podman","Java","Go","Istio","Gateway API","Calico","Cilium","AWS VPC CNI","Confluence","Jira",
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
      "PoC: Terraform through GitLab CI proving code-centric infra delivery.",
    ],
    stack: ["AWS", "Terraform", "GitLab CI", "DevOps"],
  },
];

export const PROJECTS = [
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

export const SKILLS = [
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

export const CORE_SKILLS = [
  "Platform Engineering",
  "SRE Mindset & Observability",
  "CI/CD Design & Governance",
  "Security by Default (mTLS, policies)",
  "Cost-aware Cloud Architectures",
  "Documentation & Enablement",
  "Agile ways of working",
];

export const ACHIEVEMENTS = [
  {
    title: "Cyber Security Challenge Belgium — 2nd place (2023)",
    link: "https://www.cybersecuritychallenge.be/",
  },
  { title: "Organizer — Google Developer Student Clubs (tech talks)" },
];

export const EDUCATION = [
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

export const LANGUAGES = [
  { name: "French", level: "Native" },
  { name: "English", level: "B2" },
  { name: "Arabic", level: "A1" },
];
