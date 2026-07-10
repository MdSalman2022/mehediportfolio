// Regenerates lib/projects.fallback.json from MongoDB.
// Usage: npm run refresh-projects (needs Node 20.6+ for --env-file)

import { writeFile } from "node:fs/promises";
import dns from "node:dns/promises";
import { MongoClient } from "mongodb";

// same Windows DNS workaround as lib/mongodb.ts
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri || !dbName) {
  console.error("❌ MONGODB_URI and DB_NAME must be set in the environment");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});

try {
  await client.connect();
  console.log(`🔌 Connected: ${uri.replace(/\/\/[^:]+:[^@]+@/, "//<hidden>@")}`);

  const db = client.db(dbName);
  const collections = await db.listCollections().toArray();
  console.log("📦 Collections in", dbName + ":", collections.map((c) => c.name));

  const targetCollection = "Projects";
  const docCount = await db.collection(targetCollection).countDocuments();
  console.log(`🔍 "${targetCollection}" has ${docCount} documents`);

  // Mirror the runtime query: hidden projects stay out of the snapshot too.
  const projects = await db
    .collection(targetCollection)
    .find({ isHidden: { $ne: true } }, { projection: { __v: 0 } })
    .toArray();

  // project_id is stored as a string; compare numerically so 9 < 10
  projects.sort((a, b) => Number(a.project_id || 0) - Number(b.project_id || 0));

  await writeFile(
    "lib/projects.fallback.json",
    JSON.stringify(projects, null, 2) + "\n"
  );

  console.log(`Cached ${projects.length} projects -> lib/projects.fallback.json`);
} catch (error) {
  console.error("❌ Failed to refresh projects cache:", error.message);
  process.exit(1);
} finally {
  await client.close();
}
