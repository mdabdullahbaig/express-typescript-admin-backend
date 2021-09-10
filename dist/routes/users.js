"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const auth_1 = require("../middleware/auth");
const isAdmin_1 = require("../middleware/isAdmin");
const RequestValidator_1 = __importDefault(require("../middleware/RequestValidator"));
const userSchema_1 = require("../utils/userSchema");
const router = (0, express_1.Router)();
router.post("/", (0, RequestValidator_1.default)(userSchema_1.createUserSchema), users_1.createUser);
router.get("/", auth_1.auth, isAdmin_1.isAdmin, users_1.getUsers);
// router.get("/current-user", auth, getUserById);
router.patch("/", auth_1.auth, users_1.updateUserById);
router.delete("/:id", auth_1.auth, isAdmin_1.isAdmin, users_1.deleteUserById);
exports.default = router;
