import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      minlength: [3, "Must be at least 3 character, got {VALUE}"],
    },
    lastName: {
      type: String,
      required: true,
      minlength: [3, "Must be at least 3 character, got {VALUE}"],
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

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
