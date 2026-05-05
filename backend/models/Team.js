const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    role:     { type: String, trim: true },
    slug:     { type: String, unique: true, lowercase: true, trim: true },
    bio:      [{ type: String }],
    img:      { type: String, default: "" },
    socials: {
      linkedin:  { type: String, default: "" },
      twitter:   { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
    order:    { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Auto-generate slug from name
teamSchema.pre("save", async function () {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  }
});

module.exports = mongoose.model("Team", teamSchema);
