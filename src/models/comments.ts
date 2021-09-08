import { Schema, Document, model } from "mongoose";

export interface CommentDocument extends Document {
  body: string;
  commentedBy: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema(
  {
    body: { type: String, required: true },
    commentedBy: { type: Schema.Types.ObjectId, ref: "User" },
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
  },
  { timestamps: true }
);

const Comment = model<CommentDocument>("Comment", CommentSchema);

export default Comment;
