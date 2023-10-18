import express from "express";
import { showPosts } from "./post.controller";

const router = express.Router();

/* Index page */
router.get("/", showPosts);

export default router;
