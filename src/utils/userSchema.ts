import { object, string, ref } from "yup";

export const createUserSchema = object({
  body: object({
    firstName: string().required("First name is required").trim(),
    lastName: string().required("Last name is required").trim(),
    email: string()
      .email("Must be a valid email")
      .required("Email is required")
      .trim(),
    mobileNumber: string()
      .required("Mobile number is required")
      .min(10, "Mobile number must be alteast 10 digit.")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Mobile number is not valid"
      ),
    password: string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum.")
      // .matches(/^[a-zA-Z0-9_.-@]*$/, "Password can only contain Latin letters.")
      .trim(),
    confirmPassword: string().oneOf(
      [ref("password"), null],
      "Passwords must match"
    ),
  }),
});
