import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePostById,
  deletePostById,
  getPostsByCreator,
} from "../controllers/posts";
import { auth } from "../middleware/auth";
import RequestValidator from "../middleware/RequestValidator";
import { createPostSchema } from "../utils/postSchema";

const router = Router();

router.post("/", auth, RequestValidator(createPostSchema), createPost);
router.get("/", auth, getPosts);
router.get("/:id", auth, getPostById);
router.patch("/:id", auth, updatePostById);
router.delete("/:id", auth, deletePostById);

// Get posts by Creator
router.get("/creator/:userId", auth, getPostsByCreator);

export default router;
