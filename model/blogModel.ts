import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title field"],
    },
    description: {
      type: String,
      required: [true, "Please add a description field"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", blogSchema);
