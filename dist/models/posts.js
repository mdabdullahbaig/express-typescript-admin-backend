"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    imageUri: { type: String, default: true },
    creator: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Comment" }],
}, { timestamps: true });
const Post = (0, mongoose_1.model)("Post", PostSchema);
exports.default = Post;
