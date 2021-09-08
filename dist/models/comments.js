"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    body: { type: String, required: true },
    commentedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    postId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Post" },
}, { timestamps: true });
const Comment = (0, mongoose_1.model)("Comment", CommentSchema);
exports.default = Comment;
