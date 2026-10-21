import User from "./user.model.js";
import Post from "./post.model.js";
import Comment from "./comment.model.js";

// User 1 --- N Posts
User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "user" });

// Post 1 --- N Comments
Post.hasMany(Comment, { foreignKey: "postId", as: "comments", onDelete: "CASCADE" });
Comment.belongsTo(Post, { foreignKey: "postId", as: "post" });

// User 1 --- N Comments
User.hasMany(Comment, { foreignKey: "userId", as: "comments" });
Comment.belongsTo(User, { foreignKey: "userId", as: "user" });

export { User, Post, Comment };
