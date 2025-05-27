import { getDatabase } from "../../../lib/mongodb";

export async function GET() {
  try {
    console.log("🔍 Fetching projects from database...");

    const db = await getDatabase();
    const collection = db.collection("Projects");

    // Check if collection exists and has documents
    const count = await collection.countDocuments();
    console.log(`📊 Found ${count} projects in database`);
    if (count === 0) {
      console.log("⚠️ No projects found in database.");
      return Response.json([], { status: 200 });
    }

    const projects = await collection.find({}).toArray();
    console.log(`✅ Successfully fetched ${projects.length} projects`);

    return Response.json(projects, { status: 200 });
  } catch (error) {
    console.error("❌ Database error:", error);
    return Response.json(
      {
        error: "Failed to fetch projects",
        message: error.message,
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
