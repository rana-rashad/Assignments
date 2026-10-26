import dotenv from "dotenv";
import path from "node:path";

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

export const config = {
  env,
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017",
  dbName: process.env.DB_NAME || "task6",
};
