import { Router } from "express";
import {
  createPost,
  deletePost,
  getPostsWithDetails,
  getPostsCommentCount,
} from "./post.service.js";

const router = Router();

router.post("/", createPost);
router.get("/details", getPostsWithDetails);
router.get("/comment-count", getPostsCommentCount);
router.delete("/:postId", deletePost);

export default router;
