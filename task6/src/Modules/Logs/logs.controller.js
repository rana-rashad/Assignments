import { Router } from "express";
import { asyncHandler } from "../../Common/asyncHandler.js";
import { successResponse } from "../../Common/response.js";
import { requireBody } from "../../Middleware/validation.middleware.js";
import * as service from "./logs.service.js";

const router = Router();

// Add Log
router.post("/", requireBody(), asyncHandler(async (req, res) =>
  successResponse(res, await service.insertLog(req.body), 201)));

export default router;
