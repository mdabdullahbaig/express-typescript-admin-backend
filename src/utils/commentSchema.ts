import { object, string } from "yup";

export const createCommentSchema = object({
  body: object({
    body: string().required("Body is required").trim(),
    postId: string().required("Post id is required").trim(),
  }),
});
