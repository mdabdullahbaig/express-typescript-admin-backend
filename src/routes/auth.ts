import { Router } from "express";
import { authenticateUser, getCurrentUser } from "../controllers/auth";
import RequestValidator from "../middleware/RequestValidator";
import { authenticateLoginSchema } from "../utils/authSchema";
import { auth } from "../middleware/auth";

const router = Router();

router.post(
  "/login",
  RequestValidator(authenticateLoginSchema),
  authenticateUser
);

router.get("/current-user", auth, getCurrentUser);

export default router;
