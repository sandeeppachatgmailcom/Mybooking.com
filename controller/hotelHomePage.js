const express = require('express')
const router = express.Router();
const companies = require('../model/company')
const HBank = require('../model/humanbank');
const tariff = require('../model/tariff');
 

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
    
    const result = await HBank.HumanResource.findOne({$or:[{ email: req.body.Username, password: req.body.Password,deleted: false },{ contactNumber: req.body.Username, password: req.body.Password,deleted: false }]}, { username: 1, _id: 0,email:1})
   
    const company = await companies.company.find({contactNumber:req.body.Username}) 
    profile= company[0];
    console.log(profile);
    const tariffpackages = await tariff.loadtariff('');
    console.log(tariffpackages,'asasaasasasasasasasasasasasas');
    if(result){
        res.render('companyhomePage',{inputs,profile,tariffpackages})
    }
    else{
         
        res.redirect('/')
    } 
   
})
 

module.exports = router;