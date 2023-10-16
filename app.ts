import mongoose from "mongoose";
import passport from "passport";
import { Strategy } from "passport-local";
import path from "path";
import express from "express";
import dotenv from "dotenv";
// Load env variables
dotenv.config();

const app = express();

app.get("/", (req, res, next) => {
  res.send("Hola mundo");
});

app.listen(process.env.PORT, () => {
  console.log("Listening to PORT: " + process.env.PORT);
});
