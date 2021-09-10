import { Router } from "express";
import { authenticateUser, getCurrentUser } from "../controllers/auth";
import RequestValidator from "../middleware/RequestValidator";
import { authenticateUserSchema } from "../utils/authenticateUserSchema";
import { auth } from "../middleware/auth";

const router = Router();

router.post(
  "/login",
  RequestValidator(authenticateUserSchema),
  authenticateUser
);

router.get("/current-user", auth, getCurrentUser);

export default router;
