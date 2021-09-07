import mongoose from "mongoose";

export interface PostDocument extends mongoose.Document {
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, default: true },
    body: { type: String, default: true },
  },
  { timestamps: true }
);

const Post = mongoose.model<PostDocument>("Post", PostSchema);

export default Post;
