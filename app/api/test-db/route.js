import { getDatabase } from "../../../lib/mongodb";

export async function GET() {
  try {
    console.log("🔍 Testing MongoDB connection...");

    const db = await getDatabase();

    // Simple ping to test connection
    await db.admin().ping();

    // Get database stats
    const stats = await db.stats();

    console.log("✅ MongoDB connection successful");
    return Response.json(
      {
        message: "MongoDB connection successful",
        database: db.databaseName,
        collections: stats.collections,
        objects: stats.objects,
        dataSize: stats.dataSize,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    return Response.json(
      {
        error: "MongoDB connection failed",
        message: error.message,
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
