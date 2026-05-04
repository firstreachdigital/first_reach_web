const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    excerpt: {
      type: String,
      maxlength: 300,
    },
    featuredImage: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      trim: true,
      default: "General",
    },
    tags: [{ type: String, trim: true }],
    author: {
      type: String,
      default: "First Reach Digital",
    },
    readTime: {
      type: String,
      default: "5 min read",
    },
    seo: {
      metaTitle:       { type: String, default: "" },
      metaDescription: { type: String, default: "" },
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Auto-generate slug from title
blogSchema.pre("save", async function () {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  }
});

module.exports = mongoose.model("Blog", blogSchema);