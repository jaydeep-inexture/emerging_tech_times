const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const {generateRefreshToken, generateAccessToken} = require('../helpers/utils');

exports.getLoggedInUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).select('-password');
    if (!user) {
      return res.status(404).json({msg: 'User not found'});
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const {username} = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user },
      { username },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found." });
    }

    res.status(200).json({msg: 'User updated successfully.'});
  } catch (err) {
    next(err);
  }
};

exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  const {email, password, username, confirmPassword, isAdmin} = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      errors: [{msg: 'Passwords do not match.'}],
    });
  }

  try {
    let user = await User.findOne({email});

    if (user) {
      return res.status(400).json({
        errors: [{msg: 'User already exists.'}],
      });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      email,
      password: hashedPassword,
      username,
      isAdmin,
    });

    await user.save();

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({
      user: {email, isAdmin, username, accessToken, refreshToken},
      msg: "Signed up successfully.",
    });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  const {email, password} = req.body;

  try {
    let user = await User.findOne({email});

    if (!user) {
      return res.status(400).json({
        errors: [{msg: 'Invalid email or password'}],
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        errors: [{msg: 'Invalid email or password'}],
      });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    user.refreshToken = refreshToken;
    user.accessToken = accessToken;
    await user.save();

    res.status(201).json({
      user: {email, accessToken, refreshToken},
      msg: "Login successfully.",
    });
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  const {token} = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user);

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({msg: 'Invalid refresh token'});
    }

    const accessToken = generateAccessToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.user },
      { accessToken: null, refreshToken: null },
    );

    res.status(200).json({ msg: 'Logged out successfully.' });
  } catch (err) {
    next(err);
  }
};

// *********** Admin routes ***************//
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select({
      password: 0,
      refreshToken: 0,
      accessToken: 0,
    });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

exports.grantAdminAccess = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({msg: 'User not found'});
    }

    user.isAdmin = !user.isAdmin;
    await user.save();

    res.status(200).json({msg: 'User updated successfully.'});
  } catch (err) {
    next(err);
  }
};
