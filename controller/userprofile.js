const express = require('express')
const router = express.Router();
const checkin = require('../model/checkIn')
const payments = require('../model/payments')
const company = require('../model/company')
const Razorpaytrans = require('../controller/razorPay')
const userBank = require('../model/humanbank')
router.post('/cancelBooking',async (req,res)=>{
    const reservedtime =  await checkin.checkIn.findOne({reservationNumber:req.body.bookingID},{arrivalDate:1,_id:0})
    console.log(reservedtime);
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
        const result =  await checkin.checkIn.updateOne({reservationNumber:req.body.bookingID},{$set:{delete:true}})
        const  user =await userBank.findUser(req.sessionID)
        const paymentId = await payments.payment.findOne({entryType:"Dr",paymentReferance: req.body.bookingID,accountHead:user.hrId},{_id:0,receiptNumber:1})
        //const refund = await Razorpaytrans.razorRefundPayment(paymentId.receiptNumber)
        let refund={};
        refund.status== 'processed'    
        console.log(result);
        let status
        if(result.modifiedCount>0){
            if(refund.status== 'processed'){
                  status={
                    status:true,
                    message:'Booking Cancelled& refund processed , it will credit in your account with in 24 working hours'
                }
            }
            else{
                  status={
                    status:true,
                    message:'Booking Cancelled'
                }
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