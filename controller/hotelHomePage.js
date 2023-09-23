const express = require('express')
const router = express.Router();
const companies = require('../model/company')
const HBank = require('../model/humanbank');
const tariff = require('../model/tariff');
const { default: plans } = require('razorpay/dist/types/plans');

router.post('/loadhomepage',async (req,res)=>{
    const inputs = req.body;
    const userlogrecord = {
        username: req.body.Username,
        sessionId: req.sessionID,  
        folder: req.path, 
        method: req.method,
        loggedOut: false,
        ip: req.ip
    }
    console.log(userlogrecord);
    const result = await HBank.HumanResource.findOne({$or:[{ email: req.body.Username, password: req.body.Password,deleted: false },{ contactNumber: req.body.Username, password: req.body.Password,deleted: false }]}, { username: 1, _id: 0,email:1})
    
    const profile = await companies.company.find({contactNumber:req.body.Username}) 


    
    const tariffpackages = await tariff.loadtariff('');
    console.log(jsonObject,'body print');
    if(result){
        res.render('companyhomePage',{inputs,profile,tariffpackages})
    }
    else{
        console.log(inputs)
        res.redirect('/')
    } 
   
})
 

module.exports = router;