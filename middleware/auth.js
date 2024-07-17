const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get the token from the header
  const authHeader = req.header('Authorization');

  // Check for the token
  if (!authHeader) {
    return res.status(401).json({msg: 'No token, authorization denied.'});
  }

  // Check if the token is prefixed with "Bearer "
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7, authHeader.length)
    : authHeader;

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({msg: 'Token is not valid'});
  }
};
