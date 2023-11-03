const express = require('express')
const router = express.Router()
const imageDoc = require('../functions/documents')
const midware = require('../middleware/multer') 
const getRoot = (req,res)=>{
    res.redirect('/')
} 
const postupload = async (req, res) => {
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
    
} 
const postuploadImage= (req, res) => {
    console.log('Reached image router ');
    let imageArray = [];
    for (let i = 0; i < req.files.length; i++) {
        imageArray.push('http://localhost:5200/Images/'+ req.files[i].filename)
    }
    console.log(imageArray[0]);
    res.json(imageArray[0])
} 

module.exports ={getRoot,postupload,postuploadImage};


