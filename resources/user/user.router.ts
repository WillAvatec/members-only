import express from "express";
import { getUserForm, postNewUser } from "./user.controller";
const userRouter = express.Router();

// Display user form
userRouter.get("/sign", getUserForm);

// Handle user post request
userRouter.post("/sign", postNewUser);

export default userRouter;
