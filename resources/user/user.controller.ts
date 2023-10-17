import asyncHand from "express-async-handler";
import { body, validationResult } from "express-validator";
import User, { IUser } from "./user.model";
import { HydratedDocument } from "mongoose";

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
  body("password", "Password must not be empty").trim().isLength({ min: 5 }),
  body("confirm-pass", "Passwords do not match").custom((value, { req }) => {
    return value === req.body.password;
  }),
  asyncHand(async (req, res, next) => {
    // Get errors of validation
    const errors = validationResult(req);

    const newUser: HydratedDocument<IUser> = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      username: req.body.username,
      status: "member",
    });

    if (!errors.isEmpty()) {
      res.render("sign-up", {
        user: newUser,
        errors: errors.array(),
      });
    } else {
      res.render("index");
    }
  }),
];
