"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const HttpError_1 = require("../utils/HttpError");
const isAdmin = (req, res, next) => {
    const currentUser = req.currentUser;
    console.log(currentUser);
    if (currentUser.isAdmin) {
        next();
    }
    else {
        const err = new HttpError_1.HttpError("You are unauthorized to access this route.", 403);
        return next(err);
    }
    // console.log(req.currentUser);
};
exports.isAdmin = isAdmin;
