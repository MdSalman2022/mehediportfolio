"use client";

import { useCallback, useEffect, useState } from "react";
import { Eye, EyeOff, Pencil, Plus, Trash2, X } from "lucide-react";
import type { Project } from "@/lib/types";

type Draft = Omit<Project, "_id" | "technologies" | "img"> & {
  technologies: string; // comma-separated in the form
  img: string; // one URL per line
};

const emptyDraft: Draft = {
  title: "",
  desc: "",
  project_id: "",
  project_type: "",
  technologies: "",
  img: "",
  sitelink: "",
  codelink: "",
  isHidden: false,
};

function toDraft(p: Project): Draft {
  return {
    ...p,
    technologies: p.technologies.join(", "),
    img: p.img.join("\n"),
  };
}

function toPayload(d: Draft) {
  return {
    ...d,
    technologies: d.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    img: d.img
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean),
  };
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/projects");
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      setProjects(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const isNew = editing === "new";
      const res = await fetch(
        isNew ? "/api/admin/projects" : `/api/admin/projects/${editing}`,
        {
          method: isNew ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(toPayload(draft)),
        },
      );
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? `${res.status} ${res.statusText}`);
      }
      setEditing(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const toggleHidden = async (p: Project) => {
    await fetch(`/api/admin/projects/${p._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isHidden: !p.isHidden }),
    });
    await load();
  };

  const remove = async (p: Project) => {
    if (!window.confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    await fetch(`/api/admin/projects/${p._id}`, { method: "DELETE" });
    await load();
  };

  const field =
    "w-full px-3 py-2 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary";
  const label =
    "font-mono text-[10px] text-muted-foreground uppercase tracking-widest block mb-1";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container max-w-4xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="section-label">{"// Admin"}</p>
            <h1 className="text-3xl font-bold">Projects</h1>
          </div>
          <button
            onClick={() => {
              setDraft(emptyDraft);
              setEditing("new");
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" /> New project
          </button>
        </div>

        {error && (
          <p className="mb-6 px-4 py-3 border border-red-500/50 text-red-400 text-sm">
            {error}
          </p>
        )}

        {loading ? (
          <p className="font-mono text-sm text-muted-foreground">Loading…</p>
        ) : (
          <div className="border border-border divide-y divide-border">
            {projects.map((p) => (
              <div
                key={p._id}
                className={`flex items-center gap-4 px-4 py-3 ${
                  p.isHidden ? "opacity-50" : ""
                }`}
              >
                <span className="font-mono text-xs text-primary/70 w-8 shrink-0">
                  {String(p.project_id).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold truncate">{p.title}</p>
                  <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
                    {p.project_type}
                    {p.isHidden ? " · hidden" : ""}
                  </p>
                </div>
                <button
                  onClick={() => toggleHidden(p)}
                  title={p.isHidden ? "Show on site" : "Hide from site"}
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {p.isHidden ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => {
                    setDraft(toDraft(p));
                    setEditing(p._id);
                  }}
                  title="Edit"
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => remove(p)}
                  title="Delete"
                  className="p-2 text-muted-foreground hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {projects.length === 0 && (
              <p className="px-4 py-6 font-mono text-sm text-muted-foreground">
                No projects yet.
              </p>
            )}
          </div>
        )}

        {editing !== null && (
          <div className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm overflow-y-auto py-10">
            <div className="w-full max-w-2xl border border-border bg-card p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-mono text-sm uppercase tracking-widest text-primary">
                  {editing === "new" ? "New project" : "Edit project"}
                </h2>
                <button
                  onClick={() => setEditing(null)}
                  className="p-1.5 text-muted-foreground hover:text-primary"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className={label}>Title *</label>
                  <input
                    className={field}
                    value={draft.title}
                    onChange={(e) =>
                      setDraft({ ...draft, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className={label}>Project ID (order, 1 = top) *</label>
                  <input
                    className={field}
                    value={draft.project_id}
                    onChange={(e) =>
                      setDraft({ ...draft, project_id: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className={label}>Type *</label>
                  <input
                    className={field}
                    placeholder="business, service, portfolio…"
                    value={draft.project_type}
                    onChange={(e) =>
                      setDraft({ ...draft, project_type: e.target.value })
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={label}>Description *</label>
                  <textarea
                    className={`${field} resize-none`}
                    rows={3}
                    value={draft.desc}
                    onChange={(e) =>
                      setDraft({ ...draft, desc: e.target.value })
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={label}>Technologies (comma-separated)</label>
                  <input
                    className={field}
                    placeholder="NextJS, MongoDB, Tailwind Css"
                    value={draft.technologies}
                    onChange={(e) =>
                      setDraft({ ...draft, technologies: e.target.value })
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={label}>Image URLs (one per line)</label>
                  <textarea
                    className={`${field} resize-none font-mono text-xs`}
                    rows={3}
                    value={draft.img}
                    onChange={(e) => setDraft({ ...draft, img: e.target.value })}
                  />
                </div>
                <div>
                  <label className={label}>Live site URL</label>
                  <input
                    className={field}
                    value={draft.sitelink}
                    onChange={(e) =>
                      setDraft({ ...draft, sitelink: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className={label}>Code URL</label>
                  <input
                    className={field}
                    value={draft.codelink}
                    onChange={(e) =>
                      setDraft({ ...draft, codelink: e.target.value })
                    }
                  />
                </div>
                <label className="md:col-span-2 flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={draft.isHidden === true}
                    onChange={(e) =>
                      setDraft({ ...draft, isHidden: e.target.checked })
                    }
                  />
                  Hidden (not shown on the site)
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setEditing(null)}
                  className="px-5 py-2.5 border border-border font-mono text-xs uppercase tracking-widest text-muted-foreground hover:border-primary hover:text-primary transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={save}
                  disabled={saving}
                  className="px-5 py-2.5 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
