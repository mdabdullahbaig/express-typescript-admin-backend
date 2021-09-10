import { Router } from "express";
import {
  createComment,
  getCommentsOnPost,
  updateCommentOnPost,
  deleteCommentOnPost,
} from "../controllers/comments";
import { auth } from "../middleware/auth";
import RequestValidator from "../middleware/RequestValidator";
import { createCommentSchema } from "../utils/commentSchema";

const router = Router();

router.post("/", auth, RequestValidator(createCommentSchema), createComment);
router.get("/:postId", auth, getCommentsOnPost);
router.patch("/:id", auth, updateCommentOnPost);
router.delete("/:id", auth, deleteCommentOnPost);

export default router;
