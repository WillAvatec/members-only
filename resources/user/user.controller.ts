import * as express from "express";
import asyncHand from "express-async-handler";
import User from "./user.model";

/* TODO */
// Abstract verification of currentUser in middleware
// and then return array of middlewares with route handlers
// Verify if neccesary to check at all

export const updateMembershipGet = asyncHand(async (req, res) => {
  // Get user info
  if (res.locals.currentUser) {
    const loggedUser = await User.findById(res.locals.currentUser._id);

    if (loggedUser) {
      res.render("update-user", { user: loggedUser });
      return;
    }
  }
  res.redirect("/");
});

export const updateMemberShipPost = asyncHand(async (req, res) => {
  // Check if there is a user logged
  if (!res.locals.currentUser) return res.redirect("/");
  const loggedUser = await User.findById(res.locals.currentUser._id);

  //Check if user exists in db
  if (!loggedUser) return res.redirect("/");
  if (loggedUser.status === "member") {
    // Check passcode
    console.log("PASS INPUTED");
    if (req.body.passcode !== process.env.ADMIN_PASS) {
      console.log("pass was wrong");
      res.render("update-user", {
        user: loggedUser,
        err: "Incorrect Passcode",
      });
    }
    console.log("SAVING NEW STATUS");
    // Passcode Correct!
    loggedUser.status = "admin";
    await loggedUser.save();
    res.render("update-user", { user: loggedUser });
    return;
  }
  res.redirect("/");
});
