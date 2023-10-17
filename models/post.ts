import mongoose, { Schema, Types } from "mongoose";

export interface IPost {
  content: string;
  title: string;
  author: Types.ObjectId;
}

const postSchema = new mongoose.Schema<IPost>(
  {
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
