import express from "express";
import {
  getUserForm,
  postNewUser,
  getLogForm,
  endSession,
  postLogIn,
} from "./auth.controller";
const authRouter = express.Router();

/* SIGN IN */

// Display user form
authRouter.get("/sign", getUserForm);

// Handle user post request
authRouter.post("/sign", postNewUser);

/* LOG IN */

// Display login form
authRouter.get("/log", getLogForm);

authRouter.post("/log", postLogIn);

authRouter.get("/log-out", endSession);

export default authRouter;
