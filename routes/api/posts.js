const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

const auth = require('../../middleware/auth');
const isAdmin = require('../../middleware/isAdmin');

const postsController = require('../../controllers/postsController');

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', postsController.getAllPosts);

// @route   POST api/posts
// @desc    Create a post
// @access  Private and admin only
router.post(
  '/',
  [
    check('title', 'Title is required').notEmpty(),
    check('description', 'Description is required').notEmpty(),
    check('authorName', 'Author name is required').notEmpty(),
  ],
  auth,
  isAdmin,
  postsController.createPost,
);

// @route   PUT api/posts/:postId
// @desc    Update a post by ID
// @access  Private and admin only
router.put('/:postId', auth, isAdmin, postsController.updatePost);

// @route   DELETE api/posts/:postId
// @desc    Delete a post by ID
// @access  Private and admin only
router.delete('/:postId', auth, isAdmin, postsController.deletePost);

module.exports = router;
