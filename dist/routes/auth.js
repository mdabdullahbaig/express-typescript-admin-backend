"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const RequestValidator_1 = __importDefault(require("../middleware/RequestValidator"));
const authenticateUserSchema_1 = require("../utils/authenticateUserSchema");
const auth_2 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/login", (0, RequestValidator_1.default)(authenticateUserSchema_1.authenticateUserSchema), auth_1.authenticateUser);
router.get("/current-user", auth_2.auth, auth_1.getCurrentUser);
exports.default = router;
