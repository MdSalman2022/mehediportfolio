import HomeContent from "@/components/HomeContent";
import { getProjects } from "@/lib/projects";

// always render on the server so DB changes show up without a redeploy
export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await getProjects();

  return <HomeContent projects={projects} />;
}
