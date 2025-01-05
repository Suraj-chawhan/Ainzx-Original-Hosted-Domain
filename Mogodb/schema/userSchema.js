// import mongoose from "mongoose";
// import bcrypt from "bcrypt";

// const rolesEnum = ["user", "admin"];

// const user = new mongoose.Schema({
//   name: { type: String },
//   lastName: { type: String },
//   email: { type: String },
//   password: { type: String },
// });

// user.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// const User = mongoose.models.User || mongoose.model("User", user);
// export default User;

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const user = new mongoose.Schema({
  name: { type: String },
  type: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  subscription: {
    plan: { type: String, default: "free" },
    expiresAt: { type: Date },
  },
});

// Hash password before saving
user.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.models.User || mongoose.model("User", user);
export default User;
