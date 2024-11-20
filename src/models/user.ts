import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  thoughts: string[];
  friends: string[];
  friendCount: number;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, "Must be a valid email address"],
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toJSON: { virtuals: true },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

export default model<IUser>("User", userSchema);
