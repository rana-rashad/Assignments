import { booksCollection } from "../../DB/Models/books.model.js";
import { logsCollection } from "../../DB/Models/logs.model.js";

// 5) Insert one
export const insertBook = (doc) => booksCollection().insertOne(doc);

// 6) Insert many
export const insertBooks = (docs) => booksCollection().insertMany(docs);

// 8) Update year of a book by title (default 2022)
export const updateBookYear = (title, year = 2022) =>
  booksCollection().updateOne({ title }, { $set: { year } });

// 9) Find by title
export const findByTitle = (title) => booksCollection().findOne({ title });

// 10) Between two years (inclusive)
export const findByYearRange = (from, to) =>
  booksCollection().find({ year: { $gte: from, $lte: to } }).toArray();

// 11) Genre includes
export const findByGenre = (genre) => booksCollection().find({ genres: genre }).toArray();

// 12) Skip 2, limit 3, sort year desc
export const skipLimit = () =>
  booksCollection().find().sort({ year: -1 }).skip(2).limit(3).toArray();

// 13) year stored as integer (BSON int32)
export const yearInteger = () =>
  booksCollection().find({ year: { $type: "int" } }).toArray();

// 14) genres do not include Horror or Science Fiction
export const excludeGenres = () =>
  booksCollection().find({ genres: { $nin: ["Horror", "Science Fiction"] } }).toArray();

// 15) Delete books before year
export const deleteBeforeYear = (year) =>
  booksCollection().deleteMany({ year: { $lt: year } });

// 16) Aggregate: year > 2000 sorted desc
export const aggregate1 = () =>
  booksCollection().aggregate([
    { $match: { year: { $gt: 2000 } } },
    { $sort: { year: -1 } },
  ]).toArray();

// 17) Aggregate: year > 2000, only title/author/year
export const aggregate2 = () =>
  booksCollection().aggregate([
    { $match: { year: { $gt: 2000 } } },
    { $project: { _id: 0, title: 1, author: 1, year: 1 } },
  ]).toArray();

// 18) Aggregate: unwind genres
export const aggregate3 = () =>
  booksCollection().aggregate([
    { $unwind: "$genres" },
    { $project: { _id: 0, title: 1, genres: 1 } },
  ]).toArray();

// 19) Aggregate: join logs with books ($lookup)
export const aggregate4 = () =>
  logsCollection().aggregate([
    {
      $lookup: {
        from: "books",
        localField: "book_id",
        foreignField: "_id",
        as: "book_details",
      },
    },
    {
      $project: {
        _id: 0,
        action: 1,
        "book_details.title": 1,
        "book_details.author": 1,
        "book_details.year": 1,
      },
    },
  ]).toArray();
