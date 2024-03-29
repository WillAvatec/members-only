import asyncHand from "express-async-handler";
import { body, validationResult } from "express-validator";
import User, { IUser } from "../user/user.model";
import { HydratedDocument } from "mongoose";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import passport from "passport";

/* SIGN IN */

export const getUserForm = asyncHand(async (req, res, next) => {
  res.render("sign-up");
});

export const postNewUser = [
  body("firstName", "First-Name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("lastName", "Last-Name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Username must not be empty")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ username: req.body.username });
      return user === null;
    })
    .withMessage("Username is already taken, pick another"),
  body("password", "Password must be at least 5 characters long")
    .trim()
    .isLength({ min: 5 }),
  body("confirm-pass", "Passwords do not match").custom((value, { req }) => {
    return value === req.body.password;
  }),
  asyncHand(async (req, res, next) => {
    // Get errors of validation
    const errors = validationResult(req);

    const hashedPass = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPass,
      username: req.body.username,
      status: "member",
    });

    if (!errors.isEmpty()) {
      res.render("sign-up", {
        user: newUser,
        errors: errors.array(),
      });
    } else {
      const result = await newUser.save();
      res.redirect("/log");
    }
  }),
];

/* LOG IN */

export const getLogForm = (req: Request, res: Response) => {
  res.render("log-in");
};

export const postLogIn = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log",
});

export const endSession = asyncHand(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
