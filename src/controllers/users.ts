import { RequestHandler } from "express";
import User from "../models/users";
import { HttpError } from "../utils/HttpError";

// Create User
export const createUser: RequestHandler = async (req, res, next) => {
  const firstName = (req.body as { firstName: string }).firstName;
  const lastName = (req.body as { lastName: string }).lastName;
  const email = (req.body as { email: string }).email;
  const mobileNumber = (req.body as { mobileNumber: string }).mobileNumber;
  const password = (req.body as { password: string }).password;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err: any) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      400
    );
    return next(error);
  }

  const createdUser = new User({
    firstName,
    lastName,
    email,
    mobileNumber,
    password,
  });

  try {
    await createdUser.save();
  } catch (err: any) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  res
    .status(201)
    .json({ message: "Your account has been created. Please login!!!" });
};

// Get All Users
export const getUsers: RequestHandler = async (req, res, next) => {
  let users;

  try {
    users = await User.find({});
  } catch (err: any) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  if (users.length === 0) {
    const error = new HttpError("There is no users present.", 400);
    return next(error);
  }

  res.status(200).json(users);
};

// Get User By Id
export const getUserById: RequestHandler = async (req, res, next) => {
  const id = req.params.id;

  let user;
  try {
    user = await User.findById(id).exec();
  } catch (err: any) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("There is no user present on this id.", 400);
    return next(error);
  }

  res.status(200).json(user);
};

// Update User By Id
export const updateUserById: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const firstName = (req.body as { firstName: string }).firstName;
  const lastName = (req.body as { lastName: string }).lastName;
  const mobileNumber = (req.body as { mobileNumber: string }).mobileNumber;

  let user;
  try {
    user = await User.findById(id).exec();
  } catch (err: any) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("There is no user present on this id.", 400);
    return next(error);
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.mobileNumber = mobileNumber;

  try {
    await user.save();
  } catch (err: any) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  res.status(200).json(user);
};

// Delete User By Id
export const deleteUserById: RequestHandler = async (req, res, next) => {
  const id = req.params.id;

  let user;
  try {
    user = await User.findById(id).exec();
  } catch (err: any) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("There is no user present on this id.", 400);
    return next(error);
  }

  try {
    await user.delete();
  } catch (err: any) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  res.status(200).json({ message: "User has been deleted!" });
};
