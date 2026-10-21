import express from "express";
import { PORT } from "./config/config.service.js";
import { connectDB } from "./DB/connection.js";
import "./DB/models/index.js"; // load models + associations before sync
import userRouter from "./Modules/users/user.controller.js";
import postRouter from "./Modules/posts/post.controller.js";
import commentRouter from "./Modules/comments/comment.controller.js";
import { globalErrorHandler } from "./Middlewares/globalErrorHandler.middleware.js";

const app = express();

app.use(express.json());

await connectDB();

// the assignment uses both /users/... and /user/... so both are mounted
app.use(["/users", "/user"], userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use((req, res) => res.status(404).json({ message: "Route not found." }));
app.use(globalErrorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
