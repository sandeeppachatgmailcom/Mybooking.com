const multer = require('multer')
const express = require('express')
const router = express.Router()
const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');


const storage = multer.diskStorage({
  
  destination: (req, file, cb) => {
    cb(null, 'asset/Images'); // Destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    
    const fileUrl = req.body.imageField;
    console.log(req.body,'reqreqreqreqreqreqreqreqreqreqreq');
    const baseUrl = req.headers.origin 
    const parsedUrl = new URL(req.body.imageField,baseUrl);
    const fileName = path.basename(parsedUrl.pathname);
    console.log(parsedUrl,'parsedUrl',fileName,'fileName', req.body.imageField);
    const directory = path.join('asset/Images', fileName);
    console.log(directory,parsedUrl,'parsedUrl',fileName,'fileName');
    fs.unlink(directory, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      } else {
        console.log('File deleted successfully');
      }
    });
    cb(null,fileName); // Unique file name
  },
});
const upload = multer({storage:storage});


module.exports = {upload}