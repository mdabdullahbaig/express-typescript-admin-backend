"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateLoginSchema = void 0;
const yup_1 = require("yup");
exports.authenticateLoginSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        email: (0, yup_1.string)()
            .email("Must be a valid email")
            .required("Email is required")
            .trim(),
        password: (0, yup_1.string)()
            .required("Password is required")
            .min(6, "Password is too short - should be 6 chars minimum.")
            //   .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters.")
            .trim(),
    }),
});
