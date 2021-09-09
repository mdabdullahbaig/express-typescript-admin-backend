import { RequestHandler } from "express";
import User from "../models/users";
import { HttpError } from "../utils/HttpError";

export const authenticateUser: RequestHandler = async (req, res, next) => {
  const email = (req.body as { email: string }).email;
  const password = (req.body as { password: string }).password;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      "Login is failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid creadentials, could not log you in.",
      401
    );
    return next(error);
  }

  let isValidPassword = false;

  try {
    isValidPassword = await existingUser.comparePassword(password);
  } catch (err) {
    const error = new HttpError(
      "Login is failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid creadentials, could not log you in.",
      401
    );
    return next(error);
  }

  const token = existingUser.generateAuthToken();

  return res.status(201).json({ token });
};
