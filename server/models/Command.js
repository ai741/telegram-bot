import mongoose from "mongoose";

const CommandSchema = new mongoose.Schema({
  command: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  timestamps: true,
});

export default mongoose.model("Command", CommandSchema);
