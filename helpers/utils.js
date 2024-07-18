const jwt = require('jsonwebtoken');
const CONSTANTS = require('./constants');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');

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

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadImageToS3 = async (image) => {
  const imageName = `${Date.now()}.${image.originalname.split('.').pop()}`;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageName,
    Body: image.buffer,
    ACL: 'public-read',
    ContentType: image.mimetype,
  };

  // Upload the image to S3 bucket
  const command = new PutObjectCommand(params);
  const data = await s3Client.send(command);
  return { Location: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageName}` };
};

const deleteImageFromS3 = async (imageUrl) => {
  const key = imageUrl.split('/').pop();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  const command = new DeleteObjectCommand(params);
  return s3Client.send(command);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  uploadImageToS3,
  deleteImageFromS3,
};
