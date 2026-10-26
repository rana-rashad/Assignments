import { getDb } from "../connection.db.js";

export const AUTHORS = "authors";
export const authorsCollection = () => getDb().collection(AUTHORS);
