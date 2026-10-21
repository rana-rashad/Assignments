import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from "../config/config.service.js";

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  logging: false,
});

export const connectDB = async () => {
  try {
    // create the database automatically if it does not exist
    const conn = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
    });
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    await conn.end();

    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connected & tables synced");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};
