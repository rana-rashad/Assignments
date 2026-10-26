import { Router } from "express";
import { asyncHandler } from "../../Common/asyncHandler.js";
import { successResponse } from "../../Common/response.js";
import { requireBody } from "../../Middleware/validation.middleware.js";
import * as service from "./collection.service.js";

const router = Router();

// Create Books Collection (explicit + validation)
router.post("/books", asyncHandler(async (req, res) =>
  successResponse(res, await service.createBooksCollection(), 201)));

// Create Books Title Index
router.post("/books/index", asyncHandler(async (req, res) =>
  successResponse(res, await service.createTitleIndex(), 201)));

// Create Logs Capped Collection
router.post("/logs/capped", asyncHandler(async (req, res) =>
  successResponse(res, await service.createLogsCapped(), 201)));

// Create Authors Collection (implicit)
router.post("/authors", requireBody(), asyncHandler(async (req, res) =>
  successResponse(res, await service.createAuthorsImplicit(req.body), 201)));

export default router;
