import { RequestHandler } from "express";
import { HttpError } from "../utils/HttpError";
import Comment from "../models/comments";
import Post from "../models/posts";

export const createComment: RequestHandler = async (req, res, next) => {
  const body = (req.body as { body: string }).body;
  const commentedBy = (req.body as { commentedBy: string }).commentedBy;
  const postId = (req.body as { postId: string }).postId;

  const createdComment = new Comment({
    body,
    commentedBy,
    postId,
  });

  try {
    await createdComment.save();
  } catch (err: any) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  try {
    Post.findByIdAndUpdate(postId, { $push: { comments: createdComment._id } });
  } catch (err: any) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  res.status(201).json(createdComment);
};

export const getCommentsOnPost: RequestHandler = async (req, res, next) => {
  const postId = (req.body as { postId: string }).postId;
  let post;
  try {
    post = await Post.findById(postId).populate("comments");
  } catch (err: any) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  if (!post) {
    const error = new HttpError("There is no post present on this id.", 400);
    return next(error);
  }

  res.status(200).json(post.comments);
};

export const updateCommentOnPost: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const body = (req.body as { body: string }).body;

  let comment;
  try {
    comment = await Comment.findById(id).exec();
  } catch (err: any) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  if (!comment) {
    const error = new HttpError("There is no comment present on this id.", 400);
    return next(error);
  }

  comment.body = body;

  try {
    await comment.save();
  } catch (err: any) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  res.status(200).json(comment);
};

export const deleteCommentOnPost: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const postId = req.body.postId;

  let comment;
  try {
    comment = await Comment.findById(id).exec();
  } catch (err: any) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  if (!comment) {
    const error = new HttpError("There is no comment present on this id.", 400);
    return next(error);
  }

  try {
    Post.findByIdAndUpdate(postId, { $pull: { comments: id } });
  } catch (err: any) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  try {
    await comment.delete();
  } catch (err: any) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  res.status(200).json({ message: "Comment has been deleted!" });
};
