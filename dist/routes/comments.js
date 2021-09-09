"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comments_1 = require("../controllers/comments");
const router = (0, express_1.Router)();
router.post("/", comments_1.createComment);
router.get("/:postId", comments_1.getCommentsOnPost);
router.patch("/:id", comments_1.updateCommentOnPost);
router.delete("/:id", comments_1.deleteCommentOnPost);
exports.default = router;
