const User = require('../models/User');

module.exports = async function (req, res, next) {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(401).json({msg: 'User not authorized'});
    }

    if (!user.isAdmin) {
      return res.status(403).json({msg: 'User does not have admin privileges'});
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({msg: 'Server error'});
  }
};
