import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/users";
import RequestValidator from "../middleware/RequestValidator";
import { createUserSchema } from "../utils/createUserSchema";

const router = Router();

router.post("/", RequestValidator(createUserSchema), createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.patch("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export default router;
