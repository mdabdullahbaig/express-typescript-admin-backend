import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../config/dev";
import jwt from "jsonwebtoken";

export interface UserDocument extends Document {
  isAdmin: boolean;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(userPassword: string): Promise<boolean>;
  isModified(path: string): boolean;
  generateAuthToken(): string;
}

const UserSchema = new Schema(
  {
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      minlength: [10, "Must be at least 10 character, got {VALUE}"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Must be at least 6 character, got {VALUE}"],
    },
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;
  delete user.isAdmin;

  return user;
};

UserSchema.methods.comparePassword = async function (userPassword: string) {
  const user = this as UserDocument;

  return bcrypt.compare(userPassword, user.password).catch((err) => false);
};

UserSchema.methods.generateAuthToken = function () {
  const user = this;

  const token = jwt.sign({ userId: user._id }, config.privateKey, {
    expiresIn: config.expiresIn,
  });

  return token;
};

UserSchema.pre("save", async function (next) {
  const user = this as UserDocument;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(config.hashSaltRound);
    user.password = await bcrypt.hash(user.password, salt);
  }

  next();
});

const User = model<UserDocument>("User", UserSchema);

export default User;
