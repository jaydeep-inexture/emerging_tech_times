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

  const {
    title,
    description,
    authorName,
    authorDescription,
    twitter,
    instagram,
    linkedin,
    seoTitle,
    seoDescription,
    seoSlug,
  } = req.body;

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
        name: authorName,
        description: authorDescription ?? '',
        socials: {
          twitter: twitter ?? '',
          instagram: instagram ?? '',
          linkedin: linkedin ?? '',
        },
      },
      seo: {
        title: seoTitle ?? '',
        description: seoDescription ?? '',
        slug: seoSlug ?? '',
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
  const {
    title,
    description,
    authorName,
    authorDescription,
    twitter,
    instagram,
    linkedin,
    seoTitle,
    seoDescription,
    seoSlug,
  } = req.body;

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
    if (authorName) post.author.name = authorName;
    if (authorDescription !== undefined)
      post.author.description = authorDescription;

    if (twitter !== undefined) post.author.socials.twitter = twitter;
    if (instagram !== undefined) post.author.socials.instagram = instagram;
    if (linkedin !== undefined) post.author.socials.linkedin = linkedin;

    if (seoTitle !== undefined) post.seo.title = seoTitle;
    if (seoDescription !== undefined) post.seo.description = seoDescription;
    if (seoSlug !== undefined) post.seo.slug = seoSlug;

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
