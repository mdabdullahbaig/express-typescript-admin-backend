"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const RequestValidator_1 = __importDefault(require("../middleware/RequestValidator"));
const createUserSchema_1 = require("../utils/createUserSchema");
const router = (0, express_1.Router)();
router.post("/", (0, RequestValidator_1.default)(createUserSchema_1.createUserSchema), users_1.createUser);
router.get("/", users_1.getUsers);
router.get("/:id", users_1.getUserById);
router.patch("/:id", users_1.updateUserById);
router.delete("/:id", users_1.deleteUserById);
exports.default = router;
