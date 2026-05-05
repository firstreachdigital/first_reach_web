const User = require("../models/User");
const bcrypt = require("bcryptjs");

// GET all users (superadmin only)
exports.getAll = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// CREATE user (superadmin only)
exports.create = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    // Only superadmin or staff roles allowed
    const allowedRoles = ["superadmin", "staff"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.create({ name, email, password, role });
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// UPDATE user (superadmin only)
exports.update = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent changing own role
    if (req.user._id.toString() === req.params.id && role && role !== user.role) {
      return res.status(400).json({ message: "Cannot change your own role" });
    }

    user.name  = name  || user.name;
    user.email = email || user.email;
    user.role  = role  || user.role;
    if (password) user.password = password; // pre-save hook will hash it

    await user.save();
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// DELETE user (superadmin only)
exports.remove = async (req, res) => {
  try {
    // Prevent self-delete
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({ message: "Cannot delete your own account" });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
