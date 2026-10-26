import { getDb } from "../connection.db.js";

export const BOOKS = "books";


export const booksValidator = {
  $jsonSchema: {
    bsonType: "object",
    required: ["title"],
    properties: {
      title: {
        bsonType: "string",
        minLength: 1,
        description: "title is required and must be a non-empty string",
      },
    },
  },
};

export const booksCollection = () => getDb().collection(BOOKS);
