import userRouter from "./resources/user/user.router";
import { Strategy } from "passport-local";
import mongoose from "mongoose";
import passport from "passport";
import path from "path";
import session from "express-session";
import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./resources/user/user.model";
// Load env variables
dotenv.config();

const app = express();

// Connect to mongoDB
connecToMongoDB().catch((err) => console.log(err));
async function connecToMongoDB() {
  console.log("Starting connection to MongoDB");
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB!");
}

// Views Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Declare Strategy to use on passport
passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, {
          message: "Incorrect username or password.",
        });
      }
      const passwordsAreEqual = await bcrypt.compare(password, user.password);
      if (!passwordsAreEqual) {
        return done(null, false, {
          message: "Incorrect username or password.",
        });
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

// Middleware to read request body
app.use(express.json());
app.use(
  session({
    secret: "randomCharacters",
    saveUninitialized: true,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// Set public folder
app.use(express.static(path.join(__dirname, "public")));

// Use routers
app.use("/", userRouter);

app.listen(process.env.PORT, () => {
  console.log("Listening to PORT: " + process.env.PORT);
});
