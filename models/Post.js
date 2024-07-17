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
