"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comments_1 = require("../controllers/comments");
const auth_1 = require("../middleware/auth");
const RequestValidator_1 = __importDefault(require("../middleware/RequestValidator"));
const commentSchema_1 = require("../utils/commentSchema");
const router = (0, express_1.Router)();
router.post("/", auth_1.auth, (0, RequestValidator_1.default)(commentSchema_1.createCommentSchema), comments_1.createComment);
router.get("/:postId", auth_1.auth, comments_1.getCommentsOnPost);
router.patch("/:id", auth_1.auth, comments_1.updateCommentOnPost);
router.delete("/:id", auth_1.auth, comments_1.deleteCommentOnPost);
exports.default = router;
