const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { getAll, getActive, create, update, remove } = require("../controllers/portfolioController");
const { protect } = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/portfolio/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`),
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    /^image\/(jpeg|jpg|png|webp|gif)$/.test(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Images only"));
  },
});

// Public
router.get("/", getActive);

// Image upload (protected)
router.post("/upload", protect, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const url = `${req.protocol}://${req.get("host")}/uploads/portfolio/${req.file.filename}`;
  res.json({ url });
});

// Admin protected
router.get("/all", protect, getAll);
router.post("/", protect, create);
router.put("/:id", protect, update);
router.delete("/:id", protect, remove);

module.exports = router;
