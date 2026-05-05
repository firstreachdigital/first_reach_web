const Team = require("../models/Team");

exports.getActive = async (req, res) => {
  try {
    const items = await Team.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    res.json(items);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getAll = async (req, res) => {
  try {
    const items = await Team.find().sort({ order: 1, createdAt: 1 });
    res.json(items);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getBySlug = async (req, res) => {
  try {
    const item = await Team.findOne({ slug: req.params.slug, isActive: true });
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const item = new Team(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    // If name changed, regenerate slug
    const existing = await Team.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Not found" });

    Object.assign(existing, req.body);
    if (req.body.name && req.body.name !== existing.name) {
      existing.slug = req.body.name
        .toLowerCase().trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
    }
    await existing.save();
    res.json(existing);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
