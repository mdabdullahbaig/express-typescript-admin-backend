import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePostById,
  deletePostById,
} from "../controllers/posts";

const router = Router();

router.post("/", createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.patch("/:id", updatePostById);
router.delete("/:id", deletePostById);

export default router;
