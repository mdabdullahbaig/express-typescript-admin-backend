import { Router } from "express";
import {
  createUser,
  getUsers,
  // getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/users";
import { auth } from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";

import RequestValidator from "../middleware/RequestValidator";
import { createUserSchema } from "../utils/createUserSchema";

const router = Router();

router.post("/", RequestValidator(createUserSchema), createUser);
router.get("/", auth, isAdmin, getUsers);
// router.get("/current-user", auth, getUserById);
router.patch("/", auth, updateUserById);
router.delete("/:id", auth, isAdmin, deleteUserById);

export default router;
