const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const subscribeController = require("../../controllers/subscriberController");

// @route   POST /api/subscribe
// @desc    Subscribe to newsletter
// @access  Public
router.post(
  "/",
  [check("email", "Please include a valid email").isEmail()],
  subscribeController.subscribe,
);

module.exports = router;
