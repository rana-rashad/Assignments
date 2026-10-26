import { getDb } from "../../DB/connection.db.js";
import { BOOKS, booksValidator, booksCollection } from "../../DB/Models/books.model.js";
import { authorsCollection } from "../../DB/Models/authors.model.js";
import { LOGS, LOGS_CAPPED_SIZE } from "../../DB/Models/logs.model.js";

// 1) Explicit collection with validation
export const createBooksCollection = async () => {
  await getDb().createCollection(BOOKS, {
    validator: booksValidator,
    validationLevel: "strict",
    validationAction: "error",
  });
  return { ok: 1 };
};

// 2) Implicit collection (created by the first insert)
export const createAuthorsImplicit = (doc) => authorsCollection().insertOne(doc);

// 3) Capped collection, 1MB
export const createLogsCapped = async () => {
  await getDb().createCollection(LOGS, { capped: true, size: LOGS_CAPPED_SIZE });
  return { ok: 1 };
};

// 4) Index on books.title
export const createTitleIndex = () => booksCollection().createIndex({ title: 1 });
