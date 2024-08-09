const { validationResult } = require("express-validator");
const Subscriber = require("../models/Subscriber");

exports.subscribe = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const subscriber = new Subscriber(req.body);

    await subscriber.save();

    res.status(201).json({ msg: "Subscriber successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getSubscribers = async (req, res, next) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).json(subscribers);
  } catch (err) {
    next(err);
  }
};
