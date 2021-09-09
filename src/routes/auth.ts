import { Router } from "express";
import { authenticateUser } from "../controllers/auth";
import RequestValidator from "../middleware/RequestValidator";
import { authenticateUserSchema } from "../utils/authenticateUserSchema";

const router = Router();

router.post("/", RequestValidator(authenticateUserSchema), authenticateUser);

export default router;
