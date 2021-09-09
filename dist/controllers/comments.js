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
exports.deleteCommentOnPost = exports.updateCommentOnPost = exports.getCommentsOnPost = exports.createComment = void 0;
const HttpError_1 = require("../utils/HttpError");
const comments_1 = __importDefault(require("../models/comments"));
const posts_1 = __importDefault(require("../models/posts"));
const createComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body.body;
    const commentedBy = req.body.commentedBy;
    const postId = req.body.postId;
    let createdComment;
    try {
        createdComment = yield new comments_1.default({
            body,
            commentedBy,
            postId,
        }).save();
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err, 500);
        return next(error);
    }
    try {
        yield posts_1.default.findByIdAndUpdate(postId, {
            $push: { comments: createdComment._id },
        });
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err.message, 500);
        return next(error);
    }
    res.status(201).json(createdComment);
});
exports.createComment = createComment;
const getCommentsOnPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    let comments;
    try {
        comments = yield comments_1.default.find({ postId }).populate("commentedBy");
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err, 500);
        return next(error);
    }
    if (comments.length === 0) {
        const error = new HttpError_1.HttpError("There is no comment present on this id.", 400);
        return next(error);
    }
    res.status(200).json(comments);
});
exports.getCommentsOnPost = getCommentsOnPost;
const updateCommentOnPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = req.body.body;
    let comment;
    try {
        comment = yield comments_1.default.findById(id).exec();
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err.message, 500);
        return next(error);
    }
    if (!comment) {
        const error = new HttpError_1.HttpError("There is no comment present on this id.", 400);
        return next(error);
    }
    comment.body = body;
    try {
        yield comment.save();
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err.message, 500);
        return next(error);
    }
    res.status(200).json(comment);
});
exports.updateCommentOnPost = updateCommentOnPost;
const deleteCommentOnPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let comment;
    try {
        comment = yield comments_1.default.findById(id).exec();
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err.message, 500);
        return next(error);
    }
    if (!comment) {
        const error = new HttpError_1.HttpError("There is no comment present on this id.", 400);
        return next(error);
    }
    try {
        yield posts_1.default.findByIdAndUpdate(comment.postId, { $pull: { comments: id } });
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err.message, 500);
        return next(error);
    }
    try {
        yield comment.delete();
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err, 500);
        return next(error);
    }
    res.status(200).json({ message: "Comment has been deleted!" });
});
exports.deleteCommentOnPost = deleteCommentOnPost;
