const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  seo: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  author: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    socials: {
      twitter: String,
      instagram: String,
      linkedin: String,
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Post', PostSchema);
