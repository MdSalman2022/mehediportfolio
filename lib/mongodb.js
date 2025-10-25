import { MongoClient, ServerApiVersion } from "mongodb";

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

// In development mode, use a global variable so that the value
// is preserved across module reloads caused by HMR (Hot Module Replacement).
if (process.env.NODE_ENV === "development") {
  // If the global variable doesn't already exist, create it
  if (!global._mongoClientPromise) {
    console.log("🔄 Creating new MongoDB connection for development...");
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  console.log("🔄 Creating MongoDB connection for production...");
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a function to get the database
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
