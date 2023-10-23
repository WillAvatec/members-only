import asyncHand from "express-async-handler";
import Post from "./post.model";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const showPosts = asyncHand(async (req, res, next) => {
  const allPosts = await Post.find({}).populate("author", "username").exec();
  res.render("index", { posts: allPosts });
});

export const getPostForm = (req: Request, res: Response) => {
  res.render("new-post");
};

export const addNewPost = [
  body("title").isLength({ min: 1 }),
  body("content").isLength({ min: 1 }),
  asyncHand(async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      res.render("new-post", {
        errors: result.array(),
      });
      return;
    }

    // NO VALIDATION ERRORS, SAVE POST
    const newPost = new Post({
      content: req.body.content,
      title: req.body.title,
      author: res.locals.currentUser._id,
    });

    await newPost.save();
    res.redirect("/");
  }),
];

export const deletePost = asyncHand(async (req, res, next) => {
  console.log(req.params);
  res.render("confirm-delete", { post: req.params.id });
});

export const confirmDeletePost = asyncHand(async (req, res, next) => {
  if (req.body.value) {
    const postToDelete = await Post.findByIdAndRemove(req.body.value);
    console.log("Post to delete", postToDelete);
  }

  res.redirect("/");
});
