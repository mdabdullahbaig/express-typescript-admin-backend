"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsByCreator = exports.deletePostById = exports.updatePostById = exports.getPostById = exports.getPosts = exports.createPost = void 0;
const posts_1 = __importDefault(require("../models/posts"));
const HttpError_1 = require("../utils/HttpError");
// Create Post
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = req.currentUser;
    const title = req.body.title;
    const body = req.body.body;
    const imageUri = req.body.imageUri;
    const creator = currentUser._id;
    let createdPost;
    try {
        createdPost = yield new posts_1.default({
            title,
            body,
            imageUri,
            creator,
        }).save();
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err, 500);
        return next(error);
    }
    res.status(201).json(createdPost);
});
exports.createPost = createPost;
// Get All Posts
const getPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let posts;
    try {
        posts = yield posts_1.default.find({});
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err, 500);
        return next(error);
    }
    if (posts.length === 0) {
        const error = new HttpError_1.HttpError("There is no posts present.", 400);
        return next(error);
    }
    res.status(200).json(posts);
});
exports.getPosts = getPosts;
// Get Post By Id
const getPostById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let post;
    try {
        post = yield posts_1.default.findById(id).exec();
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err, 500);
        return next(error);
    }
    if (!post) {
        const error = new HttpError_1.HttpError("There is no post present on this id.", 400);
        return next(error);
    }
    res.status(200).json(post);
});
exports.getPostById = getPostById;
// Update Post By Id
const updatePostById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = req.currentUser;
    const id = req.params.id;
    const title = req.body.title;
    const body = req.body.body;
    const imageUri = req.body.imageUri;
    let post;
    try {
        post = yield posts_1.default.findOne({ _id: id, creator: currentUser._id });
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err.message, 500);
        return next(error);
    }
    if (!post) {
        const error = new HttpError_1.HttpError("There is no post present on this id.", 400);
        return next(error);
    }
    post.title = title;
    post.body = body;
    post.imageUri = imageUri;
    try {
        yield post.save();
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err.message, 500);
        return next(error);
    }
    res.status(200).json(post);
});
exports.updatePostById = updatePostById;
// Delete Post By Id
const deletePostById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = req.currentUser;
    const id = req.params.id;
    let post;
    try {
        post = yield posts_1.default.findOne({ _id: id, creator: currentUser._id });
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err.message, 500);
        return next(error);
    }
    if (!post) {
        const error = new HttpError_1.HttpError("There is no post present on this id.", 400);
        return next(error);
    }
    try {
        yield post.delete();
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err, 500);
        return next(error);
    }
    res.status(200).json({ message: "Post has been deleted!" });
});
exports.deletePostById = deletePostById;
// Get posts by Creator
const getPostsByCreator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    let postsByCreator;
    try {
        postsByCreator = yield posts_1.default.find({ creator: userId }).populate("creator");
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err.message, 500);
        return next(error);
    }
    if (postsByCreator.length === 0) {
        const error = new HttpError_1.HttpError("There is no posts present by this creator.", 400);
        return next(error);
    }
    res.status(200).json(postsByCreator);
});
exports.getPostsByCreator = getPostsByCreator;
