const express = require("express");
const {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} = require("../controllers/bookController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", protect, createBook);
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);

module.exports = router;
