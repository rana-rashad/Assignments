import { Op } from "sequelize";
import { Comment, User, Post } from "../../DB/models/index.js";
import { asyncHandler } from "../../Common/utils/asyncHandler.js";

// 1) POST /comments  (bulk create)
export const createBulkComments = asyncHandler(async (req, res) => {
  const { comments } = req.body;

  if (!Array.isArray(comments) || comments.length === 0) {
    return res.status(400).json({ message: "comments must be a non-empty array." });
  }

  await Comment.bulkCreate(comments, { validate: true });
  return res.status(201).json({ message: "comments created." });
});

// 2) PATCH /comments/:commentId  (only owner)
export const updateComment = asyncHandler(async (req, res) => {
  const { userId, content } = req.body;

  const comment = await Comment.findByPk(req.params.commentId);
  if (!comment) return res.status(404).json({ message: "comment not found." });

  if (comment.userId !== Number(userId)) {
    return res.status(403).json({ message: "You are not authorized to update this comment." });
  }

  await comment.update({ content });
  return res.status(200).json({ message: "Comment updated." });
});

// 3) POST /comments/find-or-create
export const findOrCreateComment = asyncHandler(async (req, res) => {
  const { postId, userId, content } = req.body;

  const [comment, created] = await Comment.findOrCreate({
    where: { postId, userId, content },
  });

  return res.status(created ? 201 : 200).json({ comment, created });
});

// 4) GET /comments/search?word=the  (findAndCountAll)
export const searchComments = asyncHandler(async (req, res) => {
  const { word } = req.query;
  if (!word) return res.status(400).json({ message: "word query param is required." });

  const { count, rows } = await Comment.findAndCountAll({
    where: { content: { [Op.like]: `%${word}%` } },
  });

  if (count === 0) return res.status(404).json({ message: "no comments found." });
  return res.status(200).json({ count, comments: rows });
});

// 5) GET /comments/newest/:postId  (3 most recent)
export const getNewestComments = asyncHandler(async (req, res) => {
  const comments = await Comment.findAll({
    where: { postId: req.params.postId },
    attributes: ["id", "content", "createdAt"],
    order: [["createdAt", "DESC"]],
    limit: 3,
  });

  return res.status(200).json(comments);
});

// 6) GET /comments/details/:id
export const getCommentDetails = asyncHandler(async (req, res) => {
  const comment = await Comment.findByPk(req.params.id, {
    attributes: ["id", "content"],
    include: [
      { model: User, as: "user", attributes: ["id", "name", "email"] },
      { model: Post, as: "post", attributes: ["id", "title", "content"] },
    ],
  });

  if (!comment) return res.status(404).json({ message: "no comment found" });
  return res.status(200).json(comment);
});
