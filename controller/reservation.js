const express = require('express')
const router = express.Router();
const hbank = require('../model/humanbank')
const company = require('../model/company')
const checkin = require('../model/checkIn')

router.use('/savereservation',async (req,res)=>{
    
    const userDetails = await hbank.HumanResource.findOne({activeSession:req.sessionID}) 
    req.body.custId = userDetails.hrId
    if(userDetails.country!= 'India') req.body.Foreigner=true
    else req.body.Foreigner=false
    const tariff = await company.company.findOne({"roomtypes.tariffIndex":req.body.tariffIndex}) 
    req.body.rent =tariff.roomRentSingle
    req.body.specialRate = tariff.SpecialRent
    const result = await checkin.saveReservation(req.body)
    res.json(result)
})
module.exports = router;
 