const express = require('express')
const router = express.Router();
const midware = require('../middleware/multer')
const docs = require('../controller/DocumentUpload')


router.get('/',docs.getRoot)
router.post('/uploadImage', midware.upload.array("roomiMages", 3),docs.postuploadImage)

module.exports = router;