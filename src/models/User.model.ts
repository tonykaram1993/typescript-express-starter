import { Schema, model } from "mongoose";

export type User = {
  email: string;
  passwordHash: string;
  salt: string;
  refreshToken?: string;
};

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  refreshToken: String,
});

export default model<User>("User", userSchema);
