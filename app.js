const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const connectDB = require('./helpers/db');
const errorHandler = require('./middleware/error');

require('dotenv').config();

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
    cb(new Error('Invalid file type'));
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
app.use('/api/message', require('./routes/api/message'));

app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/dist')));

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
  });
}

app.listen(port, (err) => {
  if (err) throw err;

  console.log(`Server running on port ${port}`);
});
