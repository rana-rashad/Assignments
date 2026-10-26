import { ObjectId } from "mongodb";
import { logsCollection } from "../../DB/Models/logs.model.js";

// 7) Insert a log (book_id stored as ObjectId so $lookup works)
export const insertLog = (doc) => {
  const log = { ...doc };
  if (log.book_id && ObjectId.isValid(log.book_id)) log.book_id = new ObjectId(log.book_id);
  return logsCollection().insertOne(log);
};
