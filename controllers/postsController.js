// controllers/postsController.js

const {validationResult} = require('express-validator');
const Post = require('../models/Post');
const mongoose = require('mongoose');

// get all posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({date: -1});
    res.status(200).json({
      msg: 'Post fetched successfully',
      data: {posts, total: posts.length},
    });
  } catch (err) {
    next(err);
  }
};

// create a post
exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  const {title, description, author} = req.body;

  try {
    const existingPost = await Post.findOne({title});
    if (existingPost) {
      throw new Error('Title must be unique');
    }

    const newPost = new Post({
      userId: req.user,
      title,
      description,
      author: {
        name: author.name,
        description: author.description ?? '',
        socials: {
          twitter: author.twitter ?? '',
          instagram: author.instagram ?? '',
          linkedin: author.linkedin ?? '',
        },
      },
    });

    const post = await newPost.save();
    res.status(201).json({msg: 'Post created successfully', data: post});
  } catch (err) {
    next(err);
  }
};

// update a post
exports.updatePost = async (req, res, next) => {
  const {title, description, author} = req.body;

  try {
    if (!mongoose.isValidObjectId(req.params.postId)) {
      throw new Error('Invalid post ID.');
    }

    let post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({msg: 'Post not found'});
    }

    // Update post fields
    if (title) post.title = title;
    if (description) post.description = description;
    if (author?.name) post.author.name = author.name;
    if (author?.description !== undefined)
      post.author.description = author.description;
    if (author?.twitter !== undefined)
      post.author.socials.twitter = author.twitter;
    if (author?.instagram !== undefined)
      post.author.socials.instagram = author.instagram;
    if (author?.linkedin !== undefined)
      post.author.socials.linkedin = author.linkedin;

    const updatedPost = await post.save();
    res.json({msg: 'Post updated successfully', data: updatedPost});
  } catch (err) {
    next(err);
  }
};

// delete a post
exports.deletePost = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.postId)) {
      throw new Error('Invalid post ID.');
    }

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({msg: 'Post not found.'});
    }

    await post.deleteOne();
    res.status(200).json({msg: 'Post removed.'});
  } catch (err) {
    next(err);
  }
};
