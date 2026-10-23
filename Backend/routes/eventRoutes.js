const express = require("express");
const { getEvents, getEventById, createEvent } = require("../controllers/eventController");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", protect, upload.single("image"), createEvent);

module.exports = router;