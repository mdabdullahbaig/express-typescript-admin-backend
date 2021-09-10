"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_1 = require("../controllers/posts");
const auth_1 = require("../middleware/auth");
const RequestValidator_1 = __importDefault(require("../middleware/RequestValidator"));
const postSchema_1 = require("../utils/postSchema");
const router = (0, express_1.Router)();
router.post("/", auth_1.auth, (0, RequestValidator_1.default)(postSchema_1.createPostSchema), posts_1.createPost);
router.get("/", auth_1.auth, posts_1.getPosts);
router.get("/:id", auth_1.auth, posts_1.getPostById);
router.patch("/:id", auth_1.auth, posts_1.updatePostById);
router.delete("/:id", auth_1.auth, posts_1.deletePostById);
// Get posts by Creator
router.get("/creator/:userId", auth_1.auth, posts_1.getPostsByCreator);
exports.default = router;
