import { Router } from "express";
import {
  createComment,
  getCommentsOnPost,
  updateCommentOnPost,
  deleteCommentOnPost,
} from "../controllers/comments";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/", auth, createComment);
router.get("/:postId", auth, getCommentsOnPost);
router.patch("/:id", auth, updateCommentOnPost);
router.delete("/:id", auth, deleteCommentOnPost);

export default router;
