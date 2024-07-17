const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Check for specific error types and handle them accordingly
  if (err.name === 'ValidationError') {
    return res.status(400).json({errors: [{msg: err.message}]});
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    msg: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  });
};

module.exports = errorHandler;
