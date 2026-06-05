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

// Admin: Update quote status
exports.updateQuote = async (req, res) => {
  try {
    const { status } = req.body;
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
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
