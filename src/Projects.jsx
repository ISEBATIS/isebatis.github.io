import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ExternalLink } from "lucide-react";

export default function Projects({ PROJECTS, allProjectTags, Container, SectionTitle, Tag }) {
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