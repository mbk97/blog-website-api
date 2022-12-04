import { IBlog } from "../interfaces/interface";
import { model, Schema } from "mongoose";

const blogSchema = new Schema<IBlog>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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

export default model<IBlog>("Blog", blogSchema);
