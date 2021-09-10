"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_1 = require("../controllers/posts");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/", auth_1.auth, posts_1.createPost);
router.get("/", auth_1.auth, posts_1.getPosts);
router.get("/:id", auth_1.auth, posts_1.getPostById);
router.patch("/:id", auth_1.auth, posts_1.updatePostById);
router.delete("/:id", auth_1.auth, posts_1.deletePostById);
// Get posts by Creator
router.get("/creator/:userId", auth_1.auth, posts_1.getPostsByCreator);
exports.default = router;
