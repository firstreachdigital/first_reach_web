const mongoose = require("mongoose");

const jobPostingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    department: {
      type: String,
      required: true,
      enum: ["Design", "Development", "Marketing", "Strategy", "Other"],
    },
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      default: "Full-time",
    },
    location: {
      type: String,
      default: "Remote",
    },
    experience: {
      type: String, // e.g. "2–4 years"
      default: "",
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    tags: [{ type: String, trim: true }], // ["React", "Next.js", "TypeScript"]
    isActive: {
      type: Boolean,
      default: true, // admin can hide/show job
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobPosting", jobPostingSchema);