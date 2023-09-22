//const userModel = require('../Model/userModel')
const cookie = require('cookie-parser');

const { Document } = require('mongoose');
const memoryCache = require('memory-cache');
const multer = require("multer")
const express = require('express');
const router = express.Router();
const session = require('express-session');
const { render } = require('ejs');
const HBank = require('../model/humanbank');
const DBcollections = require('../model/DBcollections');
const frontoffice = require('../model/checkIn') 
const floor = require('../model/floor')
const rooms = require('../model/rooms')
const adminController = require('../controller/adminController')

router.post('/loadcustommer',async (req,res)=>{
    console.log(req.body);
    const result = await HBank.loadHuman('');
    console.log(result);
    res.json(result);
})
 
router.get('/human',async(req,res)=>{
    let data = await HBank.SearchHuman('');
    res.render('human',{data});
})
router.post('/SaveHuman',async (req,res)=>{
    let result =await HBank.saveHuman(req.body) ;
    if((result.modifiedCount + result.upsertedCount)>0){result = {saved:true}}
    else {result={saved:false}}
    res.json(result)
    })

router.post('/searchHuman', async (req,res)=>{
    let data = await HBank.SearchHuman(req.body.searchvalue);
    res.render('human',{data});
} )
router.post('/DeleteHuman', async (req, res) => {
    let result = await HBank.deleteHuman(req.body.hrId)
    if ((result.modifiedCount + result.upsertedCount) > 0) { result = { deleted: true } }
    else { result = { deleted: false } }
    res.json(result)
})

module.exports=router;