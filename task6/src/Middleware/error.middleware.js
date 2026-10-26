export const notFound = (req, res) =>
  res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found` });

export const errorHandler = (err, req, res, next) => {
  // 48 = NamespaceExists, 121 = Document failed validation
  let status = err.status || 500;
  if (err.code === 48) status = 409;
  if (err.code === 121) status = 400;
  res.status(status).json({ message: err.message, code: err.code });
};
