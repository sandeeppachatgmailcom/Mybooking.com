const express = require('express')
const router = express.Router();
const checkin = require('../model/checkIn')
const payments = require('../model/payments')
const company = require('../model/company')
router.post('/cancelBooking',async (req,res)=>{
    const reservedtime =  await checkin.checkIn.findOne({reservationNumber:req.body.bokingID},{arrivalDate:1,_id:0})
    const currentTime =  new Date()
    const temp = (new Date(reservedtime)-currentTime)
    let hoursDifference =(reservedtime.arrivalDate-currentTime) / (1000 * 60 * 60);
    console.log((reservedtime.arrivalDate-currentTime) / (1000 * 60 * 60));
    if(hoursDifference<48){
        const status={
            status:false,
            message:'Sorry ,its too late.you couldnt able to cancel the booking now '
        }
        res.json(status)
        return;
    }
    else {
        const result =  await checkin.checkIn.updateOne({reservationNumber:req.body.bokingID},{$set:{delete:true}})
        if(result.modifiedCount>0){
            const status={
                status:true,
                message:'Booking Cancelled'
            }
            res.json(status)
            return;
        }
    }

})
router.post('/getPaymentHistory',async (req,res)=>{
    console.log(req.body.userID);
    let result = await payments.payment.find({accountHead:req.body.userID},{_id:0,cancelled:0})
    for(let i =0;i<result.length;i++){
        let p  = await company.company.findOne({CompanyID:result[i].companyID})
        console.log(p);
    }
     
    console.log(result);
    res.json(result)
})
module.exports = router