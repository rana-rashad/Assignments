import express from "express";
import { config } from "./Config/config.js";
import { connectDB } from "./DB/connection.db.js";
import collectionRouter from "./Modules/Collection/collection.controller.js";
import booksRouter from "./Modules/Books/books.controller.js";
import logsRouter from "./Modules/Logs/logs.controller.js";
import { notFound, errorHandler } from "./Middleware/error.middleware.js";

const app = express();
app.use(express.json());

app.use("/collection", collectionRouter);
app.use("/books", booksRouter);
app.use("/logs", logsRouter);

app.use(notFound);
app.use(errorHandler);

const bootstrap = async () => {
  await connectDB();
  app.listen(config.port, () =>
    console.log(` Server running on http://localhost:${config.port} [${config.env}]`));
};

bootstrap().catch((err) => {
  console.error(" Failed to start:", err);
  process.exit(1);
});
