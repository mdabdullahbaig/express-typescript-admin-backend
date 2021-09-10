"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentSchema = void 0;
const yup_1 = require("yup");
exports.createCommentSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        body: (0, yup_1.string)().required("Body is required").trim(),
        postId: (0, yup_1.string)().required("Post id is required").trim(),
    }),
});
