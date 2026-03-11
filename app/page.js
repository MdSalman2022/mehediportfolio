import projectsCache from "@/lib/projectsCache.json";
import HomeContent from "@/components/HomeContent";

// Static generation - fully compatible with Cloudflare Workers
export const revalidate = false;

async function getProjects() {
  console.log(`✅ Loaded ${projectsCache.length} projects from static cache`);
  return projectsCache;
}

export default async function Home() {
  const projects = await getProjects();

  return <HomeContent projects={projects} />;
}
