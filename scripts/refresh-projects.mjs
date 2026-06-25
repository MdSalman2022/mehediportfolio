// filepath: scripts/refresh-projects.mjs
// Refreshes lib/projectsCache.json from MongoDB before a Cloudflare build.
// Run via: npm run refresh-projects
// Requires Node 20.6+ for the built-in --env-file flag.

import { writeFile } from "node:fs/promises";
import dns from "node:dns/promises";
import { MongoClient } from "mongodb";

// Same DNS workaround used by lib/mongodb.js — system DNS on some Windows
// setups refuses MongoDB Atlas SRV lookups (querySrv ECONNREFUSED).
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
  const projects = await client
    .db(dbName)
    .collection("projects")
    .find({}, { projection: { __v: 0 } })
    .sort({ project_id: -1 })
    .toArray();

  await writeFile(
    "lib/projectsCache.json",
    JSON.stringify(projects, null, 2) + "\n"
  );

  console.log(`✅ Cached ${projects.length} projects → lib/projectsCache.json`);
} catch (error) {
  console.error("❌ Failed to refresh projects cache:", error.message);
  process.exit(1);
} finally {
  await client.close();
}
