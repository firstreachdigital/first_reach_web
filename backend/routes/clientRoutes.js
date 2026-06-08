const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { protect, requireRole } = require("../middleware/authMiddleware");
const {
  getClients,
  getAllClients,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

// Multer storage for client logos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/clients/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Public route - get active clients
router.get("/", getClients);

// Admin routes
router.get("/all", protect, requireRole("superadmin", "staff"), getAllClients);
router.post("/", protect, requireRole("superadmin", "staff"), createClient);
router.patch("/:id", protect, requireRole("superadmin", "staff"), updateClient);
router.delete("/:id", protect, requireRole("superadmin", "staff"), deleteClient);
// router.post("/upload", protect, requireRole("superadmin", "staff"), upload.single("logo"), (req, res) => {
//   res.json({ path: req.file.path.replace(/\\/g, "/") });
// });

router.post("/upload", protect, requireRole("superadmin", "staff"), upload.single("logo"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const url = `${req.protocol}://${req.get("host")}/uploads/clients/${req.file.filename}`;
  res.json({ url }); 
});

module.exports = router;
