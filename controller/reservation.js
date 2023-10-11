const express = require('express')
const router = express.Router();
const hbank = require('../model/humanbank')
const company = require('../model/company')
const checkin = require('../model/checkIn')
const paymentModel = require('../model/payments')
const Razorpay = require('razorpay')
const occupancy = require('../model/occupancydetails')
router.post('/savereservation', async (req, res) => {
  const userDetails = await hbank.HumanResource.findOne({ activeSession: req.sessionID })
  req.body.custId = userDetails.hrId
  if (userDetails.country != 'India') req.body.Foreigner = true
  else req.body.Foreigner = false
  let tariff = await company.company.findOne({ "roomtypes.tariffIndex": req.body.tariffIndex}, { roomtypes: 1, _id: 0 })
  tariff = tariff.roomtypes;
  let tarifffilter = tariff.filter(element => element.tariffIndex === req.body.tariffIndex);
  req.body.rent = tarifffilter[0].roomRentSingle
  req.body.specialRate = tarifffilter[0].SpecialRent
  const totalAmount = parseInt(req.body.totalAmount);
  const result = await checkin.saveReservation(req.body)

  const paymentEntry = {
    transDate: Date.now(),
    paymentDate: Date.now(),
    paymentIndex: req.body.paymentIndex,
    paymentReferance: result.reference,
    accountHead: 'RESERVATION',
    amount: totalAmount,
    custommerId: req.body.custId,
    companyID: req.body.companyID,
    cancelled: false,
    createdUser: req.body.custommerId,
    systemEntry: true
  }
  const savedebit = await paymentModel.MakeEntry(paymentEntry)
   
 var instance = new Razorpay({
    key_id: 'rzp_test_6damh00ndxLBqq',
    key_secret: 'd7Y4vbTqZb7fOwcYIjWRpt6U',
  });
  let options = {
    amount: totalAmount * 100,  // amount in the smallest currency unit
    currency: "INR",
    receipt: result.reference
  };
  let order = await instance.orders.create(options);
  res.json({ success: true, order, totalAmount,result })
})





router.post('/confirmPayment', async (req, res) => {
   
  var instance = new Razorpay({
    key_id: 'rzp_test_6damh00ndxLBqq',
    key_secret: 'd7Y4vbTqZb7fOwcYIjWRpt6U',
  });

   
  let bookingDetails = req.body.bookingDetails
   

  const payment_id = req.body.razorpay_payment_id;
   
  const userDetails = await hbank.HumanResource.findOne({ activeSession: req.sessionID })
  req.body.custId = userDetails.hrId
  bookingDetails.custId = userDetails.hrId;
  bookingDetails.reservationNumber = req.body.reservationNumber;
 
    const payment = await instance.payments.fetch(payment_id);
     
  console.log(payment,'paymentpaymentpaymentpayment');
      
   
  if (payment.status === 'captured') {
    const ReceipttEntry = {
      transDate: Date.now(),
      paymentDate: Date.now(),
      paymentIndex: req.body.paymentIndex,
      paymentReferance: req.body.reservationNumber,
      accountHead: 'RAZORPAYACCOUNT',
      amount: parseInt(payment.amount) / 100,
      custommerId: req.body.custId,
      receiptNumber:payment_id,
      companyID: bookingDetails.companyID,
      cancelled: false,
      createdUser: req.body.custId,
      systemEntry: true,
      transactionReferanceNumber:payment.acquirer_data.upi_transaction_id,
      TransferMode:payment.vpa
    }
    const saveCreditEntry = await paymentModel.MakeCreditEntry(ReceipttEntry)
    const saveReservationDetails = await occupancy.saveReservationDetails(bookingDetails)
     
    res.json({ status: true });
  } else {
     
    res.json({ status: false });
  }
}



)

module.exports = router;
 