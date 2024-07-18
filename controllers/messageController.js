const {validationResult} = require('express-validator');
const Message = require('../models/Message');

// send a message
exports.sendMessage = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  try {
    const newMessage = new Message(req.body);

    await newMessage.save();

    res.status(201).json({msg: 'Message sent successfully'});
  } catch (err) {
    next(err);
  }
};
