const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getJobs, getAllJobs, createJob, updateJob, deleteJob,
  applyJob, getApplications, updateApplicationStatus, deleteApplication,
} = require("../controllers/careerController");
const { protect } = require("../middleware/authMiddleware");

// Multer config — save to uploads/resumes/
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/resumes/"),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [".pdf", ".doc", ".docx"];
    const ext = path.extname(file.originalname).toLowerCase();
    allowed.includes(ext) ? cb(null, true) : cb(new Error("Only PDF/DOC/DOCX allowed"));
  },
});

// Public routes
router.get("/jobs", getJobs);
router.post("/apply", upload.single("resume"), applyJob);

// Admin protected routes
router.get("/jobs/all", protect, getAllJobs);
router.post("/jobs", protect, createJob);
router.put("/jobs/:id", protect, updateJob);
router.delete("/jobs/:id", protect, deleteJob);

router.get("/applications", protect, getApplications);
router.put("/applications/:id", protect, updateApplicationStatus);
router.delete("/applications/:id", protect, deleteApplication);

module.exports = router;