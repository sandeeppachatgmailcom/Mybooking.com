//const userModel = require('../Model/userModel')
const cookie = require('cookie-parser');
const { Document, default: mongoose } = require('mongoose');
const memoryCache = require('memory-cache');
const multer = require("multer")
const express = require('express');
const router = express.Router();
const session = require('express-session');
const { render } = require('ejs');
const HBank = require('../model/humanbank');
const DBcollections = require('../model/DBcollections');
const tariffmaster = require('../model/tariff')
const controller = require('./adminController')
const checkInPlan = require('../model/planMaster')

router.get('/tariff',async (req, res) => {
    try {
        const chkplans = await checkInPlan.LoadPlan()
        const data = await tariffmaster.loadtariff('');
        res.render('tariff', { data,chkplans });
    } catch (error) {
        console.error("Error getting tariff data:", error);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/tariffsearch',async (req,res)=>{
    const chkplans = await checkInPlan.LoadPlan()
     const data = await tariffmaster.loadtariff(req.body.searchvalue)
     console.log(req.body.searchvalue)
     res.render('tariff', { data,chkplans });
})

router.post('/saveCategory',async (req,res)=>{
    
    console.log(req.body.tariffName);   
    let result =  await tariffmaster.savecategory(
        req.body.tariffName,
        req.body.tariffIndex,
        req.body.roomRentSingle,
        req.body.extraPerson,
        req.body.tax,
        req.body.includeChild,
        req.body.defaultCheckinplan,
        req.body.timestamp,
        req.body.username,
        req.body.HSNCode,
        req.body.itemname
        );
        console.log(result.acknowledged);
        if (result.acknowledged){result = { Saved:true }}
        else(result = {Saved:false}) 
        res.json(result)
})
 
 


router.post('/deleteTariff',async (req,res)=>{
    console.log(req.body.tariffIndex)
    let result = await (tariffmaster.tariff.updateOne({tariffIndex:req.body.tariffIndex},{$set:{deleted:true}}))
    console.log(result.acknowledged);
    if(result.acknowledged ){
        result={deleted:true}
    }
    else
    {
        result={deleted:false}
    }
    res.json(result)
})


module.exports = router