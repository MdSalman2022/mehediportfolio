import { MongoClient, ServerApiVersion, type Db } from "mongodb";

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  serverApi: ServerApiVersion.v1,
};

declare global {
  // survives HMR reloads in dev
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | undefined;

function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      // Windows DNS sometimes refuses Atlas SRV lookups (querySrv ECONNREFUSED)
      global._mongoClientPromise = import("node:dns/promises")
        .then((dns) => dns.setServers(["1.1.1.1", "8.8.8.8"]))
        .catch(() => {})
        .then(() => new MongoClient(uri, options).connect());
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) {
    clientPromise = new MongoClient(uri, options).connect();
  }
  return clientPromise;
}

export async function getDatabase(): Promise<Db> {
  const dbName = process.env.DB_NAME;
  if (!dbName) {
    throw new Error("DB_NAME is not set");
  }
  const client = await getClient();
  return client.db(dbName);
}
