import express from "express";
import {
  getPostForm,
  showPosts,
  addNewPost,
  deletePost,
  confirmDeletePost,
} from "./post.controller";

const router = express.Router();

/* Index page */
router.get("/", showPosts);

/* New posts */
router.get("/new-post", getPostForm);
router.post("/new-post", addNewPost);

/* Handle delete of message */
router.get("/delete/:id", deletePost);
router.post("/delete/:id", confirmDeletePost);

export default router;
