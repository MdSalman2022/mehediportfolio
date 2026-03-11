import projectsCache from "../../../lib/projectsCache.json";

export async function GET() {
  try {
    console.log("✅ Serving projects from static cache");
    return Response.json(projectsCache, {status: 200});
  } catch (error) {
    console.error("❌ Error serving projects:", error);
    return Response.json(
      {
        error: "Failed to fetch projects",
        message: error.message,
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      {status: 500},
    );
  }
}
