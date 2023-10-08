const express = require('express')
const router = express.Router();
const hbank = require('../model/humanbank')
const company = require('../model/company')
const checkin = require('../model/checkIn')
const paymentModel = require('../model/payments')
const Razorpay = require('razorpay')
router.post('/savereservation',async (req,res)=>{
    const userDetails = await hbank.HumanResource.findOne({activeSession:req.sessionID}) 
    req.body.custId = userDetails.hrId
    if(userDetails.country!= 'India') req.body.Foreigner=true
    else req.body.Foreigner=false
    let tariff = await company.company.findOne({"roomtypes.tariffIndex":req.body.tariffIndex},{roomtypes:1,_id:0}) 
    tariff = tariff.roomtypes;
    let tarifffilter = tariff.filter(element => element.tariffIndex === req.body.tariffIndex);
    req.body.rent =tarifffilter[0].roomRentSingle
    req.body.specialRate = tarifffilter[0].SpecialRent
    const totalAmount = parseInt(req.body.totalAmount);
     
    const result = await checkin.saveReservation(req.body)
    
    console.log(req.body)    
    
    const paymentEntry={
        transDate : Date.now(),
        paymentDate : Date.now(),
        paymentIndex : req.body.paymentIndex ,
        paymentReferance : req.body.reservationNumber ,
        accountHead : 'RESERVATION',
        amount : totalAmount ,
        custommerId : req.body.custId ,
        companyID : req.body.companyID ,
        cancelled : false,
        createdUser : req.body.custommerId,   
        systemEntry:true
    }
    const savedebit = await paymentModel.MakeEntry(paymentEntry)
    console.log(savedebit)

var instance = new Razorpay({
    key_id: 'rzp_test_6damh00ndxLBqq',
    key_secret: 'd7Y4vbTqZb7fOwcYIjWRpt6U',
  });
  
  let options = {
    amount: totalAmount*100,  // amount in the smallest currency unit
    currency: "INR",
    receipt: result.reference
  };
  let order = await instance.orders.create(options);
  res.json({success:true,order,totalAmount})


})
router.post('/confirmPayment',async (req,res)=>{
var instance = new Razorpay({
    key_id: 'rzp_test_6damh00ndxLBqq',
    key_secret: 'd7Y4vbTqZb7fOwcYIjWRpt6U',
  });
 const payment_id =  req.body.razorpay_payment_id ;
 const payment = await instance.payments.fetch(payment_id);
 if (payment.status === 'authorized') {
    
    
    console.log('Payment successful:', payment);
    res.json({ status: true });
  } else {
    console.log('Payment not successful:', payment);
    res.json({ status: false });
  }
}
  
   

 )






module.exports = router;
 