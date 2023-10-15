//const userModel = require('../Model/userModel')
const cookie = require('cookie-parser');

const { Document } = require('mongoose');
const memoryCache = require('memory-cache');
const multer = require('../middleware/multer') 
const express = require('express');
const router = express.Router();
const companies = require('../model/company') 
const pincodes = require('../model/pincode') 
router.post('/loadcustommer',async (req,res)=>{
    
    const result = await company.loadcompany('');
    
    res.json(result);
})

// /Company
router.get('/Company',async(req,res)=>{
    let data = await companies.SearchCompany('');
    let count = data.length;
    count = Math.floor(count/10);
    count++;
    let pincode =  await pincodes.loadPincode(req.body)
     
    res.render('companies',{data,count,pincode});

})

 

router.post('/SaveCompany',multer.upload.array("roomiMages",3),async (req,res)=>{
     
    let imgArray = [];
    for (let i = 0; i < req.files.length; i++) {
      imgArray.push('http://localhost:5200/Images/'+req.files[i].filename);
    }
    req.body.imagearray = imgArray;
    let result =await companies.saveCompany(req.body) ;
    if((result.modifiedCount + result.upsertedCount)>0){result = {saved:true}}
    else {result={saved:false}}
    res.json(result)
    })

router.post('/searchCompany', async (req,res)=>{
    let data = await companies.SearchCompany(req.body.searchvalue);
    res.render('human',{data});
} )
router.post('/DeleteCompany', async (req, res) => {
    let result = await companies.deleteCompany(req.body.hrId)
    if ((result.modifiedCount + result.upsertedCount) > 0) { result = { deleted: true } }
    else { result = { deleted: false } }
    res.json(result)
})

module.exports=router;