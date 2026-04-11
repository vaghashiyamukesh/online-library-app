const LibraryEntry = require("../models/LibraryEntry");
const Book = require("../models/Book");

async function getDashboard(req, res) {
  const entries = await LibraryEntry.find({ user: req.user.id })
    .populate("book")
    .sort({ updatedAt: -1 });

  const booksReading = entries.filter((entry) => entry.status === "reading");
  const booksCompleted = entries.filter((entry) => entry.status === "completed");
  const wishlist = entries.filter((entry) => entry.status === "wishlist");

  const activity = entries.slice(0, 3).map((entry) => ({
    id: entry._id,
    text: `${entry.book.title} moved to ${entry.status}`,
  }));

  const recommended = await Book.find().sort({ rating: -1 }).limit(3);

  return res.json({
    stats: {
      reading: booksReading.length,
      completed: booksCompleted.length,
      wishlist: wishlist.length,
    },
    currentlyReading: booksReading.slice(0, 2),
    activity,
    recommended,
  });
}

async function upsertLibraryEntry(req, res) {
  const { bookId, status = "reading", progress = 0, favorite = false } = req.body;

  const entry = await LibraryEntry.findOneAndUpdate(
    { user: req.user.id, book: bookId },
    { user: req.user.id, book: bookId, status, progress, favorite },
    { new: true, upsert: true, runValidators: true }
  ).populate("book");

  return res.status(201).json(entry);
}

async function updateLibraryEntry(req, res) {
  const entry = await LibraryEntry.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true, runValidators: true }
  ).populate("book");

  if (!entry) {
    return res.status(404).json({ message: "Library entry not found." });
  }

  return res.json(entry);
}

module.exports = { getDashboard, upsertLibraryEntry, updateLibraryEntry };
