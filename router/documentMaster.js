const express = require('express')
const router = express.Router()
const midware = require('../middleware/multer') 
const docs = require('../controller/documentMaster')
router.get('/',docs.getRoot)
router.post('/upload', midware.upload.array("currentImage", 3),docs.postupload)
router.post('/uploadImage', midware.upload.array("roomiMages", 3),docs.postuploadImage)

module.exports = router;


