import { Schema, Model } from "mongoose";

const Role = new Schema({
  value: { type: String, unique: true, default: "USER" },
});

export default Model("Role", RoleSchema);
