import asyncHand from "express-async-handler";
import Post from "./post.model";

export const showPosts = asyncHand(async (req, res, next) => {
  const allPosts = await Post.find({});
  res.render("index", {posts: allPosts});
});
