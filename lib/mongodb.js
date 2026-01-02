import { MongoClient } from "mongodb";
let cachedClient = null;
export async function connectToDatabase() {
    if (cachedClient) {
        return cachedClient;
    }
    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error("MONGO_URI is not defined in environment variables");
    }
    const client = new MongoClient(uri);
    await client.connect();
    cachedClient = client;
    return client;
}
export async function getDatabase() {
    const client = await connectToDatabase();
    const db = client.db("mastery-house");
    return db;
}
