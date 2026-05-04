const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getBlogs);

// Admin protected routes
router.get("/all", protect, getAllBlogs);
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

// Slug route must be last
router.get("/:slug", getBlogBySlug);

module.exports = router;