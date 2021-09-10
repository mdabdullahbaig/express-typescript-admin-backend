"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const yup_1 = require("yup");
exports.createUserSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        firstName: (0, yup_1.string)().required("First name is required").trim(),
        lastName: (0, yup_1.string)().required("Last name is required").trim(),
        email: (0, yup_1.string)()
            .email("Must be a valid email")
            .required("Email is required")
            .trim(),
        mobileNumber: (0, yup_1.string)()
            .required("Mobile number is required")
            .min(10, "Mobile number must be alteast 10 digit.")
            .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "Mobile number is not valid"),
        password: (0, yup_1.string)()
            .required("Password is required")
            .min(6, "Password is too short - should be 6 chars minimum.")
            // .matches(/^[a-zA-Z0-9_.-@]*$/, "Password can only contain Latin letters.")
            .trim(),
        confirmPassword: (0, yup_1.string)().oneOf([(0, yup_1.ref)("password"), null], "Passwords must match"),
    }),
});
