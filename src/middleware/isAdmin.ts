import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/HttpError";

interface CurrentUser {
  isAdmin: boolean;
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const currentUser = req.currentUser as CurrentUser;
  console.log(currentUser);

  if (currentUser.isAdmin) {
    next();
  } else {
    const err = new HttpError(
      "You are unauthorized to access this route.",
      403
    );
    return next(err);
  }

  // console.log(req.currentUser);
};
