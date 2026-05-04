const express = require("express");
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} = require("../controllers/enquiryController");
const { protect } = require("../middleware/authMiddleware");

// Public route
router.post("/", createEnquiry);

// Admin protected routes
router.get("/", protect, getEnquiries);
router.put("/:id", protect, updateEnquiryStatus);
router.delete("/:id", protect, deleteEnquiry);

module.exports = router;