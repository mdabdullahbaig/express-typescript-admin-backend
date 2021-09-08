"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
        minlength: [3, "Must be at least 3 character, got {VALUE}"],
    },
    lastName: {
        type: String,
        required: true,
        minlength: [3, "Must be at least 3 character, got {VALUE}"],
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
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
