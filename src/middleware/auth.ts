import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import config from "../config/dev";
import { HttpError } from "../utils/HttpError";
import User from "../models/users";

interface DecodedToken {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser: object;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    // console.log(token);

    if (!token) {
      const error = new HttpError(
        "Token is not there, Authentication failed!",
        401
      );
      return next(error);
    }

    const decodedToken = jwt.verify(token, config.privateKey) as DecodedToken;

    // console.log(decodedToken);

    const decodedUser = await User.findById(decodedToken.userId, "-password");

    console.log(decodedUser);

    if (!decodedUser) {
      const error = new HttpError(
        "Decoded user is not there, Authentication failed!!",
        401
      );
      return next(error);
    }

    req.currentUser = decodedUser;

    // console.log(req.currentUser);
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  }
};
