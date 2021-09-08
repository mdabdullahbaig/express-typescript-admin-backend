import mongoose, { Schema, model } from "mongoose";

export interface PostDocument extends mongoose.Document {
  title: string;
  body: string;
  imageUri: string;
  creator: string;
  comments: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    imageUri: { type: String, default: true },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Post = model<PostDocument>("Post", PostSchema);

export default Post;
