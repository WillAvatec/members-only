import mongoose from "mongoose";
import passport from "passport";
import { Strategy } from "passport-local";
import path from "path";
import express from "express";
import dotenv from "dotenv";
// Load env variables
dotenv.config();

const app = express();

// Connect to mongoDB
connecToMongoDB().catch((err) => console.log(err));
async function connecToMongoDB() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB!");
}

// Views Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Set public folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.send("Hola mundo");
});

app.listen(process.env.PORT, () => {
  console.log("Listening to PORT: " + process.env.PORT);
});
