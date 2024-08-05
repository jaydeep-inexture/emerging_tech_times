const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

const userController = require('../../controllers/usersController');
const auth = require('../../middleware/auth');
const isAdmin = require('../../middleware/isAdmin');

// @route   GET /api/users/me
// @desc    Get logged in user
// @access  Private
router.get('/me', auth, userController.getLoggedInUser);

// @route   PUT /api/users
// @desc    Update user
// @access  Private
router.put('/', auth, userController.updateUser);

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

// @route   POST /api/users/logout
// @desc    Logout the user
// @access  Private
router.post('/logout', auth, userController.logout);

// ************  Admin routes  ************//

// @route   GET /api/users/admin
// @desc    Grant the user admin access
// @access  Private
router.patch('/:id', auth, isAdmin, userController.grantAdminAccess);

// @route   GET /api/users
// @desc    Get all users
// @access  Private
router.get('/', auth, isAdmin, userController.getAllUsers);

module.exports = router;
