import { Router } from "express";
import { asyncHandler } from "../../Common/asyncHandler.js";
import { successResponse } from "../../Common/response.js";
import { requireBody, requireQuery } from "../../Middleware/validation.middleware.js";
import * as service from "./books.service.js";

const router = Router();

// Add Book
router.post("/", requireBody(), asyncHandler(async (req, res) =>
  successResponse(res, await service.insertBook(req.body), 201)));

// Add Books Batch
router.post("/batch", requireBody(true), asyncHandler(async (req, res) =>
  successResponse(res, await service.insertBooks(req.body), 201)));

// Find Book By Title
router.get("/title", requireQuery("title"), asyncHandler(async (req, res) => {
  const book = await service.findByTitle(req.query.title);
  if (!book) return res.status(404).json({ message: "Book not found" });
  successResponse(res, book);
}));

// Find Books By Year Range
router.get("/year", requireQuery("from", "to"), asyncHandler(async (req, res) =>
  successResponse(res, await service.findByYearRange(Number(req.query.from), Number(req.query.to)))));

// Find Books By Genre
router.get("/genre", requireQuery("genre"), asyncHandler(async (req, res) =>
  successResponse(res, await service.findByGenre(req.query.genre))));

// Skip & Limit
router.get("/skip-limit", asyncHandler(async (req, res) =>
  successResponse(res, await service.skipLimit())));

// Year Stored As Integer
router.get("/year-integer", asyncHandler(async (req, res) =>
  successResponse(res, await service.yearInteger())));

// Exclude Genres
router.get("/exclude-genres", asyncHandler(async (req, res) =>
  successResponse(res, await service.excludeGenres())));

// Delete Books Before Year
router.delete("/before-year", requireQuery("year"), asyncHandler(async (req, res) =>
  successResponse(res, await service.deleteBeforeYear(Number(req.query.year)))));

// Aggregate 1 - After 2000 Sorted Desc
router.get("/aggregate1", asyncHandler(async (req, res) =>
  successResponse(res, await service.aggregate1())));

// Aggregate 2 - Project Title Author Year
router.get("/aggregate2", asyncHandler(async (req, res) =>
  successResponse(res, await service.aggregate2())));

// Aggregate 3 - Unwind Genres
router.get("/aggregate3", asyncHandler(async (req, res) =>
  successResponse(res, await service.aggregate3())));

// Aggregate 4 - Join Logs With Books
router.get("/aggregate4", asyncHandler(async (req, res) =>
  successResponse(res, await service.aggregate4())));

// Update Book Year By Title (keep dynamic route last)
router.patch("/:title", asyncHandler(async (req, res) => {
  const year = req.body?.year !== undefined ? Number(req.body.year) : 2022;
  successResponse(res, await service.updateBookYear(req.params.title, year));
}));

export default router;
