const Quote = require("../models/Quote");

// Public: Submit quote request
exports.submitQuote = async (req, res) => {
  try {
    const quote = await Quote.create(req.body);
    res.status(201).json({ success: true, quote });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Admin: Get all quotes
exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Update quote status + followUpNote
exports.updateQuote = async (req, res) => {
  try {
    const { status, followUpNote } = req.body;
    const update = {};
    if (status !== undefined) update.status = status;
    if (followUpNote !== undefined) update.followUpNote = followUpNote;
    const quote = await Quote.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(quote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Admin: Delete quote
exports.deleteQuote = async (req, res) => {
  try {
    await Quote.findByIdAndDelete(req.params.id);
    res.json({ message: "Quote deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
