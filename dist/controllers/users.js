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
exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const users_1 = __importDefault(require("../models/users"));
const HttpError_1 = require("../utils/HttpError");
// Create User
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const mobileNumber = req.body.mobileNumber;
    const password = req.body.password;
    let existingUser;
    try {
        existingUser = yield users_1.default.findOne({ email });
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err.message, 500);
        return next(error);
    }
    if (existingUser) {
        const error = new HttpError_1.HttpError("User exists already, please login instead.", 400);
        return next(error);
    }
    const createdUser = new users_1.default({
        firstName,
        lastName,
        email,
        mobileNumber,
        password,
    });
    try {
        yield createdUser.save();
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err.message, 500);
        return next(error);
    }
    res
        .status(201)
        .json({ message: "Your account has been created. Please login!!!" });
});
exports.createUser = createUser;
// Get All Users
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let users;
    try {
        users = yield users_1.default.find({});
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err.message, 500);
        return next(error);
    }
    if (users.length === 0) {
        const error = new HttpError_1.HttpError("There is no users present.", 400);
        return next(error);
    }
    res.status(200).json(users);
});
exports.getUsers = getUsers;
// Get User By Id
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let user;
    try {
        user = yield users_1.default.findById(id).exec();
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err.message, 500);
        return next(error);
    }
    if (!user) {
        const error = new HttpError_1.HttpError("There is no user present on this id.", 400);
        return next(error);
    }
    res.status(200).json(user);
});
exports.getUserById = getUserById;
// Update User By Id
const updateUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const mobileNumber = req.body.mobileNumber;
    let user;
    try {
        user = yield users_1.default.findById(id).exec();
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err.message, 500);
        return next(error);
    }
    if (!user) {
        const error = new HttpError_1.HttpError("There is no user present on this id.", 400);
        return next(error);
    }
    user.firstName = firstName;
    user.lastName = lastName;
    user.mobileNumber = mobileNumber;
    try {
        yield user.save();
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err.message, 500);
        return next(error);
    }
    res.status(200).json(user);
});
exports.updateUserById = updateUserById;
// Delete User By Id
const deleteUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let user;
    try {
        user = yield users_1.default.findById(id).exec();
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err.message, 500);
        return next(error);
    }
    if (!user) {
        const error = new HttpError_1.HttpError("There is no user present on this id.", 400);
        return next(error);
    }
    try {
        yield user.delete();
    }
    catch (err) {
        const error = new HttpError_1.HttpError(err.message, 500);
        return next(error);
    }
    res.status(200).json({ message: "User has been deleted!" });
});
exports.deleteUserById = deleteUserById;
