const express = require("express");
const {
  getDashboard,
  upsertLibraryEntry,
  updateLibraryEntry,
} = require("../controllers/dashboardController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", protect, getDashboard);
router.post("/library", protect, upsertLibraryEntry);
router.patch("/library/:id", protect, updateLibraryEntry);

module.exports = router;
