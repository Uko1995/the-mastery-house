import { MongoClient } from "mongodb";

let cachedClient: MongoClient | null = null;

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

  // Setup schema validations for enrollments collection
  try {
    await db
      .command({
        collMod: "enrollments",
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: [
              "firstName",
              "lastName",
              "email",
              "phone",
              "country",
              "timezone",
              "howHeard",
              "childName",
              "childAge",
              "schoolingStructure",
              "ageBand",
              "submittedAt",
            ],
            properties: {
              firstName: { bsonType: "string", minLength: 2, maxLength: 100 },
              lastName: { bsonType: "string", minLength: 2, maxLength: 100 },
              email: {
                bsonType: "string",
                pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
              },
              phone: { bsonType: "string", minLength: 10, maxLength: 20 },
              country: { bsonType: "string", minLength: 2, maxLength: 100 },
              timezone: { bsonType: "string", minLength: 2, maxLength: 100 },
              childName: { bsonType: "string", minLength: 2, maxLength: 100 },
              childAge: { bsonType: "int", minimum: 6, maximum: 16 },
              submittedAt: { bsonType: "date" },
              status: {
                bsonType: "string",
                enum: ["pending", "reviewed", "accepted", "rejected"],
              },
            },
          },
        },
        validationLevel: "moderate",
        validationAction: "error",
      })
      .catch(() => {
        // Collection might not exist yet or validation already set
      });

    // Setup schema validations for waiting-list collection
    await db
      .command({
        collMod: "waiting-list",
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: [
              "firstName",
              "lastName",
              "email",
              "phone",
              "childName",
              "childAge",
              "ageBand",
              "submittedAt",
            ],
            properties: {
              firstName: { bsonType: "string", minLength: 2, maxLength: 100 },
              lastName: { bsonType: "string", minLength: 2, maxLength: 100 },
              email: {
                bsonType: "string",
                pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
              },
              phone: { bsonType: "string", minLength: 10, maxLength: 20 },
              childName: { bsonType: "string", minLength: 2, maxLength: 100 },
              childAge: { bsonType: "int", minimum: 6, maximum: 16 },
              ageBand: { bsonType: "string", enum: ["6-8", "9-12", "13-16"] },
              submittedAt: { bsonType: "date" },
              status: {
                bsonType: "string",
                enum: ["pending", "contacted", "enrolled"],
              },
            },
          },
        },
        validationLevel: "moderate",
        validationAction: "error",
      })
      .catch(() => {
        // Collection might not exist yet or validation already set
      });
  } catch (error) {
    // Validations are optional, don't fail if they can't be set
    console.warn("Could not set MongoDB schema validations:", error);
  }

  return db;
}
