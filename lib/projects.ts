import { getDatabase } from "@/lib/mongodb";
import fallbackProjects from "@/lib/projects.fallback.json";
import type { Project } from "@/lib/types";

const CACHE_TTL_MS = 60 * 1000;

let cached: { projects: Project[]; fetchedAt: number } | null = null;

// Called by the admin API after a write so edits show up immediately
// (only clears this instance's memo; other isolates expire via the TTL).
export function invalidateProjectsCache() {
  cached = null;
}

function byProjectIdAsc(a: Project, b: Project): number {
  return Number(a.project_id || 0) - Number(b.project_id || 0);
}

// Visible projects, ordered by project_id (1 = top). Falls back to the committed snapshot
// when the DB is unreachable (e.g. no MONGODB_URI in CI).
export async function getProjects(): Promise<Project[]> {
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.projects;
  }

  try {
    const db = await getDatabase();
    const docs = await db
      .collection("Projects")
      .find({ isHidden: { $ne: true } }, { projection: { __v: 0 } })
      .toArray();

    const projects = docs
      .map((doc) => ({ ...doc, _id: doc._id.toString() }) as Project)
      .sort(byProjectIdAsc);

    cached = { projects, fetchedAt: Date.now() };
    return projects;
  } catch (error) {
    console.error("Failed to load projects from MongoDB, using fallback:", error);
    return (fallbackProjects as Project[])
      .filter((p) => p.isHidden !== true)
      .sort(byProjectIdAsc);
  }
}
