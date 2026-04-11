const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    pages: { type: Number, default: 0 },
    published: { type: Number, default: 2024 },
    language: { type: String, default: "English" },
    description: { type: String, default: "" },
    rating: { type: Number, min: 0, max: 5, default: 4.0 },
    coverUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
