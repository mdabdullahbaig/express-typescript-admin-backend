import { RequestHandler } from "express";
import Post from "../models/posts";
import { HttpError } from "../utils/HttpError";

// Create Post
export const createPost: RequestHandler = async (req, res, next) => {
  const title = (req.body as { title: string }).title;
  const body = (req.body as { body: string }).body;

  const createdPost = new Post({
    title,
    body,
  });
  try {
    await createdPost.save();
  } catch (err: any) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  res.status(201).json(createdPost);
};

// Get All Posts
export const getPosts: RequestHandler = async (req, res, next) => {
  let posts;

  try {
    posts = await Post.find({});
  } catch (err: any) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  if (posts.length === 0) {
    const error = new HttpError("There is no posts present.", 500);
    return next(error);
  }

  res.status(200).json(posts);
};

// Get Post By Id
export const getPostById: RequestHandler = async (req, res, next) => {
  const id = req.params.id;

  let post;
  try {
    post = await Post.findById(id).exec();
  } catch (err: any) {
    const error = new HttpError(err, 500);
    next(error);
  }

  if (!post) {
    const error = new HttpError("There is no post present on this id.", 500);
    return next(error);
  }

  res.status(200).json(post);
};

// Update Post By Id
export const updatePostById: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const title = (req.body as { title: string }).title;
  const body = (req.body as { body: string }).body;

  let post;
  try {
    post = await Post.findById(id).exec();
  } catch (err: any) {
    const error = new HttpError(err, 500);
    next(error);
  }

  if (!post) {
    const error = new HttpError("There is no post present on this id.", 500);
    return next(error);
  }

  post.title = title;
  post.body = body;

  try {
    await post.save();
  } catch (err: any) {
    const error = new HttpError(err, 500);
    next(error);
  }

  res.status(200).json(post);
};

// Delete Post By Id
export const deletePostById: RequestHandler = async (req, res, next) => {
  const id = req.params.id;

  let post;
  try {
    post = await Post.findById(id).exec();
  } catch (err: any) {
    const error = new HttpError(err, 500);
    next(error);
  }

  if (!post) {
    const error = new HttpError("There is no post present on this id.", 500);
    return next(error);
  }

  try {
    await post.delete();
  } catch (err: any) {
    const error = new HttpError(err, 500);
    next(error);
  }

  res.status(200).json({ message: "Post has been deleted!" });
};
