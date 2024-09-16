// const { validationResult } = require("express-validator");
// const Subscriber = require("../models/Subscriber");

// exports.subscribe = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const subscriber = new Subscriber(req.body);
//     await subscriber.save();
//     res.status(201).json({ msg: "Subscriber successfully" });
//   } catch (err) {
//     next(err);
//   }
// };

const { validationResult } = require("express-validator");
const Subscriber = require("../models/Subscriber");

exports.subscribe = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, name } = req.body;
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: "Email is already subscribed." });
    }

    const subscriber = new Subscriber({ email, username: name });
    await subscriber.save();
    return res.status(201).json({ message: "Subscribed successfully!" });
  } catch (err) {
    next(err);
  }
};
exports.getSubscribers = async (req, res, next) => {
  try {
    const allsubscriber = await Subscriber.find();
    // console.log("subscribers", allsubscriber);
    res.status(200).json(allsubscriber);
  } catch (err) {
    next(err);
  }
};
