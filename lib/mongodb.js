import {MongoClient, ServerApiVersion} from "mongodb";
import dns from "dns/promises";

// Configure DNS servers for better connectivity
dns.setServers(["1.1.1.1", "8.8.8.8"]); // Use Cloudflare and Google DNS

// Connection URI
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

// Connection options
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
};

// Create a MongoClient
let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    console.log("🔄 Creating new MongoDB connection for development...");
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  console.log("🔄 Creating MongoDB connection for production...");
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDatabase() {
  try {
    const client = await clientPromise;
    console.log("✅ MongoDB connected successfully");
    return client.db(dbName);
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
    throw error;
  }
}

export default clientPromise;
