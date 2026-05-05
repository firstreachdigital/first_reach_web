const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    category: { type: String, trim: true, default: "Web design" },
    tags: [{ type: String, trim: true }],
    image: { type: String, default: "" },
    color: { type: String, default: "#05caf2" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
