import { MongoClient } from "mongodb";
import { config } from "../Config/config.js";

let db;

export const connectDB = async () => {
  const client = new MongoClient(config.mongoUri);
  await client.connect();
  db = client.db(config.dbName);
  console.log(`✅ MongoDB connected -> ${config.dbName}`);
  return db;
};

export const getDb = () => {
  if (!db) throw new Error("Database is not connected yet");
  return db;
};
