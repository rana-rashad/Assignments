import { Router } from "express";
import {
  signup,
  createOrUpdateUser,
  getUserByEmail,
  getUserById,
} from "./user.service.js";

const router = Router();

router.post("/signup", signup);
router.get("/by-email", getUserByEmail); // must be before "/:id"
router.put("/:id", createOrUpdateUser);
router.get("/:id", getUserById);

export default router;
