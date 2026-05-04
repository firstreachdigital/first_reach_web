const JobPosting = require("../models/JobPosting");
const JobApplication = require("../models/JobApplication");

// ── JOB POSTINGS ──

// @desc    Get all active jobs (public)
// @route   GET /api/careers/jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await JobPosting.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all jobs including inactive (admin)
// @route   GET /api/careers/jobs/all
const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobPosting.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create job posting (admin)
// @route   POST /api/careers/jobs
const createJob = async (req, res) => {
  try {
    const job = await JobPosting.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update job posting (admin)
// @route   PUT /api/careers/jobs/:id
const updateJob = async (req, res) => {
  try {
    const job = await JobPosting.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete job posting (admin)
// @route   DELETE /api/careers/jobs/:id
const deleteJob = async (req, res) => {
  try {
    const job = await JobPosting.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── JOB APPLICATIONS ──

// @desc    Submit job application (public — from modal)
// @route   POST /api/careers/apply
const applyJob = async (req, res) => {
  try {
    const job = await JobPosting.findById(req.body.job);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const resumeUrl = req.file ? `/uploads/resumes/${req.file.filename}` : "";

    const application = await JobApplication.create({
      ...req.body,
      jobTitle: job.title,
      resumeUrl,
    });
    res.status(201).json({ message: "Application submitted!", application });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all applications (admin)
// @route   GET /api/careers/applications
const getApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find()
      .populate("job", "title department")
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update application status (admin)
// @route   PUT /api/careers/applications/:id
const updateApplicationStatus = async (req, res) => {
  try {
    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!application) return res.status(404).json({ message: "Application not found" });
    res.json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete application (admin)
// @route   DELETE /api/careers/applications/:id
const deleteApplication = async (req, res) => {
  try {
    const application = await JobApplication.findByIdAndDelete(req.params.id);
    if (!application) return res.status(404).json({ message: "Application not found" });
    res.json({ message: "Application deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getJobs, getAllJobs, createJob, updateJob, deleteJob,
  applyJob, getApplications, updateApplicationStatus, deleteApplication,
};