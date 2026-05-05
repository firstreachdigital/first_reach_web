const express = require("express");
const router  = express.Router();
const multer  = require("multer");
const path    = require("path");
const { getActive, getAll, create, update, remove } = require("../controllers/testimonialController");
const { protect } = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/testimonials/"),
  filename:    (req, file, cb) =>
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`),
});
const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    /^image\/(jpeg|jpg|png|webp)$/.test(file.mimetype) ? cb(null, true) : cb(new Error("Images only")),
});

// Public
router.get("/", getActive);

// Upload avatar (protected)
router.post("/upload", protect, upload.single("avatar"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const url = `${req.protocol}://${req.get("host")}/uploads/testimonials/${req.file.filename}`;
  res.json({ url });
});

// Admin CRUD
router.get("/all", protect, getAll);
router.post("/",   protect, create);
router.put("/:id", protect, update);
router.delete("/:id", protect, remove);

module.exports = router;
