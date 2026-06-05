const express = require("express");
const router = express.Router();
const { protect, requireRole } = require("../middleware/authMiddleware");
const {
  submitQuote,
  getQuotes,
  updateQuote,
  deleteQuote,
} = require("../controllers/quoteController");

// Public route
router.post("/submit", submitQuote);

// Admin routes
router.get("/", protect, requireRole("superadmin", "staff"), getQuotes);
router.patch("/:id", protect, requireRole("superadmin", "staff"), updateQuote);
router.delete("/:id", protect, requireRole("superadmin", "staff"), deleteQuote);

module.exports = router;
