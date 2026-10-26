// Ensures required query params exist
export const requireQuery = (...params) => (req, res, next) => {
  const missing = params.filter((p) => req.query[p] === undefined || req.query[p] === "");
  if (missing.length)
    return res.status(400).json({ message: `Missing query param(s): ${missing.join(", ")}` });
  next();
};

// Ensures body is a non-empty object (or non-empty array when isArray = true)
export const requireBody = (isArray = false) => (req, res, next) => {
  const b = req.body;
  const ok = isArray
    ? Array.isArray(b) && b.length > 0
    : b && typeof b === "object" && !Array.isArray(b) && Object.keys(b).length > 0;
  if (!ok)
    return res.status(400).json({
      message: isArray ? "Body must be a non-empty array" : "Body must be a non-empty object",
    });
  next();
};
