"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_1 = require("../controllers/posts");
const router = (0, express_1.Router)();
router.post("/", posts_1.createPost);
router.get("/", posts_1.getPosts);
router.get("/:id", posts_1.getPostById);
router.patch("/:id", posts_1.updatePostById);
router.delete("/:id", posts_1.deletePostById);
// Get posts by Creator
router.get("/creator/:userId", posts_1.getPostsByCreator);
exports.default = router;
