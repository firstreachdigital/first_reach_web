const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    role:     { type: String, trim: true },
    quote:    { type: String, required: true },
    avatar:   { type: String, default: "" },
    stars:    { type: Number, default: 5, min: 1, max: 5 },
    order:    { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
