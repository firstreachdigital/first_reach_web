const Enquiry = require("../models/Enquiry");

// @desc    Submit enquiry (public — from contact form)
// @route   POST /api/enquiries
const createEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json({ message: "Enquiry submitted!", enquiry });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all enquiries (admin)
// @route   GET /api/enquiries
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update enquiry status (admin)
// @route   PUT /api/enquiries/:id
const updateEnquiryStatus = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!enquiry) return res.status(404).json({ message: "Enquiry not found" });
    res.json(enquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete enquiry (admin)
// @route   DELETE /api/enquiries/:id
const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ message: "Enquiry not found" });
    res.json({ message: "Enquiry deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createEnquiry, getEnquiries, updateEnquiryStatus, deleteEnquiry };