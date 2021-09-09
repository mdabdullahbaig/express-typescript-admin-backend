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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dev_1 = __importDefault(require("../config/dev"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema = new mongoose_1.Schema({
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobileNumber: {
        type: String,
        required: true,
        minlength: [10, "Must be at least 10 character, got {VALUE}"],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Must be at least 6 character, got {VALUE}"],
    },
}, { timestamps: true });
UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.isAdmin;
    return user;
};
UserSchema.methods.comparePassword = function (userPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        return bcrypt_1.default.compare(userPassword, user.password).catch((err) => false);
    });
};
UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, dev_1.default.privateKey, {
        expiresIn: dev_1.default.expiresIn,
    });
    return token;
};
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified("password")) {
            const salt = yield bcrypt_1.default.genSalt(dev_1.default.hashSaltRound);
            user.password = yield bcrypt_1.default.hash(user.password, salt);
        }
        next();
    });
});
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
