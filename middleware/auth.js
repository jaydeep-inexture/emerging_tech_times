const jwt = require('jsonwebtoken');
const Blacklist = require('../models/Blacklist');

module.exports = function (optional = false) {
  return async function (req, res, next) {
    // Get the token from the header
    const authHeader = req.header('Authorization');

    // Check for the token if authentication is required
    if (!optional && !authHeader) {
      return res.status(401).json({ msg: 'No token, authorization denied.' });
    }

    if (authHeader) {
      // Check if the token is prefixed with "Bearer "
      const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7, authHeader.length)
        : authHeader;

      try {
        // Check if the token is blacklisted
        const blacklistedToken = await Blacklist.findOne({ token });
        if (blacklistedToken) {
          return res.status(403).json({ msg: 'Token is invalidated' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
      } catch (err) {
        console.log({ err });
        return res.status(401).json({ msg: 'Token is not valid' });
      }
    }

    next();
  };
};
