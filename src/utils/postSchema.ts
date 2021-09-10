import { object, string } from "yup";

export const createPostSchema = object({
  body: object({
    title: string().required("Title is required").trim(),
    body: string().required("Body is required").trim(),
    imageUri: string().required("Image Uri is required").trim(),
  }),
});
