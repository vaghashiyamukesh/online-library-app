const mongoose = require("mongoose");

const libraryEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    status: {
      type: String,
      enum: ["reading", "completed", "wishlist"],
      default: "reading",
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

libraryEntrySchema.index({ user: 1, book: 1 }, { unique: true });

module.exports = mongoose.model("LibraryEntry", libraryEntrySchema);
