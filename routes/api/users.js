const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

const userController = require('../../controllers/usersController');
const auth = require('../../middleware/auth');

// @route   GET /api/users/me
// @desc    Get logged in user
// @access  Private
router.get('/me', auth, userController.getLoggedInUser);

// @route   POST /api/users/register
// @desc    Register the users
// @access  Public
router.post(
  '/register',
  [
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters.',
    ).isLength({min: 6}),
    check('confirmPassword', 'Please confirm your password').notEmpty(),
  ],
  userController.registerUser,
);

// @route   POST /api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').notEmpty(),
  ],
  userController.loginUser,
);

// @route   POST /api/users/refresh-token
// @desc    Refresh access token
// @access  Public
router.post(
  '/refresh-token',
  [check('token', 'Refresh token is required').notEmpty()],
  userController.refreshToken,
);

module.exports = router;
