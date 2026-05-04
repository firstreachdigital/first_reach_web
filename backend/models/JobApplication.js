const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPosting",
      required: true,
    },
    jobTitle: {
      type: String, // store title snapshot so it shows even if job deleted
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    portfolio: {
      type: String, // LinkedIn or portfolio URL
      default: "",
    },
    coverNote: {
      type: String, // "Why do you want to join?" field
      default: "",
    },
    resumeUrl: {
      type: String, // uploaded CV file path
      default: "",
    },
    status: {
      type: String,
      enum: ["New", "Reviewing", "Shortlisted", "Rejected"],
      default: "New",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);