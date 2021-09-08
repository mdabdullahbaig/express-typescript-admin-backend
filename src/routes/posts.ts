import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePostById,
  deletePostById,
  getPostsByCreator,
} from "../controllers/posts";

const router = Router();

router.post("/", createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.patch("/:id", updatePostById);
router.delete("/:id", deletePostById);

// Get posts by Creator
router.get("/creator/:userId", getPostsByCreator);

export default router;
