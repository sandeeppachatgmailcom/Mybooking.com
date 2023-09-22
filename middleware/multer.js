const multer = require('multer')
const express = require('express')
const router = express.Router()
    
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'asset/Images'); // Destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  },
});
const upload = multer({storage:storage});
module.exports = {upload}