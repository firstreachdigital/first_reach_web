const FAQ = require("../models/FAQ");

// @desc  Get all active FAQs (public)
// @route GET /api/faqs
const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find({ isActive: true }).sort({ category: 1, order: 1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get all FAQs (admin)
// @route GET /api/faqs/all
const getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ category: 1, order: 1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Create FAQ (admin)
// @route POST /api/faqs
const createFAQ = async (req, res) => {
  try {
    const faq = await FAQ.create(req.body);
    res.status(201).json(faq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc  Update FAQ (admin)
// @route PUT /api/faqs/:id
const updateFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!faq) return res.status(404).json({ message: "FAQ not found" });
    res.json(faq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc  Delete FAQ (admin)
// @route DELETE /api/faqs/:id
const deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });
    res.json({ message: "FAQ deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFAQs, getAllFAQs, createFAQ, updateFAQ, deleteFAQ };
