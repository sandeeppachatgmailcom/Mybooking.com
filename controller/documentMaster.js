const express = require('express')
const router = express.Router()
const imageDoc = require('../model/documents')
const midware = require('../middleware/multer') 
router.get('/',(req,res)=>{
    res.redirect('/')
})

router.post('/upload', midware.upload.array("currentImage", 3),async (req, res) => {
    console.log('Reached image router ');
    let imageArray = [];
    for (let i = 0; i < req.files.length; i++) {
        imageArray.push('http://localhost:5200/Images/'+ req.files[i].filename)
    }
    req.body.currentImage = imageArray[0]
    console.log(imageArray[0]);
    const saveImage = await imageDoc.saveImage(req.body) 
    console.log(saveImage,'before responce');
    res.json(saveImage)
    
})


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


