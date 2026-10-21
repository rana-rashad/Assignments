import { Post, User, Comment } from "../../DB/models/index.js";
import { sequelize } from "../../DB/connection.js";
import { asyncHandler } from "../../Common/utils/asyncHandler.js";

// 1) POST /posts  (new instance + save)
export const createPost = asyncHandler(async (req, res) => {
  const { title, content, userId } = req.body;

  const post = new Post({ title, content, userId });
  await post.save();

  return res.status(201).json({ message: "Post created successfully." });
});

// 2) DELETE /posts/:postId  (only owner) -> soft delete (paranoid)
export const deletePost = asyncHandler(async (req, res) => {
  const userId = req.body?.userId ?? req.query.userId;

  const post = await Post.findByPk(req.params.postId);
  if (!post) return res.status(404).json({ message: "Post not found." });

  if (post.userId !== Number(userId)) {
    return res.status(403).json({ message: "You are not authorized to delete this post." });
  }

  await post.destroy();
  return res.status(200).json({ message: "Post deleted." });
});

// 3) GET /posts/details
export const getPostsWithDetails = asyncHandler(async (req, res) => {
  const posts = await Post.findAll({
    attributes: ["id", "title"],
    include: [
      { model: User, as: "user", attributes: ["id", "name"] },
      { model: Comment, as: "comments", attributes: ["id", "content"] },
    ],
  });

  return res.status(200).json(posts);
});

// 4) GET /posts/comment-count
export const getPostsCommentCount = asyncHandler(async (req, res) => {
  const posts = await Post.findAll({
    attributes: [
      "id",
      "title",
      [sequelize.fn("COUNT", sequelize.col("comments.id")), "commentCount"],
    ],
    include: [{ model: Comment, as: "comments", attributes: [] }],
    group: ["Post.id"],
    raw: true,
  });

  return res
    .status(200)
    .json(posts.map((p) => ({ ...p, commentCount: Number(p.commentCount) })));
});
