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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dev_1 = __importDefault(require("../config/dev"));
const HttpError_1 = require("../utils/HttpError");
const users_1 = __importDefault(require("../models/users"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        // console.log(token);
        if (!token) {
            const error = new HttpError_1.HttpError("Token is not there, Authentication failed!", 401);
            return next(error);
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, dev_1.default.privateKey);
        // console.log(decodedToken);
        const decodedUser = yield users_1.default.findById(decodedToken.userId, "-password");
        // console.log(decodedUser);
        if (!decodedUser) {
            const error = new HttpError_1.HttpError("Decoded user is not there, Authentication failed!!", 401);
            return next(error);
        }
        req.currentUser = decodedUser;
        // console.log(req.currentUser);
        next();
    }
    catch (err) {
        const error = new HttpError_1.HttpError("Authentication failed!", 401);
        return next(error);
    }
});
exports.auth = auth;
