const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
  {
    fullName:    { type: String, required: true, trim: true },
    email:       { type: String, required: true, trim: true, lowercase: true },
    phone:       { type: String, required: true, trim: true },
    service:     { type: String, default: "" },
    message:     { type: String, default: "" },
    status: {
      type: String,
      enum: ["new", "contacted", "proposal-sent", "closed"],
      default: "new",
    },
    followUpNote: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quote", quoteSchema);
