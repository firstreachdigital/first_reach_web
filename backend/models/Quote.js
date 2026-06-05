const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
  {
    selectedServices: [{ type: String }],
    requirements: { type: Object, default: {} },
    businessName: { type: String, required: true },
    websiteOrInstagram: { type: String },
    industry: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    countryCode: { type: String, default: "+91" },
    status: { type: String, enum: ["new", "contacted", "proposal-sent", "closed"], default: "new" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quote", quoteSchema);
