const express = require('express')
const router = express.Router();
const checkin = require('../model/checkIn')
const payments = require('../model/payments')
const company = require('../model/company')
const Razorpaytrans = require('../controller/razorPay')
const userBank = require('../model/humanbank');
const { LogarithmicScale } = require('chart.js');
const userprofile = require('../controller/userprofile')

router.get('/',userprofile.getprofile)
router.post('/cancelBooking',userprofile.cancelBooking)
router.get('/getPaymentHistory',userprofile.getPaymentHistory)
router.get('/loadProfile',userprofile.loadProfile)
module.exports = router