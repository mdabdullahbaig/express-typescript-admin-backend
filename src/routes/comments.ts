import { Router } from "express";
import {
  createComment,
  getCommentsOnPost,
  updateCommentOnPost,
  deleteCommentOnPost,
} from "../controllers/comments";

const router = Router();

router.post("/", createComment);
router.get("/:postId", getCommentsOnPost);
router.patch("/:id", updateCommentOnPost);
router.delete("/:id", deleteCommentOnPost);

export default router;
