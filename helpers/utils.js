const jwt = require('jsonwebtoken');
const CONSTANTS = require('./constants');
const AWS = require('aws-sdk');

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

// *********** File upload *************//

const s3 = new AWS.S3();

const uploadImageToS3 = (image) => {
  const imageName = `${Date.now()}.${image.originalname.split('.').pop()}`;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageName,
    Body: image.buffer,
    ACL: 'public-read',
    ContentType: image.mimetype,
  };

  // Upload the image to S3 bucket
  return s3.upload(params).promise();
};

const deleteImageFromS3 = (imageUrl) => {
  const key = imageUrl.split('/').pop();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  return s3.deleteObject(params).promise();
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  uploadImageToS3,
  deleteImageFromS3,
};
