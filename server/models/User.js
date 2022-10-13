import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  roles: { type: String, ref: "Role" },
  imageUrl: { type: String },
});

export default model("User", UserSchema);
