const jwt = require("jsonwebtoken");
const CONSTANTS = require("./constants");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const Blacklist = require("../models/Blacklist");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const ACCESS_TOKEN_EXPIRY = CONSTANTS.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_EXPIRY = { expiresIn: CONSTANTS.REFRESH_TOKEN_EXPIRY };

const generateAccessToken = (userId) => {
  return jwt.sign({ user: userId }, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign(
    { user: userId },
    process.env.JWT_SECRET,
    REFRESH_TOKEN_EXPIRY
  );
};

const cleanExpiredTokens = async () => {
  try {
    await Blacklist.deleteMany({ expiresAt: { $lt: new Date() } });
    console.error("Cleared all the expired tokens");
  } catch (err) {
    console.error("Error cleaning expired tokens:", err);
  }
};

// *********** File upload *************//

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const generatePresignedUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  try {
    const signedUrl = await getSignedUrl(s3Client, command);
    // , {expiresIn: 3600,}); // 1 hour expiry
    // console.log("Signed URL:", signedUrl);
    return signedUrl;
  } catch (err) {
    console.error("Error generating presigned URL", err);
    throw err;
  }
};

const uploadImageToS3 = async (image) => {
  const imageName = `${Date.now()}.${image.originalname.split(".").pop()}`;
  // console.log("imagename", imageName);
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageName,
    Body: image.buffer,
    // ACL: 'public-read',
    ContentType: image.mimetype,
  };

  // Upload the image to S3 bucket
  const command = new PutObjectCommand(params);
  const data = await s3Client.send(command);
  return {
    Location: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${imageName}`,
  };
};

const deleteImageFromS3 = async (imageUrl) => {
  const key = imageUrl.split("/").pop();

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
  cleanExpiredTokens,
  generatePresignedUrl,
};
