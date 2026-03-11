import {getDatabase} from "@/lib/mongodb";
import HomeContent from "@/components/HomeContent";
import fs from "fs";
import path from "path";

// Revalidate every 24 hours (ISR - Incremental Static Regeneration)
export const revalidate = 86400;

async function getProjects() {
  try {
    const db = await getDatabase();
    const collection = db.collection("Projects");
    const projects = await collection.find({}).toArray();

    // Convert MongoDB objects to plain JSON
    const serializedProjects = projects.map((project) => ({
      _id: project._id?.toString(),
      title: project.title,
      img: project.img,
      sitelink: project.sitelink,
      codelink: project.codelink,
      desc: project.desc,
      project_id: project.project_id,
      project_type: project.project_type,
      technologies: project.technologies,
    }));

    // Cache projects to JSON file for fallback
    if (serializedProjects.length > 0) {
      try {
        const cacheDir = path.join(process.cwd(), "lib");
        fs.writeFileSync(
          path.join(cacheDir, "projectsCache.json"),
          JSON.stringify(serializedProjects, null, 2),
        );
        console.log("✅ Projects cached successfully");
      } catch (cacheError) {
        console.warn("⚠️ Failed to cache projects:", cacheError);
      }
    }

    return serializedProjects;
  } catch (error) {
    console.error(
      "❌ Database error, attempting to load cached projects...",
      error.message,
    );

    // Fallback to cached projects if database fails
    try {
      const cacheDir = path.join(process.cwd(), "lib");
      const cachedData = fs.readFileSync(
        path.join(cacheDir, "projectsCache.json"),
        "utf-8",
      );
      const projects = JSON.parse(cachedData);
      console.log(`✅ Loaded ${projects.length} cached projects`);
      return projects;
    } catch (cacheReadError) {
      console.error("⚠️ No cached projects available");
      return [];
    }
  }
}

export default async function Home() {
  const projects = await getProjects();

  return <HomeContent projects={projects} />;
}
