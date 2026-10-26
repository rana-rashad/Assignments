import { getDb } from "../connection.db.js";

export const LOGS = "logs";
export const LOGS_CAPPED_SIZE = 1024 * 1024; // 1MB
export const logsCollection = () => getDb().collection(LOGS);
