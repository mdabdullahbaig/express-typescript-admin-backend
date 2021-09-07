"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    title: { type: String, default: true },
    body: { type: String, default: true },
}, { timestamps: true });
const Post = mongoose_1.default.model("Post", PostSchema);
exports.default = Post;
