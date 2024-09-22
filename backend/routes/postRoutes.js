import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new post
router.post("/", protect, createPost);

// Get all posts (requires authentication)
router.get("/", protect, getAllPosts); // Add the protect middleware here

// Get a single post by ID
router.get("/:id", protect, getPostById); // Optionally protect this route as well

// Update a post by ID
router.put("/:id", protect, updatePost);

// Delete a post by ID
router.delete("/:id", protect, deletePost);

export default router;
