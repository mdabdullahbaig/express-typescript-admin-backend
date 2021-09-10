import { RequestHandler } from "express";
import Post from "../models/posts";
import { HttpError } from "../utils/HttpError";

interface CurrentUser {
  _id: string;
}

// Create Post
export const createPost: RequestHandler = async (req, res, next) => {
  const currentUser = req.currentUser as CurrentUser;
  const creator = currentUser._id;
  const title = (req.body as { title: string }).title;
  const body = (req.body as { body: string }).body;
  const imageUri = (req.body as { imageUri: string }).imageUri;

  let createdPost;

  try {
    createdPost = await new Post({
      title,
      body,
      imageUri,
      creator,
    }).save();
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
    const error = new HttpError("There is no posts present.", 400);
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
    return next(error);
  }

  if (!post) {
    const error = new HttpError("There is no post present on this id.", 400);
    return next(error);
  }

  res.status(200).json(post);
};

// Update Post By Id
export const updatePostById: RequestHandler = async (req, res, next) => {
  const currentUser = req.currentUser as CurrentUser;

  const id = req.params.id;
  const title = (req.body as { title: string }).title;
  const body = (req.body as { body: string }).body;
  const imageUri = (req.body as { imageUri: string }).imageUri;

  let post;
  try {
    post = await Post.findOne({ _id: id, creator: currentUser._id });
  } catch (err: any) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  if (!post) {
    const error = new HttpError("There is no post present on this id.", 400);
    return next(error);
  }

  post.title = title;
  post.body = body;
  post.imageUri = imageUri;

  try {
    await post.save();
  } catch (err: any) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  res.status(200).json(post);
};

// Delete Post By Id
export const deletePostById: RequestHandler = async (req, res, next) => {
  const currentUser = req.currentUser as CurrentUser;
  const id = req.params.id;

  let post;
  try {
    post = await Post.findOne({ _id: id, creator: currentUser._id });
  } catch (err: any) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  if (!post) {
    const error = new HttpError("There is no post present on this id.", 400);
    return next(error);
  }

  try {
    await post.delete();
  } catch (err: any) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  res.status(200).json({ message: "Post has been deleted!" });
};

// Get posts by Creator
export const getPostsByCreator: RequestHandler = async (req, res, next) => {
  const userId = req.params.userId;
  let postsByCreator;

  try {
    postsByCreator = await Post.find({ creator: userId }).populate("creator");
  } catch (err: any) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  if (postsByCreator.length === 0) {
    const error = new HttpError(
      "There is no posts present by this creator.",
      400
    );
    return next(error);
  }

  res.status(200).json(postsByCreator);
};
