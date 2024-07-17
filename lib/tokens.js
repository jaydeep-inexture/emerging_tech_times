const jwt = require('jsonwebtoken');
const CONSTANTS = require('./constants');

const ACCESS_TOKEN_EXPIRY = CONSTANTS.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_EXPIRY = {expiresIn: CONSTANTS.REFRESH_TOKEN_EXPIRY};

const generateAccessToken = (userId) => {
  return jwt.sign({user: userId}, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({user: userId}, process.env.JWT_SECRET, REFRESH_TOKEN_EXPIRY);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
