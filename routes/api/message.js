const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

const messageController = require('../../controllers/messageController');

// @route   POST /api/message
// @desc    Send a message through contact us page
// @access  Public
router.post(
  '/',
  [
    check('firstname', 'First name is required').notEmpty(),
    check('lastname', 'Last name is required').notEmpty(),
    check('message')
      .notEmpty()
      .withMessage('Message is required')
      .isLength({
        max: 255,
      })
      .withMessage('You can enter only upto 255 characters.'),
  ],
  messageController.sendMessage,
);

module.exports = router;
