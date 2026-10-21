import { User } from "../../DB/models/index.js";
import { asyncHandler } from "../../Common/utils/asyncHandler.js";

// 1) POST /users/signup  (build + save)
export const signup = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "name, email and password are required." });
  }

  const emailExists = await User.findOne({ where: { email } });
  if (emailExists) {
    return res.status(409).json({ message: "Email already exists." });
  }

  const user = User.build({ name, email, password, role });
  await user.save(); // validation errors are handled by the global error handler

  return res.status(201).json({ message: "User added successfully." });
});

// 2) PUT /users/:id  (upsert + skip validation)
export const createOrUpdateUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const values = { id: Number(req.params.id), name, email, password, role };
  Object.keys(values).forEach((k) => values[k] === undefined && delete values[k]);

  await User.upsert(values, { validate: false });

  return res.status(200).json({ message: "User created or updated successfully" });
});

// 3) GET /users/by-email?email=user1@gmail.com
export const getUserByEmail = asyncHandler(async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ message: "email query param is required." });

  const user = await User.findOne({
    where: { email },
    attributes: { exclude: ["password"] },
  });

  if (!user) return res.status(404).json({ message: "no user found" });
  return res.status(200).json({ user });
});

// 4) GET /user/:id  (exclude role)
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["role", "password"] },
  });

  if (!user) return res.status(404).json({ message: "no user found" });
  return res.status(200).json(user);
});
