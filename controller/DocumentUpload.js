const express = require('express')
const router = express.Router();
const midware = require('../middleware/multer')




router.post('/uploadImage', midware.upload.array("roomiMages", 3), (req, res) => {
    console.log('Reached image router ');
    let imageArray = [];
    for (let i = 0; i < req.files.length; i++) {
        imageArray.push('http://localhost:5200/Images/'+ req.files[i].filename)
    }
    console.log(imageArray[0]);
    res.json(imageArray[0])
})

module.exports = router;