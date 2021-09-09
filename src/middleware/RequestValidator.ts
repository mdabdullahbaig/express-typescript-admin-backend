import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/HttpError";

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (err: any) {
      const error = new HttpError(err.message, 500);
      return next(error);
    }
  };

export default validate;
