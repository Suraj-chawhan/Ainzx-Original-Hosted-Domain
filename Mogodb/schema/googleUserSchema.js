import mongoose from "mongoose";

const googleUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,

      trim: true,
    },
    email: {
      type: String,

      unique: true,
      trim: true,
      lowercase: true,
    },
    type: { type: String },

    subscription: {
      plan: { type: String, default: "free" },
      expiresAt: { type: Date },
    },
  },
  { timestamps: true }
);

const GoogleUser =
  mongoose.models.GoogleUser || mongoose.model("GoogleUser", googleUserSchema);

export default GoogleUser;
