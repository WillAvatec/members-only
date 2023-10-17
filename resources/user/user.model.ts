import mongoose from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  status: "member" | "admin";
}
// Create schema
const userSchema = new mongoose.Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

// Compile into model and export
const User = mongoose.model("User", userSchema);

export default User;
