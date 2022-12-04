import { IUser } from "../interfaces/interface";
import { Schema, model } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: {
      data: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", userSchema);
