const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const AWS = require('aws-sdk');
const multer = require('multer');

const connectDB = require('./helpers/db');
const errorHandler = require('./middleware/error');

require('dotenv').config();

// Configurations for AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});

const app = express();
const port = process.env.PORT || 5000;

//connect to database
connectDB();

// filter image file types
const imageFileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Configure multer with the imageFileFilter
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: imageFileFilter,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(upload.single('image'));

// define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));

app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, (err) => {
  if (err) throw err;

  console.log(`Server running on port ${port}`);
});
