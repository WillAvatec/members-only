import mongoose from "mongoose";
import passport from "passport";
import { Strategy } from "passport-local";
import express from "express";

const app = express();

app.get("/", (req, res, next) => {
  res.send("Hola mundo");
});

app.listen(5000, () => {
  console.log("Listening to PORT " + 5000);
});
