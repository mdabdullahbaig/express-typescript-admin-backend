"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const RequestValidator_1 = __importDefault(require("../middleware/RequestValidator"));
const authenticateUserSchema_1 = require("../utils/authenticateUserSchema");
const router = (0, express_1.Router)();
router.post("/", (0, RequestValidator_1.default)(authenticateUserSchema_1.authenticateUserSchema), auth_1.authenticateUser);
exports.default = router;
