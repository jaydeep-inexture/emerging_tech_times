const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const subscribeController = require("../../controllers/subscriberController");
const auth = require("../../middleware/auth");
const isAdmin = require("../../middleware/isAdmin");

// @route   GET /api/subscribers
// @desc    Get the list of Subscribers
// @access  Private and admin only
router.get("/", auth(), isAdmin, subscribeController.getSubscribers);

// @route   POST /api/subscribers
// @desc    Subscribe to newsletter
// @access  Public
router.post(
  "/",
  [check("email", "Please include a valid email").isEmail()],
  check("name", "Name is required").notEmpty(),
  subscribeController.subscribe,
);

module.exports = router;
