const express = require("express");
const router = express.Router();
const { protect, requireRole } = require("../middleware/authMiddleware");
const {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

// Public route
router.post("/", createContact);

// Admin routes
router.get("/", protect, requireRole("superadmin", "staff"), getContacts);
router.patch("/:id", protect, requireRole("superadmin", "staff"), updateContact);
router.delete("/:id", protect, requireRole("superadmin", "staff"), deleteContact);

module.exports = router;
