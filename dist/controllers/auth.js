"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const users_1 = __importDefault(require("../models/users"));
const HttpError_1 = require("../utils/HttpError");
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    let existingUser;
    try {
        existingUser = yield users_1.default.findOne({ email });
    }
    catch (err) {
        const error = new HttpError_1.HttpError("Login is failed, please try again later.", 500);
        return next(error);
    }
    if (!existingUser) {
        const error = new HttpError_1.HttpError("Invalid creadentials, could not log you in.", 401);
        return next(error);
    }
    let isValidPassword = false;
    try {
        isValidPassword = yield existingUser.comparePassword(password);
    }
    catch (err) {
        const error = new HttpError_1.HttpError("Login is failed, please try again later.", 500);
        return next(error);
    }
    if (!isValidPassword) {
        const error = new HttpError_1.HttpError("Invalid creadentials, could not log you in.", 401);
        return next(error);
    }
    const token = existingUser.generateAuthToken();
    return res.status(201).json({ token });
});
exports.authenticateUser = authenticateUser;
