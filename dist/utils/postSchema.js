"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostSchema = void 0;
const yup_1 = require("yup");
exports.createPostSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        title: (0, yup_1.string)().required("Title is required").trim(),
        body: (0, yup_1.string)().required("Body is required").trim(),
        imageUri: (0, yup_1.string)().required("Image Uri is required").trim(),
    }),
});
