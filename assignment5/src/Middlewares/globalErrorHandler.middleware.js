export const globalErrorHandler = (err, req, res, next) => {
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      message: "Validation error.",
      errors: err.errors.map((e) => e.message),
    });
  }

  if (err.name === "SequelizeBulkRecordError") {
    return res.status(400).json({
      message: "Validation error.",
      errors: err.errors?.errors?.map((e) => e.message) ?? [err.message],
    });
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({ message: "Email already exists." });
  }

  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res
      .status(400)
      .json({ message: "userId or postId does not reference an existing record." });
  }

  const status = err.status || 500;
  return res.status(status).json({ message: err.message || "Internal server error." });
};
