const {validationResult} = require('express-validator');
const mongoose = require('mongoose');

const Post = require('../models/Post');
const {uploadImageToS3, deleteImageFromS3} = require('../helpers/utils');
const CONSTANTS = require('../helpers/constants');

// get all posts
exports.getAllPosts = async (req, res, next) => {
  let page = parseInt(req.query.page) || 0;
  let limit = parseInt(req.query.limit) || CONSTANTS.PAGINATION_LIMIT;

  try {
    const totalPosts = await Post.countDocuments();
    const posts = await Post.find()
      .sort({ updatedAt: -1 }) // desc
      .skip(page * limit)
      .limit(limit);

    res.status(200).json({
      msg: "Posts fetched successfully",
      data: {
        posts,
        total: totalPosts,
        page,
        totalPages: Math.ceil(totalPosts / limit),
      },
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
    category
  } = req.body;
  const image = req.file;

  try {
    const isDuplicateTitle = await Post.findOne({title});

    if (isDuplicateTitle) {
      throw new Error('Title must be unique');
    }

    if (seoSlug) {
      const isDuplicateSeoSlug = await Post.findOne({['seo.slug']: seoSlug});
      if (isDuplicateSeoSlug) {
        throw new Error('Seo slug must be unique');
      }
    }

    const payload = {
      userId: req.user,
      title,
      description,
      category,
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
    };

    // upload image if it exists
    if (image) {
      const uploadedFile = await uploadImageToS3(image);
      payload.imageUrl = uploadedFile.Location;
    }

    const newPost = new Post(payload);

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
    category
  } = req.body;
  const image = req.file;

  try {
    if (!mongoose.isValidObjectId(req.params.postId)) {
      throw new Error('Invalid post ID.');
    }

    let post;
    let oldImageUrl;

    const foundPost = await Post.findById(req.params.postId);

    if (!foundPost) {
      return res.status(404).json({msg: 'Post not found'});
    }

    post = foundPost;
    oldImageUrl = foundPost.imageUrl;

    // Update post fields
    if (title) post.title = title;
    if (description) post.description = description;
    if (authorName) post.author.name = authorName;
    if (authorDescription !== undefined)
      post.author.description = authorDescription;
    if (category !== undefined) post.category = category;

    if (twitter !== undefined) post.author.socials.twitter = twitter;
    if (instagram !== undefined) post.author.socials.instagram = instagram;
    if (linkedin !== undefined) post.author.socials.linkedin = linkedin;

    if (seoTitle !== undefined) post.seo.title = seoTitle;
    if (seoDescription !== undefined) post.seo.description = seoDescription;
    if (seoSlug !== undefined) post.seo.slug = seoSlug;

    if (image) {

      if (oldImageUrl) {
        await deleteImageFromS3(oldImageUrl);
      }

      const uploadedFile = await uploadImageToS3(image);
      post.imageUrl = uploadedFile.Location;
    }

    const updatedPost = await post.save();

    res.json({ msg: "Post updated successfully", data: updatedPost });
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

    if (post.imageUrl) {
      await deleteImageFromS3(post.imageUrl);
    }

    await post.deleteOne();

    res.status(200).json({msg: 'Post removed.'});
  } catch (err) {
    next(err);
  }
};
