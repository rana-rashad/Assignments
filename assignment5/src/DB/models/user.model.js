import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import { roleEnum } from "../../Common/enums/user.enum.js";

// custom check used inside the beforeCreate hook
export const checkNameLength = (name) => {
  if (!name || name.trim().length <= 2) {
    const error = new Error("Name must be greater than 2 characters.");
    error.status = 400;
    throw error;
  }
};

// Users model -> created using sequelize.define()
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Invalid email format." }, // built-in validation
      },
    },
    password: {
      type: DataTypes.STRING,
      // nullable at DB level so PUT /users/:id (skip validation) works with the
      // example body, signup still requires it
      allowNull: true,
      validate: {
        // custom validation method
        checkPasswordLength(value) {
          if (value.length <= 6) {
            throw new Error("Password must be greater than 6 characters.");
          }
        },
      },
    },
    role: {
      type: DataTypes.ENUM(...Object.values(roleEnum)),
      defaultValue: roleEnum.user,
    },
  },
  {
    tableName: "users",
    timestamps: true, // createdAt + updatedAt
    hooks: {
      beforeCreate: (user) => {
        checkNameLength(user.name);
      },
    },
  }
);

export default User;
