// // const express = require("express");
// // const router = express.Router();
// // const { check } = require("express-validator");

// // const subscribeController = require("../../controllers/subscriberController");
// // const auth = require("../../middleware/auth");
// // const isAdmin = require("../../middleware/isAdmin");

// // // @route   GET /api/subscribers
// // // @desc    Get the list of Subscribers
// // // @access  Private and admin only
// // router.get("/", auth(), isAdmin, subscribeController.getSubscribers);

// // // @route   POST /api/subscribers
// // // @desc    Subscribe to newsletter
// // // @access  Public
// // router.post(
// //   "/",
// //   [check("email", "Please include a valid email").isEmail()],
// //   check("name", "Name is required").notEmpty(),
// //   subscribeController.subscribe
// // );

// // module.exports = router;
// const express = require("express");
// const router = express.Router();
// const { check } = require("express-validator");
// const subscribeController = require("../../controllers/subscriberController");
// const isAdmin = require("../../middleware/isAdmin");

// // @route   POST /api/subscribers
// // @desc    Subscribe to newsletter
// // @access  Public
// router.post(
//   "/subscriber",
//   [
//     check("email", "Please include a valid email").isEmail(),
//     check("name", "Name is required").notEmpty(),
//   ],
//   subscribeController.subscribe
// );
// // // @route   GET /api/subscribers
// // // @desc    Get the list of Subscribers
// // // @access  Private and admin only
// router.get("/", isAdmin, subscribeController.subscribe);
// module.exports = router;
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const subscribeController = require("../../controllers/subscriberController");
const isAdmin = require("../../middleware/isAdmin");
const auth = require("../../middleware/auth");

// Public route for subscribing to the newsletter
router.post(
  "/subscriber",
  [
    check("email", "Please include a valid email").isEmail(),
    check("name", "Name is required").notEmpty(),
  ],
  subscribeController.subscribe
);

// Private route for fetching the list of subscribers (Admin only)
// Test route without middleware to check if it's a middleware issue
// router.get("/", subscribeController.getSubscribers);

router.get("/", auth(), isAdmin, subscribeController.getSubscribers);

module.exports = router;
